const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
let cors = require("cors");

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1/productsstore",{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  } )
  .then(_ => console.log("connected to mongo"))
  .catch(err => console.log(err));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());


  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });

  app.use('*', (req, res, next) => {
    console.log(req.body);
    next();
  })


  app.use('/api/user', userRoutes);
  app.use('/api', productRoutes);

module.exports = app;
