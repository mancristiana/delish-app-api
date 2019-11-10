const mongoose = require('mongoose');

let recipeShema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  image: String,
  time: Date,
  servings: Number,
  link: String,
  ingredients: [
    {
      name: String,
      quantity: Number,
      unit: String
    }
  ],
  directions: [String]
});

// See: http://mongoosejs.com/docs/guide.html#toJSON
// See: http://mongoosejs.com/docs/api.html#document_Document-toObject
recipeShema.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Recipe', recipeShema);
