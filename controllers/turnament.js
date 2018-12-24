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
    Turnament.find()
      // .select({"name" 'judgeMain'})
      // .populate("promoter")
      .populate("judgeMain")
      .populate("judgeCounting")
      .populate("judgeRTS")
      // .exec()
      // .populate("judgeMain")
      .then(response => {
        // console.log(response);
        res.status(200).json(response);
      });
  },

  pickOne: async (req, res, nex) => {
    try {
      const result = await Turnament.findById(req.params.id);
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
    }
  },

  remove: async (req, res, next) => {
    console.log(req.params.id);

    try {
      const removedTurnament = await Turnament.findByIdAndRemove(req.params.id)
        .remove()
        .exec();
      res.status(200).json({
        message: removedTurnament
      });
    } catch (e) {
      console.log(e);
    }
  },

  add: async (req, res, next) => {
    const {
      name,
      date,
      logo,
      promoter,
      facility,
      judgeMain,
      lzss,
      judgeCounting,
      judgeRTS,
      tech
    } = req.body;

    const newTurnament = new Turnament({
      name,
      date,
      logo,
      promoter,
      facility,
      judgeMain,
      lzss,
      judgeCounting,
      judgeRTS,
      tech
    });

    try {
      const addedTurnament = await Turnament.create(newTurnament);
      console.log(addedTurnament);
      const promoterUpdated = await User.update(
        { _id: promoter },
        { $push: { turnaments: addedTurnament._id } }
      );
      res.status(200).json(addedTurnament);
      // const promoterUpdated = await User.update(
      //   { _id: promoter },
      //   { $push: { contests: addedTurnament._id } }
      // );
    } catch (e) {
      console.log("The raw response from Mongo was ", e);
    }
    //
    //     author.stories.push(story1);
    // author.save(callback);

    // User.create({ _id: promoter }, { $push: { contests: req.body } }, function(
    //   // User.update({ _id: promoter }, { $push: { contests: req.body } }, function(
    //   err,
    //   raw
    // ) {
    //   if (err) return handleError(err);
    //   console.log("The raw response from Mongo was ", raw);
    // });
  }
};
