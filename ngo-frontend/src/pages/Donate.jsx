import { useNavigate } from "react-router-dom";
import { Shirt, Utensils, IndianRupee, Package, Heart } from "lucide-react";
import DonationAISuggestions from "../components/DonationAISuggestions";

function Donate() {
  const navigate = useNavigate();

  const categories = [
    {
      id: "clothes",
      title: "Clothes",
      icon: Shirt,
      description: "Donate gently used or new clothes for all ages.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: "food",
      title: "Food",
      icon: Utensils,
      description: "Provide nutritious meals or raw food materials.",
      color: "bg-orange-100 text-orange-600",
    },
    {
      id: "money",
      title: "Money",
      icon: IndianRupee,
      description: "Financial support for medical and shelter needs.",
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      id: "essentials",
      title: "Essentials",
      icon: Package,
      description: "Donate blankets, toiletries, and medicines.",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full mb-4">
            <Heart size={16} fill="currentColor" />
            <span className="text-sm font-semibold uppercase tracking-wider">Spread Love</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            How would you like to <span className="text-emerald-600">Help?</span>
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Choose a category to start your donation. Every small contribution makes a huge difference in the lives of those in need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/donate/${cat.id}`)}
              className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100 hover:border-emerald-200 transform hover:-translate-y-2"
            >
              <div className={`w-16 h-16 ${cat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <cat.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">{cat.title}</h3>
              <p className="text-slate-500 mb-6 leading-relaxed">
                {cat.description}
              </p>
              <div className="flex items-center text-emerald-600 font-semibold group-hover:gap-2 transition-all">
                <span>Donate Now</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <DonationAISuggestions />
        </div>
      </div>
    </div>
  );
}

export default Donate;