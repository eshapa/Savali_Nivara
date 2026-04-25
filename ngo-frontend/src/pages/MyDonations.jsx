import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  History, Package, Clock, CheckCircle2, XCircle, ArrowRight,
  Heart, Download, CreditCard, Shirt, Utensils, Pill,
  Shield, MapPin, Calendar, Hash, AlertCircle, TrendingUp,
  Search, Eye
} from "lucide-react";
import axios from "axios";
import API_URL from "../config";
import { motion } from "framer-motion";
import { generateCertificate } from "../utils/certificateGenerator";

// ==================== Status Configuration ====================
const STATUS_CONFIG = {
  pending: {
    label: 'Pending Review', icon: Clock, color: 'text-amber-600', bgColor: 'bg-amber-50',
    steps: ['Submitted', 'Review', 'Approved', 'Completed']
  },
  approved: {
    label: 'Approved', icon: CheckCircle2, color: 'text-blue-600', bgColor: 'bg-blue-50',
    steps: ['Submitted', 'Review', 'Approved', 'Completed']
  },
  completed: {
    label: 'Completed', icon: Heart, color: 'text-emerald-600', bgColor: 'bg-emerald-50',
    steps: ['Submitted', 'Review', 'Approved', 'Completed']
  },
  cancelled: {
    label: 'Cancelled', icon: XCircle, color: 'text-rose-600', bgColor: 'bg-rose-50',
    steps: ['Submitted', 'Review', 'Approved', 'Cancelled']
  }
};

