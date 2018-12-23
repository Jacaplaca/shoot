// const User = require("../models/user");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
// const Player = require("../models/contest");
const Turnament = require("../models/turnament");
const Player = require("../models/player");
const User = require("../models/user");
// console.log("controller Turnament");
// const Judge = require("../models/judge");

module.exports = {
  index: async (req, res, next) => {
    Player.find()
      // .select({"name" 'judgeMain'})
      // .populate("promoter")
      // .populate("judgeMain")
      // .populate("judgeCounting")
      // .populate("judgeRTS")
      // .exec()
      // .populate("judgeMain")
      .then(response => {
        // console.log(response);
        res.status(200).json(response);
      });
  },

  add: async (req, res, next) => {
    const {
      turnament,
      name,
      surname,
      caliber,
      gun,
      scope,
      team,
      rank,
      club
    } = req.body;

    const newPlayer = new Player({
      turnament,
      name,
      surname,
      caliber,
      gun,
      scope,
      team,
      rank: rank.split(","),
      club
    });

    try {
      const addedPlayer = await Player.create(newPlayer);
      // console.log(addedPlayer);
      // const promoterUpdated = await User.update(
      //   { _id: promoter },
      //   { $push: { turnaments: addedPlayer._id } }
      // );
      // const promoterUpdated = await User.update(
      //   { _id: promoter },
      //   { $push: { contests: addedPlayer._id } }
      // );

      res.status(200).json({
        message: addedPlayer
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
