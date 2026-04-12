const mongoose = require("mongoose");

const VolunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  interest: { type: String }, // e.g., Education, Health, etc.
  message: { type: String },
  status: { type: String, default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Volunteer", VolunteerSchema);
