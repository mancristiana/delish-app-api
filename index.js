require('./src/utils/globals'); // instantiate global functions

const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./src/routes');

const app = express();

/**
 *  CORS Cross-Origin Resource Sharing
 */
app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  next();
});

// Use body-parsing middleware for JSON like experience with URL-encoded
// Extended syntax uses qs library (when true) and querystring library (when false)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes);

app.listen(process.env.PORT || 5000);
