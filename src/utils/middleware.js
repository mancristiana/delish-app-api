const logErrors = function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
};

const badRequest = function(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return responseError(res, null, 400);
  }
  next();
};

const notFound = function(req, res, next) {
  return responseError(res, { message: 'Route not found' }, 404);
};

const error = function(err, req, res, next) {
  return responseError(res, null, 500);
};

module.exports = {
  error: error,
  notFound: notFound,
  badRequest: badRequest,
  logErrors: logErrors
};
