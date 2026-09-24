import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, ChevronDown } from 'lucide-react';

interface Message {
  role: 'user' | 'oracle';
  text: string;
}

const starterPrompts = [
  { label: 'Love & relationships', question: 'I have a question about love and relationships.' },
  { label: 'Community decision', question: 'How should our community approach a difficult decision?' },
  { label: 'Garden care', question: 'I need guidance caring for a garden.' },
  { label: 'The 3\u20136\u20139 Path', question: 'What is the 3-6-9 Path in the Green Resonance framework?' },
];

function detectTopic(text: string): 'love' | 'community' | 'garden' | '369' | 'equation' | 'general' {
  const lower = text.toLowerCase();

  if (/\b(3[\s\-\u2013\u2014]*6[\s\-\u2013\u2014]*9|tesla|vortex|369|three[\s-]*six[\s-]*nine)\b/.test(lower)) return '369';
  if (/\b(equation|g\s*=|ecological.*health.*community|decision\s*equation|scoring\s*equation)\b/.test(lower)) return 'equation';
  if (/\b(love|relationship|partner|romantic|dating|marriage|heartbreak|boyfriend|girlfriend|spouse|attachment|intimacy|breakup|crush|couple)\b/.test(lower)) return 'love';
  if (/\b(community|govern|decision|collective|council|village|tribe|meeting|vote|consensus|steward|commons|neighbour|neighbor|dispute|mediat)\b/.test(lower)) return 'community';
  if (/\b(garden|plant|soil|compost|seed|grow|harvest|weed|water|permaculture|mulch|prune|flower|tree|vegetable|herb|regenerat|biodiv|mycelium|fungi)\b/.test(lower)) return 'garden';

  return 'general';
}

function extractDetail(text: string): string {
  const trimmed = text.trim().replace(/[?.!]+$/, '').trim();
  const words = trimmed.split(/\s+/);
  if (words.length <= 4) return '';
  return words.slice(2).join(' ');
}

