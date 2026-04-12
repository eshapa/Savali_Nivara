const mongoose = require("mongoose");

const DischargeSchema = new mongoose.Schema({
  admissionNo: { type: String, required: true },
  doa: { type: Date, required: true },
  name: { type: String, required: true },
  guardianName: { type: String },
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
  photo: { type: String },
  pdf: { type: String },
  signature: { type: String },
  branchId: { type: Number, default: 2 },
  status: { type: String, default: 'discharged' },
  dischargeDetails: {
    dod: { type: Date, required: true },
    reason: { type: String, required: true },
    condition: { type: String, required: true },
    dischargedTo: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    mode: { type: String, enum: ['Self', 'Referred', 'Shifted', 'Others'], required: true }
  }
}, { timestamps: true });

module.exports = mongoose.model("RajguruDischarge", DischargeSchema);
