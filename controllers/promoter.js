// const User = require("../models/user");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
const User = require("../models/user");

module.exports = {
  index: async (req, res, next) => {
    User.find({
      rola: "promoter"
    }).then(response => res.status(200).json(response));
  },
  check: async (req, res, next) => {
    console.log(req.body);
    res.status(200).json({ aaa: 123 });
  }
};
