import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Waves, Music, Wind, Leaf, ArrowRight, Heart, Eye, Sparkles, RotateCcw } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SacredGeometry from '../components/SacredGeometry';
import CymaticWaves from '../components/CymaticWaves';
import MyceliumNetwork from '../components/MyceliumNetwork';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';
import GalleryShowcase from '../components/GalleryShowcase';

const weaveAspects = [
  {
    title: 'The Cosmic Pulse',
    icon: Waves,
    desc: 'Every system in the universe oscillates. From the orbit of planets to the beat of the human heart, rhythm is the language of life. The Rhythmic Weave teaches us to listen for this pulse — to find the tempo of our own becoming and move with it, not against it.',
    color: 'cyan-glow',
  },
  {
    title: 'Harmonic Resonance',
    icon: Music,
    desc: 'When two frequencies align, they amplify each other. This is resonance — the principle that makes music beautiful and ecosystems resilient. In the Rhythmic Weave, we seek resonance: the alignment of individual rhythms into collective harmony.',
    color: 'gold-sacred',
  },
  {
    title: 'The Breath of the Earth',
    icon: Wind,
    desc: 'The Earth breathes. Seasons inhale and exhale. Tides rise and fall. Forests expand and contract. When we attune to these rhythms, we find that our own breath is not separate from the planet\'s. The Rhythmic Weave is the practice of breathing with the Earth.',
    color: 'emerald-glow',
  },
  {
    title: 'The Mycelial Web',
    icon: Leaf,
    desc: 'Beneath every forest, a network of mycelium connects every tree, every plant, every microbe in a web of mutual aid. This is the physical expression of the Rhythmic Weave — a decentralized intelligence that distributes resources, shares information, and maintains the health of the whole.',
    color: 'emerald-glow',
  },
];

const sixPrinciples = [
  { title: 'Resonance', desc: 'Everything influences everything else. Every thought, word, and action sends ripples through the living web.', icon: Waves, color: 'cyan-ether' },
  { title: 'Reciprocity', desc: 'Life moves through giving and receiving. The health of the whole depends on the generosity of each part.', icon: Heart, color: 'emerald-glow' },
  { title: 'Rhythm', desc: 'Nature teaches through cycles and seasons. There is a time for every purpose — and wisdom is knowing which time it is.', icon: Music, color: 'gold-sacred' },
  { title: 'Reflection', desc: 'Outer patterns mirror inner alignment. The world you see is the resonance you carry. Change the frequency, change the pattern.', icon: Eye, color: 'sacred-violet' },
  { title: 'Reverence', desc: 'Beauty, mystery, and life are sacred. Not in a dogmatic sense — but in the recognition that existence itself is extraordinary.', icon: Sparkles, color: 'solarpunk-biolum' },
  { title: 'Remembrance', desc: 'Humanity is part of the living system, not separate from it. To remember is to return to the original relationship.', icon: RotateCcw, color: 'solarpunk-amber' },
];

const resonanceLevels = [
  { level: 'Cymatic', desc: 'Visible patterns formed by sound. The first glimpse of the weave.', freq: '432 Hz' },
  { level: 'Somatic', desc: 'Felt resonance in the body. The weave becomes personal.', freq: '528 Hz' },
  { level: 'Ecological', desc: 'Resonance with living systems. The weave becomes relational.', freq: '639 Hz' },
  { level: 'Cosmic', desc: 'Alignment with universal patterns. The weave becomes infinite.', freq: '741 Hz' },
];

