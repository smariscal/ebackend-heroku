const dotenv = require("dotenv");
dotenv.config();
const UsersDAO = require(`./users/DAO${process.env.BBDD}`);

module.exports = {
  UsersDAO,
};