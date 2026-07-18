import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X, Plus, Trash2 } from 'lucide-react';

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

const STORAGE_KEY = 'green-resonance-journal';

export default function ResonanceJournal() {
  const [isOpen, setIsOpen] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [selectedPillar, setSelectedPillar] = useState('General');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setEntries(JSON.parse(stored));
    } catch { /* localStorage unavailable */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
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
      <motion.button
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full glass-gold glow-amber flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ boxShadow: ['0 0 20px rgba(212,168,67,0.15)', '0 0 40px rgba(212,168,67,0.25)', '0 0 20px rgba(212,168,67,0.15)'] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {isOpen ? <X className="w-6 h-6 text-gold-sacred" /> : <BookOpen className="w-6 h-6 text-gold-sacred" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 left-6 z-50 w-[340px] sm:w-[380px] max-h-[500px] glass-solar rounded-2xl overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 border-b border-solarpunk-moss/15 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gold-sacred" />
              <h3 className="font-display text-sm tracking-widest text-gold-sacred">RESONANCE JOURNAL</h3>
            </div>

            <div className="p-3 border-b border-solarpunk-moss/15">
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

            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[120px] max-h-[280px]">
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
                      >
                        <Trash2 className="w-3 h-3 text-moonlight-white/20 hover:text-red-400/60" />
                      </button>
                    </div>
                  </div>
                  <p className="font-body text-sm text-moonlight-white/60 leading-relaxed">{entry.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
