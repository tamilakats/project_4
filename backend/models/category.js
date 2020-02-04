const mongoose = require('mongoose');

const productCategorySchema = mongoose.Schema({
  category_name: String,
  product: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]
});

module.exports = mongoose.model('Category', productCategorySchema, "categories");
