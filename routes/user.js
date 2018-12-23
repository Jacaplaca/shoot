const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// const User = require("../models/User");
const mongoose = require("mongoose");
const User = mongoose.model("users");

router.get("/", function(req, res) {
  console.log("user get /");
  User.find()
    .populate("turnaments")
    // .populate("judges")
    // .populate("contests")
    // .populate("cont")
    // .select("name")
    // .populate({
    //   path: "contests",
    //   // Get friends of friends - populate the 'friends' array for every friend
    //   populate: { path: "judges" }
    // })
    .then(resp => res.status(200).json(resp))
    .catch(e => console.log(e));
});

router.post("/register", function(req, res) {
  // const { errors, isValid } = validateRegisterInput(req.body);
  console.log(req.body);

  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      console.log("jest juz");
      return res.status(400).json({
        email: "Email already exists"
      });
    } else {
      // const avatar = gravatar.url(req.body.email, {
      //   s: "200",
      //   r: "pg",
      //   d: "mm"
      // });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        adres: req.body.adres,
        logo: req.body.logo,
        www: req.body.www,
        rola: req.body.rola
        // contests: req.body.contest
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error("There was an error", err);
        else {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.error("There was an error", err);
            else {
              newUser.password = hash;
              newUser.save().then(user => {
                res.json(user);
              });
            }
          });
        }
      });
    }
  });
});

router.post("/login", (req, res) => {
  console.log("/loging", req.body);
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          rola: user.rola,
          avatar: user.avatar
        };
        jwt.sign(
          payload,
          "secret",
          {
            expiresIn: 3600
          },
          (err, token) => {
            if (err) console.error("There is some error in token", err);
            else {
              res.json({
                success: true,
                token: `Bearer ${token}`
              });
            }
          }
        );
      } else {
        errors.password = "Incorrect Password";
        return res.status(400).json(errors);
      }
    });
  });
});

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

// router.get("/promoter", (req, res, next) => {
//   console.log("promoter");
//   res.status(200).json({ aaa: 123 });
// });

module.exports = router;
