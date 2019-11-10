module.exports.hasFields = function(req, fields) {
  const body = req.body || {};
  let field;
  for (let i = 0; i < fields.length; i++) {
    field = fields[i];
    if (!body.hasOwnProperty(field)) {
      return false;
    }
  }

  return true;
};
