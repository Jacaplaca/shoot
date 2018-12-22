const mongoose = require("mongoose");
const Contest = require("./contest");
const Judge = require("./judge");
console.log("User, judge", Judge);
console.log("User, contest", Contest);

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  logo: {
    type: String
  },
  adres: {
    type: String
  },
  www: {
    type: String
  },
  rola: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  contests: [{ type: Schema.Types.ObjectId, ref: Contest }],
  judges: [{ type: Schema.Types.ObjectId, ref: Judge }]
});

global.UserSchema = global.UserSchema || mongoose.model("users", UserSchema);
console.log("userschema", global.UserSchema);
module.exports = global.UserSchema;

// module.exports = mongoose.model("users", UserSchema);
// module.exports =
//   mongoose.models && mongoose.models.User
//     ? mongoose.models.User
//     : mongoose.model("users", UserSchema);

// module.exports = User;
