import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, Loader2 } from 'lucide-react';
import axios from 'axios';
import API_URL from '../config';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    telephone: '',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });
    try {
      await axios.post(`${API_URL}/api/contact`, formData);
      setStatus({ loading: false, success: true, error: '' });
      setFormData({ firstName: '', lastName: '', email: '', telephone: '', message: '' });
      setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Failed to send message. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header Section */}
      <div className="pt-20 pb-12 text-center bg-white border-b border-slate-100">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight mb-4 uppercase">
          Contact Us
        </h1>
        <p className="text-[#0f766e] font-semibold text-lg tracking-widest uppercase">
          "Bridging the gap between real needs and real people."
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <ContactInfoCard 
            Icon={MapPin}
            title="Office Location"
            content="Yashwantrao Chavan Memorial Hospital, Cabin No. 03 A, Floor Level, Sant Tukaram Nagar, Pimpri, Pune - 411018"
          />
          <ContactInfoCard 
            Icon={Phone}
            title="Call Us"
            content="+91 9595 290 100"
            subContent="020-67332332"
          />
          <ContactInfoCard 
            Icon={Mail}
            title="Mail Us on"
            content="rlrpindia@gmail.com"
          />
        </div>

        {/* Form and Map Layout */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-20 border border-slate-100">
          <div className="md:grid md:grid-cols-2">
            {/* Form Section */}
            <div className="p-8 md:p-12 lg:p-16 border-r border-slate-100">
              <h2 className="text-3xl font-bold text-[#0f172a] mb-2 uppercase tracking-tight">How can we serve you?</h2>
              <p className="text-slate-500 mb-10">Whether you want to volunteer, donate, or seek support, we're here to listen.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormInput 
                    label="First Name" 
                    name="firstName" 
                    value={formData.firstName} 
                    onChange={handleChange} 
                    placeholder="Enter your first name here" 
                    required 
                  />
                  <FormInput 
                    label="Last Name" 
                    name="lastName" 
                    value={formData.lastName} 
                    onChange={handleChange} 
                    placeholder="Enter your last name here" 
                    required 
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput 
                    label="Email Address" 
                    name="email" 
                    type="email"
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Add email" 
                    required 
                  />
                  <FormInput 
                    label="Telephone" 
                    name="telephone" 
                    value={formData.telephone} 
                    onChange={handleChange} 
                    placeholder="+(602) 448 763 22" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-[#0f172a] uppercase mb-2">
                    How can we help?
                  </label>
                  <p className="text-xs text-slate-400 mb-3">Feel free to ask a question or simply leave a comment</p>
                  <label className="block text-sm font-bold text-[#0f172a] mb-2">
                    Comments / Questions <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all outline-none resize-none bg-slate-50/50"
                    placeholder="Add text"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status.loading}
                  className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
                >
                  {status.loading ? (
                    <Loader2 className="animate-spin w-5 h-5" />
                  ) : (
                    <>
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {status.success && (
                  <p className="text-green-600 font-medium animate-fade-in">Message sent successfully!</p>
                )}
                {status.error && (
                  <p className="text-red-600 font-medium animate-fade-in">{status.error}</p>
                )}
              </form>
            </div>

            {/* Maps Container */}
            <div className="bg-slate-50 p-8 md:p-12 lg:p-16 flex flex-col space-y-8 h-full">
              <h2 className="text-2xl font-bold text-[#0f172a] mb-2 uppercase tracking-tight">Our Presence</h2>
              
              {/* Map 1: YCMH */}
              <div className="flex-1 min-h-[300px] rounded-2xl overflow-hidden shadow-md border border-slate-200 group">
                <div className="bg-white px-4 py-2 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-700">PCMC PGI Yashwantrao Chavan Memorial Hospital</h3>
                  <MapPin className="w-4 h-4 text-[#0f766e]" />
                </div>
                <iframe
                  title="YCM Hospital Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.201460394336!2d73.8188151752009!3d18.654950982463428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e76d913507%3A0x6b16867664654c86!2sPCMC%20PGI%20Yashwantrao%20Chavan%20Memorial%20Hospital!5e0!3m2!1sen!2sin!4v1711442000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  className="border-0 grayscale group-hover:grayscale-0 transition-all duration-500"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Map 2: Savali Nivara */}
              <div className="flex-1 min-h-[300px] rounded-2xl overflow-hidden shadow-md border border-slate-200 group">
                <div className="bg-white px-4 py-2 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-700">Real Life Real People's Savali Nivara</h3>
                  <MapPin className="w-4 h-4 text-[#0f766e]" />
                </div>
                <iframe
                  title="Savali Nivara Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.273767417435!2d73.81804797520083!3d18.652136082465493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e7289f6607%3A0xe5567a14e963bc1b!2sReal%20Life%20Real%20People's%20Savali%20Nivara!5e0!3m2!1sen!2sin!4v1711442100000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  className="border-0 grayscale group-hover:grayscale-0 transition-all duration-500"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactInfoCard = ({ Icon, title, content, subContent }) => (
  <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-50 flex flex-col items-center text-center transition-all hover:-translate-y-2 hover:shadow-2xl">
    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 text-[#0f766e]">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-xl font-bold text-[#0f172a] mb-4 uppercase tracking-tight">{title}</h3>
    <p className="text-slate-600 leading-relaxed max-w-[250px]">{content}</p>
    {subContent && <p className="text-slate-600 mt-1">{subContent}</p>}
  </div>
);

const FormInput = ({ label, required, ...props }) => (
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-bold text-[#0f172a] uppercase">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      {...props}
      className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all outline-none bg-slate-50/50"
    />
  </div>
);

export default Contact;