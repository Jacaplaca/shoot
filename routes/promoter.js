// const express = require("express");
// const router = express.Router();
const router = require("express-promise-router")();
const PromoterController = require("../controllers/promoter");

router
  .route("/")
  .get(PromoterController.index)
  .post(PromoterController.check);

router.route("/remove/:id").post(PromoterController.remove);
router.route("/:id").get(PromoterController.pickOne);

module.exports = router;
