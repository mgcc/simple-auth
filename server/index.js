const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();

// User model
require('./User');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

// Strategies
const localLoginStrategy = require('./passport');
passport.use('local-login', localLoginStrategy);

// Initialize mongoose
mongoose.Promise = global.Promise;
mongoose.connect(CONFIG.DB_URL, (err) => {
  if (err) { console.log('Error connecting to MongoDB'); }
  else { console.log('Connected to MongoDB'); }
});

// CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers');

  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// Routes
app.post('/login', (req, res) => {

});

app.post('/logout', (req, res) => {

});

app.use('/authorized', authCheck);
app.get('/authorized', (req, res) => {
  res.send('You need to be authorized to view this page!');
});



// Start server
app.listen(3000, (err) => {
  if (!err) console.log(`API running on http://localhost:3000`);
})