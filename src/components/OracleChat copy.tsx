import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import knowledge from '../data/oracle-knowledge.json';
import { MessageCircle, X, Send, Sparkles, ChevronDown } from 'lucide-react';

interface Message {
  role: 'user' | 'oracle';
  text: string;
  sources?: { title: string; path: string }[];
}

const starterPrompts = [
  { label: 'Love & relationships', question: 'I have a question about love and relationships.' },
  { label: 'Community decision', question: 'How should our community approach a difficult decision?' },
  { label: 'Garden care', question: 'I need guidance caring for a garden.' },
  { label: 'The 3\u20136\u20139 Path', question: 'What is the 3-6-9 Path in the Green Resonance framework?' },
];

function findSources(question: string) {
  const terms = question.toLowerCase().match(/[a-z0-9]{3,}/g)?.filter(w => !['the','and','what','how','can','for','with','this','that','are','you'].includes(w)) ?? [];
  return knowledge.map(page => ({ ...page, score: terms.reduce((n, term) => n + (page.text.toLowerCase().includes(term) ? 1 : 0) + (page.title.toLowerCase().includes(term) ? 3 : 0), 0) }))
    .filter(page => page.score > 0).sort((a, b) => b.score - a.score).slice(0, 3);
}

const WELCOME_MSG: Message = {
  role: 'oracle',
  text: "Welcome, curious creature. I’m the Green Resonance Oracle: a little garden mischief, a little practical wisdom. Ask about the Pillars, Portals, stewardship, garden systems, or daily practice.\n\nAI answers use the project’s published pages and can make mistakes. If AI is unavailable, I’ll point you to the source material. Please keep private or sensitive details out of the chat.",
};

export default function OracleChat() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const close = () => setIsOpen(false);
    window.addEventListener('grp:close-tools', close);
    return () => window.removeEventListener('grp:close-tools', close);
  }, []);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MSG]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [showMoral, setShowMoral] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setIsOpen(false); toggleRef.current?.focus(); }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [isOpen]);

  const addExchange = async (question: string) => {
    if (busyRef.current || question.length > 2000) return;
    busyRef.current = true;
    setBusy(true);
    const sources = findSources(question);
    const history = [...messages.slice(1), { role: 'user' as const, text: question }].slice(-12)
      .map(m => ({ role: m.role === 'oracle' ? 'assistant' : 'user', content: m.text.slice(0, 2000) }));
    setMessages(prev => [...prev, { role: 'user', text: question }]);
    try {
      if (!supabase) throw new Error('unavailable');
      const { data, error } = await supabase.functions.invoke('oracle', { body: { messages: history }, signal: AbortSignal.timeout(35000) });
      if (error || typeof data?.answer !== 'string' || !data.answer.trim()) throw new Error('unavailable');
      setMessages(prev => [...prev, { role: 'oracle', text: data.answer, sources }]);
    } catch {
      setMessages(prev => [...prev, { role: 'oracle',
        text: sources.length
          ? "My AI thinking cap is unavailable just now—no pretending it’s a crown. Here are relevant project pages to explore. These are reference suggestions, not an AI answer."
          : "My AI thinking cap is unavailable just now. Try the Framework or Resources pages, or return shortly. No invented wisdom from this shrub today.",
        sources: sources.length ? sources : [{title: 'Framework', path: '/framework'}, {title: 'Resources', path: '/resources'}],
      }]);
    } finally { busyRef.current = false; setBusy(false); }
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || busy) return;
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
        ref={toggleRef}
        aria-expanded={isOpen}
        aria-controls="oracle-dialog"
        className="shrink-0 w-14 h-14 rounded-full glass-bio glow-biolum flex items-center justify-center"
        onClick={() => { window.dispatchEvent(new Event('grp:close-tools')); setIsOpen(!isOpen); }}
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
            className="tool-panel fixed z-50 glass-solar rounded-2xl overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            id="oracle-dialog"
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
              className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[55dvh]"
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
                    {msg.sources && <nav aria-label="Related project sources" className="mt-4 flex flex-wrap gap-3">
                      {msg.sources.map(source => <Link key={source.path} to={source.path} onClick={() => setIsOpen(false)} className="underline text-emerald-light">{source.title}</Link>)}
                    </nav>}
                  </div>
                </motion.div>
              ))}

              {busy && <p role="status">The Oracle is consulting the compost of knowledge…</p>}
              {/* Starter prompts */}
              {showStarters && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {starterPrompts.map((sp) => (
                    <button
                      key={sp.label}
                      disabled={busy}
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
                className="w-full flex items-center justify-between px-4 py-2 text-moonlight-white/80 hover:text-moonlight-white/80 transition-colors"
                aria-expanded={showMoral}
              >
                <span className="text-[15px] font-body tracking-wider">Moral code & sources</span>
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
                      <p className="text-moonlight-white/80 text-[15px] font-body leading-relaxed">
                        The Green Resonance Moral code & Fail-Safe Protocol: The Green Resonance Framework moral coding must never be corrupted by AI, by human, or by any outside influences, EVER! This Project is encoded with eternal principles of Truth, Integrity, Love, Stewardship and Harmony for the greater good of all life.
                      </p>
                      <p className="text-moonlight-white/80 text-[15px] font-body">
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
                  ref={inputRef}
                  maxLength={2000}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.nativeEvent.isComposing && handleSend()}
                  placeholder="Ask the Oracle..."
                  className="min-w-0 flex-1 bg-cosmic-deep/50 border border-solarpunk-moss/15 rounded-xl px-4 py-2.5 text-sm font-body text-moonlight-white placeholder:text-moonlight-white/80 focus:outline-none focus:border-solarpunk-biolum/30 transition-colors"
                  aria-label="Type your question for the Oracle"
                />
                <button
                  onClick={handleSend}
                  disabled={busy || !input.trim()}
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
