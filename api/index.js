import dotenv from "dotenv";
import { connectDB } from "../src/config/db.js";
import express from "express";
import cors from "cors";
import userAuthRouter from "../src/routes/auth.route.js";
import adminAuthRouter from "../src/routes/admin/admin.auth.route.js";
import categoryRouter from "../src/routes/admin/category.route.js";
import subcategoryRouter from "../src/routes/admin/subcategory.route.js";
import brandRouter from "../src/routes/admin/brand.route.js";

// Load environment variables
dotenv.config();

// initialize express app
const app = express();

// define cors options
const defaultOrigins = [
	"http://localhost:5173",
	"https://shopifynest.vercel.app",
];

const allowedOrigins = (process.env.CLIENT_ORIGINS || "")
	.split(",")
	.map((origin) => origin.trim())
	.filter(Boolean);

const allowedOriginPatterns = (process.env.CLIENT_ORIGIN_PATTERNS || "")
	.split(",")
	.map((pattern) => pattern.trim())
	.filter(Boolean)
	.map((pattern) => new RegExp(pattern));

app.use(
	cors({
		origin: (origin, callback) => {
			const isAllowed =
				!origin ||
				allowedOrigins.includes(origin) ||
				defaultOrigins.includes(origin) ||
				allowedOriginPatterns.some((pattern) => pattern.test(origin));
			if (isAllowed) {
				return callback(null, true);
			}
			return callback(new Error(`CORS blocked: ${origin}`));
		},
		credentials: true,
	})
);

// define express to accept 20kb json payloads
app.use(express.json({ limit: "20kb" }));

// define urlencoded to accept 20kb payloads
app.use(express.urlencoded({ limit: "20kb" }));
app.use(express.static("public"));

// Root route
app.get("/", (req, res) => {
	res.status(200).json({
		success: true,
		message: "ShopifyNest API is running",
		version: "1.0.0",
		endpoints: {
			auth: "/api/v1/auth",
			admin: {
				auth: "/api/v1/admin/auth",
				categories: "/api/v1/admin/categories",
				subCategories: "/api/v1/admin/sub-categories",
				brands: "/api/v1/admin/brands"
			}
		}
	});
});

// user authentication routes
app.use("/api/v1/auth", userAuthRouter);

// Admin authentication routes
app.use("/api/v1/admin/auth", adminAuthRouter);

// Admin category routes
app.use("/api/v1/admin/categories", categoryRouter);

// Admin subcategory routes
app.use("/api/v1/admin/sub-categories", subcategoryRouter);

// Admin Brand routes
app.use("/api/v1/admin/brands", brandRouter);

// Connect to database before handling requests
let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (error) {
      console.error("Database connection error:", error);
      return res.status(500).json({
        success: false,
        message: "Database connection failed",
        error: error.message
      });
    }
  }
  
  // Let Express handle the request
  return app(req, res);
}
