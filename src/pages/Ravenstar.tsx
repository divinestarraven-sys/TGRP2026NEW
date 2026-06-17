import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Compass,
  Radio,
  Shield,
  CloudLightning,
  BookOpen,
  Telescope,
  Scan,
  Eye,
  Archive,
  AlertTriangle,
  Navigation,
  Music,
  Moon,
  Footprints,
  ArrowRight,
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SacredGeometry from '../components/SacredGeometry';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';
import RavenstarConstellation from '../components/RavenstarConstellation';
import GalleryShowcase from '../components/GalleryShowcase';

const ravenstarFunctions = [
  {
    title: 'Orientation',
    desc: 'Navigating by the stars of truth, not the fog of reaction',
    icon: Compass,
  },
  {
    title: 'Symbolic Literacy',
    desc: 'Reading the language of pattern, myth, and archetype',
    icon: Eye,
  },
  {
    title: 'Transmission Integrity',
    desc: 'Ensuring the signal remains clear through time',
    icon: Radio,
  },
  {
    title: 'Emotional Weather Awareness',
    desc: 'Reading the inner and outer atmosphere with clarity',
    icon: CloudLightning,
  },
  {
    title: 'Mythic Continuity',
    desc: 'Carrying the thread of story across generations',
    icon: BookOpen,
  },
  {
    title: 'Long-Range Systems Perspective',
    desc: 'Seeing the forest, the century, the cycle',
    icon: Telescope,
  },
  {
    title: 'Pattern Recognition',
    desc: 'Discerning the signal within the noise',
    icon: Scan,
  },
];

