import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Shirt, Utensils, IndianRupee, Package, ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import axios from "axios";

const DonationForm = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    amount: "",
    items: "",
    quantity: "",
    notes: "",
  });

  const config = {
    clothes: {
      title: "Donate Clothes",
      icon: Shirt,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      fields: ["items", "quantity", "notes"],
      placeholders: {
        items: "e.g., Winter jackets, school uniforms",
        quantity: "e.g., 5 pairs, 2 boxes",
        notes: "Any specific details about condition or sizes?",
      },
    },
    food: {
      title: "Donate Food",
      icon: Utensils,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      fields: ["items", "quantity", "notes"],
      placeholders: {
        items: "e.g., Rice bags, biscuits, cooked meals",
        quantity: "e.g., 10kg, 50 packets",
        notes: "Expiry date or dietary information?",
      },
    },
    money: {
      title: "Donate Money",
      icon: IndianRupee,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      fields: ["amount", "notes"],
      placeholders: {
        amount: "Enter amount in INR",
        notes: "Any specific cause you'd like to support?",
      },
    },
    essentials: {
      title: "Donate Essentials",
      icon: Package,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      fields: ["items", "quantity", "notes"],
      placeholders: {
        items: "e.g., Blankets, soaps, medicines",
        quantity: "e.g., 20 units, 5 kits",
        notes: "Brand or specific usage instructions?",
      },
    },
  };

  const currentConfig = config[type] || config.clothes;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("userToken");

    if (!token) {
      setError("Please login to make a donation.");
      setLoading(false);
      setTimeout(() => navigate("/user-login"), 1500);
      return;
    }

    try {
      const payload = {
        type,
        details: formData,
      };

      await axios.post("http://localhost:5000/api/donations", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSubmitted(true);
      setTimeout(() => navigate("/my-donations"), 2000);
    } catch (err) {
      console.error("Donation Error:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("userToken");
        setError("Your session has expired. Please login again.");
        setTimeout(() => navigate("/user-login"), 2000);
      } else {
        setError(err.response?.data?.msg || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-xl border border-emerald-100 text-center animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Thank You!</h2>
          <p className="text-slate-600 mb-8">
            Your donation request has been submitted successfully. We will contact you shortly if needed.
          </p>
          <div className="inline-flex items-center gap-2 text-emerald-600 font-semibold animate-pulse">
            <span>Redirecting to your donations</span>
            <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
            <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
            <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate("/donate")}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 font-medium transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Back to Categories</span>
        </button>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className={`p-8 ${currentConfig.bgColor} flex items-center gap-4`}>
            <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm ${currentConfig.color}`}>
              <currentConfig.icon size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{currentConfig.title}</h1>
              <p className="text-slate-600 text-sm">Please provide details for your generous contribution</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm">
                {error}
              </div>
            )}

            {currentConfig.fields.includes("amount") && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Donation Amount</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <IndianRupee size={18} />
                  </div>
                  <input
                    type="number"
                    name="amount"
                    required
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder={currentConfig.placeholders.amount}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-medium"
                  />
                </div>
              </div>
            )}

            {currentConfig.fields.includes("items") && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Items Description</label>
                <input
                  type="text"
                  name="items"
                  required
                  value={formData.items}
                  onChange={handleChange}
                  placeholder={currentConfig.placeholders.items}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-medium"
                />
              </div>
            )}

            {currentConfig.fields.includes("quantity") && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Quantity / Weight</label>
                <input
                  type="text"
                  name="quantity"
                  required
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder={currentConfig.placeholders.quantity}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-medium"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Additional Notes</label>
              <textarea
                name="notes"
                rows="4"
                value={formData.notes}
                onChange={handleChange}
                placeholder={currentConfig.placeholders.notes}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-medium resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all disabled:opacity-50 active:scale-[0.98] shadow-lg shadow-slate-200 mt-4"
            >
              {loading ? (
                <>
                  <Loader2 size={24} className="animate-spin text-white" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Submit Donation</span>
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-400 text-sm mt-8 px-8">
          By submitting, you agree to donate items in good condition. For cash donations, you will receive a digital receipt once verified.
        </p>
      </div>
    </div>
  );
};

// Simple loader helper for the button
const Loader2 = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export default DonationForm;
