const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const config = require("./db");
const path = require("path");

const fileUpload = require("express-fileupload");
const cors = require("cors");

const turnament = require("./routes/turnament");
const turnamentOpen = require("./routes/turnamentOpen");
const users = require("./routes/user");
const promoter = require("./routes/promoter");
const player = require("./routes/player");
const playerOpen = require("./routes/playerOpen");
// const contest = require("./routes/contest");
const judge = require("./routes/judge");
const competition = require("./routes/competition");
// const contest = require("./routes/contest");
const email = require("./routes/email");
const upload = require("./routes/upload");
const score = require("./routes/score");

mongoose
  .connect(
    config.DB,
    { useNewUrlParser: true }
  )
  .then(
    () => {
      console.log("Database is connected");
      console.log(__dirname);
      console.log(path.join(__dirname, "public"));
    },
    err => {
      console.log("Can not connect to the database" + err);
    }
  );

const app = express();
app.use(passport.initialize());
require("./passport")(passport);
// mongoose.connection.close();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(fileUpload());

const protectedRoute = passport.authenticate("jwt", { session: false });

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/api/users", users);
// app.use("/api/contests", contest);
app.use("/api/judges", protectedRoute, judge);
app.use("/api/competitions", competition);
app.use("/api/turnaments", protectedRoute, turnament);
app.use("/api/turnamentsopen", turnamentOpen);
app.use("/api/promoters", protectedRoute, promoter);
app.use("/api/players", protectedRoute, player);
app.use("/api/playersopen", playerOpen);
app.use("/api/email", protectedRoute, email);
app.use("/api/upload", protectedRoute, upload);
app.use("/api/score", score);

// app.get("/", function(req, res) {
//   res.send("hello");
// });

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
