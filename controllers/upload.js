// const User = require("../models/user");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
const path = require("path");
const milliseconds = new Date().getTime();
// var im = require("imagemagick");
var sizeOf = require("image-size");
// var Image = require("node-webgl").Image;

module.exports = {
  upload: (req, res, next) => {
    let uploadFile = req.files.file;
    console.log(req.files.file);

    var dimensions = sizeOf(uploadFile.data);
    // console.log(dimensions.width, dimensions.height);
    const width = dimensions.width;
    const height = dimensions.height;
    console.log(width);
    console.log(height);
    // ${width}x${height}
    // im.identify(req.files.file, function(err, features) {
    //   if (err) throw err;
    //   console.log("Shot at " + features);
    // });
    // img = new Image();
    // // img.onload = function() {
    // //     alert(this.width + " " + this.height);
    // // };
    // // img.onerror = function() {
    // //     alert( "not a valid file: " + file.type);
    // // };
    // img.src = uploadFile;
    // console.log("rozmiar obrazka", img.height);

    // console.log("controller upload file ", req.files);
    const fileName = req.files.file.name;
    const newFileName = `${width}x${height}_${milliseconds}_${
      fileName.split(".")[0]
    }.${fileName.split(".")[1]}`;
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
