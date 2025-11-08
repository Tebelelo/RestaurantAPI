import jwt from "jsonwebtoken";
import { getStaffMemberById } from "../models/staffModel.js";
import { getCustomerById } from "../models/customerModel.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to the request
      // Check if it's a staff member or a customer based on the token payload
      if (decoded.role) {
        req.user = await getStaffMemberById(decoded.id);
      } else {
        req.user = await getCustomerById(decoded.id);
      }

      // Exclude password from the user object
      if (req.user && req.user.password) {
        delete req.user.password;
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `User role '${req.user.role}' is not authorized to access this route`,
      });
    }
    next();
  };
};