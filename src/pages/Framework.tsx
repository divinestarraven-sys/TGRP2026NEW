import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Heart, Cpu, Globe, Zap, Waves, BookOpen, Network } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SacredGeometry from '../components/SacredGeometry';
import CymaticWaves from '../components/CymaticWaves';
import MyceliumNetwork from '../components/MyceliumNetwork';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';
import GalleryShowcase from '../components/GalleryShowcase';

const frameworkLayers = [
  {
    title: 'The Root Layer',
    subtitle: 'Awareness & Discernment',
    desc: 'Before action can be wise, perception must be clear. The root layer teaches us to see through the noise of modern life and perceive the patterns that matter. Discernment is not judgment — it is the ability to distinguish signal from static.',
    icon: Eye,
    color: 'emerald-glow',
  },
  {
    title: 'The Heart Layer',
    subtitle: 'Ethical Living',
    desc: 'Ethics are not rules imposed from without — they are the natural expression of a system in harmony. When we align our actions with truth, integrity becomes effortless. This layer is the moral compass of the framework.',
    icon: Heart,
    color: 'gold-sacred',
  },
  {
    title: 'The Mind Layer',
    subtitle: 'Systems Intelligence',
    desc: 'The world is not a collection of isolated parts — it is a web of interdependent systems. Systems intelligence is the capacity to see the whole, understand feedback loops, and design interventions that honor complexity.',
    icon: Cpu,
    color: 'cyan-glow',
  },
  {
    title: 'The Body Layer',
    subtitle: 'Human & Earth Integration',
    desc: 'The separation between human and Earth is the original illusion. This layer re-weaves the bond, recognizing that human wellbeing and ecological health are not competing interests — they are the same thing.',
    icon: Globe,
    color: 'emerald-glow',
  },
  {
    title: 'The Action Layer',
    subtitle: 'Embodiment & Conscious Action',
    desc: 'Knowing without doing is a half-truth. The action layer calls us to move from understanding to embodiment — where every step, every choice, every breath becomes an expression of the framework.',
    icon: Zap,
    color: 'gold-sacred',
  },
  {
    title: 'The Spirit Layer',
    subtitle: 'Ethereal Resonance & The Rhythmic Weave',
    desc: 'Beyond the visible, there is a frequency — a resonance that connects all living things. This layer tunes us to the Rhythmic Weave, the cosmic pattern that underlies all growth, all harmony, all transformation.',
    icon: Waves,
    color: 'cyan-glow',
  },
];

export default function Framework() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-emerald-deep/15 to-cosmic-black" />
        <div className="absolute inset-0 opacity-20">
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
            <Network className="w-6 h-6 text-emerald-glow" />
            <span className="font-sacred text-gold-sacred/80 text-sm tracking-[0.3em]">THE LIVING FRAMEWORK</span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-wider text-gradient-emerald mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            The Architecture of Regeneration
          </motion.h1>

          <motion.p
            className="font-sacred text-moonlight-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Six layers. One living system. A framework that grows with you, adapts with the Earth, and resonates with the cosmos.
          </motion.p>
        </div>
      </section>

      {/* Framework Layers */}
      <section className="section-padding relative">
        <div className="absolute inset-0 opacity-15">
          <MyceliumNetwork nodeCount={15} />
        </div>
        <div className="container-sacred relative z-10">
          <SectionHeading
            title="The Six Layers"
            subtitle="Each layer builds upon the last, forming a complete architecture for regenerative life."
          />

          <div className="space-y-6">
            {frameworkLayers.map((layer, i) => (
              <GlassCard key={layer.title} delay={i * 0.1} className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className={`w-14 h-14 rounded-xl bg-${layer.color}/10 flex items-center justify-center shrink-0`}>
                    <layer.icon className={`w-7 h-7 text-${layer.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-moonlight-white/20 font-display text-sm tracking-widest">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-xl tracking-wider text-moonlight-white">
                        {layer.title}
                      </h3>
                    </div>
                    <p className={`font-display text-sm tracking-wider text-${layer.color} mb-3`}>
                      {layer.subtitle}
                    </p>
                    <p className="font-body text-moonlight-white/50 leading-relaxed">
                      {layer.desc}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-cosmic-deep to-cosmic-black">
        <div className="container-sacred">
          <SectionHeading
            title="How The Framework Works"
            subtitle="Not a rigid structure, but a living pattern — responsive, adaptive, and self-organizing."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Perceive', desc: 'Begin with awareness. See the system. Map the patterns. Discern the signal from the noise.' },
              { title: 'Align', desc: 'Bring your actions into coherence with the patterns you perceive. Ethics become natural. Action becomes conscious.' },
              { title: 'Resonate', desc: 'As alignment deepens, you enter the Rhythmic Weave. Your life becomes a note in the cosmic symphony.' },
            ].map((step, i) => (
              <GlassCard key={step.title} delay={i * 0.15} className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-glow/10 flex items-center justify-center mx-auto mb-4">
                  <span className="font-display text-emerald-glow text-lg">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-display text-xl tracking-wider text-emerald-glow mb-3">{step.title}</h3>
                <p className="font-body text-moonlight-white/50 leading-relaxed">{step.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-sacred text-center">
          <GlassCard gold className="p-8 sm:p-12 max-w-2xl mx-auto">
            <BookOpen className="w-8 h-8 text-gold-sacred mx-auto mb-4" />
            <h3 className="font-display text-2xl tracking-wider text-gradient-gold mb-4">
              Dive Deeper Into The Pillars
            </h3>
            <p className="font-sacred text-moonlight-white/50 mb-6 leading-relaxed">
              Each layer of the framework is a pillar — a complete teaching with its own depth, practice, and resonance.
            </p>
            <Link
              to="/pillars"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-sacred/20 border border-gold-sacred/30 hover:bg-gold-sacred/30 transition-all font-display text-sm tracking-widest text-gold-sacred"
            >
              Explore The 6 Pillars
              <ArrowRight className="w-4 h-4" />
            </Link>
          </GlassCard>
        </div>
      </section>

      {/* Framework Gallery */}
      <GalleryShowcase
        srcs={[
          '/Gallery/06-green-resonance-framework-six-pillars-maxres.webp',
          '/Gallery/07-keys-to-the-kingdom-keys.webp',
          '/Gallery/08-keys-to-the-kingdom-master-map.webp',
          '/Gallery/10-green-resonance-workbook-cover.webp',
        ]}
        limit={4}
        title="Framework Visualizations"
        subtitle="Maps, keys, and materials of the Green Resonance system"
      />
    </PageTransition>
  );
}
