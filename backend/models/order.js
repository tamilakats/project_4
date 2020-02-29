const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart'},
  received_city: String,
  received_street: String,
  received_date: Date,
  received_card: Number,
  total_price: Number,
  // для кабалы
  order_date: Date,
  products: Array,
  user_name: String
});



module.exports = mongoose.model('Order', orderSchema, "orders");
