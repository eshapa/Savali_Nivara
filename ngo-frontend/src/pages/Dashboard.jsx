import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";
import {
  Building2,
  Users,
  Heart,
  TrendingUp,
  MapPin,
  LogOut,
  Settings,
  Bell,
  Menu,
  X,
  Eye,
  UserPlus,
  UserMinus,
  ClipboardList,
  Calendar,
  Home,
  BookOpen,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  CheckCircle
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  const [hoveredBranch, setHoveredBranch] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminName, setAdminName] = useState("Admin");
  const [contactMessages, setContactMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [branchStats, setBranchStats] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [donationStats, setDonationStats] = useState({ total: 0, pending: 0 });
  const [recentDonations, setRecentDonations] = useState([]);
  const [loadingDonations, setLoadingDonations] = useState(true);
  const [donationError, setDonationError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  // Password Change State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [passwordMessage, setPasswordMessage] = useState({ type: "", text: "" });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/signup");
      return;
    }
    const name = localStorage.getItem("adminName");
    if (name) setAdminName(name);

    fetchContactMessages();
    fetchBranchStats();
    fetchRecentActivity();
    fetchDonationStats();
    fetchRecentDonations();
  }, [navigate]);

  const fetchRecentActivity = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admissions?limit=5`);
      setRecentActivity(response.data);
    } catch (error) {
      console.error("Error fetching recent activity:", error.message);
    } finally {
      setLoadingActivity(false);
    }
  };

  const fetchDonationStats = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const response = await axios.get(`${API_URL}/api/donations/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDonationStats(response.data);
    } catch (error) {
      console.error("Error fetching donation stats:", error.response?.status);
    }
  };

  const fetchRecentDonations = async () => {
    const token = localStorage.getItem("adminToken");
    setDonationError(null);
    try {
      const response = await axios.get(`${API_URL}/api/donations`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (Array.isArray(response.data)) {
        setRecentDonations(response.data.slice(0, 5));
      } else {
        setRecentDonations([]);
      }
    } catch (error) {
      console.error("FAILED to fetch donations:", error.response?.status);
      if (error.response?.status === 401) {
        setDonationError("Session expired or Unauthorized. Please login again.");
      } else {
        setDonationError("Could not load donations. Check server connection.");
      }
    } finally {
      setLoadingDonations(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    const token = localStorage.getItem("adminToken");
    try {
      await axios.put(
        `${API_URL}/api/donations/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchRecentDonations();
      fetchDonationStats();
    } catch (err) {
      console.error("Update Error:", err);
      alert("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return setPasswordMessage({ type: "error", text: "New passwords do not match" });
    }
    setIsChangingPassword(true);
    setPasswordMessage({ type: "", text: "" });
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.put(`${API_URL}/api/auth/admin/change-password`, {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPasswordMessage({ type: "success", text: "Password changed successfully!" });
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setPasswordMessage({ type: "", text: "" });
      }, 2000);
    } catch (err) {
      setPasswordMessage({ type: "error", text: err.response?.data?.msg || "Failed to change password" });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const fetchBranchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admissions/stats`);
      const data = response.data;
      if (Array.isArray(data)) {
        const statsMap = {};
        data.forEach(stat => {
          statsMap[stat._id] = stat;
        });
        setBranchStats(statsMap);
      }
    } catch (error) {
      console.error("Error fetching branch stats:", error.message);
    }
  };

  const fetchContactMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/contact`);
      setContactMessages(response.data);
    } catch (error) {
      console.error("Error fetching contact messages:", error.message);
    } finally {
      setLoadingMessages(false);
    }
  };

  const branchNames = {
    1: "Savali Nivara - Pimpri",
    2: "Savali Nivara - Rajguru Nagar",
    3: "Savali Nivara - YCM Hospital"
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");
    localStorage.removeItem("adminName");
    navigate("/signup");
  };

  const branches = [
    {
      id: 1,
      name: "Savali Nivara - Pimpri",
      location: "Pimpri-Chinchwad, Pune",
      totalFamilies: branchStats[1]?.total || 0,
      activeMembers: branchStats[1]?.active || 0,
      male: branchStats[1]?.male || 0,
      female: branchStats[1]?.female || 0,
      todayAdmissions: branchStats[1]?.todayAdmissions || 0,
      todayDischarges: branchStats[1]?.todayDischarges || 0
    },
    {
      id: 2,
      name: "Savali Nivara - Rajguru Nagar",
      location: "Rajguru Nagar, Pune",
      totalFamilies: branchStats[2]?.total || 0,
      activeMembers: branchStats[2]?.active || 0,
      male: branchStats[2]?.male || 0,
      female: branchStats[2]?.female || 0,
      todayAdmissions: branchStats[2]?.todayAdmissions || 0,
      todayDischarges: branchStats[2]?.todayDischarges || 0
    },
    {
      id: 3,
      name: "Savali Nivara - YCM Hospital",
      location: "YCM Hospital, Pimpri",
      totalFamilies: branchStats[3]?.total || 0,
      activeMembers: branchStats[3]?.active || 0,
      male: branchStats[3]?.male || 0,
      female: branchStats[3]?.female || 0,
      todayAdmissions: branchStats[3]?.todayAdmissions || 0,
      todayDischarges: branchStats[3]?.todayDischarges || 0
    }
  ];

  const totalBeneficiaries = Object.values(branchStats).reduce((acc, curr) => acc + (curr.active || 0), 0);
  const totalAdmissionsToday = Object.values(branchStats).reduce((acc, curr) => acc + (curr.todayAdmissions || 0), 0);
  const allTimeAdmissions = Object.values(branchStats).reduce((acc, curr) => acc + (curr.total || 0), 0);

  const quickStats = [
    {
      icon: Users,
      label: "Total Beneficiaries",
      value: totalBeneficiaries.toString(),
      change: `+${totalAdmissionsToday} today`,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100"
    },
    {
      icon: Building2,
      label: "Active Centers",
      value: Object.keys(branchStats).length > 0 ? Object.keys(branchStats).length.toString() : "3",
      change: "All operational",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100"
    },
    {
      icon: Heart,
      label: "Total Donations",
      value: donationStats.total.toString(),
      change: `${donationStats.pending} pending review`,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100"
    },
    {
      icon: TrendingUp,
      label: "Total Admissions",
      value: allTimeAdmissions.toString(),
      change: `+${totalAdmissionsToday} today`,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100"
    }
  ];

  const handleShowRecords = (branchId) => {
    navigate(`/branch/${branchId}/records`);
  };

  const handleNewAdmission = (branchId) => {
    navigate(`/branch/${branchId}/admission`);
  };

  const handleDischarge = (branchId) => {
    navigate(`/branch/${branchId}/discharge`);
  };

  return (
    <div className="admin-dashboard">
      <main className="main-content">

        {/* Welcome Banner */}
        <div className="welcome-banner">
          <div className="welcome-text">
            <h2 className="text-3xl font-extrabold text-slate-900">Welcome back, {adminName}!</h2>
            <p className="text-slate-500 font-medium mt-1">Manage your centers, beneficiaries, and programs</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowPasswordModal(true)}
              className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold transition-all"
            >
              <Settings size={16} /> Change Password
            </button>
            <div className="bg-slate-100 px-5 py-2.5 rounded-xl flex items-center gap-2.5 text-slate-600 font-bold text-sm">
              <Calendar size={14} />
              <span>{new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="stats-grid">
          {quickStats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bgColor}`}>
                <stat.icon size={24} className={stat.color} />
              </div>
              <div className="stat-info">
                <p className="text-sm font-semibold text-slate-500 mb-1">{stat.label}</p>
                <h3 className="text-2xl font-extrabold text-slate-900 leading-none">{stat.value}</h3>
                <span className="text-xs font-bold text-emerald-600 block mt-2">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Centers Section */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Center Management</h2>
              <p className="text-slate-500 font-medium">Manage admissions, discharges, and view records</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {branches.map((branch) => (
              <div
                key={branch.id}
                className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="bg-emerald-600 p-8 flex justify-between items-start">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                    <Home size={24} className="text-white" />
                  </div>
                  <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    Center #{branch.id}
                  </span>
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-black text-slate-900 mb-2">{branch.name}</h3>
                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
                    <MapPin size={14} />
                    <span className="font-medium">{branch.location}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-slate-50 p-4 rounded-2xl">
                      <span className="block text-2xl font-black text-slate-900">{branch.totalFamilies}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Families</span>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-2xl">
                      <span className="block text-2xl font-black text-emerald-600">{branch.activeMembers}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active</span>
                    </div>
                  </div>

                  <div className="flex gap-4 mb-8">
                    <div className="flex-1 bg-slate-50 p-3 rounded-xl flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                        <Users size={16} />
                      </div>
                      <div>
                        <span className="block text-xs font-black text-slate-900">{branch.male}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Male</span>
                      </div>
                    </div>
                    <div className="flex-1 bg-slate-50 p-3 rounded-xl flex items-center gap-3">
                      <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600">
                        <Users size={16} />
                      </div>
                      <div>
                        <span className="block text-xs font-black text-slate-900">{branch.female}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Female</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                      <button onClick={() => handleNewAdmission(branch.id)} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2">
                        <UserPlus size={18} /> Admission
                      </button>
                      <button onClick={() => handleDischarge(branch.id)} className="flex-1 bg-slate-900 hover:bg-slate-800 text-white p-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2">
                        <UserMinus size={18} /> Discharge
                      </button>
                    </div>
                    <button onClick={() => handleShowRecords(branch.id)} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 p-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2">
                      <Eye size={18} /> View Records
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="recent-activity-section">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Recent Activity</h2>
              <p className="text-slate-500 font-medium">Latest admissions and discharges across centers</p>
            </div>
          </div>

          <div className="activity-table-container">
            <table className="activity-table">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                  <th className="pb-4">Time</th>
                  <th className="pb-4">Center</th>
                  <th className="pb-4">Beneficiary</th>
                  <th className="pb-4">Activity</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm font-bold text-slate-600">
                {loadingActivity ? (
                  <tr><td colSpan="5" className="text-center py-12 text-slate-400">Loading activity...</td></tr>
                ) : recentActivity.length === 0 ? (
                  <tr><td colSpan="5" className="text-center py-12 text-slate-400 font-bold">No recent activity.</td></tr>
                ) : (
                  recentActivity.map((activity) => (
                    <tr key={activity._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="py-6">{new Date(activity.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                      <td className="py-6">{branchNames[activity.branchId]}</td>
                      <td className="py-6 font-black text-slate-900">{activity.name}</td>
                      <td className="py-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          activity.status === 'admitted' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {activity.status === 'admitted' ? 'Admission' : 'Discharge'}
                        </span>
                      </td>
                      <td className="py-6"><span className="text-emerald-500 flex items-center gap-2">● Success</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Inquiries */}
        <div className="recent-activity-section">
          <div className="flex items-center gap-3 mb-8">
            <MessageSquare className="text-emerald-600" />
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">User Inquiries</h2>
              <p className="text-slate-500 font-medium">Messages from the Contact Us page</p>
            </div>
          </div>

          <div className="activity-table-container">
            <table className="activity-table">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                  <th className="pb-4">Date</th>
                  <th className="pb-4">Name</th>
                  <th className="pb-4">Email</th>
                  <th className="pb-4">Message Snippet</th>
                </tr>
              </thead>
              <tbody className="text-sm font-bold text-slate-600">
                {loadingMessages ? (
                  <tr><td colSpan="4" className="text-center py-12 text-slate-400">Loading messages...</td></tr>
                ) : contactMessages.length === 0 ? (
                  <tr><td colSpan="4" className="text-center py-12 text-slate-400 font-bold">No messages received yet.</td></tr>
                ) : (
                  contactMessages.map((msg) => (
                    <tr key={msg._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="py-6">{new Date(msg.createdAt).toLocaleDateString()}</td>
                      <td className="py-6 font-black text-slate-900">{msg.firstName} {msg.lastName}</td>
                      <td className="py-6">{msg.email}</td>
                      <td className="py-6 max-w-[200px] truncate" title={msg.message}>{msg.message}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Donations (At Bottom) */}
        <div className="recent-activity-section">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <Heart className="text-emerald-600" />
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">Recent Donations</h2>
                <p className="text-slate-500 font-medium">Latest contributions from the community</p>
              </div>
            </div>
            <button onClick={() => navigate("/admin/donations")} className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-6 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2">
              <Heart size={16} /> Manage All
            </button>
          </div>

          {donationError && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 font-bold text-sm">
              <AlertCircle size={20} />
              <span>{donationError}</span>
            </div>
          )}

          <div className="activity-table-container">
            <table className="activity-table">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                  <th className="pb-4">Date</th>
                  <th className="pb-4">Donor</th>
                  <th className="pb-4">Type</th>
                  <th className="pb-4">Details</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm font-bold text-slate-600">
                {loadingDonations ? (
                  <tr><td colSpan="6" className="text-center py-12 text-slate-400">Loading donations...</td></tr>
                ) : recentDonations.length === 0 ? (
                  <tr><td colSpan="6" className="text-center py-12 text-slate-400 font-bold">No donations found.</td></tr>
                ) : (
                  recentDonations.map((donation) => (
                    <tr key={donation._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="py-6">{new Date(donation.createdAt).toLocaleDateString()}</td>
                      <td className="py-6 font-black text-slate-900">{donation.userId?.name || "Unknown"}</td>
                      <td className="py-6 capitalize">{donation.type}</td>
                      <td className="py-6">{donation.details.amount ? `₹${donation.details.amount}` : donation.details.items || "N/A"}</td>
                      <td className="py-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          donation.status === 'approved' ? 'bg-blue-50 text-blue-600' :
                          donation.status === 'completed' ? 'bg-emerald-50 text-emerald-600' :
                          donation.status === 'cancelled' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {donation.status}
                        </span>
                      </td>
                      <td className="py-6 text-right">
                        {donation.status === "pending" && (
                          <button
                            onClick={() => handleUpdateStatus(donation._id, "approved")}
                            disabled={updatingId === donation._id}
                            className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs hover:bg-emerald-700 transition-all font-black"
                          >
                            Approve
                          </button>
                        )}
                        {donation.status === "approved" && (
                          <button
                            onClick={() => handleUpdateStatus(donation._id, "completed")}
                            disabled={updatingId === donation._id}
                            className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs hover:bg-slate-800 transition-all font-black"
                          >
                            Complete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Password Change Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[32px] p-8 w-full max-w-md shadow-2xl relative">
              <button 
                onClick={() => setShowPasswordModal(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-2xl font-black text-slate-900 mb-2">Change Password</h2>
              <p className="text-slate-500 text-sm font-medium mb-6">Update your admin access credentials</p>

              {passwordMessage.text && (
                <div className={`p-4 rounded-xl mb-6 font-bold text-sm flex items-center gap-2 ${
                  passwordMessage.type === 'error' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                }`}>
                  {passwordMessage.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                  {passwordMessage.text}
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Current Password</label>
                  <input 
                    type="password" 
                    required
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">New Password</label>
                  <input 
                    type="password" 
                    required
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Confirm New Password</label>
                  <input 
                    type="password" 
                    required
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={isChangingPassword}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl mt-4 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {isChangingPassword ? "Updating..." : "Update Password"}
                </button>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default Dashboard;