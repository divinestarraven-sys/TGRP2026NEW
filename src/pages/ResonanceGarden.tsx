import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  TreePine,
  Fish,
  Flower2,
  Droplets,
  Sun,
  Recycle,
  Hexagon,
  ArrowRight,
  Leaf,
  Zap,
  Users,
  Music,
  Network,
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SacredGeometry from '../components/SacredGeometry';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';
import GalleryShowcase from '../components/GalleryShowcase';
import MyceliumNetwork from '../components/MyceliumNetwork';
import CymaticWaves from '../components/CymaticWaves';

const gardenSystems = [
  {
    title: 'Permaculture Zones',
    desc: 'Designing with nature\u2019s patterns, not against them',
    icon: TreePine,
    color: 'emerald-glow',
  },
  {
    title: 'Food Forests',
    desc: 'Multi-layered edible ecosystems that feed people and wildlife',
    icon: Leaf,
    color: 'emerald-glow',
  },
  {
    title: 'Aquaponics & Hydroponics',
    desc: 'Closed-loop water and nutrient cycling for abundant harvests',
    icon: Fish,
    color: 'cyan-glow',
  },
  {
    title: 'Medicinal Gardens',
    desc: 'Heritage herbs and healing plants as educational and practical resources',
    icon: Flower2,
    color: 'gold-sacred',
  },
  {
    title: 'Pollinator Systems',
    desc: 'Creating habitat for bees, butterflies, and the web of pollination',
    icon: Sun,
    color: 'gold-sacred',
  },
  {
    title: 'Water Harvesting',
    desc: 'Capturing, cleaning, and circulating water through the living landscape',
    icon: Droplets,
    color: 'cyan-glow',
  },
  {
    title: 'Composting & Biochar',
    desc: 'Transforming waste into the foundation of soil fertility',
    icon: Recycle,
    color: 'emerald-glow',
  },
  {
    title: 'Sacred Geometry Pathways',
    desc: 'Walking meditations laid out in geometric patterns for contemplation',
    icon: Hexagon,
    color: 'gold-sacred',
  },
  {
    title: 'Mycelium Networks',
    desc: 'The underground intelligence connecting all garden systems',
    icon: Network,
    color: 'emerald-glow',
  },
  {
    title: 'Native Regeneration',
    desc: 'Restoring indigenous plant communities and ecosystem function',
    icon: Leaf,
    color: 'emerald-glow',
  },
  {
    title: 'Solar & Greywater Systems',
    desc: 'Renewable energy and water recycling for self-sufficiency',
    icon: Zap,
    color: 'cyan-glow',
  },
  {
    title: 'Community Gathering Spaces',
    desc: 'The amphitheatre, council circle, and ceremony grounds',
    icon: Users,
    color: 'gold-sacred',
  },
];

const harmonicKey = [
  { note: 'C', planet: 'Sun', metal: 'Gold', sign: 'Leo', quality: 'vitality and illumination' },
  { note: 'D', planet: 'Moon', metal: 'Silver', sign: 'Cancer', quality: 'reflection and cycles' },
  { note: 'E', planet: 'Mercury', metal: 'Quicksilver', sign: 'Gemini/Virgo', quality: 'communication and learning' },
  { note: 'F', planet: 'Venus', metal: 'Copper', sign: 'Taurus/Libra', quality: 'beauty and harmony' },
  { note: 'G', planet: 'Mars', metal: 'Iron', sign: 'Aries/Scorpio', quality: 'courage and action' },
  { note: 'A', planet: 'Jupiter', metal: 'Tin', sign: 'Sagittarius/Pisces', quality: 'wisdom and abundance' },
  { note: 'B', planet: 'Saturn', metal: 'Lead', sign: 'Capricorn/Aquarius', quality: 'structure and time' },
];

