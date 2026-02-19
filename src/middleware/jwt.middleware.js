import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {
  try {
    // Get the token from the request header
    const token = req.headers["authorization"]?.replace("Bearer ", "").trim();
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access", data: {} });
    } 
    const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decodedToken?._id);
       if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access", data: {} });
    }
    req.user = user;
    next(); 
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid token", data: {} });
  }
};

export default verifyJWT;