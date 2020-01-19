const express = require("express");

const Product = require("../models/product");
const checkAuth = require("../check-auth");
const jsonParser = express.json();


const router = express.Router();

router.get("/products", (req, res) => {
  Product
    .find()
    .then(products => {
      return res.status(200).json(products);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});
//POST http://localhost:3000/api/product
router.post("/product", jsonParser, (req, res) => {
  const product = new Product({
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    category: {category_id: req.body.category.category_id, category_name: req.body.category.category_name}
  });
  product.save().then(result => {
    res.status(201).json({
      message: 'SUCCESS'
    });
  })
    .catch(err => {
      return res.status(500).json({message: err});
    });

});


module.exports = router;
