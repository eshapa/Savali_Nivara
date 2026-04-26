const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("DEBUG: Decoded:", decoded);

      if (decoded.role === "admin") {
        req.user = await Admin.findById(decoded.id).select("-password");
      } else {
        req.user = await User.findById(decoded.id).select("-password");
      }
      console.log("DEBUG: User Found:", req.user ? "YES" : "NO");

      if (!req.user) {
        return res.status(401).json({ msg: "Not authorized, user/admin not found" });
      }

      next();
    } catch (error) {
      console.error("Auth Error:", error.message);
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ msg: "Not authorized, token expired" });
      }
      return res.status(401).json({ msg: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ msg: "Not authorized, no token" });
  }
};

const admin = (req, res, next) => {
  if (req.user && (req.user.role === "admin" || req.user.email === "savalinivara123@gmail.com")) {
    next();
  } else {
    res.status(401).json({ msg: "Not authorized as an admin" });
  }
};

module.exports = { protect, admin };
