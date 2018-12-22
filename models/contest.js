const mongoose = require("mongoose");
// const Judge = require("./judge");
const User = require("./user");

const Schema = mongoose.Schema;

const ContestSchema = new Schema({
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
  promoter: { type: Schema.Types.ObjectId, ref: User },
  facility: {
    type: String
  },
  // judgeMain: { type: Schema.Types.ObjectId, ref: Judge },
  // judgeCounting: { type: Schema.Types.ObjectId, ref: Judge },
  // judgeRTS: { type: Schema.Types.ObjectId, ref: Judge },
  lzss: {
    type: String
  },
  tech: {
    type: String
  }
});

global.ContestSchema =
  global.ContestSchema || mongoose.model("contests", ContestSchema);
console.log("contschema", global.ContestSchema);
module.exports = global.ContestSchema;

// module.exports = mongoose.model("contests", ContestSchema);
// module.exports =
//   mongoose.models && mongoose.models.Contest
//     ? mongoose.models.Contest
//     : mongoose.model("users", ContestSchema);

// module.exports = Contest;
