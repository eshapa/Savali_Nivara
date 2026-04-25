const express = require("express");
const router = express.Router();
const {
  createDonation,
  getAllDonations,
  getUserDonations,
  updateDonationStatus,
  getDonationStats,
} = require("../controllers/donationController");
const { protect, admin } = require("../middleware/auth");

// Routes
router.get("/stats", protect, getDonationStats); // Simplified for debug (removed admin)
router.get("/user", protect, getUserDonations);
router.get("/", protect, admin, getAllDonations);
router.post("/", protect, createDonation);
router.put("/:id", protect, admin, updateDonationStatus);

module.exports = router;
