const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  product: Object,
  quantity: Number,
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart'},
});

module.exports = mongoose.model('Item', itemSchema);
