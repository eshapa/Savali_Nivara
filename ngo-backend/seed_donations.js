const mongoose = require("mongoose");
require("dotenv").config();
const Donation = require("./models/Donation");
const User = require("./models/User");

async function seedDonations() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    
    // Find or create a user to associate with donations
    let user = await User.findOne();
    if (!user) {
      user = new User({
        name: "Test Donor",
        email: "test@example.com",
        password: "hashed_password",
        role: "user"
      });
      await user.save();
    }

    const sampleDonations = [
      {
        userId: user._id,
        type: "money",
        details: { amount: 5000, notes: "Support for medicine" },
        branch: "Pimpri Center",
        status: "pending"
      },
      {
        userId: user._id,
        type: "clothes",
        details: { items: "Winter Jackets", quantity: "10 pairs" },
        branch: "Rajuru Center",
        status: "approved",
        condition: "New"
      },
      {
        userId: user._id,
        type: "food",
        details: { items: "Rice and Pulses", quantity: "50 kg" },
        branch: "YCM Center",
        status: "completed",
        deliveryMode: "drop-off"
      }
    ];

    await Donation.insertMany(sampleDonations);
    console.log("Successfully seeded 3 sample donations!");
    
    await mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

seedDonations();
