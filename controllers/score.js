const Player = require("../models/player");

module.exports = {
  index: async (req, res, next) => {
    const loggedUser = req.user;
    console.log("turnament req.user", loggedUser);

    let query;

    if (loggedUser.rola === "admin") {
      query = {};
    } else {
      // query = { turnament: { promoter: loggedUser._id } };
      query = {};
    }

    Player.find(query)
      .populate("turnament")
      // .select({"name" 'judgeMain'})
      // .populate("promoter")
      // .populate("judgeMain")
      // .populate("judgeCounting")
      // .populate("judgeRTS")
      // .populate("judgeMain")
      .exec()
      .then(response => {
        // console.log(response);
        res.status(200).json(response);
      });
  },

  add: async (req, res, next) => {
    const { value, compId, playerId, turnament } = req.body;

    // const score = new Player({
    //   value,
    //   compId,
    //   playerId,
    //   turnament
    // });
    const score = { compId, score: value || 0 };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    console.log(req.body);

    try {
      const player = await Player.findOne({ _id: playerId });
      const competitions = player.competitions;
      const compInDB = competitions.filter(x => x.compId === compId);
      if (compInDB.length === 0) {
        try {
          const compCreated = await Player.update(
            { _id: playerId },
            { $push: { competitions: score || 0 } }
          );

          res.status(200).json({
            message: compCreated
          });
        } catch (e) {
          console.log("The raw response from Mongo was ", e);
        }
      } else {
        console.log(compInDB);

        try {
          const competitionUpdated = Player.findOneAndUpdate(
            // {
            //   _id: playerId,
            //   "comments.compId": compId
            // },
            // {
            //   $set: { "comments.$.score": score.score }
            // },
            // false
            // true
            { _id: playerId, "competitions.compId": compId },
            {
              $set: {
                "competitions.$.score": score.score || 0
              }
            }
          ).exec();

          res.status(200).json({
            message: competitionUpdated
          });
        } catch (e) {
          console.log("The raw response from Mongo was ", e);
        }
      }
    } catch (e) {}

    // try {
    //   const competitionUpdated = await Player.find(
    //     { _id: playerId, competitions: { compId } }
    //     // {
    //     //   $set: {
    //     //     "competitions.$": score
    //     //   }
    //     // },
    //     // options
    //   );
    //   console.log(competitionUpdated);
    //   res.status(200).json({
    //     message: competitionUpdated
    //   });
    // } catch (e) {
    //   console.log("The raw response from Mongo was ", e);
    // }

    // try {
    //   const turnamentUpdated = await Player.update(
    //     { _id: playerId },
    //     { $push: { competitions: score } }
    //   );
    //
    //   res.status(200).json({
    //     message: turnamentUpdated
    //   });
    // } catch (e) {
    //   console.log("The raw response from Mongo was ", e);
    // }

    // try {
    //   const addedPlayer = await Player.create(newPlayer);
    //   // console.log(addedPlayer);
    //   // const promoterUpdated = await User.update(
    //   //   { _id: promoter },
    //   //   { $push: { turnaments: addedPlayer._id } }
    //   // );
    //   // const promoterUpdated = await User.update(
    //   //   { _id: promoter },
    //   //   { $push: { contests: addedPlayer._id } }
    //   // );
    //
    //   res.status(200).json({
    //     message: addedPlayer
    //   });
    // } catch (e) {
    //   console.log("The raw response from Mongo was ", e);
    // }
    // //
    // //     author.stories.push(story1);
    // // author.save(callback);
    //
    // // User.create({ _id: promoter }, { $push: { contests: req.body } }, function(
    // //   // User.update({ _id: promoter }, { $push: { contests: req.body } }, function(
    // //   err,
    // //   raw
    // // ) {
    // //   if (err) return handleError(err);
    // //   console.log("The raw response from Mongo was ", raw);
    // // });
  },

  update: async (req, res, next) => {
    const {
      name,
      surname,
      turnament,
      caliber,
      gun,
      scope,
      team,
      club
    } = req.body;
    const updatedPlayer = {
      name,
      surname,
      turnament,
      caliber,
      gun,
      scope,
      team,
      club
    };

    try {
      const result = await Player.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updatedPlayer }
      );
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
    }
  },

  pickTurnament: async (req, res, next) => {
    console.log("pickTurnament", req.params.turnamentId);
    try {
      const result = await Player.find({
        turnament: req.params.turnamentId
      });
      // .populate("turnament");
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
    }
  },

  pickOne: async (req, res, next) => {
    try {
      const result = await Player.findById(req.params.id).populate("turnament");
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
    }
  },

  remove: async (req, res, next) => {
    console.log(req.params.id);

    try {
      const removedPlayer = await Player.findByIdAndRemove(req.params.id)
        .remove()
        .exec();
      res.status(200).json({
        message: removedPlayer
      });
    } catch (e) {
      console.log(e);
    }
  }
};
