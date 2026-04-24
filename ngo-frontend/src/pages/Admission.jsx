import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";
import { 
  User, 
  UserPlus, 
  Calendar, 
  MapPin, 
  Phone, 
  Heart, 
  Briefcase, 
  GraduationCap, 
  Users, 
  FileText, 
  Camera, 
  Upload, 
  ArrowLeft,
  Save,
  Shield
} from "lucide-react";

function Admission() {
  const { id: branchId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [previews, setPreviews] = useState({
    photo: null,
    signature: null
  });

  const [formData, setFormData] = useState({
    admissionNo: "",
    doa: new Date().toISOString().split('T')[0],
    name: "",
    guardianName: "",
    age: "",
    gender: "Male",
    education: "",
    maritalStatus: "Unmarried",
    healthCondition: "",
    addiction: "",
    nativePlace: "",
    occupation: "",
    placeFound: "",
    whoBrought: "",
    address: "",
    contact: "",
    reasonForStaying: "",
    branchId: branchId
  });

  const [files, setFiles] = useState({
    photo: null,
    pdf: null,
    signature: null
  });

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFiles({ ...files, [type]: file });
      if (type === 'photo' || type === 'signature') {
        setPreviews({ ...previews, [type]: URL.createObjectURL(file) });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    
    if (files.photo) data.append("photo", files.photo);
    if (files.pdf) data.append("pdf", files.pdf);
    if (files.signature) data.append("signature", files.signature);

    try {
      await axios.post(`${API_URL}/api/admissions`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Admission record created successfully!");
      navigate(`/branch/${branchId}/records`);
    } catch (error) {
      alert("Error creating record: " + (error.response?.data?.error || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const branchNames = {
    "1": "Savali Nivara - Pimpri",
    "2": "Savali Nivara - Rajguru Nagar",
    "3": "Savali Nivara - YCM Hospital"
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-[#1f6f5d] text-white py-12 px-6 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <button 
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to Dashboard</span>
          </button>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <UserPlus size={32} />
                <h1 className="text-3xl md:text-4xl font-black">Admission Form</h1>
              </div>
              <p className="text-white/70 text-lg">{branchNames[branchId] || `Branch ${branchId}`}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
              <span className="text-white/60 text-sm block">Current Date</span>
              <span className="font-bold">{new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto -mt-8 px-6">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          
          <div className="p-8 md:p-12 space-y-12">
            
            {/* Section 1: Basic Info */}
            <div className="space-y-8">
              <div className="flex items-center gap-2 pb-2 border-b-2 border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <FileText size={18} />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Basic Registration</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">Admission No.</label>
                  <input 
                    type="text" required 
                    className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                    placeholder="e.g. SN-2024-001"
                    value={formData.admissionNo}
                    onChange={(e) => setFormData({...formData, admissionNo: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">Date of Admission (DOA)</label>
                  <input 
                    type="date" required 
                    className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                    value={formData.doa}
                    onChange={(e) => setFormData({...formData, doa: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">Age</label>
                  <input 
                    type="number" required 
                    className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                    placeholder="Years"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Personal Details */}
            <div className="space-y-8">
              <div className="flex items-center gap-2 pb-2 border-b-2 border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                  <User size={18} />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Personal Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">Full Name</label>
                  <input 
                    type="text" required 
                    className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                    placeholder="Patient Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">Father’s / Husband’s / Mother’s Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                    placeholder="Guardian Name"
                    value={formData.guardianName}
                    onChange={(e) => setFormData({...formData, guardianName: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">Gender</label>
                  <select 
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none appearance-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">Marital Status</label>
                  <select 
                    value={formData.maritalStatus}
                    onChange={(e) => setFormData({...formData, maritalStatus: e.target.value})}
                    className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none appearance-none"
                  >
                    <option value="Unmarried">Unmarried</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">Contact Number</label>
                  <input 
                    type="tel" 
                    className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                    placeholder="+91"
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">Education</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 border-slate-200 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                      placeholder="e.g. 10th Pass, Illiterate"
                      value={formData.education}
                      onChange={(e) => setFormData({...formData, education: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">Occupation</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 border-slate-200 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                      placeholder="Previous work"
                      value={formData.occupation}
                      onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Health & Background */}
            <div className="space-y-8">
              <div className="flex items-center gap-2 pb-2 border-b-2 border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                  <Heart size={18} />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Health & Background</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">Health Condition</label>
                  <textarea 
                    rows="2"
                    className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none resize-none"
                    placeholder="Details of physical/mental health"
                    value={formData.healthCondition}
                    onChange={(e) => setFormData({...formData, healthCondition: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">Addiction (if any)</label>
                  <textarea 
                    rows="2"
                    className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none resize-none"
                    placeholder="Alkohol, Tobacco, drugs, etc."
                    value={formData.addiction}
                    onChange={(e) => setFormData({...formData, addiction: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">Native Place</label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                    placeholder="City / Village / State"
                    value={formData.nativePlace}
                    onChange={(e) => setFormData({...formData, nativePlace: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">Place Found / Brought From</label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                    placeholder="Exact location found"
                    value={formData.placeFound}
                    onChange={(e) => setFormData({...formData, placeFound: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 ml-1">Name of Organization/Person Who Brought</label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    className="w-full bg-slate-50 border-slate-200 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                    placeholder="Brought by whom?"
                    value={formData.whoBrought}
                    onChange={(e) => setFormData({...formData, whoBrought: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 ml-1">Full Address (If available)</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-slate-400" size={18} />
                  <textarea 
                    rows="3"
                    className="w-full bg-slate-50 border-slate-200 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none resize-none"
                    placeholder="Enter complete address..."
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 ml-1">Reason for Staying in Shelter</label>
                <textarea 
                  rows="3"
                  className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none resize-none"
                  placeholder="Explain why the person needs shelter..."
                  value={formData.reasonForStaying}
                  onChange={(e) => setFormData({...formData, reasonForStaying: e.target.value})}
                />
              </div>
            </div>

            {/* Section 4: Photo & PDF Uploads */}
            <div className="space-y-8">
              <div className="flex items-center gap-2 pb-2 border-b-2 border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                  <Camera size={18} />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Media & Documents</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Photo Upload */}
                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-700 block">Patient Photograph 📸</label>
                  <div className="relative group">
                    <div className="w-full h-64 bg-slate-100 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center overflow-hidden transition-all group-hover:bg-slate-200 group-hover:border-emerald-400">
                      {previews.photo ? (
                        <img src={previews.photo} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <Camera size={48} className="text-slate-400 mb-2" />
                          <span className="text-slate-500 text-sm">Click to capture or upload photo</span>
                        </>
                      )}
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'photo')}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* PDF & Signature Upload */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-700 block">Identity Documents (PDF) 📄</label>
                    <div className="relative group">
                      <div className="w-full p-6 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center gap-3 transition-all group-hover:border-emerald-400">
                        <Upload size={20} className="text-slate-400" />
                        <span className="text-slate-600 font-medium">
                          {files.pdf ? files.pdf.name : "Select PDF Document"}
                        </span>
                        <input 
                          type="file" 
                          accept="application/pdf"
                          onChange={(e) => handleFileChange(e, 'pdf')}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-700 block">Signature Scan ✍️</label>
                    <div className="relative group">
                      <div className="w-full h-32 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-emerald-400">
                        {previews.signature ? (
                          <img src={previews.signature} alt="Signature" className="w-full h-full object-contain p-2" />
                        ) : (
                          <span className="text-slate-400 text-sm">Upload signature image</span>
                        )}
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, 'signature')}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Submission Footer */}
          <div className="bg-slate-50 p-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 text-slate-500 text-sm">
              <Shield size={20} />
              <p>Verified admin entry • All data is encrypted and secure</p>
            </div>
            
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto bg-[#1f6f5d] hover:bg-[#155244] text-white px-12 py-4 rounded-xl font-bold transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Save size={20} />
                  <span>SAVE ADMISSION RECORD</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        form {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Admission;