// src/utils/explainScan.ts

import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Add this to .env when ready
});

export async function explainScan(vulnerabilities: any[]) {
  if (!process.env.OPENAI_API_KEY) {
    console.warn("OpenAI API key not set — explanation skipped.");
    return null; // no-op fallback
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4", // or "gpt-3.5-turbo" if you want to switch later
      messages: [
        {
          role: "system",
          content: "You are a cybersecurity analyst. Explain these scan results clearly to a business user.",
        },
        {
          role: "user",
          content: `Explain the following vulnerabilities:\n\n${JSON.stringify(vulnerabilities, null, 2)}`,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (err) {
    console.error("GPT error:", err);
    return null;
  }
}
