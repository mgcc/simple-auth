const passport = require('passport');

exports.login = (req, res, next) => {
  // assuming valid

  return passport.authenticate('local-strategy', (err, token, userData) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        success: false,
        message: 'Unable to login'
      });
    }

    res.json({
      success: true,
      message: 'You have successfully logged in',
      token,
      userData
    });
  })(req, res, next);
}

exports.logout = (req, res, next) => {
  res.json({
    success: true,
    message: 'Successfully logged out'
  });
}