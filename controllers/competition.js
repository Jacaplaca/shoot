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
      const turnamentUpdated = await Turnament.update(
        { _id: turnament },
        { $push: { competitions: { name: name, judge } } }
      );

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
  },

  update: async (req, res, next) => {
    console.log("competition update", req.body);

    const { name, judge, turnament } = req.body;
    const { competition } = req.params.id;
    console.log("name", name);
    console.log("judge", judge);
    console.log("turnament", turnament);
    console.log("req.params.id", req.params.id);
    // console.log("competition", competition);

    try {
      // const turnamentUpdated = await Turnament.update(
      //   { _id: turnament, "competitions._id": competition },
      //   {
      //     $set: {
      //       "competitions.$": { name, judge }
      //     }
      //   }
      // );
      const competitionUpdated = Turnament.findOneAndUpdate(
        { "competitions._id": req.params.id },
        {
          $set: {
            "competitions.$": { name, judge }
          }
        }
      ).exec();
      // .exec(function(err, leads) {
      //   console.log(leads);
      // });

      res.status(200).json({
        message: competitionUpdated
      });
    } catch (e) {
      console.log("The raw response from Mongo was ", e);
    }

    // const { name, surname, judgeClass } = req.body;
    // const updatedJudge = {
    //   name,
    //   surname,
    //   judgeClass
    // };
    //
    // try {
    //   const result = await Judge.findOneAndUpdate(
    //     { _id: req.params.id },
    //     { $set: updatedJudge }
    //   );
    //   res.status(200).json(result);
    // } catch (e) {
    //   console.log(e);
    // }
  },

  pickOne: async (req, res, next) => {
    console.log("pickTurnament", req.params.id);

    try {
      // const result = await Turnament.findOne(
      //   { _id: "5c234a5c5049fd1fcc07a146" },
      //   { competitions: [{ _id: req.params.id }] }
      // );
      // const result = await Turnament.competitions._id(req.params.id);
      const result = await Turnament.findOne({
        "competitions._id": req.params.id
      }).populate("competitions.judge");
      // console.log("competitions pick one", result);
      const competition = result.competitions.filter(
        competition => competition._id.toString() === req.params.id
      );
      // .populate("turnament");
      // console.log("competitions pick one", competition);
      res.status(200).json(competition[0]);
    } catch (e) {
      console.log(e);
    }
  },

  pickTurnament: async (req, res, next) => {
    // try {
    //   const result = await Judge.findById(req.params.id);
    //   res.status(200).json(result);
    // } catch (e) {
    //   console.log(e);
    // }
  },

  remove: async (req, res, next) => {
    console.log("remove competition", req.params.id);
    //
    try {
      const removedCompetition = await Turnament.findOne(
        { "competitions._id": req.params.id },
        function(err, result) {
          console.log(result);
          result.competitions.id(req.params.id).remove();
          // .exec();
          result.save();
        }
      );

      // const removedCompetition = await Turnament.competitions
      //   .id(req.params.id)
      //   .remove();
      // Turnament.save(function(err) {
      //   if (err) return handleError(err);
      //   console.log("the sub-doc was removed");
      // });

      // const removedCompetition = await Turnament.findOneAndRemove({
      //   "competitions._id": req.params.id
      // });
      // // .remove()
      // // .exec();
      res.status(200).json({
        message: removedCompetition
      });
    } catch (e) {
      console.log(e);
    }
  }
};
