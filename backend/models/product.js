const mongoose = require('mongoose');

const productCategorySchema = mongoose.Schema({
  category_id: Number,
  category_name: String
});
const productSchema = mongoose.Schema({
  name: String,
  quantity: String,
  price: Number,
  category: productCategorySchema
});


module.exports = mongoose.model('Product', productSchema);
