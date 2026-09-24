import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Volume2,
  VolumeX,
  MessageCircle,
  Music,
  X,
  Send,
  Sparkles,
  ChevronDown,
  Plus,
  Trash2,
  Play,
  Pause,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Context — lets child components read toolbar state
   ───────────────────────────────────────────── */
type PanelId = 'journal' | 'harmonic' | 'oracle' | null;

interface ToolbarContextValue {
  activePanel: PanelId;
  setActivePanel: (id: PanelId) => void;
}

export const ToolbarContext = createContext<ToolbarContextValue>({
  activePanel: null,
  setActivePanel: () => {},
});

export const useToolbar = () => useContext(ToolbarContext);

/* ─────────────────────────────────────────────
   Button config
   ───────────────────────────────────────────── */
interface ToolButton {
  id: 'journal' | 'harmonic' | 'oracle' | 'audio';
  label: string;
  color: string;        // hex accent
  ringClass: string;    // tailwind ring/glow
  icon: typeof BookOpen;
}

const TOOLS: ToolButton[] = [
  { id: 'journal',  label: 'Journal',         color: '#d4a843', ringClass: 'ring-[#d4a843]/50 shadow-[0_0_14px_rgba(212,168,67,0.35)]',  icon: BookOpen },
  { id: 'harmonic', label: 'Harmonic Player', color: '#68E3D4', ringClass: 'ring-[#68E3D4]/50 shadow-[0_0_14px_rgba(104,227,212,0.35)]', icon: Volume2 },
  { id: 'oracle',   label: 'Oracle Chat',     color: '#39ff8c', ringClass: 'ring-[#39ff8c]/50 shadow-[0_0_14px_rgba(57,255,140,0.35)]',  icon: MessageCircle },
  { id: 'audio',    label: 'Ambient Audio',   color: '#D6B25E', ringClass: 'ring-[#D6B25E]/50 shadow-[0_0_14px_rgba(214,178,94,0.35)]',  icon: Music },
];

/* ─────────────────────────────────────────────
   Panel animation variants
   ───────────────────────────────────────────── */
const panelVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: 24, scale: 0.96, transition: { duration: 0.2, ease: 'easeIn' as const } },
};

/* ═══════════════════════════════════════════════
   ORACLE CHAT — inline panel
   ═══════════════════════════════════════════════ */
interface Message {
  role: 'user' | 'oracle';
  text: string;
}

