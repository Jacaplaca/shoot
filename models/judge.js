const mongoose = require("mongoose");
// const Cont = require("./cont");
// const Turnament = require("./turnament");
// const Turnament = mongoose.model("turnaments");
// console.log("judge, turnament", Turnament);
// console.log("judge conte", Contest);

const Schema = mongoose.Schema;

const JudgeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  surename: {
    type: String,
    required: true
  },
  judgeClass: {
    type: String,
    required: true
  }
  // contests: [{ type: Schema.Types.ObjectId, ref: Contest }]
});
//
// global.JudgeSchema =
//   global.JudgeSchema || mongoose.model("judges", JudgeSchema);
// module.exports = global.JudgeSchema;

module.exports = mongoose.model("judges", JudgeSchema);
// module.exports =
//   mongoose.models && mongoose.models.Judge
//     ? mongoose.models.Judge
//     : mongoose.model("users", JudgeSchema);

// module.exports = Judge;
