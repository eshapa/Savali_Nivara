const mongoose = require("mongoose");
require("dotenv").config({ path: "./ngo-backend/.env" });
const Donation = require("./ngo-backend/models/Donation");
const User = require("./ngo-backend/models/User");

async function checkDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    
    const count = await Donation.countDocuments();
    console.log(`Total Donations: ${count}`);
    
    if (count > 0) {
      const sample = await Donation.findOne().populate("userId");
      console.log("Sample Donation:", JSON.stringify(sample, null, 2));
    } else {
      console.log("No donations found in DB.");
    }
    
    await mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

checkDB();
