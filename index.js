require('./src/utils/globals'); // instantiate global functions
require('./config/config');

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const middleware = require('./src/utils/middleware');
const routes = require('./src/routes');

// Set-up and run the Express app.
const app = express();

// Use body-parsing middleware for JSON like experience with URL-encoded
// Extended syntax uses qs library (when true) and querystring library (when false)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(helmet());

// See: https://expressjs.com/en/resources/middleware/morgan.html
app.use(logger('common'));

app.use('/', routes);

// Use Middleware
app.use(middleware.logErrors);
app.use(middleware.badRequest);
app.use(middleware.notFound);
app.use(middleware.error);

app.listen(CONFIG.PORT || 5000);
