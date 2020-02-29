const mongoose = require('mongoose');
// mongoose.set('debug', true);

const productSchema = mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
  product_name: String,
  quantity: Number,
  price: Number,
  picture: String
});

module.exports = mongoose.model('Product', productSchema, "products");


