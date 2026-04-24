import { useState } from "react";
import { Sparkles, Loader2, ChevronRight, Lightbulb } from "lucide-react";
import axios from "axios";
import API_URL from "../config";

const DonationAISuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSuggestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/api/ai/donation-suggestions`);
      setSuggestions(response.data.suggestions);
    } catch (err) {
      console.error("Error fetching AI suggestions:", err);
      setError("Could not load suggestions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-sm overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Sparkles size={120} className="text-emerald-600" />
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-emerald-600 font-bold mb-2">
              <Sparkles size={20} />
              <span>AI Donation Assistant</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Unsure what to donate?
            </h2>
            <p className="text-slate-600">
              Our Smart Assistant can suggest the most needed items based on the current season and regional requirements in India.
            </p>
          </div>
          
          <button
            onClick={fetchSuggestions}
            disabled={loading}
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Asking AI...</span>
              </>
            ) : (
              <>
                <span>Get Suggestions</span>
                <ChevronRight size={20} />
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-8 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
            {error}
          </div>
        )}

        {suggestions.length > 0 && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-white transition-all group/item"
              >
                <div className="mt-1 p-1 bg-emerald-100 text-emerald-600 rounded-lg group-hover/item:bg-emerald-600 group-hover/item:text-white transition-colors">
                  <Lightbulb size={16} />
                </div>
                <p className="text-slate-700 leading-snug">{suggestion}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationAISuggestions;
