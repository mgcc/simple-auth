const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

module.exports = new PassportLocalStrategy(
  {
    //session: false,
    passReqToCallback: true
  },
  (req, username, password, done) => {

    // find a user by email address
    return User.findOne(
      { username },
      (err, user) => {
        if (err) { return done(err); }

        // No user found
        if (!user) {
          console.log('No user with that email found');
          return done(null, false, { message: "Invalid Credentials"} );
        }

        if (password != user.password) {
          console.log('Wrong password');
          return done('Wrong password');
        }

        const tokenPayload = {
          sub: user._id
        }

        const token = jwt.sign(tokenPayload, 'THIS IS A SECRET STRING');

        const data = {
          username: user.username,
          name: user.name
        }

        return done(null, token, data)
      }
    )
  }
)