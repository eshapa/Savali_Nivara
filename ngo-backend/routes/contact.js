const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/ContactMessage");

// POST: Save a new contact message
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, telephone, message } = req.body;
    const newMessage = new ContactMessage({ firstName, lastName, email, telephone, message });
    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send message. Please try again." });
  }
});

// GET: Fetch all messages (for admin)
router.get("/", async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages." });
  }
});

module.exports = router;
