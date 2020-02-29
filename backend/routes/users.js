const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const checkAuth = require("../check-auth");

const router = express.Router();

router.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      userid: req.body.userid,
      email: req.body.email,
      password: hash,
      city: req.body.city,
      street: req.body.street,
      name: req.body.name,
      lastname: req.body.lastname
    });
    user.save()
      .then(result => {
        res.status(201).json({
          message: 'User created!',
          result: result
        });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  });
});

router.post("/login", (req, res,next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Authentication failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
      .then(result => {
        if (!result) {
          return res.status(401).json({
            message: "Authentication failed"
          });
        }
        const token = jwt.sign(
          {email: fetchedUser.email, userId: fetchedUser._id},
          'secret_this_should_be_longer',
          { expiresIn: "1h"}
        );
        res.status(200).json({
          token: token,
          expiresIn: 3600
        });
      })
      .catch(err => {
        console.log(err);
        return res.status(401).json({
          message: "Authentication failed"
        });
      })
    });

    // get user
    router.get('/user', checkAuth, (req, res, next) => {
      User.find({_id: req.userData.userId})
      .catch(err => {
        if (err) {
          return res.status(401).json({state: 'error', message: err.message});
      }
    })
      .then(result => {
        if (!result) {
          return res.status(401).json({ state: 'error', message: `No results!`});
        }
        return res.status(200).json({result });
      })
    });

module.exports = router;
