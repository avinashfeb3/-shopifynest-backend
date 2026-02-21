import dotenv from "dotenv";
import app from "../src/app.js";
import { connectDB } from "../src/config/db.js";

// Load environment variables
dotenv.config();

export default async function handler(req, res) {
  try {
    // Connect to database
    await connectDB();
    
    // Let Express handle the request
    return app(req, res);
  } catch (error) {
    console.error("Error in serverless function:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
}
