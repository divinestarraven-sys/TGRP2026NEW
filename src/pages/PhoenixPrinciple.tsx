import { motion } from 'framer-motion';
import { Flame, TreePine, Sparkles, Shield, ArrowRight, Zap, RotateCcw, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import SacredGeometry from '../components/SacredGeometry';
import PhoenixSigilBackground from '../components/PhoenixSigilBackground';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';
import CymaticWaves from '../components/CymaticWaves';
import GalleryShowcase from '../components/GalleryShowcase';
import PhoenixPrincipleAnimatedSigil from '../components/PhoenixPrincipleAnimatedSigil';

const phoenixAspects = [
  {
    id: 1,
    title: 'Truth Through Fire',
    description: 'The fire of discernment burns away illusion and reveals what is essential.',
    icon: Flame,
    color: 'solarpunk-amber',
    accent: 'gold-sacred',
  },
  {
    id: 2,
    title: 'Emotional Composting',
    description: 'Pain, grief, and old patterns become the soil of new growth.',
    icon: TreePine,
    color: 'emerald-glow',
    accent: 'emerald-glow',
  },
  {
    id: 3,
    title: 'Regeneration After Collapse',
    description: 'Systems that fail honestly become the foundation for what is real.',
    icon: Shield,
    color: 'solarpunk-copper',
    accent: 'solarpunk-copper',
  },
  {
    id: 4,
    title: 'Refinement Through Adversity',
    description: 'Challenge is not punishment — it is the forge of character.',
    icon: Zap,
    color: 'gold-sacred',
    accent: 'gold-sacred',
  },
  {
    id: 5,
    title: 'Courage In Motion',
    description: 'Transformation requires the willingness to step into the unknown.',
    icon: Sparkles,
    color: 'solarpunk-amber',
    accent: 'solarpunk-amber',
  },
  {
    id: 6,
    title: 'Rebuilding From The Ashes',
    description: 'Every ending contains the seed of a more aligned beginning.',
    icon: Sun,
    color: 'emerald-glow',
    accent: 'gold-sacred',
  },
];

const transformationCycle = [
  { stage: 'Ash', icon: Flame, color: 'solarpunk-copper' },
  { stage: 'Ember', icon: Sparkles, color: 'solarpunk-amber' },
  { stage: 'Flame', icon: Flame, color: 'gold-sacred' },
  { stage: 'Light', icon: Sun, color: 'gold-sacred' },
  { stage: 'Seed', icon: TreePine, color: 'emerald-glow' },
  { stage: 'Root', icon: TreePine, color: 'emerald-glow' },
  { stage: 'Bloom', icon: Sparkles, color: 'solarpunk-amber' },
  { stage: 'Ash', icon: Flame, color: 'solarpunk-copper' },
];

const flameDance = {
  animate: {
    y: [0, -6, 0, -3, 0],
    filter: [
      'brightness(1) drop-shadow(0 0 6px rgba(212, 168, 67, 0.3))',
      'brightness(1.15) drop-shadow(0 0 12px rgba(212, 168, 67, 0.5))',
      'brightness(1) drop-shadow(0 0 6px rgba(212, 168, 67, 0.3))',
      'brightness(1.08) drop-shadow(0 0 9px rgba(212, 168, 67, 0.4))',
      'brightness(1) drop-shadow(0 0 6px rgba(212, 168, 67, 0.3))',
    ],
  },
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
};

const cycleItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  }),
};

