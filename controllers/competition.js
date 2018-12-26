// const Judge = require("../models/user");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
// const Judge = require("../models/judge");
// const Turnament = require("../models/turnament");

const mongoose = require("mongoose");
// const Judge = require("./judge");
// const mongoose = require("mongoose");
const Turnament = mongoose.model("turnaments");

module.exports = {
  // index: async (req, res, next) => {
  //   Judge.find()
  //     .populate("contests")
  //     .then(response => res.status(200).json(response));
  // },
  add: async (req, res, next) => {
    const { name, judge, turnament } = req.body;
    console.log("name", name);
    console.log("judge", judge);
    console.log("turnament", turnament);

    try {
      // const addedTurnament = await Turnament.create(newTurnament);
      // console.log(addedTurnament);
      const turnamentUpdated = await Turnament.update(
        { _id: turnament },
        { $push: { competitions: { name: name, judge } } }
      );
      // const promoterUpdated = await User.update(
      //   { _id: promoter },
      //   { $push: { contests: addedTurnament._id } }
      // );

      res.status(200).json({
        message: turnamentUpdated
      });
    } catch (e) {
      console.log("The raw response from Mongo was ", e);
    }

    //
    // const newJudge = new Judge({
    //   name,
    //   surname,
    //   judgeClass,
    //   contests: "5c1e6928d0568f42c84b78f1"
    // });
    //
    // const judge = await newJudge.save();
    // res.status(200).json(judge);
  }
};
