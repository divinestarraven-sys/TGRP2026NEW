import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, X, Play, Pause } from 'lucide-react';

const frequencies = [
  { name: 'C — Sun', freq: 523.25, color: '#D4AF37', desc: 'Vitality & illumination' },
  { name: 'D — Moon', freq: 587.33, color: '#C0C0C0', desc: 'Reflection & cycles' },
  { name: 'E — Mercury', freq: 659.25, color: '#68E3D4', desc: 'Communication & learning' },
  { name: 'F — Venus', freq: 698.46, color: '#B87333', desc: 'Beauty & harmony' },
  { name: 'G — Mars', freq: 783.99, color: '#E53935', desc: 'Courage & action' },
  { name: 'A — Jupiter', freq: 880.00, color: '#10b981', desc: 'Wisdom & abundance' },
  { name: 'B — Saturn', freq: 987.77, color: '#1B365D', desc: 'Structure & time' },
];

export default function HarmonicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeFreq, setActiveFreq] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => {
      stopSound();
    };
  }, []);

  const stopSound = () => {
    if (oscillatorRef.current) {
      try { oscillatorRef.current.stop(); } catch {}
      oscillatorRef.current = null;
    }
    setIsPlaying(false);
  };

  const playFreq = (freq: number, index: number) => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
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
        audioCtxRef.current.currentTime + 0.1
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
      <motion.button
        className="fixed bottom-6 left-24 z-50 w-14 h-14 rounded-full glass-bio flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-cyan-ether" />
        ) : (
          <Volume2 className="w-6 h-6 text-cyan-ether" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 left-24 z-50 w-[300px] sm:w-[340px] glass-solar rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 border-b border-solarpunk-moss/15">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-cyan-ether" />
                  <h3 className="font-display text-sm tracking-widest text-cyan-ether">HARMONIC FREQUENCIES</h3>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handlePause}
                    className="p-1.5 rounded-lg bg-cosmic-deep/50 text-moonlight-white/40 hover:text-moonlight-white transition-colors"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="p-1.5 rounded-lg bg-cosmic-deep/50 text-moonlight-white/40 hover:text-moonlight-white transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <p className="text-[10px] font-body text-moonlight-white/25 mt-1">
                Symbolic and contemplative. Not scientific proof. No autoplay.
              </p>
            </div>

            <div className="p-3 space-y-1.5">
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
