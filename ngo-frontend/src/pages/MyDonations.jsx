import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { History, Package, Clock, CheckCircle2, XCircle, ArrowRight, Heart } from "lucide-react";
import axios from "axios";

const MyDonations = () => {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      const response = await axios.get("http://localhost:5000/api/donations/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDonations(response.data);
    } catch (err) {
      console.error("Fetch Error:", err);
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

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "completed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 size={14} />;
      case "completed":
        return <Heart size={14} fill="currentColor" />;
      case "cancelled":
        return <XCircle size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Fetching your history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold mb-2">
              <History size={20} />
              <span>Your Contributions</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-900">Donation History</h1>
          </div>
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-emerald-600 transition-all active:scale-95"
          >
            <span>Make New Donation</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        {error ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
            <p className="text-red-500 font-medium mb-6">{error}</p>
            <Link to="/signup" className="text-emerald-600 font-bold hover:underline">
              Login or Sign Up →
            </Link>
          </div>
        ) : donations.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 text-center border border-slate-200 shadow-sm">
            <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No donations yet</h3>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">
              You haven't made any donations yet. Start your journey of giving today!
            </p>
            <Link
              to="/donate"
              className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all"
            >
              Donate Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {donations.map((donation) => (
              <div
                key={donation._id}
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center gap-6"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 border ${getStatusStyle(donation.status)}`}>
                      {getStatusIcon(donation.status)}
                      {donation.status}
                    </span>
                    <span className="text-slate-400 text-xs font-medium">
                      {new Date(donation.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 capitalize">
                    {donation.type} Donation
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {donation.details.amount && (
                      <div className="text-sm">
                        <span className="text-slate-400 block mb-0.5">Amount</span>
                        <span className="text-slate-700 font-bold text-lg">₹{donation.details.amount}</span>
                      </div>
                    )}
                    {donation.details.items && (
                      <div className="text-sm">
                        <span className="text-slate-400 block mb-0.5">Items</span>
                        <span className="text-slate-700 font-semibold">{donation.details.items}</span>
                      </div>
                    )}
                    {donation.details.quantity && (
                      <div className="text-sm">
                        <span className="text-slate-400 block mb-0.5">Quantity</span>
                        <span className="text-slate-700 font-semibold">{donation.details.quantity}</span>
                      </div>
                    )}
                    {donation.details.notes && (
                      <div className="text-sm sm:col-span-2">
                        <span className="text-slate-400 block mb-0.5">Notes</span>
                        <p className="text-slate-600 italic">"{donation.details.notes}"</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-6 md:pt-0 md:pl-8 md:border-l border-slate-100 flex flex-col items-center justify-center text-center px-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mb-2">
                    <History size={24} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Reference ID</span>
                  <span className="text-xs font-mono text-slate-500">{donation._id.substring(donation._id.length - 8).toUpperCase()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyDonations;
