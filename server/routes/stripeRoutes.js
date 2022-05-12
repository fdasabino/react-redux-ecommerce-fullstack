const express = require("express");
const router = express.Router();

//controllers
const { createPaymentIntent } = require("../controllers/stripeControllers");

//middlewares
const { authCheck } = require("../middlewares/authMiddlewares");

router.post("/create-payment-intent", authCheck, createPaymentIntent);

module.exports = router;
