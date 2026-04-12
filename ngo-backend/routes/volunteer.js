const express = require("express");
const router = express.Router();
const Volunteer = require("../models/Volunteer");

// ✅ Submit Volunteer Application
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, interest, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ msg: "Please fill all required fields" });
    }

    const newVolunteer = new Volunteer({
      name,
      email,
      phone,
      interest,
      message
    });

    await newVolunteer.save();
    res.status(201).json({ msg: "Application submitted successfully! Our team will contact you soon." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get All Volunteers (Admin only)
router.get("/", async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
