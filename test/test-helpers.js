const knex = require('knex');

//Create a knex instance to postgres. Returns {knex instance}

function makeKnexInstance() {
  return knex({
    client: 'pg',
    connection: process.env.TEST_DB_URL,
  });
}

// returns an array of user objects

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      password: 'p@ssw0RD',
      classes: 'test-class-1, test-class-2'
    },
    {
      id: 2,
      user_name: 'test-user-2',
      password: 'password',
      classes: 'test-class-3, test-class-4'
    }
  ]
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `Truncate
        "ulala_guide_users"`
    )
      .then(() =>
        Promise.all([
          trx.raw(`ALTER SEQUENCE ulala_guide_users_id_seq minvalue 0 START WITH 1`),
          trx.raw(`SELECT setval('ulala_guide_users_id_seq', 0)`)
        ]))
  );
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    user_name: user.user_name,
    password: user.password
  }))
  return db.transaction(async trx => {
    await trx.into('ulala_guide_users').insert(preppedUsers)

    await trx.raw(
      `SELECT setval('ulala_guide_users_id_seq', ?)`,
      [users[users.length -1].id],
    )
  })
}

module.exports = {
  makeKnexInstance,
  makeUsersArray,
  seedUsers,
  cleanTables
}