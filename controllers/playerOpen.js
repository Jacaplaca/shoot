// const User = require("../models/user");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
async = require("async");
// const Player = require("../models/contest");
// const Turnament = require("../models/turnament");
const Player = require("../models/player");
// const User = require("../models/user");

// console.log("controller Turnament");
// const Judge = require("../models/judge");

module.exports = {
  pickTurnament: async (req, res, next) => {
    const id = req.params.turnamentId;
    console.log("pickTurnament open", id);
    try {
      const result = await Player.find({
        turnament: id
      });
      let anonimization = [];
      // .populate("turnament");
      result.map(x => {
        anonimization.push(
          Object.assign(x, {
            name: x.rodo ? x.name : "rodo",
            surname: x.rodo ? x.surname : "rodo"
          })
        );
      });
      id ? res.status(200).json(anonimization) : res.status(200).json({});
    } catch (e) {
      console.log(e);
    }
  }
};
