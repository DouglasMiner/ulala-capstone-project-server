const xss = require('xss');

const REGEX_UPPER_LOWER_NUMBER = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[\S]+/;

const UsersService = {
  hasUserWithUserName(db, user_name) {
    return db('ulala_guide_users')
      .where({ user_name })
      .first()
      .then(user => !!user);
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('ulala_guide_users')
      .returning('*')
      .then(([user]) => user);
  },
  validatePassword(password) {
    if (password.length < 8) {
      return 'Password must be longer than 8 characters';
    }
    if (password.length > 72) {
      return 'Password must be less than 72 characters';
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces';
    }
    if (!REGEX_UPPER_LOWER_NUMBER.test(password)) {
      return 'Password must contain 1 upper case, lower case, and number character';
    }
    return null;
  },
  serializeUser(user) {
    return {
      id: user.id,
      user_name: xss(user.user_name),
    };
  },

};

module.exports = UsersService;