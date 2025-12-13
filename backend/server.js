import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import pool from "./config/db.js";

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Test protected route
import { authenticateToken } from "./middleware/authMiddleware.js";
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: "Protected access granted", user: req.user });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await pool.query("SELECT 1");
  console.log("Database connected successfully.");
});
