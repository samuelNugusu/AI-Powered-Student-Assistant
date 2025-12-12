import dotenv from "dotenv";
dotenv.config();

import { chatWithOpenAI } from "./utils/openAI.js";

(async () => {
  try {
    const res = await chatWithOpenAI([
      { role: "user", content: "Hello AI!" }
    ]);
    console.log("AI Response:", res.text);
  } catch (err) {
    console.error("ERROR:", err);
  }
})();
