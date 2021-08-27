const express = require("express");
const { RenderHomePage, RenderSuccessPage, RenderFailurePage } = require('../handlers/main.handler');

const router = express.Router();

router.get("/", RenderHomePage);
router.get("/success", RenderSuccessPage);
router.get("/failure", RenderFailurePage);

module.exports = router;