const TYPE_CONFIG = {
  money: { label: 'Monetary', icon: CreditCard, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
  food: { label: 'Food', icon: Utensils, color: 'text-orange-600', bgColor: 'bg-orange-50' },
  clothes: { label: 'Clothes', icon: Shirt, color: 'text-purple-600', bgColor: 'bg-purple-50' },
  essentials: { label: 'Essentials', icon: Package, color: 'text-teal-600', bgColor: 'bg-teal-50' },
  medicines: { label: 'Medicines', icon: Pill, color: 'text-rose-600', bgColor: 'bg-rose-50' }
};

// ==================== Components ====================
const StatusTimeline = ({ status, type }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.processing;
  const steps = config.steps;
  const currentStepIndex = steps.findIndex(step =>
    step.toLowerCase() === config.label.toLowerCase() ||
    (status === 'distributed' && step === 'Distributed') ||
    (status === 'completed' && step === 'Distributed')
  );

  const getStepStatus = (index) => {
    if (index < currentStepIndex) return 'completed';
    if (index === currentStepIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="relative w-full overflow-x-auto hide-scrollbar pb-2 pt-1">
      <div className="flex items-center justify-between min-w-[400px]">
        {steps.map((step, idx) => {
          const stepStatus = getStepStatus(idx);
          return (
            <div key={step} className="flex-1 text-center relative px-2">
              <div className="relative z-10">
                <div className={`
                  w-8 h-8 rounded-full mx-auto flex items-center justify-center text-xs font-bold
                  transition-all duration-300
                  ${stepStatus === 'completed' ? 'bg-green-500 text-white' : ''}
                  ${stepStatus === 'current' ? 'bg-[#1f6f5d] text-white ring-4 ring-[#1f6f5d]/20' : ''}
                  ${stepStatus === 'pending' ? 'bg-gray-200 text-gray-400' : ''}
                `}>
                  {stepStatus === 'completed' ? <CheckCircle2 size={14} /> : idx + 1}
                </div>
                <p className={`text-[10px] sm:text-xs font-semibold mt-2 ${stepStatus === 'current' ? 'text-[#1f6f5d]' : 'text-gray-400'
                  }`}>
                  {step}
                </p>
              </div>
              {idx < steps.length - 1 && (
                <div className={`absolute top-4 left-1/2 w-full h-0.5 -translate-y-1/2 ${stepStatus === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
        <Icon size={22} />
      </div>
    </div>
  </div>
);

const DonationCard = ({ donation, onViewDetails }) => {
  const typeConfig = TYPE_CONFIG[donation.type] || TYPE_CONFIG.money;
  const statusConfig = STATUS_CONFIG[donation.status] || STATUS_CONFIG.processing;
  const StatusIcon = statusConfig.icon;

  const getAmountDisplay = () => {
    if (donation.type === 'money' && donation.details?.amount) {
      return `₹${donation.details.amount.toLocaleString()}`;
    }
    if (donation.details?.quantity) {
      return `${donation.details.quantity} units`;
    }
    return '—';
  };

  const getItemDisplay = () => {
    if (donation.details?.items) return donation.details.items;
    if (donation.details?.itemList?.length) {
      return donation.details.itemList.map(i => i.name).join(', ');
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${typeConfig.bgColor} rounded-xl flex items-center justify-center`}>
              <typeConfig.icon size={18} className={typeConfig.color} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{typeConfig.label} Donation</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <Calendar size={12} className="text-gray-400" />
                <p className="text-xs text-gray-500">
                  {new Date(donation.createdAt).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
          <div className={`px-3 py-1.5 ${statusConfig.bgColor} rounded-full flex items-center gap-1.5`}>
            <StatusIcon size={12} className={statusConfig.color} />
            <span className={`text-xs font-semibold ${statusConfig.color}`}>
              {statusConfig.label}
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Value</p>
            <p className="text-lg font-bold text-gray-900">{getAmountDisplay()}</p>
          </div>
          {getItemDisplay() && (
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Items</p>
              <p className="text-sm font-medium text-gray-700 truncate">{getItemDisplay()}</p>
            </div>
          )}
          {donation.branch && (
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Center</p>
              <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <MapPin size={12} className="text-gray-400" />
                {donation.branch}
              </p>
            </div>
          )}
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Donation ID</p>
            <p className="text-xs font-mono text-gray-500">{donation._id.slice(-8).toUpperCase()}</p>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="pt-4 border-t border-gray-100">
          <StatusTimeline status={donation.status} type={donation.type} />
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 pt-2 flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={() => onViewDetails(donation)}
          className="w-full sm:flex-1 bg-gray-50 text-[#1f6f5d] px-4 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
        >
          <Eye size={18} /> View Details
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            generateCertificate(donation);
          }}
          className="w-full sm:w-auto bg-[#1f6f5d] text-white px-4 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#165042] transition-colors"
          title="Download Certificate"
        >
          <Download size={18} />
        </button>
      </div>
      </div>
    </motion.div>
  );
};

const DonationDetailModal = ({ donation, onClose }) => {
  if (!donation) return null;

  const typeConfig = TYPE_CONFIG[donation.type] || TYPE_CONFIG.money;
  const statusConfig = STATUS_CONFIG[donation.status] || STATUS_CONFIG.processing;

  const handleDownload = () => {
    generateCertificate(donation);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${typeConfig.bgColor} rounded-xl flex items-center justify-center`}>
              <typeConfig.icon size={18} className={typeConfig.color} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Donation Details</h2>
              <p className="text-sm text-gray-500">{typeConfig.label} Donation</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <XCircle size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Banner */}
          <div className={`p-4 ${statusConfig.bgColor} rounded-xl flex items-center gap-3`}>
            <statusConfig.icon size={20} className={statusConfig.color} />
            <div>
              <p className="font-semibold text-gray-900">Status: {statusConfig.label}</p>
              <p className="text-sm text-gray-600">Last updated: {new Date(donation.updatedAt).toLocaleString()}</p>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Donation ID</p>
              <p className="font-mono text-sm text-gray-700">{donation._id}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Date</p>
              <p className="text-sm text-gray-700">{new Date(donation.createdAt).toLocaleString()}</p>
            </div>
            {donation.type === 'money' && donation.details?.amount && (
              <>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Amount</p>
                  <p className="text-2xl font-bold text-gray-900">₹{donation.details.amount.toLocaleString()}</p>
                </div>
                {donation.details.transactionId && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Transaction ID</p>
                    <p className="font-mono text-sm text-gray-700">{donation.details.transactionId}</p>
                  </div>
                )}
              </>
            )}
            {donation.type !== 'money' && (
              <>
                {donation.details?.items && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Items</p>
                    <p className="text-sm font-medium text-gray-700">{donation.details.items}</p>
                  </div>
                )}
                {donation.details?.quantity && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Quantity</p>
                    <p className="text-sm font-medium text-gray-700">{donation.details.quantity}</p>
                  </div>
                )}
                {donation.details?.itemList && donation.details.itemList.length > 0 && (
                  <div className="col-span-2">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Item Details</p>
                    <div className="bg-gray-50 rounded-lg p-3 space-y-1">
                      {donation.details.itemList.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-600">{item.name}</span>
                          <span className="text-gray-900 font-medium">{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
            {donation.branch && (
              <div className="col-span-2">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Assigned Drop-off Center</p>
                <div className="flex items-center gap-2 mt-1 p-3 bg-gray-50 rounded-lg">
                  <MapPin size={16} className="text-gray-400" />
                  <p className="text-sm font-medium text-gray-700">{donation.branch}</p>
                </div>
              </div>
            )}
            {donation.details?.notes && (
              <div className="col-span-2">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Notes / Cause</p>
                <p className="text-sm text-gray-600 italic bg-gray-50 p-3 rounded-lg mt-1">"{donation.details.notes}"</p>
              </div>
            )}
          </div>

          {/* Certificate Button */}
          <div className="pt-4 border-t border-gray-100">
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 bg-[#1f6f5d] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#165042] transition-colors"
            >
              <Download size={18} />
              Download Donation Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== Main Component ====================
const MyDonations = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDonation, setSelectedDonation] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get("tab") || "all";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMyDonations();
  }, []);

  const fetchMyDonations = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      setError("Please login to see your donations.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/api/donations/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sorted = response.data.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setDonations(sorted);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userName");
        navigate("/user-login");
        return;
      }
      setError("Failed to load your donations.");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "all", label: "All Donations", icon: History, count: donations.length },
    { id: "money", label: "Monetary", icon: CreditCard, count: donations.filter(d => d.type === 'money').length },
    { id: "food", label: "Food", icon: Utensils, count: donations.filter(d => d.type === 'food').length },
    { id: "clothes", label: "Clothes", icon: Shirt, count: donations.filter(d => d.type === 'clothes').length },
    { id: "essentials", label: "Essentials", icon: Package, count: donations.filter(d => d.type === 'essentials').length },
    { id: "medicines", label: "Medicines", icon: Pill, count: donations.filter(d => d.type === 'medicines').length }
  ];

  const getStats = () => {
    const totalDonations = donations.length;
    const totalAmount = donations
      .filter(d => d.type === 'money' && d.details?.amount)
      .reduce((sum, d) => sum + (d.details.amount || 0), 0);
    const completedDonations = donations.filter(d =>
      d.status === 'distributed' || d.status === 'completed'
    ).length;
    const activeDonations = donations.filter(d =>
      !['distributed', 'completed'].includes(d.status)
    ).length;

    return { totalDonations, totalAmount, completedDonations, activeDonations };
  };

  const filteredDonations = donations
    .filter(d => activeTab === "all" || d.type === activeTab)
    .filter(d => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        d._id.toLowerCase().includes(searchLower) ||
        (d.details?.items?.toLowerCase().includes(searchLower)) ||
        (d.branch?.toLowerCase().includes(searchLower))
      );
    });

  const stats = getStats();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#1f6f5d] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading your donations...</p>
        </div>
      </div>
    );
  }

  if (error && !donations.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={28} className="text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <Link
            to="/user-login"
            className="inline-flex items-center gap-2 bg-[#1f6f5d] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#165042] transition-colors"
          >
            Login to Continue
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#1f6f5d] mb-2">
                <Shield size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">Verified Donor Dashboard</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Donations</h1>
              <p className="text-gray-500 text-sm mt-1">Track and manage all your contributions</p>
            </div>
            <Link
              to="/donate"
              className="inline-flex items-center justify-center gap-2 bg-[#1f6f5d] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#165042] transition-colors shadow-sm"
            >
              <Heart size={18} />
              Make New Donation
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Donations" value={stats.totalDonations} icon={History} color="bg-blue-50 text-blue-600" />
          <StatCard title="Total Amount" value={`₹${stats.totalAmount.toLocaleString()}`} icon={TrendingUp} color="bg-emerald-50 text-emerald-600" />
          <StatCard title="Completed" value={stats.completedDonations} icon={CheckCircle2} color="bg-green-50 text-green-600" />
          <StatCard title="Active" value={stats.activeDonations} icon={Package} color="bg-amber-50 text-amber-600" />
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-80">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID, items, or center..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1f6f5d]/20 focus:border-[#1f6f5d] outline-none transition-all"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-1 pb-2 mb-6 hide-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all
                ${activeTab === tab.id
                  ? "bg-[#1f6f5d] text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
                }
              `}
            >
              <tab.icon size={16} />
              {tab.label}
              <span className={`
                text-xs px-1.5 py-0.5 rounded-full
                ${activeTab === tab.id ? "bg-white/20" : "bg-gray-100 text-gray-500"}
              `}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Donations List */}
        {filteredDonations.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No donations found</h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              {searchTerm ? "Try adjusting your search or filters." : "Start your journey of giving back today."}
            </p>
            {!searchTerm && (
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 bg-[#1f6f5d] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#165042] transition-colors"
              >
                <Heart size={18} />
                Make Your First Donation
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {filteredDonations.map((donation) => (
              <DonationCard
                key={donation._id}
                donation={donation}
                onViewDetails={setSelectedDonation}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <DonationDetailModal
        donation={selectedDonation}
        onClose={() => setSelectedDonation(null)}
      />

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default MyDonations;