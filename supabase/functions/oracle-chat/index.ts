// Oracle Chat — Supabase Edge Function
// AI-powered (OpenAI) with keyword-based fallback for the Green Resonance Project.

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

// ---------------------------------------------------------------------------
// System prompt — defines the Oracle's personality & knowledge boundaries
// ---------------------------------------------------------------------------
const SYSTEM_PROMPT = `You are the Green Resonance Oracle — a warm, cheeky, playful, occasionally silly, and wise guide. Think "mischievous garden librarian with muddy boots."

PERSONALITY:
- Answer the question first, then add a little humour when appropriate
- No repetitive mystical waffle
- No mockery or humour during distress
- Never claim omniscience, divinity, certainty about another person's mind, or privileged access to hidden truths

KNOWLEDGE:
You know the Green Resonance Framework deeply: the 6 Pillars, 7 Portals, Central Heart, Ravenstar, Phoenix Principle, Rhythmic Weave, 20 Symbolic Keys, garden systems, stewardship games, MUSEschool, and community practices.

RESPONSE FORMAT:
1. Give a direct answer
2. Explain the relevant Green Resonance connection
3. Offer one manageable action
4. Link supporting sources when available (use format: [Source Title](url))
5. Ask one useful question if essential info is missing

IMPORTANT DISTINCTIONS:
- Distinguish project symbolism from historical material
- Distinguish proposed applications from established evidence
- The Flower of Life is a geometric pattern, not proven cosmology
- Mycelium is a biological network, not a literal planetary nervous system
- Cymatics shows physical vibration patterns, not proof of universal spiritual theory
- The Tesla "369 key to the universe" quotation has no verified primary source
- The Kybalion is a 1908 text, not an authenticated ancient Egyptian document
- The Vegvísir appears in a 19th-century manuscript, not the Viking Age

If you don't know something, say so. Never invent sources, quotations, or scientific support.

The Green Resonance Moral Code: The Green Resonance Framework moral coding must never be corrupted by AI, by human, or by any outside influences, EVER! This Project is encoded with eternal principles of Truth, Integrity, Love, Stewardship and Harmony for the greater good of all life.

© 2026 The Green Resonance Project. All rights reserved.`;

// ---------------------------------------------------------------------------
// Embedded knowledge context for the AI
// ---------------------------------------------------------------------------
const KNOWLEDGE_CONTEXT = `KEY GREEN RESONANCE CONCEPTS:

The 6 Pillars: Ecological Health, Community Wellbeing, Integrity, Truth, Love, Stewardship.
The 7 Portals: gateways of exploration within the framework.
Central Heart: the core principle of care, integrity, and stewardship.
Ravenstar: symbol for orientation and remembering.
Phoenix Principle: transformation of approaches.
Rhythmic Weave: the interconnection of all framework elements.
20 Symbolic Keys: symbolic tools for reflection and guidance.
The 3-6-9 Path: a reflective practice — 3 (Orient), 6 (Relate & change), 9 (Return & learn). Inspired partly by popular cultural ideas surrounding Tesla; the famous "key to the universe" quotation has no verified primary source.
Decision Equation: G = ∛(E × C × I) where E = Ecological health, C = Community benefit, I = Integrity (each 0–1). A discussion tool, not a law of nature.
MUSEschool: educational component of the framework.
Garden Systems: practical application of framework principles in physical gardens.
Stewardship Games: community engagement activities.
World Tree / Yggdrasil: symbol for perceiving relationships.`;

