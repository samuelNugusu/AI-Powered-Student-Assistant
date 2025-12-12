import express from "express";
import { chatWithOpenAI } from "../utils/openAI.js";
const router = express.Router();

router.post("/chat", async (req, res, next) => {
  try {
    const { messages } = req.body; // messages: [{role, content}, ...]
    const reply = await chatWithOpenAI(messages);
    res.json({ ok: true, reply: reply.text });
  } catch (err) {
    next(err);
  }
});

export default router;
