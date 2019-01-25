// const express = require("express");
// const router = express.Router();
const router = require("express-promise-router")();
const PlayerController = require("../controllers/playerOpen");

router.route("/turnament/:turnamentId").get(PlayerController.pickTurnament);

module.exports = router;
