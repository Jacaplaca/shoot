// const express = require("express");
// const router = express.Router();
const router = require("express-promise-router")();
const ContestController = require("../controllers/contest");

router
  .route("/")
  .get(ContestController.index)
  .post(ContestController.add);

module.exports = router;
