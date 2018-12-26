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
  pickOne: async (req, res, nex) => {
    try {
      const result = await User.findById(req.params.id);
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
    }
  },
  check: async (req, res, next) => {
    console.log(req.body);
    res.status(200).json({ aaa: 123 });
  },
  remove: async (req, res, next) => {
    console.log(req.params.id);

    try {
      const removedJudge = await User.findByIdAndRemove(req.params.id)
        .remove()
        .exec();
      res.status(200).json({
        message: removedJudge
      });
    } catch (e) {
      console.log(e);
    }
  }
};
