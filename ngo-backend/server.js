const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");
const volunteerRoutes = require("./routes/volunteer");
const admissionRoutes = require("./routes/admission");
const donationRoutes = require("./routes/donationRoutes");
const aiRoutes = require("./routes/aiRoutes");
const path = require("path");

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/ai", aiRoutes);

// DB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Atlas Connected");
    
    // Start the server only after successful connection
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));