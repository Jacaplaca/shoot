// const express = require("express");
// const router = express.Router();
const router = require("express-promise-router")();
const JudgeController = require("../controllers/judge");

router
  .route("/")
  .get(JudgeController.index)
  .post(JudgeController.add);

module.exports = router;
