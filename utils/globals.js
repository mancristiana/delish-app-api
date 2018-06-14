const { responseError, responseSuccess } = require('./responses');
const to = require('./promise');
const { handleError, throwError } = require('./thrower');

// Handle all the uncaught promise rejections
process.on('unhandledRejection', handleError);