export default function PhoenixPrinciple() {
  return (
    <PageTransition>
      {/* ===== Hero ===== */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-emerald-deep/10 to-cosmic-black" />
        <div className="absolute inset-0">
          <PhoenixPrincipleAnimatedSigil />
        </div>
        <PhoenixSigilBackground />
        <div className="absolute inset-0 bg-gradient-to-t from-cosmic-black via-transparent to-transparent" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04]">
          <SacredGeometry size={700} opacity={1} animated />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="mb-8"
          >
            <motion.div
              className="w-20 h-20 rounded-full bg-gold-sacred/10 border border-gold-sacred/20 flex items-center justify-center mx-auto"
              {...flameDance}
            >
              <Flame className="w-9 h-9 text-gold-sacred" />
            </motion.div>
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-wider text-gradient-gold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            The Phoenix Principle
          </motion.h1>

          <motion.p
            className="font-sacred text-gold-sacred/50 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            The Sacred Fire of Transformation
          </motion.p>
        </div>
      </section>

      {/* ===== Motto ===== */}
      <section className="section-padding relative">
        <div className="container-sacred text-center">
          <motion.blockquote
            className="font-sacred text-2xl sm:text-3xl lg:text-4xl text-gold-sacred leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9 }}
          >
            "Burn what is false. Protect what is true. Rise in alignment."
          </motion.blockquote>

          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-gold-sacred/30 to-transparent mt-10 mx-auto"
            style={{ maxWidth: 280 }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />
        </div>
      </section>

      {/* ===== Introduction ===== */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-emerald-deep/5 to-cosmic-black relative">
        <div className="absolute inset-0 opacity-10">
          <CymaticWaves frequency={1.2} />
        </div>
        <div className="container-sacred relative z-10 max-w-3xl mx-auto text-center">
          <motion.p
            className="font-body text-moonlight-white/60 text-base sm:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
          >
            The Phoenix is the central transformation archetype of the framework. It represents
            conscious transformation, regeneration through adversity, refinement through challenge,
            cyclical renewal, and resilience through awareness. Presented as symbolic and
            contemplative — not as scientific claim.
          </motion.p>
        </div>
      </section>

      {/* ===== Phoenix Aspects Grid ===== */}
      <section className="section-padding relative">
        <SectionHeading
          title="Phoenix Aspects"
          subtitle="Six dimensions of the sacred fire that burns through illusion and forges what is real."
        />

        <div className="container-sacred">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {phoenixAspects.map((aspect, i) => (
              <motion.div
                key={aspect.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <GlassCard gold className="p-6 h-full group">
                  <div className="flex flex-col items-start gap-4">
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-${aspect.color}/10 flex items-center justify-center shrink-0`}
                      {...flameDance}
                    >
                      <aspect.icon className={`w-6 h-6 text-${aspect.accent}`} />
                    </motion.div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-moonlight-white/20 font-display text-xs tracking-widest">
                          {String(aspect.id).padStart(2, '0')}
                        </span>
                        <h3 className="font-display text-lg tracking-wider text-moonlight-white">
                          {aspect.title}
                        </h3>
                      </div>
                      <p className="font-body text-moonlight-white/50 text-sm leading-relaxed">
                        {aspect.description}
                      </p>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-sacred/10 to-transparent mt-auto" />
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Transformation Cycle ===== */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-cosmic-deep to-cosmic-black relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
          <SacredGeometry size={600} opacity={1} animated />
        </div>

        <SectionHeading
          title="The Transformation Cycle"
          subtitle="An eternal spiral — each ending seeds the next beginning."
        />

        <div className="container-sacred relative z-10">
          {/* Desktop: horizontal wrapped flow */}
          <div className="hidden sm:flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {transformationCycle.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <motion.div
                  custom={i}
                  variants={cycleItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  className="flex flex-col items-center gap-2"
                >
                  <motion.div
                    className={`w-16 h-16 rounded-full bg-${item.color}/10 border border-${item.color}/20 flex items-center justify-center`}
                    animate={{
                      boxShadow: [
                        `0 0 0px rgba(0,0,0,0)`,
                        `0 0 16px rgba(212, 168, 67, 0.15)`,
                        `0 0 0px rgba(0,0,0,0)`,
                      ],
                    }}
                    transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
                  >
                    <item.icon className={`w-7 h-7 text-${item.color}`} />
                  </motion.div>
                  <span className="font-display text-xs tracking-widest text-moonlight-white/50">
                    {item.stage}
                  </span>
                </motion.div>

                {i < transformationCycle.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.3, duration: 0.4 }}
                    className="flex items-center"
                  >
                    <ArrowRight className="w-4 h-4 text-gold-sacred/30" />
                  </motion.div>
                )}
              </div>
            ))}

            {/* Return arrow from last Ash back to first Ash */}
            <motion.div
              className="w-full flex justify-center mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <div className="flex items-center gap-2 text-gold-sacred/30">
                <RotateCcw className="w-4 h-4" />
                <span className="font-sacred text-xs tracking-widest text-gold-sacred/40">
                  The cycle renews
                </span>
                <RotateCcw className="w-4 h-4" />
              </div>
            </motion.div>
          </div>

          {/* Mobile: vertical list with arrows */}
          <div className="sm:hidden flex flex-col items-center gap-1 max-w-xs mx-auto">
            {transformationCycle.map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <motion.div
                  custom={i}
                  variants={cycleItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-30px' }}
                  className="flex flex-col items-center gap-1.5"
                >
                  <motion.div
                    className={`w-14 h-14 rounded-full bg-${item.color}/10 border border-${item.color}/20 flex items-center justify-center`}
                    animate={{
                      boxShadow: [
                        `0 0 0px rgba(0,0,0,0)`,
                        `0 0 12px rgba(212, 168, 67, 0.15)`,
                        `0 0 0px rgba(0,0,0,0)`,
                      ],
                    }}
                    transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
                  >
                    <item.icon className={`w-6 h-6 text-${item.color}`} />
                  </motion.div>
                  <span className="font-display text-[10px] tracking-widest text-moonlight-white/50">
                    {item.stage}
                  </span>
                </motion.div>

                {i < transformationCycle.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-gold-sacred/20 rotate-90 my-0.5" />
                )}
              </div>
            ))}

            <motion.div
              className="flex items-center gap-2 text-gold-sacred/30 mt-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <RotateCcw className="w-3 h-3" />
              <span className="font-sacred text-[10px] tracking-widest text-gold-sacred/40">
                The cycle renews
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section-padding relative">
        <div className="container-sacred max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard gold className="p-8 sm:p-12">
              <motion.div
                className="w-14 h-14 rounded-full bg-gold-sacred/10 border border-gold-sacred/20 flex items-center justify-center mx-auto mb-6"
                {...flameDance}
              >
                <Sparkles className="w-6 h-6 text-gold-sacred" />
              </motion.div>

              <h3 className="font-display text-2xl sm:text-3xl tracking-wider text-gradient-gold mb-4">
                Enter The Living Framework
              </h3>

              <p className="font-sacred text-moonlight-white/45 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
                The Phoenix burns within every pillar. Walk the path of conscious transformation.
              </p>

              <Link
                to="/pillars"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gold-sacred/15 border border-gold-sacred/30 hover:bg-gold-sacred/25 hover:border-gold-sacred/50 transition-all font-display text-sm tracking-widest text-gold-sacred group"
              >
                Explore The Pillars
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Phoenix Gallery */}
      <GalleryShowcase
        srcs={['/Gallery/09-phoenix-master-sigil.jpg']}
        limit={1}
        title="The Phoenix Master Sigil"
        subtitle="Sacred symbol of transformation, rebirth, and conscious regeneration"
        linkToGallery={false}
      />
    </PageTransition>
  );
}
