const mongoose = require("mongoose");
// const Judge = mongoose.model("judges");
const User = require("./user");
const Judge = require("./judge");
// const Cont = require("./cont");
// const User = mongoose.model("users");
// console.log("judge conte", Contest);

const Schema = mongoose.Schema;

const CompetitionSchema = new Schema({
  name: { type: String },
  judge: { type: Schema.Types.ObjectId, ref: Judge }
});

const TurnamentSchema = new Schema({
  name: {
    type: String
    // required: true
  },
  date: {
    type: String
    // default: Date.now
    // required: true
  },
  logo: {
    type: String
  },
  sponsor1: {
    type: String
  },
  sponsor2: {
    type: String
  },
  sponsor3: {
    type: String
  },
  promoter: {
    // type: String
    type: Schema.Types.ObjectId,
    ref: User
  },
  facility: {
    type: String
  },
  judgeMain: { type: Schema.Types.ObjectId, ref: Judge },
  judgeCounting: { type: Schema.Types.ObjectId, ref: Judge },
  judgeRTS: { type: Schema.Types.ObjectId, ref: Judge },
  lzss: {
    type: String
  },
  tech: {
    type: String
  },
  competitions: [CompetitionSchema]
  // {
  //   name: { type: String },
  //   judge: { type: Schema.Types.ObjectId, ref: Judge }
  // }
  // ]
});

// global.TurnamentSchema =
//   global.TurnamentSchema || mongoose.model("turnaments", TurnamentSchema);
// module.exports = global.TurnamentSchema;

module.exports = mongoose.model("turnaments", TurnamentSchema);
// module.exports =
//   mongoose.models && mongoose.models.Judge
//     ? mongoose.models.Judge
//     : mongoose.model("users", JudgeSchema);

// module.exports = Judge;
