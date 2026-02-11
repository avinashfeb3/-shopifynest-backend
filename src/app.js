import express from "express";
import cors from "cors";
import userAuthRouter from "./routes/auth.route.js";
import adminAuthRouter from "./routes/admin/admin.auth.route.js";
import categoryRouter from "./routes/admin/category.route.js";
import subcategoryRouter from "./routes/admin/subcategory.route.js";
import brandRouter from "./routes/admin/brand.route.js";

// initialize express app
const app = express();

// define cors options
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// define express to accept 20kb json payloads
app.use(express.json({ limit: "20kb" }));

// define urlencoded to accept 20kb payloads
app.use(express.urlencoded({ limit: "20kb" }));
app.use(express.static("public"));

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

export default app;
