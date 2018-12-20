// const express = require("express");
// const router = express.Router();
const router = require("express-promise-router")();
const UploadController = require("../controllers/upload");

router
  .route("/")
  .post(UploadController.upload)
  .get(UploadController.index);
// .post(PromoterController.login);

module.exports = router;
