// backend/routes/ai.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { askAI, getHistory } from "../controllers/aiController.js";

const router = express.Router();

router.post("/ask", protect, askAI);
router.get("/history", protect, getHistory);

export default router;
