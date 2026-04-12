const { GoogleGenerativeAI } = require("@google/generative-ai");

// @desc    Get donation suggestions from AI
// @route   POST /api/ai/donation-suggestions
// @access  Public (or Private if preferred)
const getDonationSuggestions = async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      // Return a simulated response if no API key is provided
      const suggestions = [
        "Summer is approaching: Lightweight cotton clothes are highly recommended.",
        "Monsoon season: Umbrellas, raincoats, and waterproof tarps for shelters.",
        "Food items: Rice, dal, and cooking oil are always in high demand.",
        "Hygiene kits: Soap, toothpaste, and sanitary products are essential."
      ];
      return res.json({ suggestions });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "You are an NGO assistant in India. Suggest what users should donate based on the current season in India and the general needs of homeless people. Give 4-5 bullet points.";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the response into an array of suggestions
    const suggestions = text.split('\n').filter(line => line.trim() !== "").map(line => line.replace(/^[*-]\s*/, ""));

    res.json({ suggestions });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "Failed to get suggestions from AI" });
  }
};

module.exports = { getDonationSuggestions };
