const responses = require('./responses');
const thrower = require('./thrower');

responseError = responses.responseError;
responseSuccess = responses.responseSuccess;
to = require('./promise');
handleError = thrower.handleError;
throwError = thrower.throwError;

// Handle all the uncaught promise rejections
process.on('unhandledRejection', handleError);