export default function RhythmicWeave() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-cosmic-deep/20 to-cosmic-black" />
        <div className="absolute inset-0 opacity-30">
          <CymaticWaves frequency={2.5} />
        </div>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <SacredGeometry size={600} opacity={0.06} />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Waves className="w-6 h-6 text-cyan-glow" />
            <span className="font-sacred text-cyan-glow/80 text-sm tracking-[0.3em]">THE RHYTHMIC WEAVE</span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-wider mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="text-gradient-emerald">The Frequency</span>
            <br />
            <span className="text-gradient-gold">That Connects</span>
            <br />
            <span className="text-gradient-sacred">All Living Things</span>
          </motion.h1>

          <motion.p
            className="font-sacred text-moonlight-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Beyond the visible, there is a resonance — a pattern that underlies all growth, all harmony, all transformation.
          </motion.p>
        </div>
      </section>

      {/* Weave Aspects */}
      <section className="section-padding relative">
        <div className="absolute inset-0 opacity-20">
          <MyceliumNetwork nodeCount={25} />
        </div>
        <div className="container-sacred relative z-10">
          <SectionHeading
            title="Aspects of the Weave"
            subtitle="Four dimensions of a single resonance. Each aspect reveals a different face of the same truth."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {weaveAspects.map((aspect, i) => (
              <GlassCard key={aspect.title} delay={i * 0.1} className="p-6 sm:p-8">
                <div className={`w-12 h-12 rounded-xl bg-${aspect.color}/10 flex items-center justify-center mb-4`}>
                  <aspect.icon className={`w-6 h-6 text-${aspect.color}`} />
                </div>
                <h3 className="font-display text-xl tracking-wider text-moonlight-white mb-3">{aspect.title}</h3>
                <p className="font-body text-moonlight-white/50 leading-relaxed">{aspect.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Resonance Levels */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-cosmic-deep to-cosmic-black">
        <div className="container-sacred">
          <SectionHeading
            title="Levels of Resonance"
            subtitle="From the visible to the cosmic — each level deepens the weave."
          />

          <div className="space-y-4 max-w-3xl mx-auto">
            {resonanceLevels.map((level, i) => (
              <GlassCard key={level.level} delay={i * 0.1} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-cyan-glow/10 flex items-center justify-center">
                      <span className="font-display text-cyan-glow text-sm">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <div>
                      <h4 className="font-display text-lg tracking-wider text-moonlight-white">{level.level}</h4>
                      <p className="font-body text-moonlight-white/40 text-sm">{level.desc}</p>
                    </div>
                  </div>
                  <span className="font-display text-cyan-glow/60 text-sm tracking-wider hidden sm:block">{level.freq}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Harmonic Visual */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0">
          <CymaticWaves frequency={4} />
        </div>
        <div className="container-sacred relative z-10 text-center">
          <SectionHeading
            title="Harmonic Resonance"
            subtitle="When individual frequencies align, the result is greater than the sum of its parts."
          />
          <div className="flex justify-center">
            <SacredGeometry size={400} opacity={0.12} />
          </div>
        </div>
      </section>

      {/* Six Principles */}
      <section className="section-padding relative">
        <div className="absolute inset-0 opacity-20">
          <MyceliumNetwork nodeCount={20} />
        </div>
        <div className="container-sacred relative z-10">
          <SectionHeading
            title="Six Principles of the Weave"
            subtitle="Resonance • Reciprocity • Rhythm • Reflection • Reverence • Remembrance"
          />
          <p className="font-body text-moonlight-white/40 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
            The Rhythmic Weave teaches that every thought, word, action, breath, song, seed, and relationship becomes part of the living rhythm of the world.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sixPrinciples.map((principle, i) => (
              <GlassCard key={principle.title} delay={i * 0.1} className="p-6 sm:p-8">
                <div className={`w-12 h-12 rounded-xl bg-${principle.color}/10 flex items-center justify-center mb-4`}>
                  <principle.icon className={`w-6 h-6 text-${principle.color}`} />
                </div>
                <h3 className="font-display text-xl tracking-wider text-moonlight-white mb-3">{principle.title}</h3>
                <p className="font-body text-moonlight-white/50 leading-relaxed">{principle.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-sacred text-center">
          <GlassCard gold className="p-8 sm:p-12 max-w-2xl mx-auto">
            <h3 className="font-display text-2xl tracking-wider text-gradient-gold mb-4">
              Cultivate Harmony
            </h3>
            <p className="font-sacred text-moonlight-white/50 mb-6 leading-relaxed">
              The weave is not something you learn — it is something you remember. Join the community and begin.
            </p>
            <Link
              to="/join"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-sacred/20 border border-gold-sacred/30 hover:bg-gold-sacred/30 transition-all font-display text-sm tracking-widest text-gold-sacred"
            >
              Join The Living Grid
              <ArrowRight className="w-4 h-4" />
            </Link>
          </GlassCard>
        </div>
      </section>

      <GalleryShowcase
        srcs={[
          '/Gallery/05-six-pillars-rhythmic-weave-edition.jpg',
          '/Gallery/13-six-pillars-daily-practice-cards.jpg',
          '/Gallery/14-six-pillars-portal-keys-expanded.jpg',
        ]}
        limit={3}
        title="Rhythmic Weave Artwork"
        subtitle="Practice cards and pillar visualizations for the Rhythmic Weave"
      />
    </PageTransition>
  );
}
