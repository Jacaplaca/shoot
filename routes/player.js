// const express = require("express");
// const router = express.Router();
const router = require("express-promise-router")();
const PlayerController = require("../controllers/player");

router
  .route("/")
  .get(PlayerController.index)
  .post(PlayerController.add);

router.route("/remove/:id").post(PlayerController.remove);
router.route("/:id").get(PlayerController.pickOne);

router.route("/update/:id").post(PlayerController.update);

router.route("/turnament/:turnamentId").get(PlayerController.pickTurnament);

module.exports = router;
