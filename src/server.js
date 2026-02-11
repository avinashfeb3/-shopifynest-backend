import dotenv from "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";

// define port
const PORT = process.env.PORT || 3000;

// create test api endpoint
// app.get("/test", (req, res) => {
//     res.send("<h1>This is our test api endpoint</h1>");
// });

// Database connection
connectDB().then(() => {
  // start server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
})
.catch((err) => {
    console.error("Failed to start server due to database connection error:", err);
})