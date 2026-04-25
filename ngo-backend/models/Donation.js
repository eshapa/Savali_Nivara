const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["clothes", "food", "money", "essentials"],
    required: true,
  },
  details: {
    amount: Number,
    items: String, // Description of clothes/food/essentials
    quantity: String,
    notes: String,
  },
  branch: {
    type: String,
  },
  deliveryMode: {
    type: String,
  },
  condition: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "completed", "cancelled"],
    default: "pending",
  },
  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
  processedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Donation", donationSchema);
