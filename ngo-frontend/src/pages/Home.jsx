import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Heart, Users, Shield, Send, CheckCircle } from "lucide-react";

function Home() {

  return (
    <div className="smooth-scroll">
      {/* 1. HERO SECTION */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_bg.png"
            alt="Hero Background"
            className="w-full h-full object-cover scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-dark/80 to-secondary/40"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h2 className="text-accent font-bold uppercase tracking-[0.3em] mb-4 text-sm md:text-base animate-fade-in-up">
            WELCOME TO REAL LIFE REAL PEOPLE
          </h2>
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in-up delay-200">
            Best Way To Make A <span className="text-accent underline decoration-white/20 underline-offset-8">Difference</span> <br />
            In The Lives Of Others
          </h1>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up delay-500">
            <Link to="/about" className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-sm font-bold transition-all shadow-xl hover:-translate-y-1">
              LEARN MORE
            </Link>
            <Link to="/contact" className="bg-white hover:bg-gray-100 text-secondary px-10 py-4 rounded-sm font-bold transition-all shadow-xl hover:-translate-y-1">
              CONTACT US
            </Link>
          </div>
        </div>
      </section>

      {/* 2. ACTION CARDS */}
      <section className="relative z-20 -mt-16 px-6 lg:px-20 max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 shadow-2xl overflow-hidden rounded-sm">
          {/* Card 1: Volunteer */}
          <div className="bg-[#f39c12] p-10 text-white group hover:bg-[#e67e22] transition-colors">
            <div className="text-5xl mb-6 opacity-80 group-hover:scale-110 transition-transform">🤝</div>
            <h3 className="text-2xl font-bold mb-4">Become a Volunteer</h3>
            <p className="text-white/80 leading-relaxed mb-8">
              Becoming a volunteer is a great way to contribute to your community, gain new skills and experiences, and make a positive impact on the world around you.
            </p>
            <Link to="/user-signup" className="inline-block border-2 border-white px-8 py-2 font-bold hover:bg-white hover:text-[#f39c12] transition-all">
              JOIN NOW
            </Link>
          </div>

          {/* Card 2: Fundraising */}
          <div className="bg-[#2ecc71] p-10 text-white group hover:bg-[#27ae60] transition-colors">
            <div className="text-5xl mb-6 opacity-80 group-hover:scale-110 transition-transform">💰</div>
            <h3 className="text-2xl font-bold mb-4">Quick Fundraising</h3>
            <p className="text-white/80 leading-relaxed mb-8">
              With your help, we can continue to make a positive impact on the community and create lasting change. Thank you for your support!
            </p>
            <Link to="/contact" className="inline-block border-2 border-white px-8 py-2 font-bold hover:bg-white hover:text-[#2ecc71] transition-all">
              CONTACT US
            </Link>
          </div>

          {/* Card 3: Donation */}
          <div className="bg-[#2980b9] p-10 text-white group hover:bg-[#2471a3] transition-colors relative overflow-hidden">
            <div className="text-5xl mb-6 opacity-80 group-hover:scale-110 transition-transform">🙏</div>
            <h3 className="text-2xl font-bold mb-4">Make Donation</h3>
            <p className="text-white/80 leading-relaxed mb-8">
              Every contribution makes a difference, and we appreciate your support. Your donate helps us provide basic needs like food and shelter.
            </p>
            <Link to="/donate" className="inline-block border-2 border-white px-8 py-2 font-bold hover:bg-white hover:text-[#2980b9] transition-all">
              CONTRIBUTE NOW
            </Link>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section className="py-24 px-6 lg:px-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">

        {/* Background Blur Effects */}
        <div className="absolute top-40 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">

          {/* 🔥 Heading */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-2 rounded-full mb-4">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span className="text-primary font-semibold text-sm tracking-wide">
                ABOUT OUR FOUNDATION
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-secondary leading-tight">
              Creating Impact Through
              <span className="text-primary block mt-2">
                Compassionate Action
              </span>
            </h2>
          </div>

          {/* 🔥 Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* 🟢 LEFT SIDE */}
            <div className="space-y-8">

              {/* Mission Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl">
                    🎯
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-secondary mb-2">
                      Our Mission
                    </h3>

                    <p className="text-gray-600 leading-relaxed">
                      "Real Life Real People" is a non-profit organization established in 2010
                      to create a poverty-free world through sustainable development initiatives.
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-lg">
                Based in Pimpri, Pune, we focus on providing healthcare, shelter, and education
                to marginalized communities, delivering immediate help and long-term sustainable solutions.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "15+", label: "Years of Service" },
                  { value: "50K+", label: "Lives Impacted" },
                  { value: "200+", label: "Volunteers" },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 text-center shadow-md">
                    <div className="text-2xl font-bold text-primary">{item.value}</div>
                    <div className="text-xs text-gray-500">{item.label}</div>
                  </div>
                ))}
              </div>


              {/* Button */}
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:bg-primary-dark transition"
              >
                Learn More
              </Link>
            </div>

            {/* 🟢 RIGHT SIDE (FIXED IMAGE POSITION) */}
            <div className="space-y-6 -mt-6 lg:-mt-10">

              {/* Main Image */}
              <div className="relative group">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/images/image1.png"
                    alt="Community"
                    className="w-full h-80 object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-lg p-3">
                  <p className="text-primary font-semibold text-sm">
                    🤝 Helping Communities
                  </p>
                  <p className="text-gray-600 text-xs">
                    Providing essential support
                  </p>
                </div>
              </div>

              {/* Second Image */}
              <div className="relative group">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/images/image2.png"
                    alt="Healthcare"
                    className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-lg p-3">
                  <p className="text-primary font-semibold text-sm">
                    🏥 Healthcare Support
                  </p>
                  <p className="text-gray-600 text-xs">
                    Medical assistance programs
                  </p>
                </div>
              </div>

              {/* Quote */}
              <div className="bg-gradient-to-r from-primary to-green-700 text-white rounded-xl p-4 text-center shadow-md">
                <p className="text-sm italic font-medium">
                  "We can't help everyone, but everyone can help someone."
                </p>
                <p className="text-xs mt-1 opacity-80">
                  - Real Life Real People Foundation
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. STATS SECTION */}
      <section className="relative py-24 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/stats_bg.png"
            alt="Stats Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-secondary/90 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 px-6 lg:px-20 max-w-7xl mx-auto">
          <div className="mb-16">
            <h4 className="text-accent font-bold uppercase tracking-widest mb-4">Our Funfact</h4>
            <h2 className="text-3xl md:text-5xl font-bold max-w-2xl leading-tight">
              "You Have The Power Today To Change Tomorrow"
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: 'People Saved', count: '150,000 +' },
              { label: 'Total Volunteers', count: '150 +' },
              { label: 'Campaigns Running', count: '5 +' },
              { label: 'Working Country', count: 'India' }
            ].map((stat, idx) => (
              <div key={idx} className="border-l-4 border-accent pl-8 py-2">
                <p className="text-4xl md:text-5xl font-black mb-2">{stat.count}</p>
                <p className="text-white/60 font-bold uppercase tracking-widest text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CONTACT / QUERY SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="px-6 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="bg-white p-12 rounded-sm shadow-xl border-t-8 border-primary">
            <h3 className="text-3xl font-bold text-secondary mb-2">Have a Query</h3>
            <p className="text-gray-500 mb-10">Let us know how to get back to you.</p>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-secondary mb-2">First Name *</label>
                  <input type="text" placeholder="Enter your first name here" className="w-full bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary h-14" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-secondary mb-2">Last Name *</label>
                  <input type="text" placeholder="Enter your last name here" className="w-full bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary h-14" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-secondary mb-2">Email Address *</label>
                <input type="email" placeholder="Add email" className="w-full bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary h-14" />
              </div>
              <div>
                <label className="block text-sm font-bold text-secondary mb-2">How can we help? *</label>
                <textarea placeholder="Add text" className="w-full bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary h-40 resize-none pt-4"></textarea>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-md font-bold transition-all w-full md:w-auto shadow-lg uppercase text-sm tracking-widest">
                Send Message
              </button>
            </form>
          </div>

          <div>
            <h4 className="text-accent font-bold uppercase mb-4">Help Us</h4>
            <h2 className="text-4xl font-extrabold text-secondary mb-8">Your Donation Can Change Someone's Life</h2>
            <p className="text-gray-500 mb-12 text-lg">
              Even a small donation can make a significant difference in someone's life, whether it's providing access to basic needs like food and shelter, or supporting education and healthcare initiatives.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center text-accent text-2xl shrink-0">🕒</div>
                <div>
                  <h4 className="font-bold text-secondary mb-1">Opening Hours</h4>
                  <p className="text-gray-500">Monday - Sunday: 08.00 AM - 15.00 PM</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl shrink-0">📞</div>
                <div>
                  <h4 className="font-bold text-secondary mb-1">Contact</h4>
                  <p className="text-gray-500">M.A. Husain Founder (RLRP Since 2010)</p>
                  <p className="font-bold text-secondary">+91 9595 290 100</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center text-secondary text-2xl shrink-0">📍</div>
                <div>
                  <h4 className="font-bold text-secondary mb-1">Address</h4>
                  <p className="text-gray-500">Real Life Real People + Y.C.M. Hospital</p>
                  <p className="text-gray-500">Yashwantrao Chavan Memorial Hospital, Cabin No. 03 A, Floor Level, Sant Tukaram Nagar, Pimpri, Pune - 411018</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 7. FOOTER (Simplified) */}
      <footer className="bg-secondary p-12 text-center border-t border-white/10">
        <p className="text-white/40 font-medium">© 2026 Real Life Real People Foundation. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