export default function ResonanceGarden() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-emerald-deep/15 to-cosmic-black" />
        <div className="absolute inset-0 opacity-25">
          <CymaticWaves frequency={2} />
        </div>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
        >
          <SacredGeometry size={500} opacity={0.06} />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <TreePine className="w-6 h-6 text-emerald-glow" />
            <span className="font-sacred text-gold-sacred/80 text-sm tracking-[0.3em]">THE LIVING CURRICULUM</span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-wider text-gradient-emerald mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            The Resonance Garden
          </motion.h1>

          <motion.p
            className="font-sacred text-moonlight-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            The Living Curriculum
          </motion.p>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding relative">
        <div className="absolute inset-0 opacity-15">
          <MyceliumNetwork nodeCount={20} />
        </div>
        <div className="container-sacred relative z-10 max-w-3xl mx-auto text-center">
          <SectionHeading
            title="A Classroom Without Walls"
            subtitle="Where learning grows from the ground up."
          />
          <motion.p
            className="font-body text-moonlight-white/60 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            The Resonance Garden is the practical embodiment of the framework: an ecological
            classroom and regenerative systems laboratory where people learn through
            participation, observation, stewardship, and action.
          </motion.p>
        </div>
      </section>

      {/* Garden Systems Grid */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-cosmic-deep to-cosmic-black">
        <div className="container-sacred">
          <SectionHeading
            title="Garden Systems"
            subtitle="Twelve interconnected systems forming one living organism."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {gardenSystems.map((system, i) => (
              <GlassCard key={system.title} delay={i * 0.06} className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-lg bg-${system.color}/10 flex items-center justify-center shrink-0`}>
                    <system.icon className={`w-5 h-5 text-${system.color}`} />
                  </div>
                  <div>
                    <h3 className="font-display text-base tracking-wider text-moonlight-white mb-1">
                      {system.title}
                    </h3>
                    <p className="font-body text-moonlight-white/45 text-sm leading-relaxed">
                      {system.desc}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Alchemical Harmonic Key */}
      <section className="section-padding relative">
        <div className="absolute inset-0 opacity-10">
          <CymaticWaves frequency={3} />
        </div>
        <div className="container-sacred relative z-10 max-w-4xl mx-auto">
          <SectionHeading
            title="Music of the Spheres Within the Garden"
            subtitle="The Alchemical Harmonic Key"
          />

          <GlassCard gold className="p-6 sm:p-8 overflow-x-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Music className="w-5 h-5 text-gold-sacred/70" />
              <span className="font-sacred text-gold-sacred/70 text-sm tracking-[0.2em]">ALCHEMICAL HARMONIC KEY</span>
            </div>

            <table className="w-full min-w-[480px]">
              <thead>
                <tr className="border-b border-gold-sacred/20">
                  <th className="font-display text-xs tracking-widest text-gold-sacred/60 pb-3 text-left">Note</th>
                  <th className="font-display text-xs tracking-widest text-gold-sacred/60 pb-3 text-left">Planet</th>
                  <th className="font-display text-xs tracking-widest text-gold-sacred/60 pb-3 text-left">Metal</th>
                  <th className="font-display text-xs tracking-widest text-gold-sacred/60 pb-3 text-left">Sign</th>
                  <th className="font-display text-xs tracking-widest text-gold-sacred/60 pb-3 text-left">Quality</th>
                </tr>
              </thead>
              <tbody>
                {harmonicKey.map((row, i) => (
                  <motion.tr
                    key={row.note}
                    className="border-b border-gold-sacred/10 last:border-0"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                  >
                    <td className="py-3 pr-4">
                      <span className="font-display text-gold-sacred text-lg">{row.note}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="font-body text-solarpunk-biolum text-sm">{row.planet}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="font-body text-gold-sacred/80 text-sm">{row.metal}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="font-body text-moonlight-white/50 text-sm">{row.sign}</span>
                    </td>
                    <td className="py-3">
                      <span className="font-body text-moonlight-white/40 text-sm italic">{row.quality}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </GlassCard>
        </div>
      </section>

      {/* Framing Note */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-cosmic-deep to-cosmic-black">
        <div className="container-sacred max-w-3xl mx-auto">
          <GlassCard className="p-6 sm:p-8 text-center">
            <p className="font-sacred text-moonlight-white/50 text-sm leading-relaxed mb-4">
              Symbolic layers are used as contemplative and educational tools, while ecological
              design is guided by observation, climate, terrain, soil, water, and practical
              stewardship.
            </p>
            <div className="w-12 h-px bg-emerald-glow/20 mx-auto mb-4" />
            <p className="font-sacred text-moonlight-white/30 text-xs tracking-wider italic">
              Presented as symbolic, historical, artistic, and contemplative — not as scientific proof.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-sacred text-center">
          <GlassCard gold className="p-8 sm:p-12 max-w-2xl mx-auto">
            <TreePine className="w-8 h-8 text-emerald-glow mx-auto mb-4" />
            <h3 className="font-display text-2xl tracking-wider text-gradient-gold mb-4">
              Step Into The Garden
            </h3>
            <p className="font-sacred text-moonlight-white/50 mb-6 leading-relaxed">
              The garden grows with every pair of hands. Join the community and help cultivate a living curriculum.
            </p>
            <Link
              to="/join"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-glow/20 border border-emerald-glow/30 hover:bg-emerald-glow/30 transition-all font-display text-sm tracking-widest text-emerald-glow"
            >
              Join The Garden
              <ArrowRight className="w-4 h-4" />
            </Link>
          </GlassCard>
        </div>
      </section>

      {/* Garden Gallery */}
      <GalleryShowcase
        srcs={[
          '/Gallery/01-best-new-garden-map.jpg',
          '/Gallery/02-new-green-resonance-garden-map-delta.jpg',
          '/Gallery/11-keys-to-the-kingdom-delta-master-map.jpg',
        ]}
        limit={3}
        title="Resonance Garden Maps"
        subtitle="Bioregional designs, ecological layouts, and the living garden blueprint"
      />
    </PageTransition>
  );
}
