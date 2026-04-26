const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");

    const email = "savalinivara123@gmail.com";
    const password = "savali123";

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check if admin exists
    let admin = await Admin.findOne({ email });

    if (admin) {
      console.log("Admin with this email already exists. Updating password...");
      admin.password = hashedPassword;
      await admin.save();
      console.log("Admin password updated successfully.");
    } else {
      console.log("Creating new Admin...");
      // Remove other admins if they exist to keep it single admin
      await Admin.deleteMany({});
      
      admin = new Admin({
        name: "Savali Nivara Admin",
        email: email,
        password: hashedPassword,
        role: "admin"
      });
      await admin.save();
      console.log("New Admin created successfully.");
    }

    mongoose.disconnect();
  } catch (err) {
    console.error("Error:", err);
    mongoose.disconnect();
  }
}

seedAdmin();
