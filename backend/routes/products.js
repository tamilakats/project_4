const express = require("express");

const Product = require("../models/product");
const checkAuth = require("../check-auth");

const router = express.Router();

router.get("/products", checkAuth, (req, res) => {
  Product
    .find()
    // .select('name price quantity _id')
    // .exec()
    .then(products => {
      if (products.length < 1) {
        return res.status(404).json({
          message: `products not found...`
        });
      } else {
        return res.status(200).json(products);
      }
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

module.exports = router;
