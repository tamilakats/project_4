const express = require("express");

const Category = require("../models/category");
const Product = require("../models/product");
const checkAuth = require("../check-auth");
const jsonParser = express.json();
const router = express.Router();

//  вернуть checkAuth после "/categories"
// get categories
router.get("/categories", (req, res) => {
  Category.find({})
    .populate("product")
    .then(categories => {
      return res.status(200).json(categories);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});
// get products of categories
router.post("/products", (req, res) => {
  console.log(req.body._id);
  Product.find({ category: req.body._id })
    .populate("category")
    .then(products => {
      console.log(products);
      return res.status(200).json(products);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

router.post("/search", checkAuth, (req, res) => {
  if (req.body.newSearch) {
    Product.find({ product_name: req.body.newSearch })
    .then(product => {
      console.log(product);
      return res.status(200).json(product);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
  }
});

//POST http://localhost:3000/api/product
// create new product ***
router.post("/product", jsonParser, (req, res) => {
  const product = new Product({
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    category: {
      category_id: req.body.category.category_id,
      category_name: req.body.category.category_name
    }
  });
  product
    .save()
    .then(result => {
      res.status(201).json({
        message: "SUCCESS"
      });
    })
    .catch(err => {
      return res.status(500).json({ message: err });
    });
});

module.exports = router;
