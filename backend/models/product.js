const mongoose = require('mongoose');
mongoose.set('debug', true);

// const productCategorySchema = mongoose.Schema({
//   category_id: Number,
//   category_name: String
// });
// const productSchema = mongoose.Schema({
//   name: String,
//   quantity: Number,
//   price: String,
//   category: productCategorySchema
// });

// module.exports = mongoose.model('Product', productCategorySchema, "products.fruits");

// const productSchema = mongoose.Schema({
//   product_name: String,
//   quantity: Number,
//   price: String
// });

// const productCategorySchema = mongoose.Schema({
//     category_id: Number,
//     category_name: String,
//     product: productSchema,
//     product_2: productSchema
//   });

// module.exports = mongoose.model('Product', productCategorySchema, "products.bread");

// const productCategorySchema = mongoose.Schema({
//   category_name: String,
//   products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]
// });

const productSchema = mongoose.Schema({
  //category_id: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
  product_name: String,
  quantity: Number,
  price: String,
  picture: String
});

module.exports = mongoose.model('Product', productSchema, "products");
// module.exports = mongoose.model('Category', productCategorySchema, "categories");

