// const express = require("express");
// const router = express.Router();
const router = require("express-promise-router")();
const CompetitionController = require("../controllers/competition");

router
  .route("/")
  // .get(CompetitionController.index)
  .post(CompetitionController.add);

module.exports = router;
