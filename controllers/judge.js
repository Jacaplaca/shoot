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
    const { name, surname, judgeClass } = req.body;

    const newJudge = new Judge({
      name,
      surname,
      judgeClass
    });

    const judge = await newJudge.save();
    res.status(200).json(judge);
  },

  update: async (req, res, next) => {
    const { name, surname, judgeClass } = req.body;
    const updatedJudge = {
      name,
      surname,
      judgeClass
    };

    try {
      const result = await Judge.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updatedJudge }
      );
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
    }
  },

  pickOne: async (req, res, next) => {
    try {
      const result = await Judge.findById(req.params.id);
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
    }
  },

  remove: async (req, res, next) => {
    console.log(req.params.id);

    try {
      const removedJudge = await Judge.findByIdAndRemove(req.params.id)
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
