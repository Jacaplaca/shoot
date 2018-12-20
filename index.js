const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const config = require("./db");
const path = require("path");

const fileUpload = require("express-fileupload");
const cors = require("cors");

const users = require("./routes/user");
const promoter = require("./routes/promoter");
const email = require("./routes/email");
const upload = require("./routes/upload");

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(fileUpload());

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/api/users", users);
app.use("/api/promoters", promoter);
app.use("/api/email", email);
app.use("/api/upload", upload);
// app.use("/public", express.static(__dirname + "/public"));
// app.use("/static", express.static("public"));
// app.use(express.static("public"));
// app.use(express.static("static"));
// require("./routes/promoter")(app);

app.get("/", function(req, res) {
  res.send("hello");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
