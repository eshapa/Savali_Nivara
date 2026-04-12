const express = require("express");
const router = express.Router();
const {
  createDonation,
  getAllDonations,
  getUserDonations,
  updateDonationStatus,
} = require("../controllers/donationController");
const { protect, admin } = require("../middleware/auth");

router.route("/")
  .post(protect, createDonation)
  .get(protect, admin, getAllDonations);

router.get("/user", protect, getUserDonations);

router.put("/:id", protect, admin, updateDonationStatus);

module.exports = router;
