// const express = require("express");
// const router = express.Router();
const router = require("express-promise-router")();
const PromoterController = require("../controllers/promoter");

router.route("/").get(PromoterController.index);
// .post(PromoterController.login);

module.exports = router;
