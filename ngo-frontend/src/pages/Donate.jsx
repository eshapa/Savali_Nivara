import { useNavigate, Link } from "react-router-dom";
import { Shirt, Utensils, IndianRupee, Package, Heart, Lock, ShieldCheck, ArrowRight, Pill } from "lucide-react";
import DonationAISuggestions from "../components/DonationAISuggestions";
import { motion, AnimatePresence } from "framer-motion";

function Donate() {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");

  const categories = [
    {
      id: "money",
      title: "Money Donation",
      icon: IndianRupee,
      description: "Financial support for medical needs, shelter maintenance, and resident care.",
      color: "bg-emerald-100 text-emerald-700",
      delay: 0.1
    },
    {
      id: "food",
      title: "Food Donation",
      icon: Utensils,
      description: "Provide nutritious cooked meals or raw food materials for our residents.",
      color: "bg-[#e8f5e9] text-[#2e7d32]",
      delay: 0.2
    },
    {
      id: "clothes",
      title: "Clothes",
      icon: Shirt,
      description: "Donate gently used or new clothes suitable for adults and elderly.",
      color: "bg-blue-100 text-blue-700",
      delay: 0.3
    },
    {
      id: "essentials",
      title: "Daily Essentials",
      icon: Package,
      description: "Contribute blankets, toiletries, cleaning supplies, and daily needs.",
      color: "bg-indigo-100 text-indigo-700",
      delay: 0.4
    },
    {
      id: "medicines",
      title: "Medicines & Support",
      icon: Pill,
      description: "Donate unexpired medicines, wheelchairs, or other medical support items.",
      color: "bg-rose-100 text-rose-700",
      delay: 0.5
    },
  ];

  if (!userToken) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-lg w-full bg-white rounded-3xl p-10 shadow-2xl border border-gray-100 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1f6f5d] to-[#2ecc71]" />
          
          <div className="mx-auto w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-sm ring-1 ring-gray-100">
            <Lock className="text-[#1f6f5d]" size={36} />
          </div>
          
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Login Required to Donate Securely</h2>
          
          <p className="text-slate-500 mb-8 leading-relaxed">
            At Savali Nivara, we prioritize transparency and secure tracking of every contribution. Please log in to your donor account to proceed.
          </p>

          <div className="bg-[#f8fafc] rounded-2xl p-4 mb-8 text-left border border-slate-100">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="text-emerald-600" size={20} />
              <span className="font-semibold text-slate-800">Verified Donor Tracking</span>
            </div>
            <p className="text-sm text-slate-500 pl-8">Your donations are tracked through our transparency portal from submission to distribution.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/user-login" className="flex-1 bg-[#1f6f5d] hover:bg-[#165042] text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2">
              Login to Donate
            </Link>
            <Link to="/user-signup" className="flex-1 bg-white border-2 border-[#1f6f5d] text-[#1f6f5d] hover:bg-slate-50 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
              Register Now
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-100 text-[#1f6f5d] rounded-full mb-6 shadow-sm border border-emerald-200">
            <Heart size={16} fill="currentColor" />
            <span className="text-sm font-bold tracking-widest uppercase">Verified Donor Portal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Select Donation Category
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Choose how you'd like to support Savali Nivara today. Whether financial or material, every contribution makes a profound impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: cat.delay }}
              key={cat.id}
              onClick={() => navigate(`/donate/${cat.id}`)}
              className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-50 to-transparent rounded-bl-full -z-10 opacity-50 group-hover:scale-110 transition-transform duration-500" />
              
              <div className={`w-16 h-16 ${cat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                <cat.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">{cat.title}</h3>
              <p className="text-slate-500 mb-8 leading-relaxed font-medium">
                {cat.description}
              </p>
              
              <div className="flex items-center text-[#1f6f5d] font-bold group-hover:gap-3 transition-all mt-auto absolute bottom-8">
                <span>Proceed</span>
                <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20"
        >
          <DonationAISuggestions />
        </motion.div>
      </div>
    </div>
  );
}

export default Donate;