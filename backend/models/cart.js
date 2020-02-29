const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  // item: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
  quantity: Number
});

module.exports = mongoose.model('Cart', cartSchema);
