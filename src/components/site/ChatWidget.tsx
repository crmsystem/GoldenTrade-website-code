import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Send, X } from "lucide-react";
import { askGroq, type ChatMessage } from "@/lib/groq";
import { RIA_GREETING, RIA_SYSTEM_PROMPT } from "@/lib/chatbotKnowledge";
import { useSalesIQ } from "@/hooks/useSalesIQ";
import { trackAnalyticsEvent } from "@/services/analytics.service";
import { buildConversationSummary, persistConversationSummary } from "@/utils/aiSummary";
import { detectIntent, getDepartmentForIntent } from "@/utils/intentDetection";
import { qualifyLead } from "@/utils/leadQualification";
import type { SalesIQVisitorData } from "@/types/salesiq";

function RiaAvatar({ className }: { className?: string }) {
  const [broken, setBroken] = useState(false);

  if (broken) {
    return (
      <div className={`bg-gradient-to-br from-brand-blue to-brand-deep text-white font-bold grid place-items-center ${className}`}>
        R
      </div>
    );
  }

  return (
    <img
      src="/ria-avatar.png"
      alt="Ria"
      onError={() => setBroken(true)}
      style={{ objectPosition: "50% 18%" }}
      className={`object-cover ${className}`}
    />
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: RIA_GREETING },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [handoffOffer, setHandoffOffer] = useState<{ summary: ReturnType<typeof buildConversationSummary>; label: string } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const visitorRef = useRef<Partial<SalesIQVisitorData>>({});
  const summaryRef = useRef<ReturnType<typeof buildConversationSummary> | null>(null);
  const { setVisitorInfo, startChat } = useSalesIQ();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) {
      trackAnalyticsEvent("chat_opened");
    } else {
      trackAnalyticsEvent("chat_closed");
    }
  }, [open]);

  function extractVisitorData(text: string): Partial<SalesIQVisitorData> {
    const extracted: Partial<SalesIQVisitorData> = {};

    const nameMatch = text.match(/(?:my name is|i am|i'm|name is|name:|name\s*=)\s+([a-zA-Z][a-zA-Z .'-]{1,40})/i);
    if (nameMatch?.[1]) extracted.name = nameMatch[1].trim();

    const emailMatch = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    if (emailMatch?.[0]) extracted.email = emailMatch[0];

    const phoneMatch = text.match(/\+?\d[\d .()-]{6,}\d/);
    if (phoneMatch?.[0]) extracted.phone = phoneMatch[0].trim();

    const companyMatch = text.match(/(?:company|organization|business|firm)(?:\s+(?:is|name|:|=))?\s+([a-zA-Z0-9 .&'-]{2,40})/i);
    if (companyMatch?.[1]) extracted.company = companyMatch[1].trim();

    return extracted;
  }

  function updateVisitorContext(text: string) {
    const extracted = extractVisitorData(text);

    if (Object.keys(extracted).length > 0) {
      const mergedVisitor = { ...visitorRef.current, ...extracted };
      visitorRef.current = mergedVisitor;
      setVisitorInfo(mergedVisitor as SalesIQVisitorData);

      if (extracted.email) {
        trackAnalyticsEvent("email_collected", { email: extracted.email });
      }

      if (extracted.phone) {
        trackAnalyticsEvent("phone_collected", { phone: extracted.phone });
      }

      const qualification = qualifyLead(text, mergedVisitor);
      if (qualification.qualified) {
        trackAnalyticsEvent("lead_qualified", {
          score: qualification.score,
          reasons: qualification.reasons,
        });
      }
    }
  }

  async function sendMessage(e?: FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setHandoffOffer(null);

    updateVisitorContext(text);
    trackAnalyticsEvent("message_sent", { text });

    const intent = detectIntent(text);
    const department = getDepartmentForIntent(intent.intent, intent.product);
    const shouldEscalate = intent.intent === "human_requested" || intent.confidence < 0.6;

    if (shouldEscalate) {
      const summary = buildConversationSummary(text, visitorRef.current);
      summaryRef.current = summary;
      persistConversationSummary(summary);
      trackAnalyticsEvent("human_requested", {
        text,
        department,
        product: intent.product,
        confidence: intent.confidence,
      });

      setMessages((m) => [...m, { role: "assistant", content: "I can connect you with a Zoho Expert now." }]);
      setHandoffOffer({ summary, label: "Connect with a Zoho Expert" });
      setLoading(false);
      return;
    }

    try {
      const reply = await askGroq([{ role: "system", content: RIA_SYSTEM_PROMPT }, ...next]);
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
      trackAnalyticsEvent("message_received", { text: reply });
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong reaching the assistant. Please try again, or reach us directly at developer@goldentrade.solutions.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleHandoff() {
    const summary = summaryRef.current ?? buildConversationSummary("", visitorRef.current);
    summaryRef.current = summary;
    persistConversationSummary(summary);
    trackAnalyticsEvent("live_chat_started", {
      summary: summary.conversationSummary,
      department: getDepartmentForIntent("human_requested", summary.interestedProduct),
    });
    startChat(summary.conversationSummary, getDepartmentForIntent("human_requested", summary.interestedProduct));
    setHandoffOffer(null);
    setMessages((m) => [...m, { role: "assistant", content: "A Zoho expert will take over from here." }]);
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, y: [0, -6, 0] }}
        transition={{
          scale: { duration: 0.4 },
          opacity: { duration: 0.4 },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[60] size-16 rounded-full shadow-2xl shadow-brand-deep/30 ring-4 ring-white overflow-hidden bg-brand-blue"
        aria-label={open ? "Close chat with Ria" : "Chat with Ria"}
      >
        {open ? (
          <span className="w-full h-full grid place-items-center text-white">
            <X size={24} />
          </span>
        ) : (
          <RiaAvatar className="w-full h-full" />
        )}
        {!open && (
          <span className="absolute bottom-0.5 right-0.5 size-4 rounded-full bg-emerald-500 ring-2 ring-white" />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-4 sm:right-6 z-[60] w-[calc(100vw-2rem)] max-w-sm h-[70vh] max-h-[600px] bg-white rounded-3xl shadow-2xl shadow-brand-deep/20 border border-brand-blue/10 flex flex-col overflow-hidden"
          >
            <div className="bg-brand-deep text-white px-5 py-4 flex items-center gap-3 shrink-0">
              <RiaAvatar className="size-10 rounded-full ring-2 ring-white/20 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm">Ria</div>
                <div className="text-[11px] text-white/60 flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-400" /> Online — Goldentrade Solutions
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-surface-mist/40">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-brand-blue text-white rounded-br-sm"
                        : "bg-white text-brand-deep border border-brand-blue/10 rounded-bl-sm shadow-sm"
                    }`}
                  >
                    {m.role === "assistant" ? (
                      <>
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ children }) => <p className="my-1.5 first:mt-0 last:mb-0">{children}</p>,
                            ul: ({ children }) => <ul className="my-1.5 ml-4 list-disc space-y-1">{children}</ul>,
                            ol: ({ children }) => <ol className="my-1.5 ml-4 list-decimal space-y-1">{children}</ol>,
                            li: ({ children }) => <li>{children}</li>,
                            strong: ({ children }) => <strong className="font-bold text-brand-deep">{children}</strong>,
                            a: ({ children, href }) => (
                              <a href={href} target="_blank" rel="noreferrer" className="text-brand-blue underline hover:text-brand-deep">
                                {children}
                              </a>
                            ),
                            h1: ({ children }) => <h3 className="font-bold text-base my-2">{children}</h3>,
                            h2: ({ children }) => <h3 className="font-bold text-base my-2">{children}</h3>,
                            h3: ({ children }) => <h3 className="font-bold text-sm my-1.5">{children}</h3>,
                            code: ({ children }) => (
                              <code className="bg-brand-blue/10 text-brand-deep rounded px-1 py-0.5 text-xs">{children}</code>
                            ),
                            table: ({ children }) => (
                              <div className="my-2 -mx-1 overflow-x-auto rounded-lg border border-brand-blue/10">
                                <table className="w-full text-xs border-collapse">{children}</table>
                              </div>
                            ),
                            thead: ({ children }) => <thead className="bg-brand-blue/5">{children}</thead>,
                            tr: ({ children }) => <tr className="border-b border-brand-blue/10 last:border-0">{children}</tr>,
                            th: ({ children }) => (
                              <th className="text-left font-bold text-brand-deep px-2.5 py-2 whitespace-nowrap">{children}</th>
                            ),
                            td: ({ children }) => <td className="px-2.5 py-2 align-top">{children}</td>,
                          }}
                        >
                          {m.content}
                        </ReactMarkdown>
                        {handoffOffer && i === messages.length - 1 && (
                          <button
                            type="button"
                            onClick={handleHandoff}
                            className="mt-2 inline-flex items-center rounded-full bg-brand-blue px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-deep"
                          >
                            {handoffOffer.label}
                          </button>
                        )}
                      </>
                    ) : (
                      <span className="whitespace-pre-wrap">{m.content}</span>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-brand-blue/10 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                        className="size-1.5 rounded-full bg-brand-blue/40"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={sendMessage} className="border-t border-brand-blue/10 p-3 flex items-center gap-2 bg-white shrink-0">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Ria about our Zoho services..."
                className="flex-1 bg-surface-mist rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="size-10 shrink-0 rounded-full bg-brand-blue text-white grid place-items-center disabled:opacity-40 hover:bg-brand-deep transition-colors"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