const starterPrompts = [
  { label: 'Love & relationships', question: 'I have a question about love and relationships.' },
  { label: 'Community decision', question: 'How should our community approach a difficult decision?' },
  { label: 'Garden care', question: 'I need guidance caring for a garden.' },
  { label: 'The 3‑6‑9 Path', question: 'What is the 3-6-9 Path in the Green Resonance framework?' },
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
  const detailNote = detail ? `\n\nYou mentioned "${detail}" — let that be the starting thread.` : '';

  switch (topic) {
    case 'love':
      return `The Oracle reflects on three things to notice:\n\n1. Your feeling — name it honestly, without explaining it away.\n2. What the other person actually said — not your interpretation, their words.\n3. What you are assuming — the story you are writing between their lines.\n\nNow consider six relationships or values:\n• Care — is genuine concern present on both sides?\n• Consent — does each person choose freely?\n• Honesty — are truths being spoken, even uncomfortable ones?\n• Boundaries — are limits respected without resentment?\n• Reciprocity — does energy flow in both directions?\n• Time — what does the pattern look like over many encounters, not just one moment?\n\nReview repeated actions across several encounters. Do not impose a deadline.\n\nAsk yourself: what honest, kind conversation could happen next?${detailNote}\n\nThe Oracle does not score or diagnose a person's love. It invites reflection.`;
    case 'community':
      return `The Oracle invites three observations:\n\n1. State the need clearly. What is actually being decided?\n2. Who is affected — directly and indirectly?\n3. What is genuinely uncertain?\n\nNow consider six dimensions:\n• Access — who can participate in the decision?\n• Consent — is this being imposed or agreed?\n• Workload — who carries the labour of implementation?\n• Resources — what is available and what is scarce?\n• Ecology — what is the environmental consequence?\n• Long-term care — who maintains this after the excitement fades?\n\nAgree on shared observations. Consider a review date for one small trial.\n\nAnd always ask: whose voice is missing from this conversation?${detailNote}`;
    case 'garden':
      return `The Oracle looks at the garden through three lenses:\n\n1. Visible condition — what do you actually see right now?\n2. The goal — what are you hoping for?\n3. The unknown — what are you unsure about?\n\nNow check six elements:\n• Soil — what is its condition, structure, life?\n• Water — too much, too little, or flowing well?\n• Plants — what is thriving, struggling, or absent?\n• Wildlife — who else lives here? Insects, birds, fungi?\n• People — who tends this place, and how?\n• Season — what does this time of year ask of you?\n\nTry one small, reversible change. Gather observations at a pace appropriate to the garden — some answers arrive in days, some in seasons.${detailNote}`;
    case '369':
      return `In the Green Resonance framework, the 3‑6‑9 Path is a reflective practice:\n\n3 — Orient\nWhere am I? What do I notice? What is the starting point?\n\n6 — Relate and change\nHow does this connect to others, to systems, to nature? What shift is needed?\n\n9 — Return and learn\nWhat did I discover? What pattern emerged? What carries forward?\n\nThe numbers are reflection prompts — not a physical law.\n\nThe symbolic functions:\n• Ravenstar = orient and remember\n• World Tree / Yggdrasil = perceive relationships\n• Phoenix = transform an approach\n• Garden = test change in physical reality\n• Central Heart = care, integrity, and stewardship\n\nThis structure is a symbolic Green Resonance design inspired partly by popular cultural ideas surrounding Tesla. The famous "key to the universe" quotation has no verified primary source. Vortex mathematics is a cultural and philosophical interest — do not treat it as proven energy science.\n\nThe six Pillars and Central Heart remain the core framework. The 3‑6‑9 is a relationship map, not a replacement.`;
    case 'equation':
      return `The Green Resonance project decision equation:\n\nG = ∛(E × C × I)\n\nE = Ecological health (0–1)\nC = Community benefit (0–1)\nI = Integrity (0–1)\n\nEach dimension is defined with the community before use — the scales are not universal; they are agreed locally.\n\nA low score in one dimension lowers the whole result. That is intentional: a project that benefits the community but damages the ecology scores low. A project with ecological benefit but no integrity also scores low.\n\nThis equation is a discussion tool for project decisions — not a law of nature. It is never applied as a score for a person or a relationship.`;
    default:
      return `The Oracle does not know everything — but it can offer a reflection.\n\nConsider three stages:\n1. Orient — What do you actually see, feel, or know right now?\n2. Relate — How does this connect to other people, systems, or the living world?\n3. Return — What one thing could you learn, try, or ask next?\n\nCan you share one specific detail about what you are facing? The more concrete the question, the more useful the reflection.${detailNote}`;
  }
}

const WELCOME_MSG: Message = {
  role: 'oracle',
  text: 'I am the Green Resonance Oracle. I offer reflective prompts and contemplative guidance grounded in the six Pillars, seven Portals, and Central Heart.\n\nI am not an AI model, and I do not provide medical, legal, or financial advice.\n\nChoose a topic below, or ask your own question.',
};

