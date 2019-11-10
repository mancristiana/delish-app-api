const responses = require('./globals/responses');
const thrower = require('./globals/thrower');

responseError = responses.responseError;
responseSuccess = responses.responseSuccess;
to = require('./globals/promise');
handleError = thrower.handleError;
throwError = thrower.throwError;

// Handle all the uncaught promise rejections
process.on('unhandledRejection', handleError);
