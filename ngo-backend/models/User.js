const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: { type: String, required: true },
  role: { type: String, default: 'admin' }
});

module.exports = mongoose.model("User", userSchema);