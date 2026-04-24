import { useState, useEffect } from "react";
import { 
  ClipboardList, 
  Search, 
  Filter, 
  ChevronDown, 
  MoreHorizontal, 
  CheckCircle, 
  XOctagon, 
  Clock, 
  ArrowLeft,
  User,
  Mail,
  Calendar,
  IndianRupee,
  Package,
  MoreVertical
} from "lucide-react";
import axios from "axios";
import API_URL from "../config";
import { Link, useNavigate } from "react-router-dom";

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setError("Unauthorized access.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/api/donations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDonations(response.data);
    } catch (err) {
      console.error("Fetch Error:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminRole");
        localStorage.removeItem("adminName");
        navigate("/signup");
        return;
      }
      setError("Failed to load donations.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    const token = localStorage.getItem("adminToken");
    try {
      await axios.put(`${API_URL}/api/donations/${id}`, { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchDonations(); // Refresh
    } catch (err) {
      console.error("Update Error:", err);
      alert("Failed to update status.");
    }
  };

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch = 
      donation.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation._id.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || donation.status === statusFilter;
    const matchesType = typeFilter === "all" || donation.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "completed":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "cancelled":
        return "bg-red-50 text-red-600 border-red-100";
      default:
        return "bg-amber-50 text-amber-600 border-amber-100";
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* Admin Navbar */}
      <nav className="bg-white border-bottom border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/admin/dashboard")} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
              <ArrowLeft size={20} className="text-slate-500" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100">
                <ClipboardList size={20} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 leading-none">Donation Management</h1>
                <p className="text-xs text-slate-500 mt-1">Review and manage community contributions</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-6 mt-8">
        {/* Filters Bar */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mb-8 flex flex-col xl:flex-row gap-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by Donor Name, Email or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl">
              <Filter size={16} className="text-slate-500" />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-sm font-semibold text-slate-700 outline-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl">
              <Package size={16} className="text-slate-500" />
              <select 
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-transparent text-sm font-semibold text-slate-700 outline-none"
              >
                <option value="all">All Types</option>
                <option value="clothes">Clothes</option>
                <option value="food">Food</option>
                <option value="money">Money</option>
                <option value="essentials">Essentials</option>
              </select>
            </div>

            <div className="h-8 w-px bg-slate-200 mx-2 hidden md:block"></div>
            
            <p className="text-sm font-bold text-slate-500">
              Showing <span className="text-emerald-600">{filteredDonations.length}</span> Donations
            </p>
          </div>
        </div>

        {/* Donations Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Donor</th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Type</th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Details</th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonations.map((donation) => (
                  <tr key={donation._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-sm">
                          {donation.userId?.name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{donation.userId?.name || "Unknown User"}</p>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <Mail size={10} />
                            {donation.userId?.email || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          donation.type === 'money' ? 'bg-emerald-50 text-emerald-600' :
                          donation.type === 'food' ? 'bg-orange-50 text-orange-600' :
                          donation.type === 'clothes' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                        }`}>
                          {donation.type === 'money' ? <IndianRupee size={14} /> : 
                           donation.type === 'clothes' ? <Shirt size={14} /> : <Package size={14} />}
                        </span>
                        <span className="text-sm font-bold text-slate-700 capitalize">{donation.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="max-w-xs">
                        <p className="text-sm font-medium text-slate-800 line-clamp-1">
                          {donation.details.amount ? `₹${donation.details.amount}` : donation.details.items || "N/A"}
                        </p>
                        {donation.details.quantity && (
                          <p className="text-xs text-slate-500 mt-1">Qty: {donation.details.quantity}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-medium text-slate-700">
                        {new Date(donation.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {new Date(donation.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadge(donation.status)}`}>
                          {donation.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="relative inline-block text-left group/dropdown">
                        <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400">
                          <MoreVertical size={18} />
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-10 hidden group-hover/dropdown:block animate-in fade-in slide-in-from-top-2 duration-200">
                          <p className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">Update Status</p>
                          <button onClick={() => handleStatusUpdate(donation._id, "approved")} className="w-full text-left px-4 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                            Approve
                          </button>
                          <button onClick={() => handleStatusUpdate(donation._id, "completed")} className="w-full text-left px-4 py-2.5 text-sm font-semibold text-emerald-600 hover:bg-emerald-50 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                            Complete
                          </button>
                          <button onClick={() => handleStatusUpdate(donation._id, "cancelled")} className="w-full text-left px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-red-600"></span>
                            Cancel
                          </button>
                          <button onClick={() => handleStatusUpdate(donation._id, "pending")} className="w-full text-left px-4 py-2.5 text-sm font-semibold text-amber-600 hover:bg-amber-50 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                            Move to Pending
                          </button>
                        </div>
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
                <ClipboardList size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">No donations found</h3>
              <p className="text-slate-500">Try adjusting your filters or search term</p>
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        /* Minimal custom scrollbar for the table */
        .overflow-x-auto::-webkit-scrollbar {
          height: 6px;
        }
        .overflow-x-auto::-webkit-scrollbar-track {
          background: #f8fafc;
        }
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

// Lucide icon helper
const Shirt = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.62 1.97V21a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5.43a2 2 0 0 0-1.62-1.97z"/><path d="M12 22V10"/><path d="M16 11l-4 4-4-4"/>
  </svg>
);

export default AdminDonations;