function reflectOn(question: string): string {
  const topic = detectTopic(question);
  const detail = extractDetail(question);
  const detailNote = detail ? `\n\nYou mentioned "${detail}" \u2014 let that be the starting thread.` : '';

  switch (topic) {
    case 'love':
      return `The Oracle reflects on three things to notice:\n\n` +
        `1. Your feeling \u2014 name it honestly, without explaining it away.\n` +
        `2. What the other person actually said \u2014 not your interpretation, their words.\n` +
        `3. What you are assuming \u2014 the story you are writing between their lines.\n\n` +
        `Now consider six relationships or values:\n` +
        `\u2022 Care \u2014 is genuine concern present on both sides?\n` +
        `\u2022 Consent \u2014 does each person choose freely?\n` +
        `\u2022 Honesty \u2014 are truths being spoken, even uncomfortable ones?\n` +
        `\u2022 Boundaries \u2014 are limits respected without resentment?\n` +
        `\u2022 Reciprocity \u2014 does energy flow in both directions?\n` +
        `\u2022 Time \u2014 what does the pattern look like over many encounters, not just one moment?\n\n` +
        `Review repeated actions across several encounters. Do not impose a deadline.\n\n` +
        `Ask yourself: what honest, kind conversation could happen next?${detailNote}\n\n` +
        `The Oracle does not score or diagnose a person\u2019s love. It invites reflection.`;

    case 'community':
      return `The Oracle invites three observations:\n\n` +
        `1. State the need clearly. What is actually being decided?\n` +
        `2. Who is affected \u2014 directly and indirectly?\n` +
        `3. What is genuinely uncertain?\n\n` +
        `Now consider six dimensions:\n` +
        `\u2022 Access \u2014 who can participate in the decision?\n` +
        `\u2022 Consent \u2014 is this being imposed or agreed?\n` +
        `\u2022 Workload \u2014 who carries the labour of implementation?\n` +
        `\u2022 Resources \u2014 what is available and what is scarce?\n` +
        `\u2022 Ecology \u2014 what is the environmental consequence?\n` +
        `\u2022 Long-term care \u2014 who maintains this after the excitement fades?\n\n` +
        `Agree on shared observations. Consider a review date for one small trial.\n\n` +
        `And always ask: whose voice is missing from this conversation?${detailNote}`;

    case 'garden':
      return `The Oracle looks at the garden through three lenses:\n\n` +
        `1. Visible condition \u2014 what do you actually see right now?\n` +
        `2. The goal \u2014 what are you hoping for?\n` +
        `3. The unknown \u2014 what are you unsure about?\n\n` +
        `Now check six elements:\n` +
        `\u2022 Soil \u2014 what is its condition, structure, life?\n` +
        `\u2022 Water \u2014 too much, too little, or flowing well?\n` +
        `\u2022 Plants \u2014 what is thriving, struggling, or absent?\n` +
        `\u2022 Wildlife \u2014 who else lives here? Insects, birds, fungi?\n` +
        `\u2022 People \u2014 who tends this place, and how?\n` +
        `\u2022 Season \u2014 what does this time of year ask of you?\n\n` +
        `Try one small, reversible change. Gather observations at a pace appropriate to the garden \u2014 ` +
        `some answers arrive in days, some in seasons.${detailNote}`;

    case '369':
      return `In the Green Resonance framework, the 3\u20136\u20139 Path is a reflective practice:\n\n` +
        `3 \u2014 Orient\n` +
        `Where am I? What do I notice? What is the starting point?\n\n` +
        `6 \u2014 Relate and change\n` +
        `How does this connect to others, to systems, to nature? What shift is needed?\n\n` +
        `9 \u2014 Return and learn\n` +
        `What did I discover? What pattern emerged? What carries forward?\n\n` +
        `The numbers are reflection prompts \u2014 not a physical law.\n\n` +
        `The symbolic functions:\n` +
        `\u2022 Ravenstar = orient and remember\n` +
        `\u2022 World Tree / Yggdrasil = perceive relationships\n` +
        `\u2022 Phoenix = transform an approach\n` +
        `\u2022 Garden = test change in physical reality\n` +
        `\u2022 Central Heart = care, integrity, and stewardship\n\n` +
        `This structure is a symbolic Green Resonance design inspired partly by popular cultural ideas surrounding Tesla. ` +
        `The famous "key to the universe" quotation has no verified primary source. ` +
        `Vortex mathematics is a cultural and philosophical interest \u2014 do not treat it as proven energy science.\n\n` +
        `The six Pillars and Central Heart remain the core framework. The 3\u20136\u20139 is a relationship map, not a replacement.`;

    case 'equation':
      return `The Green Resonance project decision equation:\n\n` +
        `G = \u221B(E \u00D7 C \u00D7 I)\n\n` +
        `E = Ecological health (0\u20131)\n` +
        `C = Community benefit (0\u20131)\n` +
        `I = Integrity (0\u20131)\n\n` +
        `Each dimension is defined with the community before use \u2014 the scales are not universal; they are agreed locally.\n\n` +
        `A low score in one dimension lowers the whole result. That is intentional: ` +
        `a project that benefits the community but damages the ecology scores low. ` +
        `A project with ecological benefit but no integrity also scores low.\n\n` +
        `This equation is a discussion tool for project decisions \u2014 not a law of nature. ` +
        `It is never applied as a score for a person or a relationship.`;

    default:
      return `The Oracle does not know everything \u2014 but it can offer a reflection.\n\n` +
        `Consider three stages:\n` +
        `1. Orient \u2014 What do you actually see, feel, or know right now?\n` +
        `2. Relate \u2014 How does this connect to other people, systems, or the living world?\n` +
        `3. Return \u2014 What one thing could you learn, try, or ask next?\n\n` +
        `Can you share one specific detail about what you are facing? ` +
        `The more concrete the question, the more useful the reflection.${detailNote}`;
  }
}

const WELCOME_MSG: Message = {
  role: 'oracle',
  text: 'I am the Green Resonance Oracle. I offer reflective prompts and contemplative guidance grounded in the six Pillars, seven Portals, and Central Heart.\n\nI am not an AI model, and I do not provide medical, legal, or financial advice.\n\nChoose a topic below, or ask your own question.',
};

