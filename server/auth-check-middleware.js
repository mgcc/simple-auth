const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');

module.exports = (req, res, next) => {
  console.log('AUTH MIDDLEWARE')

  // Don't check for authorization in preflight requests
  if (req.method === 'OPTIONS') {
    return next();
  }

  console.log('Checking headers:');
  console.log(req.headers);
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get last part of authorization header string
  const token = req.headers.authorization.split(' ')[1];

  // decode the string using secret phrase
  return jwt.verify(token, 'THIS IS A SECRET STRING', (err, decoded) => {
    if (err) {
      return res.status(401).end();
    }

    const userId = decoded.sub;

    // check if user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }

      return next();
    });
  });
}