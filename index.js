require('./src/utils/globals');
require('./config/config');

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const middleware = require('./src/utils/middleware');
const routes = require('./src/routes');
const app = express();

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
