// NOTE: this key is embedded client-side because the site is a fully static deploy
// (no backend). Anyone can read it from the network tab / bundle. Rotate it if abused,
// and move this behind a small server-side proxy (e.g. a Cloudflare Worker) when you're
// ready to stop exposing it publicly.
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY as string;
const GROQ_MODEL = "openai/gpt-oss-20b";
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
      // openai/gpt-oss-20b is a reasoning model — max_tokens covers its internal
      // reasoning too, not just the visible reply, so keep enough headroom.
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