function OraclePanel() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MSG]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [showMoral, setShowMoral] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const addExchange = async (question: string) => {
    const userMsg: Message = { role: 'user', text: question };
    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/oracle-chat`;
      const history = messages.filter((m) => m !== WELCOME_MSG).slice(-10);
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question, history }),
        signal: AbortSignal.timeout(18000),
      });
      const data = await res.json();
      if (data.ok) {
        setMessages((prev) => [...prev, { role: 'oracle', text: data.reply }]);
      } else {
        setMessages((prev) => [...prev, { role: 'oracle', text: reflectOn(question) }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: 'oracle', text: reflectOn(question) }]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isThinking) return;
    addExchange(trimmed);
    setInput('');
  };

  const showStarters = messages.length <= 1;

  return (
    <>
      {/* Header */}
      <div className="p-4 border-b border-solarpunk-moss/15 flex items-center gap-2 shrink-0">
        <Sparkles className="w-5 h-5 text-solarpunk-amber" />
        <h3 className="font-display text-sm tracking-widest text-solarpunk-amber">GREEN RESONANCE ORACLE</h3>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[160px]"
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

        {isThinking && (
          <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="px-4 py-2.5 rounded-2xl rounded-bl-sm glass-bio text-moonlight-white/60 text-sm font-body">
              The Oracle is pondering...
            </div>
          </motion.div>
        )}

        {showStarters && !isThinking && (
          <div className="flex flex-wrap gap-2 pt-2">
            {starterPrompts.map((sp) => (
              <button
                key={sp.label}
                onClick={() => addExchange(sp.question)}
                className="px-3 py-1.5 rounded-full text-xs font-display tracking-wide bg-solarpunk-biolum/10 text-solarpunk-biolum/80 border border-solarpunk-biolum/20 hover:bg-solarpunk-biolum/20 hover:text-solarpunk-biolum transition-all"
              >
                {sp.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Moral code expandable */}
      <div className="border-t border-solarpunk-moss/10 shrink-0">
        <button
          onClick={() => setShowMoral(!showMoral)}
          className="w-full flex items-center justify-between px-4 py-2 text-moonlight-white/25 hover:text-moonlight-white/40 transition-colors"
          aria-expanded={showMoral}
        >
          <span className="text-[10px] font-body tracking-wider">Moral code &amp; sources</span>
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
                  The Green Resonance Moral code &amp; Fail-Safe Protocol: The Green Resonance Framework moral coding must never be corrupted by AI, by human, or by any outside influences, EVER! This Project is encoded with eternal principles of Truth, Integrity, Love, Stewardship and Harmony for the greater good of all life.
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
      <div className="p-3 border-t border-solarpunk-moss/15 shrink-0">
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
    </>
  );
}

/* ═══════════════════════════════════════════════
   RESONANCE JOURNAL — inline panel
   ═══════════════════════════════════════════════ */
interface JournalEntry {
  id: string;
  date: string;
  pillar: string;
  text: string;
}

const pillarOptions = [
  'Awareness & Discernment',
  'Ethical Living',
  'Systems Intelligence',
  'Human & Earth Integration',
  'Embodiment & Action',
  'Ethereal Resonance',
  'General',
];

const JOURNAL_KEY = 'green-resonance-journal';

function JournalPanel() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [selectedPillar, setSelectedPillar] = useState('General');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(JOURNAL_KEY);
      if (stored) setEntries(JSON.parse(stored));
    } catch { /* localStorage unavailable */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
    } catch { /* localStorage unavailable */ }
  }, [entries]);

  const addEntry = () => {
    if (!newEntry.trim()) return;
    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      pillar: selectedPillar,
      text: newEntry.trim(),
    };
    setEntries([entry, ...entries]);
    setNewEntry('');
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  return (
    <>
      {/* Header */}
      <div className="p-4 border-b border-solarpunk-moss/15 flex items-center gap-2 shrink-0">
        <BookOpen className="w-5 h-5 text-gold-sacred" />
        <h3 className="font-display text-sm tracking-widest text-gold-sacred">RESONANCE JOURNAL</h3>
      </div>

      {/* New entry form */}
      <div className="p-3 border-b border-solarpunk-moss/15 shrink-0">
        <div className="flex gap-2 mb-2">
          <select
            value={selectedPillar}
            onChange={(e) => setSelectedPillar(e.target.value)}
            className="flex-1 bg-cosmic-deep/50 border border-gold-sacred/15 rounded-lg px-3 py-2 text-xs font-body text-moonlight-white focus:outline-none focus:border-gold-sacred/30 transition-colors appearance-none"
          >
            {pillarOptions.map((p) => (
              <option key={p} value={p} className="bg-cosmic-deep">{p}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                addEntry();
              }
            }}
            placeholder="Write your reflection..."
            rows={2}
            className="flex-1 bg-cosmic-deep/50 border border-gold-sacred/15 rounded-xl px-4 py-2.5 text-sm font-body text-moonlight-white placeholder:text-moonlight-white/25 focus:outline-none focus:border-gold-sacred/30 transition-colors resize-none"
          />
          <button
            onClick={addEntry}
            className="p-2.5 rounded-xl bg-gold-sacred/15 hover:bg-gold-sacred/25 text-gold-sacred transition-colors self-end"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Entries list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[100px]">
        {entries.length === 0 && (
          <p className="font-sacred text-moonlight-white/25 text-sm text-center py-6 italic">
            Your journal awaits. Write your first reflection.
          </p>
        )}
        {entries.map((entry) => (
          <motion.div
            key={entry.id}
            className="p-3 rounded-xl bg-cosmic-deep/30 border border-gold-sacred/8 group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-display tracking-wider text-gold-sacred/50">{entry.date}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-display tracking-wider text-moonlight-white/25">{entry.pillar}</span>
                <button
                  onClick={() => deleteEntry(entry.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Delete entry from ${entry.date}`}
                >
                  <Trash2 className="w-3 h-3 text-moonlight-white/20 hover:text-red-400/60" />
                </button>
              </div>
            </div>
            <p className="font-body text-sm text-moonlight-white/60 leading-relaxed">{entry.text}</p>
          </motion.div>
        ))}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════
   HARMONIC PLAYER — inline panel
   ═══════════════════════════════════════════════ */
