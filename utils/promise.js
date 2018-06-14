// See: https://medium.com/front-end-hacking/error-handling-in-node-javascript-suck-unless-you-know-this-2018-aa0a14cfdd9d
// See: http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/

const parseError = require('parse-error'); // Parses error so you can read error message and handle them accordingly

module.exports = function(promise) {
  return promise
    .then(data => {
      return [data, null];
    })
    .catch(error => [null, parseError(error)]);
};
