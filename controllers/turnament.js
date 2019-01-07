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

    const loggedUser = req.user;
    console.log("turnament req.user", loggedUser);

    let query;

    if (loggedUser.rola === "admin") {
      query = {};
    } else {
      query = { promoter: { _id: loggedUser._id } };
    }

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

  update: async (req, res, next) => {
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
      tech,
      sponsor1,
      sponsor2,
      sponsor3
    } = req.body;
    console.log(req.body);
    const updatedTurnament = {
      name,
      date,
      logo,
      promoter,
      facility,
      judgeMain,
      lzss,
      judgeCounting,
      judgeRTS,
      tech,
      sponsor1,
      sponsor2,
      sponsor3
    };

    try {
      const result = await Turnament.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updatedTurnament }
      );
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
    }
  },

  pickOne: async (req, res, nex) => {
    try {
      const result = await Turnament.findById(req.params.id)
        .populate("judgeMain")
        .populate("judgeCounting")
        .populate("judgeRTS")
        .populate("promoter");
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
      tech,
      sponsor1,
      sponsor2,
      sponsor3
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
      tech,
      sponsor1,
      sponsor2,
      sponsor3
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
