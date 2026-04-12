import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { 
  Building2, 
  Search, 
  Filter, 
  Eye, 
  FileText, 
  Image as ImageIcon, 
  ArrowLeft,
  Download,
  Calendar,
  User,
  Clock,
  ExternalLink
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Records() {
  const { id: branchId } = useParams();
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchRecords();
  }, [branchId]);

  useEffect(() => {
    let result = records;
    
    if (searchTerm) {
      result = result.filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.admissionNo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== "all") {
      result = result.filter(r => r.status === statusFilter);
    }
    
    setFilteredRecords(result);
  }, [searchTerm, statusFilter, records]);

  const fetchRecords = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/admissions?branchId=${branchId}`);
      const data = response.data;
      if (Array.isArray(data)) {
        setRecords(data);
        setFilteredRecords(data);
      } else {
        setRecords([]);
        setFilteredRecords([]);
      }
    } catch (error) {
      console.error("Error fetching records:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const branchNames = {
    "1": "Savali Nivara - Pimpri",
    "2": "Savali Nivara - Rajguru Nagar",
    "3": "Savali Nivara - YCM Hospital"
  };

  const getStatusBadge = (status) => {
    if (status === "admitted") {
      return <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-200">Admitted</span>;
    }
    return <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-bold uppercase tracking-wider border border-slate-200">Discharged</span>;
  };

  const generatePDF = (record) => {
    try {
      toast.loading("Generating PDF...", { id: "pdf-toast" });
      const doc = new jsPDF();
      
      // Add Header
      doc.setFontSize(22);
      doc.setTextColor(16, 185, 129); // emerald-500
      doc.text("Savali Nivara - Patient Record", 105, 20, { align: "center" });
      
      doc.setFontSize(12);
      doc.setTextColor(100, 116, 139); // slate-500
      doc.text(branchNames[record.branchId] || `Branch ${record.branchId}`, 105, 28, { align: "center" });

      // Patient Details
      const details = [
        ["Admission No.", record.admissionNo || "N/A"],
        ["Date of Admission", record.doa ? new Date(record.doa).toLocaleDateString() : "N/A"],
        ["Name", record.name || "N/A"],
        ["Guardian Name", record.guardianName || "N/A"],
        ["Age", record.age ? `${record.age} years` : "N/A"],
        ["Gender", record.gender || "N/A"],
        ["Education", record.education || "N/A"],
        ["Marital Status", record.maritalStatus || "N/A"],
        ["Health Condition", record.healthCondition || "N/A"],
        ["Addiction", record.addiction || "N/A"],
        ["Native Place", record.nativePlace || "N/A"],
        ["Occupation", record.occupation || "N/A"],
        ["Place Found", record.placeFound || "N/A"],
        ["Who Brought", record.whoBrought || "N/A"],
        ["Address", record.address || "N/A"],
        ["Contact", record.contact || "N/A"],
        ["Reason for Staying", record.reasonForStaying || "N/A"],
        ["Status", record.status === 'admitted' ? 'Admitted' : 'Discharged']
      ];

      if (record.status === 'discharged' && record.dischargeDetails) {
        details.push(["Date of Discharge", record.dischargeDetails.dod ? new Date(record.dischargeDetails.dod).toLocaleDateString() : "N/A"]);
        details.push(["Reason for Discharge", record.dischargeDetails.reason || "N/A"]);
        details.push(["Condition", record.dischargeDetails.condition || "N/A"]);
        details.push(["Discharged To", record.dischargeDetails.dischargedTo || "N/A"]);
        details.push(["Discharge Address", record.dischargeDetails.address || "N/A"]);
        details.push(["Discharge Contact", record.dischargeDetails.contact || "N/A"]);
        details.push(["Mode of Discharge", record.dischargeDetails.mode || "N/A"]);
      }

      autoTable(doc, {
        startY: 40,
        head: [['Field', 'Details']],
        body: details,
        theme: 'grid',
        headStyles: { fillColor: [16, 185, 129] },
        styles: { fontSize: 11, cellPadding: 5 },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 60 } }
      });

      const finalY = (doc.lastAutoTable && doc.lastAutoTable.finalY) || 40;

      // Footer
      doc.setFontSize(10);
      doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, finalY + 20, { align: "center" });

      const fileName = `${(record.name || "Patient").replace(/\s+/g, '_')}_Record.pdf`;
      doc.save(fileName);
      
      toast.success("PDF downloaded successfully!", { id: "pdf-toast" });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF.", { id: "pdf-toast" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-slate-900 text-white py-12 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-2 text-white/50 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Building2 size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-black">{branchNames[branchId] || `Branch ${branchId}`}</h1>
                <p className="text-slate-400">Complete Admission & Discharge History</p>
              </div>
            </div>
            
            <div className="flex bg-slate-800 rounded-xl p-1">
              <button 
                onClick={() => setStatusFilter("all")}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${statusFilter === 'all' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                All
              </button>
              <button 
                onClick={() => setStatusFilter("admitted")}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${statusFilter === 'admitted' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                Active
              </button>
              <button 
                onClick={() => setStatusFilter("discharged")}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${statusFilter === 'discharged' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                History
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-8">
        {/* Search Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-xl flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by name or admission number..."
              className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={fetchRecords}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
          >
            <Clock size={18} />
            Refresh
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="bg-white rounded-3xl p-20 shadow-xl border border-slate-200 text-center">
            <div className="w-16 h-16 border-4 border-slate-100 border-t-emerald-500 rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-slate-500 font-medium">Loading branch records...</p>
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 shadow-xl border border-slate-200 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter className="text-slate-300" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No records found</h3>
            <p className="text-slate-500">No admissions currently match your search or filter criteria.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-8 py-5 text-sm font-bold text-slate-600 uppercase tracking-wider">Patient</th>
                    <th className="px-8 py-5 text-sm font-bold text-slate-600 uppercase tracking-wider">ID / Branch</th>
                    <th className="px-8 py-5 text-sm font-bold text-slate-600 uppercase tracking-wider">Dates</th>
                    <th className="px-8 py-5 text-sm font-bold text-slate-600 uppercase tracking-wider">Status</th>
                    <th className="px-8 py-5 text-sm font-bold text-slate-600 uppercase tracking-wider">Media</th>
                    <th className="px-8 py-5 text-sm font-bold text-slate-600 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRecords.map((record) => (
                    <tr key={record._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shadow-sm flex-shrink-0">
                            {record.photo ? (
                              <img src={`http://localhost:5000/${record.photo}`} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400 font-black">
                                {record.name?.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-black text-slate-800 uppercase leading-none mb-1">{record.name}</p>
                            <p className="text-xs text-slate-500 flex items-center gap-1">
                              <User size={10} /> {record.age}y • {record.gender}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm font-bold text-slate-700">{record.admissionNo}</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-tight font-medium">{branchNames[record.branchId]}</p>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                          <span>In: {new Date(record.doa).toLocaleDateString()}</span>
                        </div>
                        {record.status === 'discharged' && (
                          <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                            <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                            <span>Out: {new Date(record.dischargeDetails?.dod).toLocaleDateString()}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-8 py-6">
                        {getStatusBadge(record.status)}
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          {record.photo && (
                            <a href={`http://localhost:5000/${record.photo}`} target="_blank" rel="noreferrer" className="p-2 bg-slate-100 hover:bg-blue-100 text-slate-500 hover:text-blue-600 rounded-lg transition-all title='Photo'">
                              <ImageIcon size={16} />
                            </a>
                          )}
                          {record.pdf && (
                            <a href={`http://localhost:5000/${record.pdf}`} target="_blank" rel="noreferrer" className="p-2 bg-slate-100 hover:bg-emerald-100 text-slate-500 hover:text-emerald-600 rounded-lg transition-all title='PDF Document'">
                              <FileText size={16} />
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all title='View'">
                            <Eye size={20} />
                          </button>
                          <button 
                            onClick={() => generatePDF(record)}
                            className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all title='Download PDF'"
                          >
                            <Download size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Records;
