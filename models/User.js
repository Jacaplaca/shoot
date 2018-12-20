const mongoose = require("mongoose");

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
  }
});

global.UserSchema = global.UserSchema || mongoose.model("users", UserSchema);
module.exports = global.UserSchema;

// module.exports = mongoose.model("users", UserSchema);
// module.exports =
//   mongoose.models && mongoose.models.User
//     ? mongoose.models.User
//     : mongoose.model("users", UserSchema);

// module.exports = User;
