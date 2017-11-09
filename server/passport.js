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

        // create token string
        const payload = {

        }

        // const token = jwt.sign()

        // Password is wrong
        // return user.comparePassword(userData.password, (passwordErr, isMatch) => {
        //   if (passwordErr) {
        //     console.log('Error comparing password');
        //     return done(passwordErr);
        //   }

        //   if (!isMatch) {
        //     console.log("Wrong password");

        //     // return done(null, false, { message: "Invalid Credentials"} );
        //     return done(new Error("Invalid Credentials"));
        //   }

        //   const payload = {
        //     sub: user._id
        //   };

        //   const options = {
        //     expiresIn: 60 * 20   // 20m
        //   }

        //   // create a token string
        //   const token = jwt.sign(payload, 'THIS IS A SECRET!!');
        //   const data = {
        //     name: user.name
        //   };

        //   return done(null, token, data);
        // })
      }
    )
  }
)