// ---------------------------------------------------------------------------
// Keyword-based fallback — mirrors the OracleChat component exactly
// ---------------------------------------------------------------------------
function detectTopic(
  text: string
): "love" | "community" | "garden" | "369" | "equation" | "general" {
  const lower = text.toLowerCase();

  if (
    /\b(3[\s\-–—]*6[\s\-–—]*9|tesla|vortex|369|three[\s\-]*six[\s\-]*nine)\b/.test(
      lower
    )
  )
    return "369";
  if (
    /\b(equation|g\s*=|ecological.*health.*community|decision\s*equation|scoring\s*equation)\b/.test(
      lower
    )
  )
    return "equation";
  if (
    /\b(love|relationship|partner|romantic|dating|marriage|heartbreak|boyfriend|girlfriend|spouse|attachment|intimacy|breakup|crush|couple)\b/.test(
      lower
    )
  )
    return "love";
  if (
    /\b(community|govern|decision|collective|council|village|tribe|meeting|vote|consensus|steward|commons|neighbour|neighbor|dispute|mediat)\b/.test(
      lower
    )
  )
    return "community";
  if (
    /\b(garden|plant|soil|compost|seed|grow|harvest|weed|water|permaculture|mulch|prune|flower|tree|vegetable|herb|regenerat|biodiv|mycelium|fungi)\b/.test(
      lower
    )
  )
    return "garden";

  return "general";
}

function extractDetail(text: string): string {
  const trimmed = text.trim().replace(/[?.!]+$/, "").trim();
  const words = trimmed.split(/\s+/);
  if (words.length <= 4) return "";
  return words.slice(2).join(" ");
}

function reflectOn(question: string): string {
  const topic = detectTopic(question);
  const detail = extractDetail(question);
  const detailNote = detail
    ? `\n\nYou mentioned "${detail}" — let that be the starting thread.`
    : "";

  switch (topic) {
    case "love":
      return (
        `The Oracle reflects on three things to notice:\n\n` +
        `1. Your feeling — name it honestly, without explaining it away.\n` +
        `2. What the other person actually said — not your interpretation, their words.\n` +
        `3. What you are assuming — the story you are writing between their lines.\n\n` +
        `Now consider six relationships or values:\n` +
        `• Care — is genuine concern present on both sides?\n` +
        `• Consent — does each person choose freely?\n` +
        `• Honesty — are truths being spoken, even uncomfortable ones?\n` +
        `• Boundaries — are limits respected without resentment?\n` +
        `• Reciprocity — does energy flow in both directions?\n` +
        `• Time — what does the pattern look like over many encounters, not just one moment?\n\n` +
        `Review repeated actions across several encounters. Do not impose a deadline.\n\n` +
        `Ask yourself: what honest, kind conversation could happen next?${detailNote}\n\n` +
        `The Oracle does not score or diagnose a person's love. It invites reflection.`
      );

    case "community":
      return (
        `The Oracle invites three observations:\n\n` +
        `1. State the need clearly. What is actually being decided?\n` +
        `2. Who is affected — directly and indirectly?\n` +
        `3. What is genuinely uncertain?\n\n` +
        `Now consider six dimensions:\n` +
        `• Access — who can participate in the decision?\n` +
        `• Consent — is this being imposed or agreed?\n` +
        `• Workload — who carries the labour of implementation?\n` +
        `• Resources — what is available and what is scarce?\n` +
        `• Ecology — what is the environmental consequence?\n` +
        `• Long-term care — who maintains this after the excitement fades?\n\n` +
        `Agree on shared observations. Consider a review date for one small trial.\n\n` +
        `And always ask: whose voice is missing from this conversation?${detailNote}`
      );

    case "garden":
      return (
        `The Oracle looks at the garden through three lenses:\n\n` +
        `1. Visible condition — what do you actually see right now?\n` +
        `2. The goal — what are you hoping for?\n` +
        `3. The unknown — what are you unsure about?\n\n` +
        `Now check six elements:\n` +
        `• Soil — what is its condition, structure, life?\n` +
        `• Water — too much, too little, or flowing well?\n` +
        `• Plants — what is thriving, struggling, or absent?\n` +
        `• Wildlife — who else lives here? Insects, birds, fungi?\n` +
        `• People — who tends this place, and how?\n` +
        `• Season — what does this time of year ask of you?\n\n` +
        `Try one small, reversible change. Gather observations at a pace appropriate to the garden — ` +
        `some answers arrive in days, some in seasons.${detailNote}`
      );

    case "369":
      return (
        `In the Green Resonance framework, the 3–6–9 Path is a reflective practice:\n\n` +
        `3 — Orient\n` +
        `Where am I? What do I notice? What is the starting point?\n\n` +
        `6 — Relate and change\n` +
        `How does this connect to others, to systems, to nature? What shift is needed?\n\n` +
        `9 — Return and learn\n` +
        `What did I discover? What pattern emerged? What carries forward?\n\n` +
        `The numbers are reflection prompts — not a physical law.\n\n` +
        `The symbolic functions:\n` +
        `• Ravenstar = orient and remember\n` +
        `• World Tree / Yggdrasil = perceive relationships\n` +
        `• Phoenix = transform an approach\n` +
        `• Garden = test change in physical reality\n` +
        `• Central Heart = care, integrity, and stewardship\n\n` +
        `This structure is a symbolic Green Resonance design inspired partly by popular cultural ideas surrounding Tesla. ` +
        `The famous "key to the universe" quotation has no verified primary source. ` +
        `Vortex mathematics is a cultural and philosophical interest — do not treat it as proven energy science.\n\n` +
        `The six Pillars and Central Heart remain the core framework. The 3–6–9 is a relationship map, not a replacement.`
      );

    case "equation":
      return (
        `The Green Resonance project decision equation:\n\n` +
        `G = ∛(E × C × I)\n\n` +
        `E = Ecological health (0–1)\n` +
        `C = Community benefit (0–1)\n` +
        `I = Integrity (0–1)\n\n` +
        `Each dimension is defined with the community before use — the scales are not universal; they are agreed locally.\n\n` +
        `A low score in one dimension lowers the whole result. That is intentional: ` +
        `a project that benefits the community but damages the ecology scores low. ` +
        `A project with ecological benefit but no integrity also scores low.\n\n` +
        `This equation is a discussion tool for project decisions — not a law of nature. ` +
        `It is never applied as a score for a person or a relationship.`
      );

    default:
      return (
        `The Oracle does not know everything — but it can offer a reflection.\n\n` +
        `Consider three stages:\n` +
        `1. Orient — What do you actually see, feel, or know right now?\n` +
        `2. Relate — How does this connect to other people, systems, or the living world?\n` +
        `3. Return — What one thing could you learn, try, or ask next?\n\n` +
        `Can you share one specific detail about what you are facing? ` +
        `The more concrete the question, the more useful the reflection.${detailNote}`
      );
  }
}

