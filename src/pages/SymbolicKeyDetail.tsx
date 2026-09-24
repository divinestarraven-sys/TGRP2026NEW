import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Sprout,
  Sparkles,
  AlertTriangle,
  KeyRound,
  ChevronRight,
  Quote,
  Compass,
  Leaf,
  Users,
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import GlassCard from '../components/GlassCard';
import {
  getKeyBySlug,
  getAdjacentKeys,
  getKeyByNumber,
} from '../data/symbolic-keys';

/* ── tiny helpers ─────────────────────────────────── */

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' as const },
  }),
};

function SectionTitle({
  icon: Icon,
  children,
  gold = false,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
  gold?: boolean;
}) {
  return (
    <h2
      className={`font-display text-xl sm:text-2xl tracking-wider flex items-center gap-3 mb-4 ${
        gold ? 'text-gold-sacred' : 'text-emerald-glow'
      }`}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      {children}
    </h2>
  );
}

/* ── component ────────────────────────────────────── */

export default function SymbolicKeyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const key = slug ? getKeyBySlug(slug) : undefined;

  if (!key) return <Navigate to="/symbolic-keys" replace />;

  const { prev, next } = getAdjacentKeys(key.number);

  /* resolve related keys to their objects */
  const relatedKeyObjects = key.relatedKeys
    .map((n) => getKeyByNumber(n))
    .filter(Boolean) as NonNullable<ReturnType<typeof getKeyByNumber>>[];

  let sectionIndex = 0;

  return (
    <PageTransition>
      <div className="min-h-screen bg-cosmic-black">
        {/* ── Breadcrumb ──────────────────────────────── */}
        <div className="max-w-3xl mx-auto px-4 pt-28 sm:pt-36">
          <nav className="flex items-center gap-2 font-body text-sm text-moonlight-white/50 mb-8 flex-wrap">
            <Link
              to="/symbolic-keys"
              className="hover:text-emerald-glow transition-colors"
            >
              Symbolic Keys
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-moonlight-white/80">{key.name}</span>
          </nav>
        </div>

        {/* ── Hero ────────────────────────────────────── */}
        <section className="relative pb-12 sm:pb-16 px-4 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-emerald-glow/5 blur-[120px]" />
          </div>

          <motion.div
            className="relative z-10 max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-glow/10 border border-emerald-glow/25 font-display text-emerald-glow text-xl tracking-wider mb-6">
              {key.number}
            </span>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-wider text-moonlight-white mb-4">
              {key.name}
            </h1>

            <p className="font-sacred text-gold-sacred/80 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              {key.theme}
            </p>
          </motion.div>
        </section>

        {/* ── Gallery image ───────────────────────────── */}
        {key.galleryImage && (
          <motion.div
            className="max-w-3xl mx-auto px-4 mb-12"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="rounded-2xl overflow-hidden border border-emerald-glow/10">
              <img
                src={key.galleryImage}
                alt={key.galleryImageAlt || key.name}
                loading="lazy"
                width={960}
                height={540}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        )}

        {/* ── Content sections ────────────────────────── */}
        <div className="max-w-3xl mx-auto px-4 pb-16 space-y-10">
          {/* 1 · Introduction */}
          <motion.section
            custom={sectionIndex++}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <GlassCard hover={false} className="p-6 sm:p-8">
              <SectionTitle icon={BookOpen}>Introduction</SectionTitle>
              <p className="font-body text-moonlight-white/80 leading-relaxed">
                {key.introduction}
              </p>
            </GlassCard>
          </motion.section>

          {/* 2 · Within Green Resonance */}
          <motion.section
            custom={sectionIndex++}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <GlassCard hover={false} className="p-6 sm:p-8">
              <SectionTitle icon={Leaf}>Within Green Resonance</SectionTitle>
              <p className="font-body text-moonlight-white/80 leading-relaxed">
                {key.greenResonance}
              </p>
            </GlassCard>
          </motion.section>

          {/* 3 · Historical Context */}
          <motion.section
            custom={sectionIndex++}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <GlassCard hover={false} className="p-6 sm:p-8">
              <SectionTitle icon={Compass} gold>
                Historical Context
              </SectionTitle>
              <p className="font-body text-moonlight-white/80 leading-relaxed">
                {key.historicalContext}
              </p>
            </GlassCard>
          </motion.section>

          {/* 4 · Try It Today */}
          <motion.section
            custom={sectionIndex++}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <GlassCard hover={false} bio className="p-6 sm:p-8">
              <SectionTitle icon={Sparkles}>Try It Today</SectionTitle>
              <p className="font-body text-moonlight-white/80 leading-relaxed">
                {key.practice}
              </p>
            </GlassCard>
          </motion.section>

          {/* 5 · Garden & Community Application */}
          <motion.section
            custom={sectionIndex++}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <GlassCard hover={false} className="p-6 sm:p-8">
              <SectionTitle icon={Sprout}>
                Garden &amp; Community Application
              </SectionTitle>
              <p className="font-body text-moonlight-white/80 leading-relaxed">
                {key.gardenApplication}
              </p>
            </GlassCard>
          </motion.section>

          {/* 6 · Reflection Question */}
          <motion.section
            custom={sectionIndex++}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <div className="relative rounded-2xl border border-gold-sacred/20 bg-gold-sacred/5 p-6 sm:p-8">
              <Quote className="absolute top-4 right-4 w-8 h-8 text-gold-sacred/20" />
              <h2 className="font-display text-xl sm:text-2xl tracking-wider text-gold-sacred flex items-center gap-3 mb-4">
                <Quote className="w-5 h-5 flex-shrink-0" />
                Reflection Question
              </h2>
              <p className="font-sacred text-moonlight-white text-lg sm:text-xl leading-relaxed italic">
                "{key.reflectionQuestion}"
              </p>
            </div>
          </motion.section>

          {/* 7 · Related Project Pages */}
          {key.relatedPages.length > 0 && (
            <motion.section
              custom={sectionIndex++}
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <GlassCard hover={false} className="p-6 sm:p-8">
                <SectionTitle icon={Users}>Related Project Pages</SectionTitle>
                <div className="flex flex-wrap gap-3">
                  {key.relatedPages.map((page) => (
                    <Link
                      key={page.path}
                      to={page.path}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-glow/20 bg-emerald-glow/5 font-body text-sm text-emerald-glow hover:bg-emerald-glow/10 hover:border-emerald-glow/40 transition-colors"
                    >
                      {page.label}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ))}
                </div>
              </GlassCard>
            </motion.section>
          )}

          {/* 8 · Related Keys */}
          {relatedKeyObjects.length > 0 && (
            <motion.section
              custom={sectionIndex++}
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <GlassCard hover={false} className="p-6 sm:p-8">
                <SectionTitle icon={KeyRound}>Related Keys</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {relatedKeyObjects.map((rk) => (
                    <Link
                      key={rk.slug}
                      to={`/symbolic-keys/${rk.slug}`}
                      className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-emerald-glow/10 bg-cosmic-deep/40 hover:border-emerald-glow/30 hover:bg-cosmic-deep/60 transition-colors"
                    >
                      <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-glow/10 font-display text-emerald-glow text-xs tracking-wider">
                        {rk.number}
                      </span>
                      <span className="font-body text-sm text-moonlight-white/80 group-hover:text-emerald-glow transition-colors">
                        {rk.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </GlassCard>
            </motion.section>
          )}

          {/* 9 · Sources */}
          {key.sources.length > 0 && (
            <motion.section
              custom={sectionIndex++}
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <GlassCard hover={false} gold className="p-6 sm:p-8">
                <SectionTitle icon={ExternalLink} gold>
                  Sources
                </SectionTitle>
                <ul className="space-y-4">
                  {key.sources.map((src) => (
                    <li key={src.id}>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-start gap-2 text-emerald-glow hover:text-emerald-glow/80 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                        <span>
                          <span className="font-body text-sm leading-relaxed underline underline-offset-2 decoration-emerald-glow/30">
                            {src.title}
                          </span>
                          <span className="block font-body text-xs text-moonlight-white/50 mt-0.5">
                            {src.publisher} · Reviewed {src.reviewDate}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.section>
          )}

          {/* 10 · Important Distinctions */}
          {key.disclaimers.length > 0 && (
            <motion.section
              custom={sectionIndex++}
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <div className="rounded-2xl border border-gold-sacred/15 bg-gold-sacred/[0.03] p-6 sm:p-8">
                <h2 className="font-display text-xl sm:text-2xl tracking-wider text-gold-sacred flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                  Important Distinctions
                </h2>
                <ul className="space-y-3">
                  {key.disclaimers.map((d, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 font-body text-sm text-moonlight-white/70 leading-relaxed"
                    >
                      <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-gold-sacred/50 flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.section>
          )}
        </div>

        {/* ── Prev / Next navigation ──────────────────── */}
        <div className="max-w-3xl mx-auto px-4 pb-24">
          <div className="flex items-stretch gap-4">
            {prev ? (
              <Link
                to={`/symbolic-keys/${prev.slug}`}
                className="group flex-1 flex items-center gap-3 px-5 py-4 rounded-xl border border-emerald-glow/15 bg-cosmic-deep/40 hover:border-emerald-glow/30 hover:bg-cosmic-deep/60 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-emerald-glow/60 group-hover:text-emerald-glow group-hover:-translate-x-1 transition-all" />
                <div className="text-left">
                  <span className="block font-body text-xs text-moonlight-white/40 uppercase tracking-wider">
                    Previous
                  </span>
                  <span className="block font-display text-sm tracking-wider text-moonlight-white/80 group-hover:text-emerald-glow transition-colors">
                    {prev.number}. {prev.name}
                  </span>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {next ? (
              <Link
                to={`/symbolic-keys/${next.slug}`}
                className="group flex-1 flex items-center justify-end gap-3 px-5 py-4 rounded-xl border border-emerald-glow/15 bg-cosmic-deep/40 hover:border-emerald-glow/30 hover:bg-cosmic-deep/60 transition-colors text-right"
              >
                <div>
                  <span className="block font-body text-xs text-moonlight-white/40 uppercase tracking-wider">
                    Next
                  </span>
                  <span className="block font-display text-sm tracking-wider text-moonlight-white/80 group-hover:text-emerald-glow transition-colors">
                    {next.number}. {next.name}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-emerald-glow/60 group-hover:text-emerald-glow group-hover:translate-x-1 transition-all" />
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>

          {/* back to library link */}
          <div className="text-center mt-8">
            <Link
              to="/symbolic-keys"
              className="inline-flex items-center gap-2 font-body text-sm text-moonlight-white/50 hover:text-emerald-glow transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all Symbolic Keys
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
