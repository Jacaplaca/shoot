// const express = require("express");
// const router = express.Router();
const router = require("express-promise-router")();
const JudgeController = require("../controllers/judge");

router
  .route("/")
  .get(JudgeController.index)
  .post(JudgeController.add);

router.route("/remove/:id").post(JudgeController.remove);
router.route("/:id").get(JudgeController.pickOne);

router.route("/update/:id").post(JudgeController.update);

module.exports = router;
