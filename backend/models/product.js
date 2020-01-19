const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  quantity: String,
  price: String
});

// let Product = mongoose.model('Product', productSchema, "products");

module.exports = mongoose.model('Products', productSchema, "products.vegetables");
// module.exports = mongoose.model('Products', productSchema, "products.fruits");

// let eggplant = new Product ({
//   name: 'eggplant',
//   quantity: '100',
//   price: '5.90₪'
// });

// eggplant.save(function(err, eggplant){
//   if (err) return console.error(err);
//   console.log(eggplant);
// })

// Product.find(function (err, products) {
//   if (err) return console.error(err);
//   console.log(products);
// })

