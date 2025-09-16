import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const protect = (req, res, next) => {
  console.log("🔍 Incoming headers:", req.headers);

  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
    console.log("🔹 Raw Authorization:", req.headers.authorization);
  }

  if (!token) {
    console.log("❌ No token found in headers");
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded token:", decoded);

    req.user = {
      id: decoded.id,
      role: decoded.role,
      _id: new mongoose.Types.ObjectId(decoded.id),
    };

    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Not authorized" });
    }
    next();
  };
};
