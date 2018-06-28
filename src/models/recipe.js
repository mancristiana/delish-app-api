const mongoose = require('mongoose');

const unitsEnum = { type: String, enum: ['g', 'ml'] };
let recipeShema = mongoose.Schema({
  name: String,
  image: String,
  time: Date,
  servings: Number,
  link: String,
  instructions: [String],
  ingredients: [
    {
      ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient'
      },
      quantity: Number,
      unit: unitsEnum
    }
  ] //to be changed to proper data model
});

// See: http://mongoosejs.com/docs/guide.html#toJSON
// See: http://mongoosejs.com/docs/api.html#document_Document-toObject
recipeShema.set('toJSON', {
  transform: function(doc, ret, options) {
    //modify the _id to id of every document before returning the result as per the queen's request
    ret.id = ret._id;
    delete ret._id;
    //Mongoose adds version key, see: http://mongoosejs.com/docs/guide.html#versionKey
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Recipe', recipeShema);
