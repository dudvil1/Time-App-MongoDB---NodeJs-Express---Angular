const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("../../service/sendMail");

router.post("/signup", (req, res, next) => {
  //checking if email already exist
  console.log(req.body.email);
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Email already exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            //creating an instance of User model
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              name: req.body.name,
              user_type: "user",
              active: false
            });
            user
              .save()
              .then(result => {
                res.status(201).json({
                  message:
                    "User Created Successfully , Please check Your Mail To Verify Your Account"
                });
              })
              .catch(err => {
                res.status(500).json({
                  message: "Failure to create user",
                  error: err
                });
              });
            sendMail({
              mailReason: "verifyAccount",
              mailTo: req.body.email,
              uniqIdentifire: user._id,
              subject: "verify your account",
              html: `<p> please verify your account in: http://localhost:4200/login/${user._id}</p>`
            });
          }
        });
      }
    });
});

router.post("/admin-signup", (req, res, next) => {
  console.log(req.body.email);
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length > 1) {
        return res.status(409).json({
          message: "Email already exist"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              name: req.body.name,
              user_type: "admin"
              //times
            });
            user
              .save()
              .then(result => {
                res.status(201).json({
                  message: "Admin successfully created"
                });
              })
              .catch(err => {
                res.status(500).json({
                  message: "Admin creation failed",
                  error: err
                });
              });
          }
        });
      }
    });
});

router.post("/login", (req, res, next) => {
  console.log(req.body);

  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failure"
        });
      }
      if (user[0].active === false) {
        return res.status(401).json({
          message:
            "You Didn`t Verify Your Account Yet,Please Check Your Mail Box And Verify It"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            "secret",
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            user_type: user[0].user_type,
            user: user[0],
            token: token
          });
        }
        res.status(401).json({
          mesasge: "Auth Failure"
        });
      });
    })
    .catch(err => {
      console.log("BE-user.js - error in login()");
      res.status(500).json({
        error: err
      });
    });
});

router.patch("/activate-user", (req, res, next) => {
  console.log(req.body);
  User.find({ _id: req.body.id })
    .exec()
    .then(user => {
      console.log(user.length, user[0].active);
      if (user.length === 1 && user[0].active === false) {
        User.update({ _id: req.body.id }, { $set: { active: true } })
          .exec()
          .then(result => {
            res.status(200).json({
              message: "Your Account Is Active Now",
              user: user[0]
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.patch("/Forgot-Password", async (req, res, next) => {
  try {
    console.log("req:", req.body);
    let NewPassword = (((1 + Math.random()) * 0x10000) | 0)
      .toString(16)
      .substring(1);
    await User.findOne({ email: req.body.email })
      .exec()
      .then(user => {
        bcrypt.hash(NewPassword, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            //creating an instance of User model
            sendMail({
              mailReason: 'forgotPassword',
              mailTo: req.body.email,
              subject: "New Password For Your Account",
              html: `<p> Your New Password:${NewPassword}`
            });
            user.password = hash;
            user.save();
            res.status(201).json({
              message: "Change Password!,Please Check your Email"
            });
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Failure to create user",
          error: err
        });
      });
  } catch (error) {
    res.status(400).json({ status: "faild", message: error.message });
  }
});

module.exports = router;
