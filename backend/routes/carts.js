const express = require("express");
const mongoose = require("mongoose");

const checkAuth = require("../check-auth");
const router = express.Router();
const Cart = require("../models/cart");
const Item = require("../models/item");
const Order = require("../models/order");

// get cart of authenticated user
router.post("/cart", checkAuth, (req, res, next) => {
  Cart.findOne({ user: req.userData.userId })
    //.populate("user")
    .catch(err => {
      if (err) {
        return res.status(401).json({ state: "error", message: err.message });
      }
    })
    .then(result => {
      if (!result) {
        return res
          .status(401)
          .json({ state: "error", message: `No results for cart` });
      }
      return res.status(200).json({ result });
    });
});

// add cart
router.post("/addcart", checkAuth, (req, res, next) => {
  const cart = new Cart({
    user: req.userData.userId,
    quantity: "0"
  });
  cart
    .populate("user")
    .save()
    .then(cart => {
      return res.status(200).json({ cart });
    })
    .catch(err => {
      return res.status(500).json({ state: "error", message: err.message });
    });
});

// delete cart
router.post("/deletecart", checkAuth, (req, res, next) => {
  Cart.deleteOne({ _id: req.body._id })
    .then(res => {
      return res.json({ message: "cart deleted" });
    })
    .catch(err => {
      return res.json({ message: err.message });
    });
});

// get items
router.post("/items", checkAuth, (req, res, next) => {
  console.log(req.body._id);
  Item.find({ cart: req.body._id })
    // .populate('product','cart')
    .then(items => {
      return res.status(200).json({ items });
    })
    .catch(err => {
      return res.status(500).json({ message: `No results!` });
    });
});

// add new item

router.post("/additem", checkAuth, (req, res, next) => {
  const item = new Item({
    product: req.body.product,
    quantity: req.body.quantity,
    cart: req.body.cart
  });
  item
    .populate("product", "cart")
    .save()
    .then(res => {
      return res.json({ state: "success", message: "new item added" });
    })
    .catch(err => {
      return res.json({ state: "error", message: err.message });
    });
});

// delete item
router.post("/deleteitem", checkAuth, (req, res, next) => {
  console.log(req.body._id);
  Item.deleteOne({ _id: req.body._id })
    .then(res => {
      return res.json({ message: "item deleted" });
    })
    .catch(err => {
      return res.json({ message: err.message });
    });
});

// add order

router.post("/addorder", checkAuth, (req, res, next) => {
  const order = new Order({
    user: req.body.user,
    cart: req.body.cart,
    received_city: req.body.received_city,
    received_street: req.body.received_street,
    received_date: req.body.received_date,
    received_card: req.body.received_card,
    total_price: req.body.total_price
  });
  order
    .populate("user", "cart")
    .save()
    Cart.deleteOne({ _id: req.body.cart })
    Item.deleteMany({ cart: req.body.cart})
    .then(res => {
      return res.json({ state: "success", message: "new order added" });
    })
    .catch(err => {
      return res.json({ state: "error", message: err.message });
    });
});

//all  items of one cart
// ***

// change quantity of item
// разобраться

module.exports = router;
