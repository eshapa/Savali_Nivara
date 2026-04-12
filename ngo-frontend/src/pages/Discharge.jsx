import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  UserMinus, 
  Search, 
  Calendar, 
  MapPin, 
  Phone, 
  Clock, 
  ArrowLeft,
  Save,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

function Discharge() {
  const { id: branchId } = useParams();
  const navigate = useNavigate();
  const [activeAdmissions, setActiveAdmissions] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(true);

  const [formData, setFormData] = useState({
    dod: new Date().toISOString().split('T')[0],
    reason: "",
    condition: "",
    dischargedTo: "",
    address: "",
    contact: "",
    mode: "Self"
  });

  useEffect(() => {
    fetchActiveAdmissions();
  }, [branchId]);

  const fetchActiveAdmissions = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admissions?branchId=${branchId}&status=admitted`);
      setActiveAdmissions(response.data);
    } catch (error) {
      console.error("Error fetching admissions:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleDischarge = async (e) => {
    e.preventDefault();
    if (!selectedPatient) return;

    setIsLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/admissions/${selectedPatient._id}/discharge`, {
        branchId: branchId,
        dischargeDetails: formData
      });
      alert("Patient discharged successfully!");
      navigate(`/branch/${branchId}/records`);
    } catch (error) {
      alert("Error during discharge: " + (error.response?.data?.error || error.message));
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
      <div className="bg-red-600 text-white py-12 px-6 shadow-lg relative overflow-hidden">
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
                <UserMinus size={32} />
                <h1 className="text-3xl md:text-4xl font-black">Discharge Process</h1>
              </div>
              <p className="text-white/70 text-lg">{branchNames[branchId] || `Branch ${branchId}`}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto -mt-8 px-6">
        {!selectedPatient ? (
          /* Step 1: Search and Select Patient */
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Search className="text-slate-400" />
              <h2 className="text-2xl font-bold text-slate-800">Select Patient for Discharge</h2>
            </div>

            {isSearching ? (
              <div className="py-20 text-center">
                <div className="w-12 h-12 border-4 border-slate-200 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-500">Searching active records...</p>
              </div>
            ) : activeAdmissions.length === 0 ? (
              <div className="py-20 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <AlertCircle className="mx-auto text-slate-300 mb-4" size={48} />
                <p className="text-slate-500 font-medium text-lg">No active patients found in this branch.</p>
                <button 
                  onClick={() => navigate(`/branch/${branchId}/admission`)}
                  className="mt-4 text-red-600 font-bold hover:underline"
                >
                  Create new admission record
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeAdmissions.map((patient) => (
                  <div 
                    key={patient._id}
                    onClick={() => setSelectedPatient(patient)}
                    className="group cursor-pointer bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-200 p-6 rounded-2xl transition-all shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                          {patient.photo ? (
                            <img src={`http://localhost:5000/${patient.photo}`} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold">
                              {patient.name?.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800 group-hover:text-red-700 transition-colors uppercase">{patient.name}</h3>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                            <Clock size={12} />
                            <span>Admitted: {new Date(patient.doa).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-1 rounded uppercase tracking-wider">
                        {patient.admissionNo}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Step 2: Fill Discharge Form */
          <form onSubmit={handleDischarge} className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-slide-up">
            
            {/* Selected Patient Banner */}
            <div className="bg-slate-800 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/20">
                  {selectedPatient.photo ? (
                    <img src={`http://localhost:5000/${selectedPatient.photo}`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-slate-700 flex items-center justify-center text-white font-black text-xl">
                      {selectedPatient.name?.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-white font-bold text-xl uppercase">{selectedPatient.name}</h2>
                  <p className="text-white/50 text-sm">Patient ID: {selectedPatient.admissionNo}</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setSelectedPatient(null)}
                className="text-red-400 hover:text-red-300 font-bold text-sm bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-all"
              >
                Change Patient
              </button>
            </div>

            <div className="p-8 md:p-12 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Date of Discharge</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="date" required 
                      className="w-full bg-slate-50 border-slate-200 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-red-500 transition-all outline-none"
                      value={formData.dod}
                      onChange={(e) => setFormData({...formData, dod: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Mode of Discharge</label>
                  <select 
                    value={formData.mode}
                    onChange={(e) => setFormData({...formData, mode: e.target.value})}
                    className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 transition-all outline-none appearance-none"
                  >
                    <option value="Self">Self</option>
                    <option value="Referred">Referred</option>
                    <option value="Shifted">Shifted</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Reason for Discharge</label>
                <textarea 
                  rows="2" required
                  className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 transition-all outline-none resize-none"
                  placeholder="Recovery, shifting, request by family, etc."
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Condition at the Time of Discharge</label>
                <textarea 
                  rows="2" required
                  className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 transition-all outline-none resize-none"
                  placeholder="Stable, improved, needing further care, etc."
                  value={formData.condition}
                  onChange={(e) => setFormData({...formData, condition: e.target.value})}
                />
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-6">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-500" />
                  Receiving Person/Organization
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Name</label>
                    <input 
                      type="text" required 
                      className="w-full bg-white border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                      placeholder="Organization or Person name"
                      value={formData.dischargedTo}
                      onChange={(e) => setFormData({...formData, dischargedTo: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Contact Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                      <input 
                        type="tel" required 
                        className="w-full bg-white border-slate-200 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                        placeholder="Mobile number"
                        value={formData.contact}
                        onChange={(e) => setFormData({...formData, contact: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-slate-400" size={14} />
                    <textarea 
                      rows="2" required 
                      className="w-full bg-white border-slate-200 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-red-500 outline-none resize-none"
                      placeholder="Receiver's address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="p-8 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-xl font-bold transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Save size={20} />
                    <span>FINALIZE DISCHARGE</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUp 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Discharge;