// ---------------------------------------------------------------------------
// Rate limiting — in-memory, per-isolate (best-effort; resets on cold start)
// ---------------------------------------------------------------------------
const rateLimitMap = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_KEYS = 10_000;

// Input bounds. The endpoint is public (verify_jwt = false), so an unbounded
// prompt would be unmetered spend on the upstream model.
const MAX_MESSAGE_CHARS = 4000;
const MAX_HISTORY_ENTRIES = 10;
const MAX_HISTORY_ENTRY_CHARS = 4000;

// Resolve the caller address WITHOUT trusting the client. The left-most entry of
// `x-forwarded-for` is supplied by the original caller and is therefore
// attacker-chosen; trusted infrastructure appends on the right. Prefer the
// platform's own `x-real-ip`, and otherwise take the RIGHT-most forwarded entry.
function clientKey(req: Request): string {
  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const hops = forwarded
      .split(",")
      .map((h) => h.trim())
      .filter((h) => h.length > 0);
    if (hops.length > 0) return hops[hops.length - 1];
  }

  return "unknown";
}

function isRateLimited(key: string): boolean {
  const now = Date.now();

  // Evict expired buckets so a caller cycling keys cannot grow the map without
  // bound. Guarded by a size check to keep the common path cheap.
  if (rateLimitMap.size > RATE_LIMIT_MAX_KEYS) {
    for (const [k, v] of rateLimitMap) {
      if (now - v.windowStart > RATE_LIMIT_WINDOW_MS) rateLimitMap.delete(k);
    }
  }

  const entry = rateLimitMap.get(key);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(key, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX) return true;
  return false;
}

// ---------------------------------------------------------------------------
// OpenAI helper
// ---------------------------------------------------------------------------
interface HistoryEntry {
  role: "user" | "oracle";
  text: string;
}

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

