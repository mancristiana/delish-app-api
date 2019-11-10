const argon2 = require('argon2');
const mongoose = require('mongoose');
const validate = require('./validators');

const argonOptions = {
  timeCost: CONFIG.ARGON_TIMECOST,
  memoryCost: CONFIG.ARGON_MEMORY,
  parallelism: CONFIG.ARGON_PARALLELISM,
  type: argon2.argon2id
};

let userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: validate.email,
    unique: true
  },
  password: { type: String, required: true },
  name: { type: String, required: true }
});
userSchema.plugin(validate.uniqueValidator);

userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await this.hashPassword(this.password);
  } else {
    return next();
  }
});

// Generate and return the hash for a given password
userSchema.methods.hashPassword = async function(password) {
  let hash, error;
  [hash, error] = await to(argon2.hash(password, argonOptions));
  if (error) {
    throwError(`User.hashPassword Error: ${error}`, true);
  } else {
    return hash;
  }
};

// Check if password matches the password in the database
userSchema.methods.verifyPassword = async function(password) {
  const hash = this.password;
  let match, error;
  [match, error] = await to(argon2.verify(hash, password));
  if (error) {
    throwError(`User.verifyPassword Error: ${error}`, true);
  }
  return match;
};

userSchema.methods.getProfile = function() {
  return {
    name: this.name,
    email: this.email,
    nationalId: this.nationalId,
    phone: this.phone,
    address: this.address
  };
};

// Create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
