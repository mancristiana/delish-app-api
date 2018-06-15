const mongoose = require('mongoose');

let ingredientSchema = mongoose.Schema({
  name: String,
  image: String
});

// See: http://mongoosejs.com/docs/guide.html#toJSON
// See: http://mongoosejs.com/docs/api.html#document_Document-toObject
ingredientSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    // modify the _id to id of every document before returning the result
    ret.id = ret._id;
    delete ret._id;
    return ret;
  }
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
