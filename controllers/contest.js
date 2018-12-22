// const User = require("../models/user");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
const User = require("../models/user");
const Contest = require("../models/contest");
// const Judge = require("../models/judge");

module.exports = {
  index: async (req, res, next) => {
    Contest.find()
      // .select({"name" 'judgeMain'})
      .populate("promoter")
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

    const newContest = new Contest({
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
      const addedContest = await Contest.create(newContest);
      console.log(addedContest);
      const promoterUpdated = await User.update(
        { _id: promoter },
        { $push: { contests: addedContest._id } }
      );
      // const promoterUpdated = await User.update(
      //   { _id: promoter },
      //   { $push: { contests: addedContest._id } }
      // );

      res.status(200).json({
        message: addedContest
      });
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
