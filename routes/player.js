// const express = require("express");
// const router = express.Router();
const router = require("express-promise-router")();
const PlayerController = require("../controllers/player");

router
  .route("/")
  .get(PlayerController.index)
  .post(PlayerController.add);

module.exports = router;
