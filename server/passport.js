const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const CONFIG = require('../config');

module.exports = new PassportLocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
  },
  (req, email, password, done) => {

    const userData = {
      email: email.trim(),
      password: password.trim()
    }

    // find a user by email address
    return User.findOne(
      { email: userData.email },
      (err, user) => {
        if (err) { return done(err); }

        // No user found
        if (!user) {
          console.log('No user with that email found');
          return done(null, false, { message: "Invalid Credentials"} );
        }

        // Password is wrong
        return user.comparePassword(userData.password, (passwordErr, isMatch) => {
          if (passwordErr) {
            console.log('Error comparing password');
            return done(passwordErr);
          }

          if (!isMatch) {
            console.log("Wrong password");
            // not being caught properly.
            // should create an actual error to pass

            // return done(null, false, { message: "Invalid Credentials"} );
            return done(new Error("Invalid Credentials"));
          }

          const payload = {
            sub: user._id
          };

          const options = {
            expiresIn: 60 * 20   // 20m
          }

          // create a token string
          const token = jwt.sign(payload, CONFIG.SECRET);
          const data = {
            name: user.name
          };

          return done(null, token, data);
        })
      }
    )
  }
)