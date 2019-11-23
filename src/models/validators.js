const validate = require('mongoose-validator');
const uniqueValidator = require('mongoose-unique-validator');

module.exports.uniqueValidator = uniqueValidator;

// See: https://github.com/leepowellcouk/mongoose-validator
// See: https://github.com/chriso/validator.js/#validators
module.exports.email = [
  validate({
    validator: 'isEmail',
    message: 'Email is not valid'
  })
];
