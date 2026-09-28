// NOTE: this key is embedded client-side because the site is a fully static deploy
// (no backend). Anyone can read it from the network tab / bundle. Rotate it if abused,
// and move this behind a small server-side proxy (e.g. a Cloudflare Worker) when you're
// ready to stop exposing it publicly.
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY as string;
// llama-3.3-70b-versatile isn't exposed on this account's Groq key — qwen3-27b is the
// closest available "lean but capable" chat model: fast, no hidden reasoning-token
// overhead, and follows the system prompt/markdown formatting reliably.
const GROQ_MODEL = "qwen/qwen3.8-27b";
const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

export type ChatRole = "system" | "user" | "assistant";
export type ChatMessage = { role: ChatRole; content: string };

export async function askGroq(messages: ChatMessage[]): Promise<string> {
  const response = await fetch(GROQ_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages,
      temperature: 0.4,
      max_tokens: 600,
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq API error: ${response.status}`);
  }

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content?.trim();
  if (!reply) throw new Error("Groq API returned an empty response");
  return reply;
}
