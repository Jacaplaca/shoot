// const express = require("express");
// const router = express.Router();
const router = require("express-promise-router")();
const CompetitionController = require("../controllers/competition");

router
  .route("/")
  // .get(CompetitionController.index)
  .post(CompetitionController.add);

router.route("/remove/:id").post(CompetitionController.remove);
router.route("/:id").get(CompetitionController.pickOne);

router.route("/update/:id").post(CompetitionController.update);

module.exports = router;
