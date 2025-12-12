// backend/controllers/aiController.js
import OpenAI from "openai";
import Joi from "joi";
import { logAIQuery, getAIQueriesByUser } from "../models/aiModel.js";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const promptSchema = Joi.object({
  prompt: Joi.string().min(1).required()
});

export const askAI = async (req, res) => {
  try {
    const { error, value } = promptSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    // Call OpenAI
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: value.prompt }]
    });

    const text = response?.choices?.[0]?.message?.content ?? null;

    // store in DB
    await logAIQuery({ userId: req.user.id, prompt: value.prompt, responseText: text });

    res.json({ answer: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "AI request failed" });
  }
};

export const getHistory = async (req, res) => {
  try {
    const rows = await getAIQueriesByUser(req.user.id);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get history" });
  }
};
