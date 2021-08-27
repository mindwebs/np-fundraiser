const express = require("express");
const paymentHandler = require("../handlers/payment.handler");

const router = express.Router();

router.post("/", paymentHandler.confirmPaymentIntent);
router.post("/webhook", paymentHandler.stripeWebhook);

module.exports = router;
