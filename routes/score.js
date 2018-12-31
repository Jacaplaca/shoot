// const express = require("express");
// const router = express.Router();
const router = require("express-promise-router")();
const ScoreController = require("../controllers/score");

router
  .route("/")
  // .get(ScoreController.index)
  .post(ScoreController.add);

// router.route("/remove/:id").post(ScoreController.remove);
// router.route("/:id").get(ScoreController.pickOne);

// router.route("/update/:id").post(ScoreController.update);

module.exports = router;
