const Donation = require("../models/Donation");

// @desc    Create new donation
// @route   POST /api/donations
// @access  Private
const createDonation = async (req, res) => {
  try {
    const { type, details } = req.body;

    if (!type || !details) {
      return res.status(400).json({ msg: "Please provide donation type and details" });
    }

    const donation = new Donation({
      userId: req.user.id,
      type,
      details,
    });

    const createdDonation = await donation.save();
    res.status(201).json(createdDonation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get all donations (Admin)
// @route   GET /api/donations
// @access  Private/Admin
const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find({})
      .populate("userId", "name email")
      .sort("-createdAt");
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get logged in user donations
// @route   GET /api/donations/user
// @access  Private
const getUserDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ userId: req.user.id }).sort("-createdAt");
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update donation status (Admin)
// @route   PUT /api/donations/:id
// @access  Private/Admin
const updateDonationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const donation = await Donation.findById(req.params.id);

    if (donation) {
      donation.status = status || donation.status;
      const updatedDonation = await donation.save();
      res.json(updatedDonation);
    } else {
      res.status(404).json({ msg: "Donation not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDonation,
  getAllDonations,
  getUserDonations,
  updateDonationStatus,
};
