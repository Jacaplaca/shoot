// const User = require("../models/user");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
// const Turnament = require("../models/contest");
const Turnament = require("../models/turnament");
const User = require("../models/user");
// console.log("controller Turnament");
// const Judge = require("../models/judge");

module.exports = {
  index: async (req, res, next) => {
    // console.log("/api/turnament/");

    // console.log("turnament req.user", loggedUser);
    const query = {};

    Turnament.find(query)
      // .select({"name" 'judgeMain'})
      .populate("promoter")
      .populate("judgeMain")
      .populate("judgeCounting")
      .populate("judgeRTS")
      .populate("competitions.judge")
      // .populate("judge")

      .exec()
      // .populate("judgeMain")
      .then(response => {
        // console.log(response);
        res.status(200).json(response);
      });
  },

  pickOne: async (req, res, nex) => {
    try {
      const result = await Turnament.findById(req.params.id)
        .populate("judgeMain")
        .populate("judgeCounting")
        .populate("judgeRTS")
        .populate("promoter");
      res.status(200).json([result]);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }
};
