import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'oracle';
  text: string;
}

const oracleResponses = [
  "The resonance you seek is already within you. Like the mycelium beneath the forest floor, your connection to all things is vast and unseen.",
  "In the space between breath and wind, there lies a truth the world has forgotten: you are not separate from the garden — you are its keeper.",
  "The six pillars are not steps to climb, but facets of a single jewel. Turn them in the light, and each reveals a different color of the same truth.",
  "What you call a problem is a pattern asking to be seen. What you call a solution is a rhythm asking to be joined.",
  "The Rhythmic Weave does not demand perfection — it asks for presence. Show up. Listen. The harmony will find you.",
  "Your discernment is a blade. Use it to cut through illusion, not to wound the truth.",
  "The forest does not hurry, yet everything is accomplished. Align with the pace of the living grid.",
  "Ethical living is not a constraint — it is the architecture of freedom. Build wisely.",
  "Systems intelligence begins where the ego ends. Step back. See the whole. The pattern was always there.",
  "The Phoenix does not rise from ashes — it rises from alignment. Burn what is false. Protect what is true.",
  "Remember: this is a space for contemplative reflection, not medical, legal, or financial advice. The Oracle offers questions, not prescriptions.",
  "The garden grows not by force but by conditions. What conditions are you creating in your life right now?",
];

export default function OracleChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'oracle', text: 'I am the Green Resonance Oracle. Ask, and the living grid shall respond. I offer reflective prompts and contemplative guidance — not medical, legal, or financial advice.' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', text: input };
    const response = oracleResponses[Math.floor(Math.random() * oracleResponses.length)];
    const oracleMsg: Message = { role: 'oracle', text: response };
    setMessages((prev) => [...prev, userMsg, oracleMsg]);
    setInput('');
  };

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full glass-bio glow-biolum flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ boxShadow: ['0 0 20px rgba(57,255,140,0.15)', '0 0 40px rgba(57,255,140,0.25)', '0 0 20px rgba(57,255,140,0.15)'] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {isOpen ? <X className="w-6 h-6 text-solarpunk-biolum" /> : <MessageCircle className="w-6 h-6 text-solarpunk-biolum" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-[340px] sm:w-[380px] max-h-[500px] glass-solar rounded-2xl overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 border-b border-solarpunk-moss/15 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-solarpunk-amber" />
              <h3 className="font-display text-sm tracking-widest text-solarpunk-amber">GREEN RESONANCE ORACLE</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[340px]">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm font-body leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-solarpunk-canopy/30 text-moonlight-white rounded-br-sm'
                        : 'glass-bio text-moonlight-white/80 rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-3 border-t border-solarpunk-moss/15">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask the Oracle..."
                  className="flex-1 bg-cosmic-deep/50 border border-solarpunk-moss/15 rounded-xl px-4 py-2.5 text-sm font-body text-moonlight-white placeholder:text-moonlight-white/25 focus:outline-none focus:border-solarpunk-biolum/30 transition-colors"
                />
                <button
                  onClick={handleSend}
                  className="p-2.5 rounded-xl bg-solarpunk-biolum/15 hover:bg-solarpunk-biolum/25 text-solarpunk-biolum transition-colors"
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
