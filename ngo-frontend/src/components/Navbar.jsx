import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Home, Info, Image, Users, Mail, LayoutDashboard, Heart, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = (type) => {
    if (type === 'admin') {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminRole");
    } else {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userName");
    }
    setIsMenuOpen(false);
    navigate("/");
  };

  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("userToken");
  const userName = localStorage.getItem("userName");

  const navLinks = [
    { name: "HOME", path: "/", icon: <Home size={18} /> },
    { name: "ABOUT", path: "/about", icon: <Info size={18} /> },
    { name: "GALLERY", path: "/gallery", icon: <Image size={18} /> },
    { name: "VOLUNTEER", path: "/volunteer", icon: <Users size={18} /> },
    { name: "CONTACT", path: "/contact", icon: <Mail size={18} /> },
  ];

  if (userToken) {
    navLinks.push({ name: "MY DONATIONS", path: "/my-donations", icon: <Heart size={18} /> });
  } else if (adminToken) {
    navLinks.push({ name: "ADMIN DASHBOARD", path: "/admin/dashboard", icon: <LayoutDashboard size={18} /> });
  } else {
    navLinks.push({ name: "ADMIN LOGIN", path: "/signup", icon: <User size={18} /> });
  }

  return (
    <header className="w-full relative z-50">
      {/* Top Bar */}
      <div className="bg-[#1f6f5d] text-white py-2 px-4 lg:px-20 flex justify-between items-center text-[10px] sm:text-xs md:text-sm font-medium">
        <div className="flex gap-2 sm:gap-6 items-center">
          <span className="truncate max-w-[150px] sm:max-w-none">🏠 तुकाराम नगर, पुणे</span>
          <span className="hidden md:inline">✉️ rlrpindia@gmail.com</span>
          <span className="hidden sm:inline">📞 24/7 Support</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {userToken ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-yellow-400 font-bold hidden xs:inline">Hi, {userName}</span>
              <button 
                onClick={() => handleLogout('user')}
                className="bg-white/10 hover:bg-white/20 px-2 py-1 rounded text-[10px] sm:text-xs transition"
              >
                LOGOUT
              </button>
            </div>
          ) : adminToken ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-yellow-400 font-bold hidden xs:inline">Admin Mode</span>
              <button 
                onClick={() => handleLogout('admin')}
                className="bg-white/10 hover:bg-white/20 px-2 py-1 rounded text-[10px] sm:text-xs transition font-black"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <Link to="/user-login" className="hover:text-yellow-400 transition hidden xs:inline">USER LOGIN</Link>
          )}

          <Link
            to="/donate"
            className="bg-gray-200 text-black px-3 sm:px-5 py-1.5 sm:py-2 font-bold hover:bg-white transition text-[10px] sm:text-xs rounded-sm"
          >
            DONATE
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white py-3 px-4 lg:px-20 flex justify-between items-center shadow-sm relative">
        {/* Logo */}
        <div className="flex-shrink-0 w-20 sm:w-24 lg:w-28">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <img src={logo} alt="logo" className="w-full transition-all" />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex justify-center flex-1 mx-4">
          <div className="bg-[#1f6f5d] px-6 xl:px-8 py-2.5 rounded-full flex items-center gap-4 xl:gap-8 text-white font-[500] text-sm shadow-md">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={isActive(link.path) ? "text-yellow-400 scale-105 transition-transform whitespace-nowrap font-bold" : "hover:text-yellow-400 transition-colors whitespace-nowrap"}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu Toggle Button / Desktop Right Spacer */}
        <div className="flex-shrink-0 w-20 sm:w-24 lg:w-28 flex justify-end">
          <button 
            className="lg:hidden p-2 text-[#1f6f5d] hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden"
            />
            
            {/* Menu Content */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-gradient-to-b from-[#0f172a] to-[#1e3a8a] text-white shadow-2xl lg:hidden flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 backdrop-blur-md">
                <div className="bg-white p-2 rounded-lg">
                  <img src={logo} alt="logo" className="w-16" />
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-3 flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all border ${
                      isActive(link.path) 
                        ? "bg-[#1f6f5d] text-white border-[#1f6f5d] shadow-lg shadow-[#1f6f5d]/30 scale-[1.02]" 
                        : "text-gray-200 border-transparent hover:bg-white/5 hover:border-white/10"
                    }`}
                  >
                    <span className={isActive(link.path) ? "text-yellow-400" : "text-yellow-400/80"}>
                      {link.icon}
                    </span>
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="p-6 border-t border-white/10 space-y-4 bg-white/5 backdrop-blur-md">
                {!userToken && !adminToken && (
                  <Link 
                    to="/user-login" 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 w-full px-5 py-4 text-gray-200 font-bold hover:bg-white/5 rounded-2xl border border-transparent hover:border-white/10 transition-all"
                  >
                    <User size={20} className="text-yellow-400" />
                    USER LOGIN
                  </Link>
                )}
                
                {(userToken || adminToken) && (
                  <button 
                    onClick={() => handleLogout(adminToken ? 'admin' : 'user')}
                    className="flex items-center gap-3 w-full px-5 py-4 text-red-400 font-bold hover:bg-red-500/10 rounded-2xl border border-transparent hover:border-red-500/20 transition-all"
                  >
                    <LogOut size={20} />
                    LOGOUT
                  </button>
                )}

                <Link 
                  to="/donate" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-[#1f6f5d] text-white py-4 rounded-2xl font-black shadow-xl shadow-[#1f6f5d]/40 hover:scale-[1.03] active:scale-[0.97] transition-all border border-[#1f6f5d]"
                >
                  <Heart size={20} className="text-yellow-400 fill-yellow-400" />
                  DONATE NOW
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;