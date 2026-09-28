import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { askGroq, type ChatMessage } from "@/lib/groq";
import { SUPPORT_GREETING, SUPPORT_SYSTEM_PROMPT } from "@/lib/signupSupportKnowledge";
import { SITE_URL } from "@/lib/seo";
import "./signup.css";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Get Your Free Zoho Audit + AI Support Access | Golden Trade Solutions" },
      {
        name: "description",
        content:
          "Join the Golden Trade Solutions insider list. Free 30-minute Zoho audit, 24/7 AI-powered self-service support, and a monthly Zoho automation brief from a Zoho Authorized Partner.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/signup` }],
  }),
  component: SignupPage,
});

const AUTH_URLS = {
  signup: "https://project-rainfall-936061749.development.catalystserverless.com/__catalyst/auth/signup",
  login: "https://project-rainfall-936061749.development.catalystserverless.com/__catalyst/auth/login",
  reset: "https://project-rainfall-936061749.development.catalystserverless.com/__catalyst/auth/reset-password",
} as const;

const AUTH_COPY = {
  signup: {
    h: "Create your free account",
    s: "Takes under a minute. You'll get 30 days of full AI support access and a link to book your audit. No card needed to start.",
    panel: "Continue in a new tab to finish signing up securely.",
    btn: "Continue to sign up →",
  },
  login: {
    h: "Log in to your account",
    s: "Already signed up? Log in to reach your AI Support Copilot, saved answers and billing.",
    panel: "Continue in a new tab to log in securely.",
    btn: "Continue to log in →",
  },
  reset: {
    h: "Reset your password",
    s: "Enter your work email and we'll send you a link to set a new password.",
    panel: "Continue in a new tab to reset your password securely.",
    btn: "Continue to reset password →",
  },
} as const;

type AuthKey = keyof typeof AUTH_URLS;

const CHAT_STORAGE_KEY = "gt_ai_support_history_v1";
const VIDEO_SRC = "/zoho%20singin_sup%20page.mp4";

function formatMoney(n: number) {
  return "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function loadChatHistory(): ChatMessage[] | null {
  try {
    const raw = localStorage.getItem(CHAT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : null;
  } catch {
    return null;
  }
}

function saveChatHistory(messages: ChatMessage[]) {
  try {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages.slice(-40)));
  } catch {
    /* storage unavailable (private mode, quota) — chat still works, just won't persist */
  }
}

function buildEscalateHref(messages: ChatMessage[]) {
  const transcript = messages
    .map((m) => (m.role === "user" ? "Visitor: " : "AI Support: ") + m.content)
    .join("\n\n");
  const subject = "Escalation from AI Support Copilot";
  const body =
    "Hi Golden Trade team,\n\nI'd like a consultant to take over this conversation:\n\n" +
    transcript +
    "\n\n---\nSent from the AI Support Copilot escalation link.";
  return "mailto:developer@goldentrade.solutions?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
}

