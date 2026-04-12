const mongoose = require("mongoose");

const AdmissionSchema = new mongoose.Schema({
  // Basic Admission Info
  admissionNo: { type: String, required: true },
  doa: { type: Date, required: true },
  name: { type: String, required: true },
  guardianName: { type: String }, // Father’s / Husband’s / Mother’s Name
  age: { type: Number },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  education: { type: String },
  maritalStatus: { type: String, enum: ['Married', 'Unmarried', 'Divorced', 'Widowed'] },
  healthCondition: { type: String },
  addiction: { type: String },
  nativePlace: { type: String },
  occupation: { type: String },
  placeFound: { type: String },
  whoBrought: { type: String },
  address: { type: String },
  contact: { type: String },
  reasonForStaying: { type: String },
  
  // Media
  photo: { type: String }, // URL/Path to uploaded photo
  pdf: { type: String },   // URL/Path to uploaded PDF
  signature: { type: String }, // URL/Path to uploaded signature image (optional)
  
  // Branch Info
  branchId: { type: Number, required: true }, // 1: Pimpri, 2: Rajguru Nagar, 3: YCM Hospital
  
  // Status
  status: { type: String, enum: ['admitted', 'discharged'], default: 'admitted' },
  
  // Discharge Details
  dischargeDetails: {
    dod: { type: Date },
    reason: { type: String },
    condition: { type: String },
    dischargedTo: { type: String },
    address: { type: String },
    contact: { type: String },
    mode: { type: String, enum: ['Self', 'Referred', 'Shifted', 'Others'] }
  }
}, { timestamps: true });

module.exports = mongoose.model("Admission", AdmissionSchema);
