const bcrypt = require('bcrypt');

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
}

module.exports = { hashPassword, comparePassword };