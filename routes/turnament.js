// const express = require("express");
// const router = express.Router();
const router = require("express-promise-router")();
const TurnamentController = require("../controllers/turnament");

router
  .route("/")
  .get(TurnamentController.index)
  .post(TurnamentController.add);

module.exports = router;