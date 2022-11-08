const express = require('express');
const passport = require('passport');
require('../utils/passport') // importo codigo estrategias passport

const routerUsers = express.Router();

routerUsers.post("/signup", passport.authenticate("signup", { failureRedirect: "/failSignUp" }) , (req, res) => {  
  req.session.user = req.user;
  res.redirect("/");
});

routerUsers.post("/login", passport.authenticate("login", { failureRedirect: "/failLogin" }) ,(req, res) => {
  req.session.user = req.user;
  res.redirect('/');
});

module.exports = routerUsers;