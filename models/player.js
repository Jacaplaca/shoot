const mongoose = require("mongoose");
// const Judge = mongoose.model("judges");
// const Judge = require("./judge");
// const Turnament = require("./");
// const User = require("./user");
const Turnament = mongoose.model("turnaments");
// console.log("judge conte", Contest);

const Schema = mongoose.Schema;
const PlayerSchema = new Schema({
  turnament: { type: Schema.Types.ObjectId, ref: Turnament },
  name: {
    type: String
    // required: true
  },
  surname: {
    type: String
  },
  caliber: {
    type: String
  },
  gun: {
    type: String
  },
  scope: {
    type: String
  },
  team: {
    type: String
  },
  rank: [
    {
      type: String
    }
  ],
  club: {
    type: String
  },
  competitions: [
    {
      competition: { type: String },
      competitionId: { type: String },
      score: { type: Number }
    }
  ]
});

// global.TurnamentSchema =
//   global.TurnamentSchema || mongoose.model("turnaments", TurnamentSchema);
// module.exports = global.TurnamentSchema;

module.exports = mongoose.model("players", PlayerSchema);
// module.exports =
//   mongoose.models && mongoose.models.Judge
//     ? mongoose.models.Judge
//     : mongoose.model("users", JudgeSchema);

// module.exports = Judge;
