const router = require("express-promise-router")();
const EmailController = require("../controllers/email");

router
  .route("/")
  .post(EmailController.check)
  .get(EmailController.index);
// .post(EmailController.login);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const router = require("express-promise-router")();
// const PromoterController = require("../controllers/promoter");
//
// router
//   .route("/")
//   .get(PromoterController.index)
//   .post(PromoterController.check);
//
// module.exports = router;
