const parseError = require('parse-error'); // Parses error so you can read error message and handle them accordingly

const throwError = function(errorMessage, log) {
  if (log === true) {
    console.error(errorMessage);
  }

  throw new Error(errorMessage);
};

const handleError = function(error) {
  console.error('Uncaught Error', parseError(error));
};

module.exports = {
  throwError: throwError,
  handleError: handleError
};
