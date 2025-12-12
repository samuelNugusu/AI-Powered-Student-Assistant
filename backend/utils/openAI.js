// backend/utils/openAI.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function chatWithOpenAI(messages = [{ role: "user", content: "Hello AI" }]) {
  // your screenshot used this pattern:
  const response = await client.chat.completions.create({
    model: "gpt-4",
    messages
  });

  // adjust based on response shape - usually choices[0].message
  const content = response?.choices?.[0]?.message?.content ?? null;
  return { raw: response, text: content };
}