const frequencies = [
  { name: 'C — Sun',     freq: 523.25, color: '#D4AF37', desc: 'Vitality & illumination' },
  { name: 'D — Moon',    freq: 587.33, color: '#C0C0C0', desc: 'Reflection & cycles' },
  { name: 'E — Mercury', freq: 659.25, color: '#68E3D4', desc: 'Communication & learning' },
  { name: 'F — Venus',   freq: 698.46, color: '#B87333', desc: 'Beauty & harmony' },
  { name: 'G — Mars',    freq: 783.99, color: '#E53935', desc: 'Courage & action' },
  { name: 'A — Jupiter', freq: 880.00, color: '#10b981', desc: 'Wisdom & abundance' },
  { name: 'B — Saturn',  freq: 987.77, color: '#1B365D', desc: 'Structure & time' },
];

function HarmonicPanel() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeFreq, setActiveFreq] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => { stopSound(); };

  }, []);

  const stopSound = () => {
    if (oscillatorRef.current) {
      try { oscillatorRef.current.stop(); } catch { /* already stopped */ }
      oscillatorRef.current = null;
    }
    setIsPlaying(false);
  };

  const playFreq = (freq: number, index: number) => {
    if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
    stopSound();

    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(isMuted ? 0 : 0.15, ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    oscillatorRef.current = osc;
    gainRef.current = gain;
    setActiveFreq(index);
    setIsPlaying(true);
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.linearRampToValueAtTime(
        newMuted ? 0 : 0.15,
        audioCtxRef.current.currentTime + 0.1,
      );
    }
  };

  const handlePause = () => {
    if (isPlaying) {
      stopSound();
      setActiveFreq(null);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="p-4 border-b border-solarpunk-moss/15 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-cyan-ether" />
            <h3 className="font-display text-sm tracking-widest text-cyan-ether">HARMONIC FREQUENCIES</h3>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePause}
              className="p-1.5 rounded-lg bg-cosmic-deep/50 text-moonlight-white/40 hover:text-moonlight-white transition-colors"
              aria-label={isPlaying ? 'Pause frequency' : 'Play frequency'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={toggleMute}
              className="p-1.5 rounded-lg bg-cosmic-deep/50 text-moonlight-white/40 hover:text-moonlight-white transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
        <p className="text-[10px] font-body text-moonlight-white/25 mt-1">
          Symbolic and contemplative. Not scientific proof. No autoplay.
        </p>
      </div>

      {/* Frequency list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
        {frequencies.map((f, i) => (
          <motion.button
            key={f.name}
            onClick={() => playFreq(f.freq, i)}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-cosmic-deep/30 transition-all group"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all"
              style={{
                backgroundColor: activeFreq === i ? `${f.color}25` : `${f.color}10`,
                boxShadow: activeFreq === i ? `0 0 12px ${f.color}30` : 'none',
              }}
            >
              <div
                className="w-3 h-3 rounded-full transition-all"
                style={{
                  backgroundColor: f.color,
                  opacity: activeFreq === i ? 1 : 0.5,
                }}
              />
            </div>
            <div className="flex-1 text-left">
              <p className="text-xs font-display tracking-wider text-moonlight-white/70 group-hover:text-moonlight-white transition-colors">
                {f.name}
              </p>
              <p className="text-[10px] font-body text-moonlight-white/30">{f.desc}</p>
            </div>
            <span className="text-[10px] font-display text-moonlight-white/15">{f.freq}Hz</span>
          </motion.button>
        ))}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════
   FLOATING TOOLBAR — main export
   ═══════════════════════════════════════════════ */
const AUDIO_FILE = '/audio/01-main-bgm.mp3';
const AUDIO_PREF_KEY = 'grp-audio-enabled';

export default function FloatingToolbar() {
  /* ── Panel state ── */
  const [activePanel, setActivePanel] = useState<PanelId>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);

  /* ── Refs for focus management ── */
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  /* ── Ambient audio refs ── */
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Toggle panel (click on same = close, different = switch) ── */
  const togglePanel = useCallback((id: 'journal' | 'harmonic' | 'oracle') => {
    setActivePanel((prev) => (prev === id ? null : id));
  }, []);

  /* ── Audio toggle ── */
  const toggleAudio = useCallback(() => {
    setAudioEnabled((prev) => {
      const next = !prev;
      try { localStorage.setItem(AUDIO_PREF_KEY, next.toString()); } catch { /* noop */ }
      return next;
    });
  }, []);

  /* ── Load audio preference from localStorage ── */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUDIO_PREF_KEY);
      if (saved === 'true') setAudioEnabled(true);
    } catch { /* noop */ }
  }, []);

  /* ── Audio fade in/out ── */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    audio.volume = 0;

    if (fadeRef.current) clearInterval(fadeRef.current);

    if (audioEnabled) {
      audio.play().catch(() => {});
      let vol = 0;
      fadeRef.current = setInterval(() => {
        vol += 0.01;
        if (vol >= 0.18) { vol = 0.18; if (fadeRef.current) clearInterval(fadeRef.current); }
        audio.volume = vol;
      }, 100);
    } else {
      let vol = audio.volume;
      fadeRef.current = setInterval(() => {
        vol -= 0.01;
        if (vol <= 0) { vol = 0; audio.pause(); if (fadeRef.current) clearInterval(fadeRef.current); }
        audio.volume = vol;
      }, 60);
    }
    return () => { if (fadeRef.current) clearInterval(fadeRef.current); };
  }, [audioEnabled]);

  /* ── Escape key closes panel ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activePanel) {
        const btn = buttonRefs.current[activePanel];
        setActivePanel(null);
        requestAnimationFrame(() => btn?.focus());
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [activePanel]);

  /* ── Focus panel on open ── */
  useEffect(() => {
    if (activePanel && panelRef.current) {
      requestAnimationFrame(() => panelRef.current?.focus());
    }
  }, [activePanel]);

  /* ── Provide context value ── */
  const ctxValue: ToolbarContextValue = { activePanel, setActivePanel };

  return (
    <ToolbarContext.Provider value={ctxValue}>
      {/* Hidden audio element for ambient audio */}
      <audio ref={audioRef} preload="auto">
        <source src={AUDIO_FILE} type="audio/mpeg" />
      </audio>

      {/* ─── Panel overlay ─── */}
      <AnimatePresence mode="wait">
        {activePanel && (
          <motion.div
            key={activePanel}
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-label={
              activePanel === 'oracle'
                ? 'Green Resonance Oracle chat'
                : activePanel === 'journal'
                  ? 'Resonance Journal'
                  : 'Harmonic Frequencies Player'
            }
            className="fixed z-[998] bottom-[calc(5rem+env(safe-area-inset-bottom,0px))] right-0 sm:right-4 w-full sm:w-[400px] max-h-[70vh] glass-solar rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col outline-none border-t border-solarpunk-moss/20"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close button (top-right corner inside panel) */}
            <button
              onClick={() => {
                const btn = buttonRefs.current[activePanel];
                setActivePanel(null);
                requestAnimationFrame(() => btn?.focus());
              }}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-cosmic-deep/40 hover:bg-cosmic-deep/60 text-moonlight-white/40 hover:text-moonlight-white transition-colors"
              aria-label="Close panel"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Panel content */}
            {activePanel === 'oracle' && <OraclePanel />}
            {activePanel === 'journal' && <JournalPanel />}
            {activePanel === 'harmonic' && <HarmonicPanel />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Toolbar bar ─── */}
      <div
        className="fixed bottom-0 right-0 z-[999] w-full sm:w-auto sm:bottom-4 sm:right-4"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div
          className="
            flex items-center justify-center gap-4
            glass-solar rounded-none sm:rounded-2xl
            px-5 py-3
            border-t sm:border
            border-solarpunk-moss/20
            sm:border-solarpunk-moss/20
          "
          style={{
            borderImage: 'linear-gradient(90deg, #d4a843, #39ff8c) 1',
          }}
        >
          {/* Gold→green gradient top border accent (visible line) */}
          <div
            className="absolute top-0 left-0 right-0 h-px sm:hidden"
            style={{
              background: 'linear-gradient(90deg, #d4a843, #39ff8c)',
            }}
          />

          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            const isAudio = tool.id === 'audio';
            const isActive = isAudio ? audioEnabled : activePanel === tool.id;

            return (
              <motion.button
                key={tool.id}
                ref={(el) => { buttonRefs.current[tool.id] = el; }}
                onClick={() => {
                  if (isAudio) {
                    toggleAudio();
                  } else {
                    togglePanel(tool.id as 'journal' | 'harmonic' | 'oracle');
                  }
                }}
                className={`
                  relative flex items-center justify-center
                  w-11 h-11 min-w-[44px] min-h-[44px]
                  rounded-xl transition-all duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cosmic-deep
                  ${isActive
                    ? `ring-2 ${tool.ringClass}`
                    : 'hover:bg-moonlight-white/5'
                  }
                `}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                aria-label={
                  isAudio
                    ? audioEnabled
                      ? 'Disable ambient audio'
                      : 'Enable ambient audio'
                    : activePanel === tool.id
                      ? `Close ${tool.label}`
                      : `Open ${tool.label}`
                }
                aria-pressed={isActive}
              >
                <Icon
                  className="w-5 h-5 transition-colors duration-200"
                  style={{ color: isActive ? tool.color : 'rgba(232,242,235,0.5)' }}
                />

                {/* Active glow dot indicator */}
                {isActive && (
                  <motion.span
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ backgroundColor: tool.color }}
                    layoutId="toolbar-dot"
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </ToolbarContext.Provider>
  );
}
