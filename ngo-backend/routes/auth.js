const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Admin = require("../models/Admin");

// ❌ Admin Signup (DISABLED FOR SECURITY)
router.post("/admin/signup", async (req, res) => {
  res.status(403).json({ msg: "Admin registration is disabled. Please contact system administrator." });
});

// ✅ User Signup
router.post("/user/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: "Please enter all fields" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: 'user'
    });

    await newUser.save();
    res.json({ msg: "User Signup successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Admin Login
router.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Restrict to single admin email as requested
    if (email !== 'savalinivara123@gmail.com') {
      return res.status(403).json({ msg: "Access denied. Only the authorized administrator can log in." });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ msg: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, role: admin.role, user: { id: admin._id, name: admin.name, email: admin.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Admin Change Password
router.put("/admin/change-password", async (req, res) => {
  try {
    // 1. Verify Token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token provided, authorization denied" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ msg: "Access denied. Admin only." });
    }

    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ msg: "Please provide both current and new password" });
    }

    const admin = await Admin.findById(decoded.id);
    if (!admin) return res.status(404).json({ msg: "Admin not found" });

    // 2. Verify current password
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect current password" });

    // 3. Hash and save new password
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(newPassword, salt);
    await admin.save();

    res.json({ msg: "Password changed successfully" });
  } catch (err) {
    console.error("Change Password Error:", err);
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ msg: "Invalid token" });
    }
    res.status(500).json({ error: err.message });
  }
});

// ✅ User Login
router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, role: 'user' });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, role: user.role, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;