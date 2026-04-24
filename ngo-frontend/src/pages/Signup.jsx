import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock, Shield, ArrowRight } from "lucide-react";
import API_URL from "../config";

function Signup() {
  const [isLogin, setIsLogin] = useState(true); // Default to login
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin) {
      if (!data.name) newErrors.name = "Full name is required";
      else if (data.name.length < 3) newErrors.name = "Name must be at least 3 characters";
    }

    if (!data.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = "Email is invalid";

    if (!data.password) newErrors.password = "Password is required";
    else if (data.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (!isLogin && data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (isLogin) {
        const res = await axios.post(`${API_URL}/api/auth/admin/login`, {
          email: data.email,
          password: data.password,
        });
        localStorage.setItem("adminToken", res.data.token);
        localStorage.setItem("adminRole", res.data.role);
        navigate("/admin/dashboard");
      } else {
        await axios.post(`${API_URL}/api/auth/admin/signup`, {
          name: data.name,
          email: data.email,
          password: data.password,
          role: "admin"
        });
        alert("Signup successful! Please login.");
        setIsLogin(true);
        setErrors({});
      }
    } catch (error) {
      alert(error.response?.data?.msg || error.response?.data?.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-bg-admin">
      {/* Animated Background Elements */}
      <div className="bg-shape-1"></div>
      <div className="bg-shape-2"></div>
      <div className="bg-shape-3"></div>

      <div className="form-container-admin">
        {/* Header with Admin Badge */}
        <div className="admin-header">
          <div className="admin-badge">
            <Shield size={24} />
            <span>Admin Portal</span>
          </div>
        </div>

        <h2 className="title-admin">
          {isLogin ? "Welcome Back" : "Create Admin Account"}
        </h2>

        <p className="subtitle-admin">
          {isLogin
            ? "Access the administrative control panel"
            : "Register as an authorized administrator"}
        </p>

        {/* Form */}
        <div className="form-fields">
          {!isLogin && (
            <div className="input-group">
              <div className="input-icon">
                <User size={18} />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className={errors.name ? "error" : ""}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
          )}

          <div className="input-group">
            <div className="input-icon">
              <Mail size={18} />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="input-group">
            <div className="input-icon">
              <Lock size={18} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className={errors.password ? "error" : ""}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {!isLogin && (
            <div className="input-group">
              <div className="input-icon">
                <Lock size={18} />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={data.confirmPassword}
                onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                className={errors.confirmPassword ? "error" : ""}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          )}

          {/* Security Note */}
          <div className="security-note">
            <Shield size={14} />
            <p>Secure admin access • All activities are logged</p>
          </div>

          <button
            className="btn-admin"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              <>
                {isLogin ? "Access Admin Panel" : "Register Admin Account"}
                <ArrowRight size={18} />
              </>
            )}
          </button>

          <div className="toggle-auth">
            <p>
              {isLogin ? "Don't have admin access?" : "Already have admin credentials?"}{" "}
              <span
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({});
                  setData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                  });
                }}
              >
                {isLogin ? "Request Access" : "Login to Admin"}
              </span>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .page-bg-admin {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          position: relative;
          overflow: hidden;
        }

        .bg-shape-1,
        .bg-shape-2,
        .bg-shape-3 {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.3;
          animation: float 20s infinite ease-in-out;
        }

        .bg-shape-1 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #14532d, #166534);
          top: -100px;
          left: -100px;
          animation-delay: 0s;
        }

        .bg-shape-2 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #166534, #15803d);
          bottom: -150px;
          right: -150px;
          animation-delay: 5s;
        }

        .bg-shape-3 {
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, #15803d, #14532d);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 10s;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .form-container-admin {
          max-width: 480px;
          width: 100%;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          position: relative;
          z-index: 10;
          animation: slideUp 0.5s ease-out;
          border: 1px solid rgba(20, 83, 45, 0.1);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .admin-header {
          display: flex;
          justify-content: center;
          margin-bottom: 24px;
        }

        .admin-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #14532d, #166534);
          padding: 8px 20px;
          border-radius: 100px;
          color: white;
          font-weight: 600;
          font-size: 14px;
          box-shadow: 0 4px 12px rgba(20, 83, 45, 0.2);
        }

        .title-admin {
          font-size: 32px;
          font-weight: 800;
          text-align: center;
          margin-bottom: 12px;
          background: linear-gradient(135deg, #14532d, #166534);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle-admin {
          text-align: center;
          color: #64748b;
          font-size: 14px;
          margin-bottom: 32px;
        }

        .form-fields {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-group {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          pointer-events: none;
        }

        .input-group input {
          width: 100%;
          padding: 12px 40px 12px 42px;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          font-size: 14px;
          transition: all 0.3s ease;
          background: white;
          font-family: 'Inter', sans-serif;
        }

        .input-group input:focus {
          outline: none;
          border-color: #166534;
          box-shadow: 0 0 0 3px rgba(22, 101, 52, 0.1);
        }

        .input-group input.error {
          border-color: #ef4444;
        }

        .password-toggle {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #94a3b8;
          padding: 0;
          display: flex;
          align-items: center;
          transition: color 0.3s;
        }

        .password-toggle:hover {
          color: #166534;
        }

        .error-message {
          position: absolute;
          bottom: -20px;
          left: 0;
          font-size: 11px;
          color: #ef4444;
        }

        .security-note {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px;
          background: #f8fafc;
          border-radius: 10px;
          border-left: 3px solid #166534;
          margin-top: 8px;
        }

        .security-note p {
          font-size: 11px;
          color: #475569;
          margin: 0;
        }

        .btn-admin {
          background: linear-gradient(135deg, #14532d, #166534);
          color: white;
          border: none;
          padding: 14px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 8px;
          position: relative;
          overflow: hidden;
        }

        .btn-admin:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(20, 83, 45, 0.3);
        }

        .btn-admin:active:not(:disabled) {
          transform: translateY(0);
        }

        .btn-admin:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-admin::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .btn-admin:hover::before {
          left: 100%;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .toggle-auth {
          text-align: center;
          margin-top: 16px;
        }

        .toggle-auth p {
          font-size: 13px;
          color: #64748b;
          margin: 0;
        }

        .toggle-auth span {
          color: #166534;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .toggle-auth span:hover {
          text-decoration: underline;
        }

        @media (max-width: 640px) {
          .form-container-admin {
            padding: 32px 24px;
          }
          
          .title-admin {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
}

export default Signup;