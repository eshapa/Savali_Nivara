import { useState } from "react";
import axios from "axios";
import { Heart, Users, Shield, Send, CheckCircle, ArrowLeft, Star, Quote } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Volunteer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "Education",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const volunteers = [
    { name: "M A Hussain", role: "Chairman", img: "/images/Hussain.jpg" },
    { name: "Akash Satish Shirsath", role: "Project Manager", img: "/images/Akash.jpeg" },
    { name: "Datta Nivrutti waghmare", role: "Volunteer", img: "/images/Datta.jpeg" },
    { name: "Shahnawaz", role: "Project Executive", img: "/images/Shahnawaz.jpg" },
    { name: "Goutam N Thorat", role: "Project Manager", img: "/images/Gou.jpg" },
    { name: "Sachin laxman Bhodhanka", role: "Coordinator", img: "/images/Sachin.jpg" },
    { name: "Amol Bhat", role: "Caretaker", img: "/images/Amol.jpg" },
    { name: "Agnes A Fransis", role: "Social Worker", img: "/images/Agnes.jpeg" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:5000/api/volunteers", formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", interest: "Education", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      alert("Error submitting application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      
      {/* 🚀 1. AESTHETIC HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero_bg.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 to-secondary/40"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <button 
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-accent font-bold mb-8 hover:text-white transition-all bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20"
          >
            <ArrowLeft size={18} />
            BACK TO HOME
          </button>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight animate-fade-in-up">
            Our <span className="text-accent">Volunteers</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            Meeting the heartbeat of our foundation. The dedicated souls turning compassion into action every single day.
          </p>
        </div>
      </section>

      {/* 👥 2. MEET OUR VOLUNTEERS SECTION */}
      <section className="py-24 px-6 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h4 className="text-accent font-extrabold uppercase tracking-[0.4em] mb-4 text-sm">Our Dedicated Team</h4>
          <h2 className="text-4xl md:text-6xl font-black text-secondary mb-6">Meet With Them</h2>
          <div className="w-24 h-2 bg-accent mx-auto rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {volunteers.map((v, i) => (
            <div key={i} className="group relative bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden">
              <div className="relative h-64 mb-8 rounded-2xl overflow-hidden shadow-inner">
                <img 
                  src={v.img} 
                  alt={v.name} 
                  className="w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h3 className="text-xl font-bold text-secondary text-center group-hover:text-primary transition-colors">{v.name}</h3>
              <p className="text-accent font-bold text-center text-sm uppercase tracking-wider mt-2">{v.role}</p>
              
              <div className="absolute top-4 right-4 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                <Star size={18} fill="currentColor" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 💡 3. IMPACT / FUNFACT SECTION (Aesthetic) */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-secondary skew-y-3 origin-top-right translate-y-24"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="text-white">
            <h4 className="text-accent font-bold uppercase tracking-widest mb-6">Our Funfact</h4>
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight italic">
              "You Have The Power <br /> Today To Change Tomorrow"
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-12 border-l-4 border-accent pl-8 py-2">
              "We Are Real Life Real People" is an NGO dedicated to improving the lives of individuals and communities through various initiatives and programs. We focus on addressing social, economic, and environmental issues that impact communities.
            </p>
            
            <div className="bg-primary/20 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
              <Quote className="text-accent mb-6" size={40} />
              <p className="text-2xl font-black leading-relaxed">
                Give A Hand To Make <br /> The Better World
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="rounded-[4rem] overflow-hidden shadow-2xl skew-x-2 -rotate-2 border-[12px] border-white/10 hover:rotate-0 transition-all duration-700">
              <img 
                src="/images/fact.jpeg" 
                alt="Impact" 
                className="w-full h-[600px] object-cover"
              />
            </div>
            
            <div className="absolute -bottom-10 -right-10 bg-accent text-secondary p-10 rounded-full font-black text-xl shadow-2xl animate-bounce-slow max-w-[200px] text-center hidden md:block">
              15+ YEARS OF IMPACT
            </div>
          </div>
        </div>
      </section>

      {/* ✍️ 4. BECOME A VOLUNTEER FORM (Better Style) */}
      <section id="volunteer-form" className="py-24 px-6 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
            {/* Left side: Content */}
            <div className="lg:w-2/5 bg-secondary p-12 lg:p-16 text-white flex flex-col justify-between">
              <div>
                <Heart className="text-primary mb-8" size={60} />
                <h2 className="text-4xl font-black mb-6">Join The <span className="text-primary">Movement</span></h2>
                <p className="text-white/70 text-lg leading-relaxed">
                  Ready to turn your passion into purpose? Fill out the application and our team will get back to you within 48 hours.
                </p>
              </div>
              
              <div className="mt-12 space-y-6">
                {[
                  { icon: <Shield size={20} />, text: "Reliable Community Support" },
                  { icon: <Users size={20} />, text: "Lifelong Friendships" },
                  { icon: <Star size={20} />, text: "Skill Development" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-white/80 font-bold">
                    <div className="text-primary">{item.icon}</div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Form */}
            <div className="lg:w-3/5 p-12 lg:p-16">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in py-12">
                  <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-8">
                    <CheckCircle size={50} />
                  </div>
                  <h3 className="text-4xl font-black text-secondary mb-4">Application Sent!</h3>
                  <p className="text-gray-500 text-lg mb-8">We've received your data and will contact you via email shortly.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="bg-secondary text-white px-10 py-4 rounded-xl font-bold hover:bg-black transition-all shadow-xl"
                  >
                    SEND ANOTHER APPLICATION
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-secondary font-extrabold text-sm tracking-widest uppercase">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="e.g. Rahul Sharma" 
                        className="w-full bg-gray-50 border-gray-100 rounded-2xl h-16 px-6 focus:ring-primary focus:border-primary border-2"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-secondary font-extrabold text-sm tracking-widest uppercase">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="example@mail.com" 
                        className="w-full bg-gray-50 border-gray-100 rounded-2xl h-16 px-6 focus:ring-primary focus:border-primary border-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-secondary font-extrabold text-sm tracking-widest uppercase">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+91" 
                        className="w-full bg-gray-50 border-gray-100 rounded-2xl h-16 px-6 focus:ring-primary focus:border-primary border-2"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-secondary font-extrabold text-sm tracking-widest uppercase">Interest Area</label>
                      <select 
                        value={formData.interest}
                        onChange={(e) => setFormData({...formData, interest: e.target.value})}
                        className="w-full bg-gray-50 border-gray-100 rounded-2xl h-16 px-6 focus:ring-primary focus:border-primary border-2 appearance-none cursor-pointer"
                      >
                        <option value="Education">Education Support</option>
                        <option value="Healthcare">Healthcare Service</option>
                        <option value="Shelter Support">Shelter Assistance</option>
                        <option value="Food Distribution">Food Supply</option>
                        <option value="Fundraising">Fundraising Events</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-secondary font-extrabold text-sm tracking-widest uppercase">About You</label>
                    <textarea 
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Share your motivation or relevant experience..." 
                      className="w-full bg-gray-50 border-gray-100 rounded-2xl p-6 focus:ring-primary focus:border-primary border-2 resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary-dark text-white p-6 rounded-2xl font-black text-xl transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-4 group disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        SUBMIT APPLICATION
                        <Send size={24} className="group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-secondary py-16 text-center border-t border-white/5">
        <p className="text-white/40 font-bold uppercase tracking-widest text-sm">
          © 2026 Savali Nivara NGO • Real Life Real People Foundation
        </p>
      </footer>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) scale(1.05); }
          50% { transform: translateY(-15px) scale(1); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default Volunteer;