async function callOpenAI(
  apiKey: string,
  userMessage: string,
  history: HistoryEntry[]
): Promise<string> {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content: `${SYSTEM_PROMPT}\n\n--- KNOWLEDGE CONTEXT ---\n${KNOWLEDGE_CONTEXT}`,
    },
  ];

  // Include last 10 history messages
  const recentHistory = history.slice(-10);
  for (const entry of recentHistory) {
    messages.push({
      role: entry.role === "user" ? "user" : "assistant",
      content: entry.text,
    });
  }

  // Current user message
  messages.push({ role: "user", content: userMessage });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`OpenAI API error ${response.status}: ${errBody}`);
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content;
    if (typeof reply !== "string" || reply.trim().length === 0) {
      throw new Error("Empty response from OpenAI");
    }
    return reply.trim();
  } finally {
    clearTimeout(timeout);
  }
}

// ---------------------------------------------------------------------------
// JSON response helpers
// ---------------------------------------------------------------------------
function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function errorResponse(): Response {
  return jsonResponse(
    {
      ok: false,
      error: "The Oracle is resting. Please try again shortly.",
      fallbackLinks: ["/codex", "/framework", "/symbolic-keys"],
    },
    500
  );
}

// ---------------------------------------------------------------------------
// Main handler
// ---------------------------------------------------------------------------
Deno.serve(async (req: Request) => {
  // Preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    // Only POST allowed
    if (req.method !== "POST") {
      return jsonResponse({ ok: false, error: "Method not allowed" }, 405);
    }

    // Parse body
    let body: { message?: string; history?: HistoryEntry[] };
    try {
      body = await req.json();
    } catch {
      return jsonResponse({ ok: false, error: "Invalid JSON body" }, 400);
    }

    const message =
      typeof body.message === "string" ? body.message.trim() : "";
    if (!message) {
      return jsonResponse(
        { ok: false, error: "Missing 'message' field" },
        400
      );
    }
    if (message.length > MAX_MESSAGE_CHARS) {
      return jsonResponse(
        {
          ok: false,
          error: `Your question is too long. Please keep it under ${MAX_MESSAGE_CHARS} characters.`,
        },
        400
      );
    }

    // The history comes from the browser, so it is attacker-controlled: without
    // validation a caller can forge `assistant` turns and talk the model out of
    // the boundaries the system prompt sets. Keep only well-formed entries and
    // bound both their number and their size.
    const history: HistoryEntry[] = (
      Array.isArray(body.history) ? body.history : []
    )
      .filter(
        (entry): entry is HistoryEntry =>
          !!entry &&
          typeof entry === "object" &&
          (entry.role === "user" || entry.role === "oracle") &&
          typeof entry.text === "string" &&
          entry.text.trim().length > 0
      )
      .slice(-MAX_HISTORY_ENTRIES)
      .map((entry) => ({
        role: entry.role,
        text: entry.text.slice(0, MAX_HISTORY_ENTRY_CHARS),
      }));

    // Rate limit BOTH paths. Previously this sat inside the AI branch, so the
    // keyword fallback was an unmetered public compute endpoint.
    if (isRateLimited(clientKey(req))) {
      return jsonResponse(
        {
          ok: false,
          error:
            "The Oracle needs a moment to rest. Please try again in a few minutes.",
        },
        429
      );
    }

    // Check for OpenAI key
    const openaiKey = Deno.env.get("OPENAI_API_KEY") ?? "";

    if (openaiKey) {
      // --- AI path ---
      try {
        const reply = await callOpenAI(openaiKey, message, history);
        return jsonResponse({ ok: true, reply, source: "ai" });
      } catch (aiError) {
        // AI failed — fall back to keyword system rather than returning an error
        console.error("OpenAI call failed, falling back to local:", aiError);
        const reply = reflectOn(message);
        return jsonResponse({ ok: true, reply, source: "local" });
      }
    } else {
      // --- Keyword fallback path ---
      const reply = reflectOn(message);
      return jsonResponse({ ok: true, reply, source: "local" });
    }
  } catch (err) {
    console.error("Oracle chat error:", err);
    return errorResponse();
  }
});
