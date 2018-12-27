// const User = require("../models/user");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
const path = require("path");
const milliseconds = new Date().getTime();

module.exports = {
  upload: (req, res, next) => {
    let uploadFile = req.files.file;
    console.log("controller upload file ");
    const fileName = req.files.file.name;
    const newFileName = `${milliseconds}.${fileName.split(".")[1]}`;
    uploadFile.mv(
      path.join(__dirname, `/../client/src/images/${newFileName}`),
      function(err) {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        console.log("upload", newFileName);
        // res.status(200).json({
        //   file: `images/${newFileName}`
        // });
        res.json({
          file: `images/${newFileName}`
        });
      }
    );
    // res.status(200).json({
    //   file: `images/${newFileName}`
    // });
  },

  index: async (req, res, next) => {
    console.log(__dirname);
    res.status(200).json({
      adres: __dirname,
      wyzej: path.join(__dirname, "/../client/public/images/foo.bar")
    });
  }
};
