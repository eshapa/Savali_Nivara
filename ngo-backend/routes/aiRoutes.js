const express = require("express");
const router = express.Router();
const { getDonationSuggestions } = require("../controllers/aiController");

router.post("/donation-suggestions", getDonationSuggestions);

module.exports = router;
