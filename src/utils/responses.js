const getErrorMessage = function(code) {
  switch (code) {
    case 400:
      return 'Bad request. Make sure JSON is properly formatted and contains all required fields. ';
    case 401:
      return 'Unauthorized.';
    case 500:
      return 'Internal Server Error. ';
    default:
      return '';
  }
};

// Error Web Response
const error = function(res, err, code) {
  let errorMessage = err && err.message ? err.message : '';
  errorMessage = getErrorMessage(res.statusCode) + errorMessage;

  let result = {
    success: false,
    error: errorMessage
  };

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = code || 500;
  return res.json(result);
};

// Success Web Response
const success = function(res, data, code) {
  let result = {
    success: true
  };
  if (data) {
    result.data = data;
  }

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = code || 200;

  return res.json(result);
};

module.exports = {
  responseError: error,
  responseSuccess: success
};
