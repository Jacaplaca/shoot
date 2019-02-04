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

router.route("/update/:id").post(TurnamentController.update);
router.route("/finish/:id").get(TurnamentController.finish);
router.route("/cancel/:id").get(TurnamentController.cancel);
router.route("/www/:id").get(TurnamentController.www);
router.route("/nowww/:id").get(TurnamentController.nowww);

module.exports = router;
