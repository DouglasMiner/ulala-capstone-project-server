const app = require('../src/app');
const helpers = require('./test-helpers')


describe('UsersService', () => {
  let db;

  const testUsers = helpers.makeUsersArray();
  const [testUser] = testUsers;

  before('make knex instance', () => {
    db = helpers.makeKnexInstance();
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe(`POST /Login`, () => {
    beforeEach('insert users', () => helpers.seedUsers(db, testUsers));

    const requiredFields = ['user_name', 'password'];

    requiredFields.forEach(field => {
      const registerAttemptBody = {
        user_name: 'test username',
        password: 'test password'
      }


      it(`responds with 400 required error when '${field}' is missing`, () => {
        delete registerAttemptBody[field];

        return supertest(app)
          .post('/Login')
          .send(registerAttemptBody)
          .expect(400, {
            error: `Missing '${field}' in request body`,
          });
      });
    });
    it(`responds 400 'Password must be longer than 8 characters' when empty password`, () => {
      const userShortPassword = {
        user_name: 'test username',
        password: '1234567',
        name: 'test name',
      };
      return supertest(app)
        .post('/Login')
        .send(userShortPassword)
        .expect(400, { error: `Password must be longer than 8 characters` });
    });

    it(`responds 400 'Password must be less than 72 characters' when long password`, () => {
      const userLongPassword = {
        user_name: 'test username',
        password: '*'.repeat(73),
      };

      return supertest(app)
        .post('/Login')
        .send(userLongPassword)
        .expect(400, { error: `Password must be less than 72 characters` });
    });

    it(`responds 400 error when password starts with spaces`, () => {
      const userPasswordStartsSpaces = {
        user_name: 'test username',
        password: ' 1Aa!2Bb@',
      };

      return supertest(app)
        .post('/Login')
        .send(userPasswordStartsSpaces)
        .expect(400, { error: `Password must not start or end with empty spaces` });
    });

    it(`responds 400 error when password ends with spaces`, () => {
      const userPasswordEndsSpaces = {
        user_name: 'test username',
        password: '1Aa!2Bb@ ',
      };

      return supertest(app)
        .post('/Login')
        .send(userPasswordEndsSpaces)
        .expect(400, { error: `Password must not start or end with empty spaces` });
    });

    it(`responds 400 error when password isn't complex enough`, () => {
      const userPasswordNotComplex = {
        user_name: 'test username',
        password: 'AAaabbCC',
      };

      return supertest(app)
        .post('/Login')
        .send(userPasswordNotComplex)
        .expect(400, { error: `Password must contain 1 upper case, lower case, and number character` });
    });

    it(`responds 400 'User name already taken' when username isn't unique`, () => {
      const duplicateUser = {
        user_name: testUser.user_name,
        password: '11AAaa!!',
      };

      return supertest(app)
        .post('/Login')
        .send(duplicateUser)
        .expect(400, { error: `Username already taken` });
    });

    describe(`Given a valid user`, () => {
      it(`responds 201, serialized user with no password`, () => {
        const newUser = {
          user_name: 'testusername',
          password: '11AAaa!!',
        };

        return supertest(app)
          .post('/Login')
          .send(newUser)
          .expect(201)
          .expect(res => {
            expect(res.body).to.have.property('id')
            expect(res.body.user_name).to.eql(newUser.user_name)
            expect(res.body).to.not.have.property('password')
            expect(res.headers.location).to.eql(`/UserBuilds/${res.body.user_name}`)
          });
      });
    });
  });
});