const ravenstarSubsystems = [
  {
    title: 'The Observatory',
    subtitle: 'pattern recognition and macro-awareness',
    desc: 'The high vantage from which the whole pattern becomes visible. From the Observatory, we perceive the movements of systems, the tides of culture, and the slow arcs of transformation that are invisible from the ground. It is the place of long sight.',
    icon: Telescope,
    color: 'indigo',
  },
  {
    title: 'The Signal Archives',
    subtitle: 'memory, oral history, symbolic transmission',
    desc: 'Where the signals of ages past are preserved, catalogued, and made accessible. The Archives hold the oral histories, the mythic encodings, and the symbolic keys that allow truth to survive the corrosion of time. Memory is not nostalgia — it is navigation data.',
    icon: Archive,
    color: 'gold',
  },
  {
    title: 'The Stormwatch Tower',
    subtitle: 'crisis literacy and nervous system resilience',
    desc: 'The place from which we learn to read the weather — both inner and outer. Stormwatch teaches us that crisis is not aberration but pattern, and that a regulated nervous system is the first instrument of survival. We do not fear the storm; we learn its language.',
    icon: AlertTriangle,
    color: 'violet',
  },
  {
    title: 'The Mythic Compass',
    subtitle: 'archetypes, symbolism, sacred geometry',
    desc: 'The Compass does not point north — it points toward meaning. Through archetypes, sacred geometry, and symbolic literacy, the Mythic Compass orients us in the landscape of the soul. It is the instrument by which we navigate the invisible territories.',
    icon: Navigation,
    color: 'indigo',
  },
  {
    title: 'The Ember Choir',
    subtitle: 'voice, storytelling, resonance, atmosphere',
    desc: 'Where signal becomes song. The Ember Choir is the subsystem of transmission through voice, story, and atmospheric resonance. It teaches that how we carry the signal matters as much as the signal itself. A truth told without resonance is a seed on stone.',
    icon: Music,
    color: 'gold',
  },
  {
    title: 'The Night Garden',
    subtitle: 'shadow work and emotional composting',
    desc: 'The garden that grows in darkness. The Night Garden is where the unresolved, the suppressed, and the unspoken are brought not for judgment but for composting. Shadow is not enemy — it is fertile ground. What we refuse to see will grow wild; what we tend in darkness becomes medicine.',
    icon: Moon,
    color: 'violet',
  },
  {
    title: 'The Featherpath',
    subtitle: 'pilgrimage, wandering, living myth',
    desc: 'The path that is found by walking it. The Featherpath is the subsystem of embodied journey — pilgrimage, wandering, and the practice of living myth. It teaches that some coordinates can only be discovered in motion, and that the myth is not the story we tell but the road we walk.',
    icon: Footprints,
    color: 'indigo',
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  indigo: {
    bg: 'bg-indigo-500/10',
    text: 'text-indigo-400',
    border: 'border-indigo-500/20',
    glow: 'shadow-indigo-500/5',
  },
  gold: {
    bg: 'bg-amber-400/10',
    text: 'text-amber-400',
    border: 'border-amber-400/20',
    glow: 'shadow-amber-400/5',
  },
  violet: {
    bg: 'bg-violet-500/10',
    text: 'text-violet-400',
    border: 'border-violet-500/20',
    glow: 'shadow-violet-500/5',
  },
};

export default function Ravenstar() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-indigo-950/25 to-cosmic-black" />
        <div className="absolute inset-0">
          <RavenstarConstellation />
        </div>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 3 }}
        >
          <SacredGeometry size={600} opacity={0.03} />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Shield className="w-5 h-5 text-amber-400/80" />
            <span className="font-sacred text-amber-400/70 text-sm tracking-[0.3em] uppercase">
              The Signal Above The Garden
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-wider mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-amber-300 bg-clip-text text-transparent">
              Ravenstar
            </span>
          </motion.h1>

          <motion.p
            className="font-sacred text-moonlight-white/40 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            The celestial navigation layer of the Green Resonance Framework
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border border-indigo-400/30 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 rounded-full bg-indigo-400/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Intro Copy */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-indigo-950/10 to-cosmic-black" />
        <div className="container-sacred relative z-10 max-w-3xl mx-auto text-center">
          <motion.p
            className="font-sacred text-moonlight-white/55 text-lg sm:text-xl leading-relaxed sm:leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
          >
            Ravenstar is the celestial navigation layer of the Green Resonance
            Framework and MUSEschool ecosystem. It is not a mascot. It is the
            symbolic orientation system, the atmospheric intelligence field, and
            the long-view observational layer above the garden.
          </motion.p>
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-indigo-400/25 to-transparent mt-12 mx-auto"
            style={{ maxWidth: 240 }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />
        </div>
      </section>

      {/* Functions Grid */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-indigo-950/8 to-cosmic-black" />
        <div className="container-sacred relative z-10">
          <SectionHeading
            title="Ravenstar Functions"
            subtitle="Seven navigational capacities that orient the system toward signal clarity and long-view coherence."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {ravenstarFunctions.map((fn, i) => (
              <GlassCard key={fn.title} delay={i * 0.08} className="p-5 sm:p-6 group">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/15 transition-colors duration-300">
                    <fn.icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg tracking-wider text-moonlight-white mb-1.5">
                      {fn.title}
                    </h3>
                    <p className="font-body text-moonlight-white/45 text-sm leading-relaxed">
                      {fn.desc}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Subsystems */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-violet-950/10 to-cosmic-black" />
        <div className="container-sacred relative z-10">
          <SectionHeading
            title="The Seven Subsystems"
            subtitle="Each subsystem is a chamber of the observatory — a specialized instrument for reading a different band of the signal."
          />

          <div className="space-y-5">
            {ravenstarSubsystems.map((sub, i) => {
              const colors = colorMap[sub.color];
              return (
                <GlassCard key={sub.title} delay={i * 0.1} className="p-6 sm:p-8 group">
                  <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
                    <div
                      className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300`}
                    >
                      <sub.icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-moonlight-white/15 font-display text-sm tracking-widest">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h3 className="font-display text-xl tracking-wider text-moonlight-white">
                          {sub.title}
                        </h3>
                      </div>
                      <p className={`font-display text-sm tracking-wider ${colors.text} mb-3`}>
                        {sub.subtitle}
                      </p>
                      <p className="font-body text-moonlight-white/45 leading-relaxed">
                        {sub.desc}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-indigo-950/8 to-cosmic-black" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
        >
          <SacredGeometry size={400} opacity={0.02} />
        </motion.div>
        <div className="container-sacred relative z-10 text-center">
          <GlassCard gold className="p-8 sm:p-12 max-w-2xl mx-auto">
            <Compass className="w-8 h-8 text-amber-400 mx-auto mb-4" />
            <h3 className="font-display text-2xl tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-indigo-300 bg-clip-text text-transparent mb-4">
              Return To The Framework
            </h3>
            <p className="font-sacred text-moonlight-white/45 mb-6 leading-relaxed">
              Ravenstar is one layer of a living architecture. Explore the full
              framework to see how orientation, ethics, and action weave into a
              single resonant system.
            </p>
            <Link
              to="/framework"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-400/15 border border-amber-400/25 hover:bg-amber-400/25 hover:border-amber-400/35 transition-all font-display text-sm tracking-widest text-amber-400"
            >
              Explore The Framework
              <ArrowRight className="w-4 h-4" />
            </Link>
          </GlassCard>
        </div>
      </section>

      {/* Ravenstar Gallery */}
      <GalleryShowcase
        srcs={[
          '/Gallery/07-keys-to-the-kingdom-keys.png',
          '/Gallery/08-keys-to-the-kingdom-master-map.png',
        ]}
        limit={2}
        title="Keys to The Kingdom"
        subtitle="Symbolic system maps and navigational keys"
      />
    </PageTransition>
  );
}
