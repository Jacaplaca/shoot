// const User = require("../models/user");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
const User = require("../models/user");

module.exports = {
  index: async (req, res, next) => {
    const loggedUser = req.user;
    // console.log("promoters req.user", loggedUser);

    let query;

    if (loggedUser.rola === "admin") {
      query = { rola: "promoter" };
    } else {
      query = { rola: "promoter", _id: loggedUser._id };
    }

    User.find(query).then(response => res.status(200).json(response));
  },

  pickOne: async (req, res, nex) => {
    try {
      const result = await User.findById(req.params.id);
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
    }
  },

  update: async (req, res, next) => {
    const { name, email, adres, logo, www } = req.body;
    const updatedPromoter = {
      name,
      email,
      adres,
      logo,
      www
    };
    // console.log("updatre params", req.params.id);

    try {
      const result = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updatedPromoter }
      );
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
    }
  },

  check: async (req, res, next) => {
    // console.log(req.body);
    res.status(200).json({ aaa: 123 });
  },

  remove: async (req, res, next) => {
    // console.log(req.params.id);

    try {
      const removedJudge = await User.findByIdAndRemove(req.params.id)
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
