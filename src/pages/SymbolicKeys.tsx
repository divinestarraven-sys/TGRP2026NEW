import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, KeyRound, ArrowRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import GlassCard from '../components/GlassCard';
import { symbolicKeys } from '../data/symbolic-keys';

export default function SymbolicKeys() {
  const [search, setSearch] = useState('');

  const filteredKeys = useMemo(() => {
    if (!search.trim()) return symbolicKeys;
    const q = search.toLowerCase().trim();
    return symbolicKeys.filter(
      (key) =>
        key.name.toLowerCase().includes(q) ||
        key.theme.toLowerCase().includes(q) ||
        key.introduction.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-cosmic-black">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 px-4 text-center overflow-hidden">
          {/* ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-emerald-glow/5 blur-[120px]" />
          </div>

          <motion.div
            className="relative z-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-glow/20 bg-emerald-glow/5 mb-8">
              <KeyRound className="w-4 h-4 text-emerald-glow" />
              <span className="font-body text-sm text-emerald-glow tracking-wider uppercase">
                Symbolic Library
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-wider text-moonlight-white mb-6">
              The 20{' '}
              <span className="text-emerald-glow">Symbolic Keys</span>
            </h1>

            <p className="font-body text-moonlight-white/70 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
              A library of reflective tools, historical symbols, and practical
              exercises — each grounded in honest context and designed for
              everyday use within the Green Resonance project.
            </p>
          </motion.div>
        </section>

        {/* ── Search ───────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-4 mb-12">
          <motion.div
            className="relative max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-moonlight-white/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, theme, or keyword…"
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-cosmic-deep/60 border border-emerald-glow/15 text-moonlight-white font-body placeholder:text-moonlight-white/30 focus:outline-none focus:border-emerald-glow/40 focus:ring-1 focus:ring-emerald-glow/20 transition-colors"
            />
          </motion.div>

          {search.trim() && (
            <p className="text-center font-body text-moonlight-white/50 text-sm mt-4">
              {filteredKeys.length}{' '}
              {filteredKeys.length === 1 ? 'key' : 'keys'} found
            </p>
          )}
        </section>

        {/* ── Grid ─────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-4 pb-24">
          {filteredKeys.length === 0 ? (
            <motion.p
              className="text-center font-body text-moonlight-white/50 text-lg py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No keys match your search. Try a different term.
            </motion.p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredKeys.map((key, i) => (
                <Link
                  key={key.slug}
                  to={`/symbolic-keys/${key.slug}`}
                  className="group block"
                >
                  <GlassCard
                    className="h-full p-6 flex flex-col"
                    hover
                    delay={Math.min(i * 0.05, 0.6)}
                  >
                    {/* number badge */}
                    <div className="flex items-start justify-between mb-4">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-glow/10 border border-emerald-glow/20 font-display text-emerald-glow text-sm tracking-wider">
                        {key.number}
                      </span>
                      <ArrowRight className="w-4 h-4 text-moonlight-white/30 group-hover:text-emerald-glow group-hover:translate-x-1 transition-all duration-300" />
                    </div>

                    {/* name */}
                    <h3 className="font-display text-lg tracking-wider text-moonlight-white group-hover:text-emerald-glow transition-colors duration-300 mb-2">
                      {key.name}
                    </h3>

                    {/* theme */}
                    <p className="font-sacred text-gold-sacred/80 text-sm leading-relaxed mb-3">
                      {key.theme}
                    </p>

                    {/* intro excerpt */}
                    <p className="font-body text-moonlight-white/60 text-sm leading-relaxed line-clamp-2 mt-auto">
                      {key.introduction}
                    </p>
                  </GlassCard>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </PageTransition>
  );
}
