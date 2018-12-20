const User = require("../models/user");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;

module.exports = {
  check: async (req, res, next) => {
    // console.log(req.body);
    User.findOne({
      email: req.body.email
    }).then(user => res.status(200).json({ free: user === null }));
  },
  index: async (req, res, next) => {
    console.log(req.body);
    res.status(200).json({ aaa: 123 });
  }
};
