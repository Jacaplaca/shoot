// const express = require("express");
// const router = express.Router();
const router = require("express-promise-router")();
const TurnamentController = require("../controllers/turnamentOpen");

router.route("/").get(TurnamentController.index);
router.route("/:id").get(TurnamentController.pickOne);

module.exports = router;
