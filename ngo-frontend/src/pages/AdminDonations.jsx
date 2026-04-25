import { useState, useEffect } from "react";
import axios from "axios";
import { 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Tag, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  ArrowRight,
  ChevronDown,
  Download,
  AlertCircle
} from "lucide-react";
import API_URL from "../config";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const response = await axios.get(`${API_URL}/api/donations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDonations(response.data);
    } catch (err) {
      console.error("Fetch Error:", err.response?.status);
      if (err.response?.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminRole");
        window.location.href = "/signup";
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    const token = localStorage.getItem("adminToken");
    try {
      await axios.put(
        `${API_URL}/api/donations/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchDonations();
    } catch (err) {
      console.error("Update Error:", err);
      alert("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredDonations = donations.filter((donation) => {
    const donorName = donation.userId?.name || "Unknown";
    const matchesSearch = 
      donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.type?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || donation.status === filterStatus;
    const matchesType = filterType === "all" || donation.type === filterType;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleExportPDF = () => {
    try {
      console.log("Starting PDF Export...");
      const doc = new jsPDF();
      
      // Header
      doc.setFontSize(22);
      doc.setTextColor(31, 111, 93); // Theme color
      doc.text("Savali Nivara NGO", 14, 20);
      
      doc.setFontSize(16);
      doc.setTextColor(100);
      doc.text("Donation Records Report", 14, 30);
      
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 38);
      
      // Table Data
      const tableColumn = ["Date", "Donor Name", "Type", "Details", "Status"];
      const tableRows = filteredDonations.map(donation => [
        new Date(donation.createdAt).toLocaleDateString(),
        donation.userId?.name || "Unknown",
        donation.type.toUpperCase(),
        donation.type === 'money' ? `Rs. ${donation.details?.amount}` : donation.details?.items || "N/A",
        donation.status.toUpperCase()
      ]);

      // Generate Table
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 45,
        theme: 'striped',
        headStyles: { fillColor: [31, 111, 93] },
        styles: { fontSize: 8 },
        margin: { top: 45 }
      });

      console.log("Saving PDF...");
      doc.save(`Donation_Report_${new Date().getTime()}.pdf`);
      alert("Success! Your PDF report has been downloaded.");
    } catch (error) {
      console.error("PDF Export Error:", error);
      alert("Could not generate PDF. Please check console for errors.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved": return "bg-blue-100 text-blue-700 border-blue-200";
      case "completed": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "cancelled": return "bg-rose-100 text-rose-700 border-rose-200";
      default: return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-bold tracking-tight">Loading donation records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200 pt-8 pb-8">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Manage Donations</h1>
              <p className="text-slate-500 font-medium">Review, approve and track community contributions</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleExportPDF}
                className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2"
              >
                <Download size={18} /> Export PDF Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-[1600px] mx-auto px-6 mt-8">
        {/* Filters Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search by donor or type..."
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-transparent rounded-2xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <select
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-transparent rounded-2xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500/20 appearance-none transition-all"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>

            <div className="relative">
              <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <select
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-transparent rounded-2xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500/20 appearance-none transition-all"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="money">Money</option>
                <option value="food">Food</option>
                <option value="clothes">Clothes</option>
                <option value="essentials">Essentials</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>

            <div className="flex items-center gap-4 px-4 py-3 bg-emerald-50 rounded-2xl">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <span className="block text-xs font-bold text-emerald-400 uppercase tracking-wider">Filtered Results</span>
                <span className="block text-lg font-black text-emerald-900 leading-none">{filteredDonations.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Donations Table */}
        <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                  <th className="px-8 py-6">Donor Details</th>
                  <th className="px-8 py-6">Donation Type</th>
                  <th className="px-8 py-6">Content / Details</th>
                  <th className="px-8 py-6">Status</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredDonations.map((donation) => (
                  <tr key={donation._id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-white transition-colors">
                          <User size={24} />
                        </div>
                        <div>
                          <p className="text-base font-black text-slate-900 leading-tight">{donation.userId?.name || "Unknown Donor"}</p>
                          <p className="text-xs font-bold text-slate-400 mt-1">{donation.userId?.email || "No email provided"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          donation.type === 'money' ? 'bg-emerald-100 text-emerald-600' :
                          donation.type === 'food' ? 'bg-amber-100 text-amber-600' :
                          donation.type === 'clothes' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                        }`}>
                          <Tag size={20} />
                        </div>
                        <span className="text-sm font-black text-slate-700 capitalize">{donation.type}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="max-w-xs">
                        <p className="text-sm font-black text-slate-900 mb-1">
                          {donation.type === 'money' ? `Rs. ${donation.details?.amount}` : donation.details?.items}
                        </p>
                        {donation.details?.notes && (
                          <p className="text-xs font-bold text-slate-400 line-clamp-2">{donation.details.notes}</p>
                        )}
                        <div className="flex items-center gap-2 mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          <Calendar size={12} />
                          {new Date(donation.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(donation.status)}`}>
                        {donation.status === 'pending' && <Clock size={12} />}
                        {donation.status === 'approved' && <CheckCircle2 size={12} />}
                        {donation.status === 'completed' && <CheckCircle2 size={12} />}
                        {donation.status === 'cancelled' && <XCircle size={12} />}
                        {donation.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        {donation.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(donation._id, "approved")}
                              disabled={updatingId === donation._id}
                              className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                              title="Approve Donation"
                            >
                              <CheckCircle2 size={18} />
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(donation._id, "cancelled")}
                              disabled={updatingId === donation._id}
                              className="w-10 h-10 bg-white border border-slate-200 text-rose-600 rounded-xl flex items-center justify-center hover:bg-rose-50 transition-all"
                              title="Cancel Donation"
                            >
                              <XCircle size={18} />
                            </button>
                          </>
                        )}
                        {donation.status === "approved" && (
                          <button
                            onClick={() => handleUpdateStatus(donation._id, "completed")}
                            disabled={updatingId === donation._id}
                            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-slate-800 transition-all"
                          >
                            <span>Mark Completed</span>
                            <ArrowRight size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredDonations.length === 0 && (
            <div className="p-20 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <AlertCircle size={40} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">No donations found</h3>
              <p className="text-slate-500 font-medium">Try adjusting your filters or search term</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDonations;
