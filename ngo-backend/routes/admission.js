const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const PimpriAdmission = require("../models/PimpriAdmission");
const RajguruAdmission = require("../models/RajguruAdmission");
const YCMAdmission = require("../models/YCMAdmission");
const PimpriDischarge = require("../models/PimpriDischarge");
const RajguruDischarge = require("../models/RajguruDischarge");
const YCMDischarge = require("../models/YCMDischarge");

// Helper to get the correct model
const getModel = (branchId, isDischarge = false) => {
  const id = Number(branchId);
  if (isDischarge) {
    if (id === 1) return PimpriDischarge;
    if (id === 2) return RajguruDischarge;
    if (id === 3) return YCMDischarge;
  } else {
    if (id === 1) return PimpriAdmission;
    if (id === 2) return RajguruAdmission;
    if (id === 3) return YCMAdmission;
  }
  return null;
};

// Configure Multer for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Error: File upload only supports images and PDFs!"));
  }
});

// ✅ Create Admission (Multiple files)
router.post("/", upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'pdf', maxCount: 1 },
  { name: 'signature', maxCount: 1 }
]), async (req, res) => {
  try {
    const admissionData = { ...req.body };
    const branchId = Number(admissionData.branchId);
    if (admissionData.branchId) admissionData.branchId = branchId;

    const Model = getModel(branchId);
    if (!Model) return res.status(400).json({ error: "Invalid branch ID" });
    
    // Add file paths to data if they exist
    if (req.files) {
      if (req.files.photo) admissionData.photo = req.files.photo[0].path.replace(/\\/g, "/");
      if (req.files.pdf) admissionData.pdf = req.files.pdf[0].path.replace(/\\/g, "/");
      if (req.files.signature) admissionData.signature = req.files.signature[0].path.replace(/\\/g, "/");
    }

    const newAdmission = new Model(admissionData);
    await newAdmission.save();
    
    res.status(201).json({ msg: "Admission record created successfully", admission: newAdmission });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get Admissions (Filter by branchId or Get All)
router.get("/", async (req, res) => {
  try {
    const { branchId, status, limit } = req.query;
    const filter = {};
    if (status) filter.status = status;

    if (branchId) {
      const Model = getModel(branchId, status === "discharged");
      if (!Model) return res.status(400).json({ error: "Invalid branch ID" });
      
      let query = Model.find(filter).sort({ updatedAt: -1 });
      if (limit) query = query.limit(Number(limit));
      const records = await query;
      return res.json(records);
    } else {
      // Global query (Recent Activity) - Query all 3 and merge
      // If status is discharged, search ONLY in discharge collections
      // If status is admitted, search ONLY in admission collections
      // If no status, maybe search both? Usually GET / is for recent activity.
      const models = status === "discharged" 
        ? [PimpriDischarge, RajguruDischarge, YCMDischarge]
        : [PimpriAdmission, RajguruAdmission, YCMAdmission];

      const [m1, m2, m3] = await Promise.all(models.map(M => 
        M.find(filter).sort({ updatedAt: -1 }).limit(Number(limit) || 10)
      ));

      let allRecords = [...m1, ...m2, ...m3]
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      
      if (limit) allRecords = allRecords.slice(0, Number(limit));
      res.json(allRecords);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get Stats for Dashboard (Combined)
router.get("/stats", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const aggregateBranch = async (branchId) => {
      const AdmissionModel = getModel(branchId, false);
      const DischargeModel = getModel(branchId, true);

      const [admissionStats, dischargeStats] = await Promise.all([
        AdmissionModel.aggregate([
          { $match: { status: "admitted" } },
          {
            $group: {
              _id: null,
              active: { $sum: 1 },
              todayAdmissions: {
                $sum: { $cond: [{ $gte: ["$createdAt", today] }, 1, 0] }
              },
              male: {
                $sum: { $cond: [{ $eq: ["$gender", "Male"] }, 1, 0] }
              },
              female: {
                $sum: { $cond: [{ $eq: ["$gender", "Female"] }, 1, 0] }
              }
            }
          }
        ]),
        DischargeModel.aggregate([
          { $match: { status: "discharged" } },
          {
            $group: {
              _id: null,
              discharged: { $sum: 1 },
              todayDischarges: {
                $sum: { $cond: [{ $gte: ["$updatedAt", today] }, 1, 0] }
              }
            }
          }
        ])
      ]);

      const a = admissionStats[0] || { active: 0, todayAdmissions: 0, male: 0, female: 0 };
      const d = dischargeStats[0] || { discharged: 0, todayDischarges: 0 };

      return {
        _id: branchId,
        total: a.active + d.discharged,
        active: a.active,
        discharged: d.discharged,
        todayAdmissions: a.todayAdmissions,
        todayDischarges: d.todayDischarges,
        male: a.male,
        female: a.female
      };
    };

    const stats = await Promise.all([
      aggregateBranch(1),
      aggregateBranch(2),
      aggregateBranch(3)
    ]);

    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Discharge Admission
router.put("/:id/discharge", async (req, res) => {
  try {
    const { branchId, dischargeDetails } = req.body;
    const AdmissionModel = getModel(branchId, false);
    const DischargeModel = getModel(branchId, true);
    if (!AdmissionModel || !DischargeModel) return res.status(400).json({ error: "Branch ID required for discharge" });
    
    // 1. Find the admission record
    const admissionRecord = await AdmissionModel.findById(req.params.id);
    if (!admissionRecord) return res.status(404).json({ msg: "Admission record not found" });

    // 2. Prepare discharge data (copy from admission)
    const dischargeData = admissionRecord.toObject();
    delete dischargeData._id; // Remove the old ID to let MongoDB generate a new one
    dischargeData.status = "discharged";
    dischargeData.dischargeDetails = dischargeDetails;

    // 3. Save to discharge collection
    const newDischarge = new DischargeModel(dischargeData);
    await newDischarge.save();

    // 4. Remove from admission collection
    await AdmissionModel.findByIdAndDelete(req.params.id);

    res.json({ msg: "Patient discharged successfully", record: newDischarge });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get Single Admission
router.get("/:id", async (req, res) => {
  try {
    const { branchId } = req.query;
    if (branchId) {
      const Model = getModel(branchId);
      const record = await Model.findById(req.params.id);
      if (!record) return res.status(404).json({ msg: "Record not found" });
      return res.json(record);
    }

    const results = await Promise.all([
      PimpriAdmission.findById(req.params.id),
      RajguruAdmission.findById(req.params.id),
      YCMAdmission.findById(req.params.id)
    ]);
    const record = results.find(r => r !== null);
    if (!record) return res.status(404).json({ msg: "Record not found" });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
