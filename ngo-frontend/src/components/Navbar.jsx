import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
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
    navigate("/");
  };

  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("userToken");
  const userName = localStorage.getItem("userName");

  return (
    <header className="w-full">

      {/* 🔝 Top Bar */}
      <div className="bg-[#1f6f5d] text-white py-3 px-6 lg:px-20 flex justify-between items-center text-sm font-medium">
        <div className="flex gap-6 items-center">
          <span>🏠 तुकाराम नगर, पिंपरी, पुणे</span>
          <span className="hidden md:inline">✉️ rlrpindia@gmail.com</span>
          <span className="hidden md:inline">📞 24/7 Support</span>
        </div>

        <div className="flex items-center gap-4">
          {userToken ? (
            <div className="flex items-center gap-3">
              <span className="text-yellow-400 font-bold">Hi, {userName}</span>
              <button 
                onClick={() => handleLogout('user')}
                className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-xs transition"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <Link to="/user-login" className="hover:text-yellow-400 transition">USER LOGIN</Link>
          )}

          <Link
            to="/donate"
            className="bg-gray-200 text-black px-5 py-2 font-semibold hover:bg-white transition"
          >
            DONATE NOW
          </Link>
        </div>
      </div>

      {/* 🔥 Main Navbar */}
      <div className="bg-gray-100 py-4 px-6 lg:px-20 flex justify-center relative">

        <div className="hidden lg:flex bg-[#1f6f5d] px-8 py-3 rounded-full items-center gap-8 text-white font-semibold shadow-md">

          <Link to="/" className={isActive("/") ? "text-yellow-400" : "hover:text-yellow-400 Transition"}>
            HOME
          </Link>

          <Link to="/about" className={isActive("/about") ? "text-yellow-400" : "hover:text-yellow-400 transition"}>
            ABOUT
          </Link>

          {adminToken ? (
            <Link to="/admin/dashboard" className={isActive("/admin/dashboard") ? "text-yellow-400" : "hover:text-yellow-400 transition"}>
              DASHBOARD
            </Link>
          ) : (
            <Link to="/signup" className={isActive("/signup") ? "text-yellow-400" : "hover:text-yellow-400 transition"}>
              ADMIN
            </Link>
          )}

          <Link to="/gallery" className={isActive("/gallery") ? "text-yellow-400" : "hover:text-yellow-400 transition"}>
            GALLERY
          </Link>

          <Link to="/volunteer" className={isActive("/volunteer") ? "text-yellow-400" : "hover:text-yellow-400 transition"}>
            VOLUNTEER
          </Link>

          <Link to="/contact" className={isActive("/contact") ? "text-yellow-400" : "hover:text-yellow-400 transition"}>
            CONTACT
          </Link>

          {userToken && (
            <Link to="/my-donations" className={isActive("/my-donations") ? "text-yellow-400" : "hover:text-yellow-400 transition"}>
              MY DONATIONS
            </Link>
          )}
        </div>

        <div className="absolute left-6 lg:left-32 top-1/2 -translate-y-1/2">
          <Link to="/">
            <img src={logo} alt="logo" className="w-28 lg:w-30" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;