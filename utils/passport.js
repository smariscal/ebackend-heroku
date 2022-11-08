const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../mongodb/schemas/User');
const {Types} = require('mongoose');
const { comparePassword, hashPassword } = require("../utils/hashPassword");

// estrategia login
passport.use("login", new LocalStrategy(async (username, password, done) => {
  const user = await User.findOne({ username });
  if(user) {
    const passHash = user.password;
    if(!comparePassword(password, passHash))
      return done(null, null, { message: "Usuario y/o contraseña incorrecta" });
  } else
    return done(null, null, { message: "Usuario y/o contraseña incorrecta" });
  return done(null, user);
}));

// estrategia registro
passport.use("signup", new LocalStrategy({passReqToCallback: true}, async (req, username, password, done) => {
  const user = await User.findOne({ username });
  if (user) {
   return done(null, null, { message: "Usuario ya existente" })
  };
  const hashedPassword = hashPassword(password);
  const newUser = new User({ username, password: hashedPassword  });
  await newUser.save();

  return done(null, newUser);
}));

// serialize // deserialize
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  id = Types.ObjectId(id);
  const user = await User.findById(id);
  done(null, user);
});