function SignupPage() {
  const [authTab, setAuthTabState] = useState<AuthKey>("signup");
  const [isAuthed, setIsAuthed] = useState(false);
  const [seats, setSeats] = useState(15);

  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", content: SUPPORT_GREETING }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("loggedin") === "true") {
      setIsAuthed(true);
    }
    const saved = loadChatHistory();
    if (saved) setMessages(saved);
  }, []);

  useEffect(() => {
    if (isAuthed) {
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isAuthed]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const seatCount = Math.min(9999, Math.max(1, seats || 1));
  const total = formatMoney(seatCount * 0.88);

  async function sendMessage(e?: FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    saveChatHistory(next);
    setInput("");
    setLoading(true);

    try {
      const reply = await askGroq([{ role: "system", content: SUPPORT_SYSTEM_PROMPT }, ...next]);
      const withReply = [...next, { role: "assistant" as const, content: reply }];
      setMessages(withReply);
      saveChatHistory(withReply);
    } catch {
      const withFallback = [
        ...next,
        {
          role: "assistant" as const,
          content:
            "Sorry, something went wrong reaching support. Please try again, or email developer@goldentrade.solutions / call +63 917 140 8241.",
        },
      ];
      setMessages(withFallback);
      saveChatHistory(withFallback);
    } finally {
      setLoading(false);
    }
  }

  function handleEscalate(e: React.MouseEvent) {
    e.preventDefault();
    window.location.href = buildEscalateHref(messages);
  }

  const year = new Date().getFullYear();

  return (
    <div className="gt-signup">
      {/* ================= HERO ================= */}
      <header className="hero">
        <div className="wrap">
          <nav className="nav">
            <div className="logo">
              Golden<span>trade</span> Solutions
            </div>
            <small>
              <a href="#subscribe" style={{ textDecoration: "none", color: "rgba(255,255,255,.62)" }}>
                Pricing
              </a>
              &nbsp;·&nbsp; Zoho Authorized Partner &nbsp;·&nbsp; Serving clients globally
            </small>
          </nav>

          <div className="hero-grid">
            <div>
              <span className="eyebrow">Free 30-day trial · No credit card</span>
              <h1>
                Stop guessing what your Zoho can do. <em>Find out in 30 minutes.</em>
              </h1>
              <p className="lede">
                Create your free Golden Trade account and get a senior-led audit of your Zoho setup — plus
                round-the-clock AI support that answers your Zoho questions the moment you have them, not the next
                business day. Free for 30 days, then just 88¢ per user per month if you keep it.
              </p>

              <ul className="ticks">
                <li>
                  <span className="tick">✓</span>
                  <span>
                    <b>A free 30-minute Zoho audit</b> with a senior consultant — no sales script, no hand-off to a
                    junior.
                  </span>
                </li>
                <li>
                  <span className="tick">✓</span>
                  <span>
                    <b>24/7 AI Support Copilot</b> trained on Zoho One — CRM, Books, People, Creator, Recruit, SalesIQ
                    and more.
                  </span>
                </li>
                <li>
                  <span className="tick">✓</span>
                  <span>
                    <b>The Golden Trade Brief</b> — one monthly email of working automations, Deluge snippets and
                    Zoho release notes that actually matter.
                  </span>
                </li>
              </ul>

              <div className="assur">
                <span>✉&nbsp; Reply within 1 business day</span>
                <span>🔒&nbsp; We never sell or share your data</span>
                <span>↩&nbsp; Cancel anytime — one click</span>
              </div>
            </div>

            {/* ============ SIGNUP / LOGIN CARD ============ */}
            <div className="card" id="signup" ref={cardRef}>
              {!isAuthed ? (
                <div>
                  <h2>{AUTH_COPY[authTab].h}</h2>
                  <p className="sub">{AUTH_COPY[authTab].s}</p>

                  <div className="auth-tabs" role="tablist">
                    {(Object.keys(AUTH_COPY) as AuthKey[]).map((key) => (
                      <button
                        key={key}
                        type="button"
                        className={`auth-tab${authTab === key ? " active" : ""}`}
                        role="tab"
                        aria-selected={authTab === key}
                        onClick={() => setAuthTabState(key)}
                      >
                        {key === "signup" ? "Sign Up" : key === "login" ? "Log In" : "Forgot Password"}
                      </button>
                    ))}
                  </div>

                  <div className="auth-panel">
                    <div className="auth-panel-row">
                      <div className="auth-ico">→</div>
                      <p>{AUTH_COPY[authTab].panel}</p>
                    </div>
                    <a
                      className="btn btn-gold"
                      href={AUTH_URLS[authTab]}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ width: "100%" }}
                    >
                      {AUTH_COPY[authTab].btn}
                    </a>
                  </div>

                  <p className="auth-note">
                    Signing up asks for your name, work email and a password. No card is required and nothing is
                    charged during your 30-day trial. Unsubscribe anytime. Already a client?{" "}
                    <a href="mailto:developer@goldentrade.solutions">Email us directly</a>.
                  </p>
                </div>
              ) : (
                <div className="success">
                  <div className="badge">✓</div>
                  <h3>You're in.</h3>
                  <p>
                    Your account is set up. Check your inbox for a calendar link to book your 30-minute audit — and
                    take a look below at everything your AI Support Copilot and account now unlock. Your 30-day trial
                    starts now; we'll remind you before it ends.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ================= GATED: shown only after sign up / log in ================= */}
      {isAuthed && (
        <div id="gatedContent">
          {/* ================= METRICS ================= */}
          <div className="metrics">
            <div className="wrap metrics-grid">
              <div className="metric">
                <b>20+</b>
                <span>Implementations delivered</span>
              </div>
              <div className="metric">
                <b>98%</b>
                <span>Client retention</span>
              </div>
              <div className="metric">
                <b>50+</b>
                <span>Zoho apps mastered</span>
              </div>
              <div className="metric">
                <b>60 days</b>
                <span>Average go-live</span>
              </div>
              <div className="metric">
                <b>10+ yrs</b>
                <span>Zoho expertise</span>
              </div>
            </div>
          </div>

          {/* ================= WHAT YOU GET ================= */}
          <section className="pad">
            <div className="wrap">
              <div className="head">
                <span className="eyebrow dark">What signing up gets you</span>
                <h2>Three things arrive the moment you join.</h2>
                <p>
                  No drip-fed teaser content. You get working help from day one — because the fastest way to show
                  you what a Zoho partner is worth is to be useful before you've paid us anything.
                </p>
              </div>

              <div className="cards3">
                <div className="tile">
                  <div className="ico">🎧</div>
                  <span className="tag">Instant access</span>
                  <h3>AI Support Copilot, 24/7</h3>
                  <p>
                    Ask it anything about Zoho One — how to build a workflow rule, why your Blueprint is stuck, what
                    a Deluge error means. It answers in plain language, with the exact click-path for your app. When
                    it can't solve it, it hands the thread to a human consultant with the full context attached.
                  </p>
                </div>
                <div className="tile">
                  <div className="ico">🔍</div>
                  <span className="tag">Book anytime</span>
                  <h3>A free 30-minute audit</h3>
                  <p>
                    A senior consultant looks at your actual setup and tells you the three things costing you the
                    most time right now — duplicate data, dead workflows, licences you're paying for and not using.
                    You leave with a written summary whether or not you ever hire us.
                  </p>
                </div>
                <div className="tile">
                  <div className="ico">📬</div>
                  <span className="tag">Monthly</span>
                  <h3>The Golden Trade Brief</h3>
                  <p>
                    One email a month. A real automation we built (with the Deluge behind it), the Zoho releases
                    worth your attention, and one mistake we watched a company make so you don't repeat it. No
                    filler, no reheated press releases.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ================= AI SUPPORT DEEP DIVE ================= */}
          <section className="pad ai" id="ai-support">
            <div className="wrap">
              <div className="head">
                <span className="eyebrow">Self-service support, powered by AI</span>
                <h2>Your Zoho questions answered at 11pm on a Sunday.</h2>
                <p>
                  Most Zoho problems aren't big enough for a support ticket but are big enough to stop someone's
                  afternoon. That's the gap our AI portal closes — and it's free for every account holder.
                </p>
              </div>

              <div className="ai-grid">
                <div>
                  <ul className="ai-list">
                    <li>
                      <span className="n">1</span>
                      <div>
                        <b>Ask in plain English</b>
                        <span>
                          "Why do leads from Facebook skip my assignment rule?" — no ticket forms, no jargon
                          required.
                        </span>
                      </div>
                    </li>
                    <li>
                      <span className="n">2</span>
                      <div>
                        <b>Get the click-path, not a link dump</b>
                        <span>
                          Step-by-step instructions for your Zoho app and edition, with working Deluge where code is
                          the answer.
                        </span>
                      </div>
                    </li>
                    <li>
                      <span className="n">3</span>
                      <div>
                        <b>Escalate with one tap</b>
                        <span>
                          Not solved? The whole conversation goes to a senior consultant — you never re-explain your
                          setup from scratch.
                        </span>
                      </div>
                    </li>
                    <li>
                      <span className="n">4</span>
                      <div>
                        <b>Your history stays with you</b>
                        <span>
                          Every answer is saved to your account, so the fix you found in March is still there in
                          November.
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="chat" aria-label="Live conversation with the AI support copilot">
                  <div className="chat-top">
                    <span className="dot" />
                    <b>Golden Trade AI Support</b>
                    <small>{loading ? "Typing…" : "Online · avg reply 4s"}</small>
                  </div>
                  <div className="chat-messages" ref={scrollRef}>
                    {messages.map((m, i) => (
                      <div key={i} className={`bub ${m.role === "user" ? "user" : "bot"}`}>
                        {m.role === "user" ? (
                          m.content
                        ) : (
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                        )}
                      </div>
                    ))}
                    {loading && (
                      <div className="typing">
                        <span />
                        <span />
                        <span />
                      </div>
                    )}
                  </div>
                  <form className="chat-form" onSubmit={sendMessage}>
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about Zoho CRM, Books, People, Creator…"
                      autoComplete="off"
                      aria-label="Ask the AI Support Copilot"
                      disabled={loading}
                    />
                    <button type="submit" disabled={loading || !input.trim()}>
                      Send
                    </button>
                  </form>
                  <div className="chat-foot">
                    <span>Live AI Support Copilot, trained on Zoho One and Golden Trade Solutions.</span>
                    <a href="#" onClick={handleEscalate}>
                      Escalate to a consultant →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================= HOW IT WORKS ================= */}
          <section className="pad">
            <div className="wrap">
              <div className="head">
                <span className="eyebrow dark">How it works</span>
                <h2>One minute to sign up. No sales pressure after.</h2>
              </div>
              <div className="steps">
                <div className="step">
                  <b>STEP 01</b>
                  <h3>Create your account</h3>
                  <p>Name, work email, company. That's it. Your AI support portal link arrives immediately.</p>
                </div>
                <div className="step">
                  <b>STEP 02</b>
                  <h3>Use it free for 30 days</h3>
                  <p>
                    Ask the copilot whatever's blocking you today, and book a 30-minute slot with a senior consultant.
                    Do both. Do neither. Nothing is charged.
                  </p>
                </div>
                <div className="step">
                  <b>STEP 03</b>
                  <h3>Keep it for 88¢ a user — or don't</h3>
                  <p>
                    On day 31, subscribe at $0.88 per user per month with auto-renewal, or walk away. We email you
                    before the trial ends either way. You keep the written audit summary regardless.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ================= PRICING / SUBSCRIBE ================= */}
          <section className="pad" id="subscribe">
            <div className="wrap">
              <div className="head">
                <span className="eyebrow dark">After your 30-day trial</span>
                <h2>Free for 30 days. Then 88&cent; per user, per month.</h2>
                <p>
                  Keep the AI Support Copilot for less than a cup of coffee per team, per month. No contract, no
                  minimum seat count, no setup fee — and you only start paying on day 31.
                </p>
              </div>

              <div className="price-wrap">
                <div className="price-card">
                  <div className="price-head">
                    <span className="tag">AI Support Copilot · Monthly</span>
                    <div className="price-amt">
                      <b>$0.88</b>
                      <span>USD / user / month</span>
                    </div>
                    <p>Billed monthly · First 30 days free · Cancel anytime</p>
                  </div>

                  <div className="price-body">
                    <div className="calc">
                      <div className="calc-row">
                        <label htmlFor="seats">How many users need access?</label>
                        <input
                          type="number"
                          id="seats"
                          min={1}
                          max={9999}
                          step={1}
                          value={seats}
                          onChange={(e) => setSeats(parseInt(e.target.value, 10) || 1)}
                          aria-label="Number of users"
                        />
                      </div>
                      <div className="calc-total">
                        <span>Your monthly total after the trial</span>
                        <b>{total}</b>
                      </div>
                    </div>

                    <div className="renew">
                      <input type="checkbox" id="autorenew" defaultChecked />
                      <label htmlFor="autorenew">
                        <b>Turn on auto-renewal.</b> My card is charged the monthly total automatically on the same
                        date each month so support access never lapses. I can switch this off, change my seat count,
                        or cancel at any time from my billing portal.
                      </label>
                    </div>

                    <a className="btn btn-gold" href="mailto:developer@goldentrade.solutions" rel="noopener">
                      Get in Touch&nbsp;→
                    </a>

                    <p className="price-fine">
                      Secure checkout hosted by Zoho Billing · Visa, Mastercard and Amex accepted
                      <br />
                      You won't be charged today. Billing begins when your 30-day trial ends.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: "21px", marginBottom: "6px" }}>What the subscription keeps switched on</h3>
                  <ul className="incl">
                    <li>
                      <span className="tick2">✓</span>
                      <span>
                        <b>Unlimited AI Support Copilot questions</b> across every Zoho One app, 24 hours a day.
                      </span>
                    </li>
                    <li>
                      <span className="tick2">✓</span>
                      <span>
                        <b>One-tap escalation to a senior consultant</b> with your full conversation history
                        attached.
                      </span>
                    </li>
                    <li>
                      <span className="tick2">✓</span>
                      <span>
                        <b>Your saved answer library</b> — every fix your team has found, searchable, for as long as
                        you subscribe.
                      </span>
                    </li>
                    <li>
                      <span className="tick2">✓</span>
                      <span>
                        <b>Add or remove users any month.</b> Change the seat count and your next invoice adjusts. No
                        penalty, no renegotiation.
                      </span>
                    </li>
                    <li>
                      <span className="tick2">✓</span>
                      <span>
                        <b>The Golden Trade Brief</b> and priority booking on implementation work.
                      </span>
                    </li>
                  </ul>

                  <div className="disclosure">
                    <h4>Auto-renewal terms — in plain English</h4>
                    <p>
                      <b>What you're agreeing to:</b> $0.88 USD per user per month, charged to your card on the same
                      day each month, starting the day your 30-day free trial ends.
                    </p>
                    <p>
                      <b>It renews until you stop it.</b> There's no fixed term. The subscription continues month to
                      month until you cancel.
                    </p>
                    <p>
                      <b>How to cancel:</b> one click in your Zoho Billing customer portal, or email{" "}
                      <a href="mailto:developer@goldentrade.solutions">developer@goldentrade.solutions</a>. Cancel
                      any time before your renewal date and you're not charged again — you keep access to the end of
                      the period you've paid for.
                    </p>
                    <p>
                      <b>We'll warn you first.</b> We email you 7 days and 1 day before your trial converts, and
                      again before every renewal. No silent charges.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ================= VIDEO ================= */}
      <section className="pad" id="how-it-looks">
        <div className="wrap">
          <div className="head" style={{ margin: "0 auto 32px", textAlign: "center", maxWidth: "640px" }}>
            <span className="eyebrow dark">Take a look</span>
            <h2 style={{ marginTop: "16px" }}>See the sign-up in action.</h2>
            <p>A quick walkthrough of creating your account and logging back in.</p>
          </div>
          <div className="video-wrap">
            <div className="video-frame">
              <video controls preload="metadata" playsInline src={VIDEO_SRC}>
                Your browser doesn't support embedded video.
              </video>
            </div>
            <p className="video-caption">
              Having trouble viewing it? <a href={VIDEO_SRC}>Open the video directly</a>.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="pad" style={{ background: "var(--cream)" }}>
        <div className="wrap faq">
          <div className="head" style={{ margin: "0 auto 36px", textAlign: "center" }}>
            <h2 style={{ marginTop: 0 }}>Before you sign up</h2>
          </div>

          <details open>
            <summary>Is this actually free, or is it a trial?</summary>
            <p>
              Free. The AI support portal, the monthly brief, and the 30-minute audit cost nothing and don't require
              a card. We make money when companies hire us to implement or fix their Zoho — and the fastest way to
              earn that is to be genuinely useful first.
            </p>
          </details>
          <details>
            <summary>We're not a Zoho customer yet. Is this still for us?</summary>
            <p>
              Yes. A large part of what we do is helping companies decide whether Zoho One fits before they commit —
              and which apps they actually need versus which ones will sit unused. The audit works just as well as a
              "should we?" conversation.
            </p>
          </details>
          <details>
            <summary>How often will you email me?</summary>
            <p>
              The Golden Trade Brief is monthly. Beyond that, you'll only hear from us if you ask a question or book
              something. One click unsubscribes you from everything and keeps your portal access.
            </p>
          </details>
          <details>
            <summary>What happens when the 30-day trial ends?</summary>
            <p>
              We email you 7 days and 1 day before it ends. If you've subscribed, billing simply starts at $0.88 per
              user per month. If you haven't, your account drops to read-only — you keep your saved answers but
              can't ask new questions until you subscribe. Nothing is charged automatically unless you've actively
              subscribed and left auto-renewal on.
            </p>
          </details>
          <details>
            <summary>How does auto-renewal work, and how do I turn it off?</summary>
            <p>
              Auto-renewal charges your card the same monthly total on the same date each month, so support access
              never lapses mid-crisis. It's opt-in at checkout and switchable at any time from your Zoho Billing
              customer portal — or email us and we'll do it. Cancel before your renewal date and you aren't charged
              again; you keep access until the end of the period you've already paid for.
            </p>
          </details>
          <details>
            <summary>What counts as a "user", and can I change the number?</summary>
            <p>
              A user is one person with their own login to the AI support portal. Change the seat count any month
              from your billing portal and the next invoice adjusts — no penalty for going down, no renegotiation for
              going up. For a 15-person sales team, that's $13.20 a month.
            </p>
          </details>
          <details>
            <summary>What happens to my data?</summary>
            <p>
              It's stored in our own Zoho CRM and used to support you. We don't sell it, rent it, or pass it to
              third-party advertisers. Ask us to delete your account at any time and we will.
            </p>
          </details>
          <details>
            <summary>Can the AI see inside our Zoho account?</summary>
            <p>
              Only if you explicitly connect it. By default it answers from Zoho product knowledge and the context
              you type. Anything deeper — reading your records, running diagnostics — requires you to authorise it,
              and you can revoke that at any point.
            </p>
          </details>
          <details>
            <summary>Who actually shows up to the audit?</summary>
            <p>
              A senior consultant. Golden Trade runs on senior expertise with zero hand-offs — the person who audits
              your setup is the person who'd build it.
            </p>
          </details>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="final">
        <div className="wrap">
          <h2>Your Zoho is either working for you or quietly costing you.</h2>
          <p>
            Find out which in thirty minutes. Create a free account, get 30 days of AI support at no cost, and keep
            it afterwards for 88¢ per user per month — or don't.
          </p>
          <a className="btn btn-gold" href="#signup">
            Create my free account →
          </a>
          <a className="btn btn-ghost" href="mailto:developer@goldentrade.solutions">
            Or email a question first
          </a>
          <p style={{ marginTop: "24px", fontSize: "14px", color: "rgba(255,255,255,.55)" }}>
            No card to start · 30 days free · $0.88/user/month after · Cancel anytime
          </p>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div style={{ maxWidth: "300px" }}>
              <div className="logo" style={{ marginBottom: "10px" }}>
                Golden<span style={{ color: "var(--gold-soft)" }}>trade</span> Solutions
              </div>
              <p>Zoho Authorized Partner. One partner, every Zoho app — senior expertise, zero hand-offs.</p>
            </div>
            <div>
              <b>Contact</b>
              <p>
                <a href="mailto:developer@goldentrade.solutions">developer@goldentrade.solutions</a>
                <br />
                <a href="tel:+639171408241">+63 917 140 8241</a>
              </p>
            </div>
            <div style={{ maxWidth: "260px" }}>
              <b>Office</b>
              <p>B5L4, Sta. Monica St., Gatchalian Phase 2C, San Dionisio, Parañaque City, 1700, Philippines</p>
            </div>
            <div>
              <b>Follow</b>
              <p>
                <a href="https://www.linkedin.com/company/goldentradesolutions" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <br />
                <a href="https://www.facebook.com/zohocrmmanager" target="_blank" rel="noreferrer">
                  Facebook
                </a>
              </p>
            </div>
          </div>
          <div className="legal">
            © {year} Golden Trade Solutions. Zoho is a trademark of Zoho Corporation. Golden Trade Solutions is an
            independent Zoho Authorized Partner.
          </div>
        </div>
      </footer>
    </div>
  );
}
