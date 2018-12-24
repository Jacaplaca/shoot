// const express = require("express");
// const router = express.Router();
const router = require("express-promise-router")();
const TurnamentController = require("../controllers/turnament");

router
  .route("/")
  .get(TurnamentController.index)
  .post(TurnamentController.add);

router.route("/remove/:id").post(TurnamentController.remove);
router.route("/:id").get(TurnamentController.pickOne);

module.exports = router;
