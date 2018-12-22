// const Judge = require("../models/user");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
const Judge = require("../models/judge");

module.exports = {
  index: async (req, res, next) => {
    Judge.find()
      .populate("contests")
      .then(response => res.status(200).json(response));
  },
  add: async (req, res, next) => {
    const { name, surename, judgeClass } = req.body;

    const newJudge = new Judge({
      name,
      surename,
      judgeClass,
      contests: "5c1e6928d0568f42c84b78f1"
    });

    const judge = await newJudge.save();
    res.status(200).json(judge);
  }
};