export default function OracleChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MSG]);
  const [input, setInput] = useState('');
  const [showMoral, setShowMoral] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const addExchange = (question: string) => {
    const userMsg: Message = { role: 'user', text: question };
    const oracleMsg: Message = { role: 'oracle', text: reflectOn(question) };
    setMessages((prev) => [...prev, userMsg, oracleMsg]);
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    addExchange(trimmed);
    setInput('');
  };

  const handleStarter = (prompt: typeof starterPrompts[number]) => {
    addExchange(prompt.question);
  };

  const showStarters = messages.length <= 1;

  return (
    <>
      {/* Oracle toggle button */}
      <motion.button
        className="fixed bottom-6 right-44 z-50 w-14 h-14 rounded-full glass-bio glow-biolum flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ boxShadow: ['0 0 20px rgba(57,255,140,0.15)', '0 0 40px rgba(57,255,140,0.25)', '0 0 20px rgba(57,255,140,0.15)'] }}
        transition={{ duration: 3, repeat: Infinity }}
        aria-label={isOpen ? 'Close the Green Resonance Oracle' : 'Open the Green Resonance Oracle'}
      >
        {isOpen ? <X className="w-6 h-6 text-solarpunk-biolum" /> : <MessageCircle className="w-6 h-6 text-solarpunk-biolum" />}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-4 sm:right-44 z-50 w-[calc(100vw-2rem)] sm:w-[380px] max-h-[500px] glass-solar rounded-2xl overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-label="Green Resonance Oracle chat"
          >
            {/* Header */}
            <div className="p-4 border-b border-solarpunk-moss/15 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-solarpunk-amber" />
              <h3 className="font-display text-sm tracking-widest text-solarpunk-amber">GREEN RESONANCE ORACLE</h3>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[300px]"
              aria-live="polite"
              aria-relevant="additions"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm font-body leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-solarpunk-canopy/30 text-moonlight-white rounded-br-sm'
                        : 'glass-bio text-moonlight-white/80 rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Starter prompts */}
              {showStarters && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {starterPrompts.map((sp) => (
                    <button
                      key={sp.label}
                      onClick={() => handleStarter(sp)}
                      className="px-3 py-1.5 rounded-full text-xs font-display tracking-wide bg-solarpunk-biolum/10 text-solarpunk-biolum/80 border border-solarpunk-biolum/20 hover:bg-solarpunk-biolum/20 hover:text-solarpunk-biolum transition-all"
                    >
                      {sp.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Moral code expandable */}
            <div className="border-t border-solarpunk-moss/10">
              <button
                onClick={() => setShowMoral(!showMoral)}
                className="w-full flex items-center justify-between px-4 py-2 text-moonlight-white/25 hover:text-moonlight-white/40 transition-colors"
                aria-expanded={showMoral}
              >
                <span className="text-[10px] font-body tracking-wider">Moral code & sources</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${showMoral ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {showMoral && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3 space-y-2">
                      <p className="text-moonlight-white/20 text-[10px] font-body leading-relaxed">
                        The Green Resonance Moral code & Fail-Safe Protocol: The Green Resonance Framework moral coding must never be corrupted by AI, by human, or by any outside influences, EVER! This Project is encoded with eternal principles of Truth, Integrity, Love, Stewardship and Harmony for the greater good of all life.
                      </p>
                      <p className="text-moonlight-white/15 text-[10px] font-body">
                        &copy; 2026 The Green Resonance Project. All rights reserved.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input */}
            <div className="p-3 border-t border-solarpunk-moss/15">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask the Oracle..."
                  className="flex-1 bg-cosmic-deep/50 border border-solarpunk-moss/15 rounded-xl px-4 py-2.5 text-sm font-body text-moonlight-white placeholder:text-moonlight-white/25 focus:outline-none focus:border-solarpunk-biolum/30 transition-colors"
                  aria-label="Type your question for the Oracle"
                />
                <button
                  onClick={handleSend}
                  className="p-2.5 rounded-xl bg-solarpunk-biolum/15 hover:bg-solarpunk-biolum/25 text-solarpunk-biolum transition-colors"
                  aria-label="Send question to the Oracle"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
