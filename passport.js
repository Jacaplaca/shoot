const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
require("dotenv").config();
// const User = require("./models/user");
const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_COOKIE;

module.exports = passport => {
  passport.use(
    new JWTStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            // console.log("passport ", user);
            return done(null, user);
          }
          return done(null, false);
        })
        // .then(() => mongoose.connection.close())
        .catch(err => console.error(err));
    })
  );
};
