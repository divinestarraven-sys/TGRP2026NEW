import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Droplets, Sprout, Layers, Home, Zap, TreePine,
  Wrench, Recycle, Truck, Trash2, BookOpen, Users, Globe,
  Heart, Radio, Monitor, Stethoscope, ShieldAlert,
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SacredGeometry from '../components/SacredGeometry';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';

const timelinePhases = [
  { years: '2026 – 2030', title: 'Foundation', desc: 'Measure baselines, build community capacity, establish repair culture and shared-resource hubs.' },
  { years: '2030 – 2040', title: 'Regenerative Neighbourhoods', desc: 'Local food systems, water management, energy resilience, and ecological restoration at neighbourhood scale.' },
  { years: '2040 – 2050', title: 'Regional Networks', desc: 'Connected neighbourhoods form regional networks for shared manufacturing, knowledge, and mutual aid.' },
  { years: '2050 – 2070', title: 'Bioregional Transition', desc: 'Governance, economics, and infrastructure reorganize around natural bioregional boundaries.' },
  { years: '2070 – 2100', title: 'Connected Bioregions', desc: 'Bioregions link into continental networks of trade, knowledge, and ecological cooperation.' },
  { years: '2100+', title: 'Regenerative Equilibrium', desc: 'A civilization capable of meeting human needs while allowing ecological systems to regenerate and adapt.' },
];

const twelveSystems = [
  { icon: Droplets, title: 'Water', n: 1 },
  { icon: Sprout, title: 'Food', n: 2 },
  { icon: Layers, title: 'Soil & Nutrients', n: 3 },
  { icon: Home, title: 'Shelter', n: 4 },
  { icon: Zap, title: 'Energy', n: 5 },
  { icon: TreePine, title: 'Ecosystems & Biodiversity', n: 6 },
  { icon: Wrench, title: 'Materials & Manufacturing', n: 7 },
  { icon: Recycle, title: 'Repair / Reuse / Recycling', n: 8 },
  { icon: Truck, title: 'Transportation & Logistics', n: 9 },
  { icon: Trash2, title: 'Sanitation & Waste', n: 10 },
  { icon: BookOpen, title: 'Knowledge & Education', n: 11 },
  { icon: Users, title: 'Governance & Community', n: 12 },
];

const crossSystemLayers = [
  { icon: Radio, title: 'Communications' },
  { icon: Monitor, title: 'Digital Infrastructure' },
  { icon: Stethoscope, title: 'Health-Supporting Environments' },
  { icon: ShieldAlert, title: 'Emergency Resilience' },
];

const developmentalPattern = ['Measure', 'Reduce', 'Repair', 'Regenerate', 'Localize', 'Connect', 'Close the Loop', 'Maintain'];

export default function Biohabitation() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-emerald-deep/15 to-cosmic-black" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5 }}
        >
          <SacredGeometry size={600} opacity={0.04} animated />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Globe className="w-5 h-5 text-emerald-glow/70" />
            <span className="font-sacred text-emerald-glow/60 text-sm tracking-[0.3em]">2026 – 2100+</span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-wider text-gradient-emerald mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            The Green Resonance
            <br />
            Biohabitation Roadmap
          </motion.h1>

          <motion.p
            className="font-sacred text-moonlight-white/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            A civilizational pathway toward dynamic regenerative equilibrium —
            where human life becomes increasingly compatible with the living systems that sustain it.
          </motion.p>
        </div>
      </section>

      {/* Destination */}
      <section className="section-padding relative">
        <div className="container-sacred max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard solar className="p-8 sm:p-12">
              <Heart className="w-10 h-10 text-emerald-glow mx-auto mb-6" />
              <h2 className="font-display text-2xl tracking-wider text-gradient-emerald mb-4">
                Dynamic Regenerative Equilibrium
              </h2>
              <p className="font-sacred text-moonlight-white/80 text-lg leading-relaxed">
                The goal is not a frozen utopia. The goal is a civilization capable of meeting
                human needs while allowing ecological systems to regenerate and adapt over time.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-emerald-deep/5 to-cosmic-black">
        <div className="container-sacred">
          <SectionHeading
            title="The Roadmap Timeline"
            subtitle="From foundation to regenerative equilibrium — a journey spanning generations."
          />
          <div className="max-w-3xl mx-auto space-y-4">
            {timelinePhases.map((phase, i) => (
              <motion.div
                key={phase.years}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <GlassCard solar className="p-5 flex items-start gap-4">
                  <div className="shrink-0 w-20 text-right">
                    <p className="font-display text-xs tracking-wider text-gold-sacred/80">{phase.years}</p>
                  </div>
                  <div className="w-px self-stretch bg-emerald-glow/15" />
                  <div className="flex-1">
                    <h3 className="font-display text-base tracking-wider text-moonlight-white mb-1">
                      {phase.title}
                    </h3>
                    <p className="font-body text-moonlight-white/80 text-sm leading-relaxed">
                      {phase.desc}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 12 Biohabitation Systems */}
      <section className="section-padding relative">
        <div className="container-sacred">
          <SectionHeading
            title="12 Biohabitation Systems"
            subtitle="Twelve interconnected systems arranged around a central living bioregion — each measured, reduced, repaired, regenerated, localized, connected, and closed-looped."
          />

          {/* Circular arrangement */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative aspect-square">
              {/* Center heart */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full flex flex-col items-center justify-center z-10"
                style={{
                  background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
                  border: '1px solid rgba(16,185,129,0.3)',
                }}>
                <Heart className="w-6 h-6 text-emerald-glow mb-1" />
                <span className="font-display text-[15px] tracking-widest text-emerald-glow/60">HEART</span>
              </div>

              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
                {twelveSystems.map((sys, i) => {
                  const angle = (i * 30 - 90) * Math.PI / 180;
                  const x = 200 + 150 * Math.cos(angle);
                  const y = 200 + 150 * Math.sin(angle);
                  return (
                    <line key={`line-${sys.n}`} x1="200" y1="200" x2={x} y2={y}
                      stroke="rgba(16,185,129,0.1)" strokeWidth="0.5" strokeDasharray="2 3" />
                  );
                })}
              </svg>

              {/* System nodes */}
              {twelveSystems.map((sys, i) => {
                const angle = (i * 30 - 90) * Math.PI / 180;
                const x = 50 + 37.5 * Math.cos(angle);
                const y = 50 + 37.5 * Math.sin(angle);
                return (
                  <motion.div
                    key={sys.n}
                    className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                      background: 'rgba(7,21,16,0.9)',
                      border: '1px solid rgba(16,185,129,0.2)',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    whileHover={{ scale: 1.15, borderColor: 'rgba(16,185,129,0.5)' }}
                  >
                    <sys.icon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-glow/70 mb-1" />
                    <span className="font-display text-[12px] sm:text-[13.5px] tracking-wide text-moonlight-white/80 text-center leading-tight px-1">
                      {sys.title}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* System grid for accessibility */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {twelveSystems.map((sys) => (
              <div key={sys.n} className="flex items-center gap-3 p-3 rounded-xl bg-emerald-glow/5 border border-emerald-glow/10">
                <div className="w-8 h-8 rounded-lg bg-emerald-glow/10 flex items-center justify-center shrink-0">
                  <sys.icon className="w-4 h-4 text-emerald-glow" />
                </div>
                <span className="font-display text-xs tracking-wide text-moonlight-white/80">
                  {sys.n}. {sys.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-System Layers */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-emerald-deep/5 to-cosmic-black">
        <div className="container-sacred">
          <SectionHeading
            title="Cross-System Layers"
            subtitle="Four layers that run through all twelve systems, connecting and supporting the whole."
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {crossSystemLayers.map((layer, i) => (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <GlassCard solar className="p-5 text-center group h-full">
                  <div className="w-10 h-10 rounded-lg bg-gold-sacred/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <layer.icon className="w-5 h-5 text-gold-sacred" />
                  </div>
                  <h4 className="font-display text-xs tracking-wider text-moonlight-white/80">
                    {layer.title}
                  </h4>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Developmental Pattern */}
      <section className="section-padding relative">
        <div className="container-sacred max-w-3xl mx-auto text-center">
          <SectionHeading
            title="The Developmental Pattern"
            subtitle="Each system evolves through this eight-stage spiral."
          />
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            {developmentalPattern.map((step, i) => (
              <div key={step} className="flex items-center gap-2 sm:gap-3">
                <motion.span
                  className="font-sacred text-sm sm:text-base text-emerald-glow/70 bg-emerald-glow/5 px-3 py-1.5 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  {step}
                </motion.span>
                {i < developmentalPattern.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-emerald-glow/30 hidden sm:block" />
                )}
              </div>
            ))}
          </div>
          <p className="font-sacred text-moonlight-white/80 text-sm italic mt-6">
            Measure → Reduce → Repair → Regenerate → Localize → Connect → Close the Loop → Maintain
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative">
        <div className="container-sacred max-w-2xl mx-auto text-center">
          <GlassCard solar className="p-8 sm:p-12">
            <h3 className="font-display text-2xl tracking-wider text-gradient-emerald mb-4">
              From Garden to Bioregion
            </h3>
            <p className="font-sacred text-moonlight-white/80 leading-relaxed mb-8">
              The Green Resonance Project begins with the individual and the Garden.
              Its long horizon asks a larger question: how might communities organize food,
              water, knowledge, technology, and industry so that human life becomes
              increasingly compatible with the living systems that sustain it?
            </p>
            <Link
              to="/stewardship-games"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-glow/15 border border-emerald-glow/25 hover:bg-emerald-glow/25 transition-all font-display text-sm tracking-widest text-emerald-glow"
            >
              Explore Stewardship Games
              <ArrowRight className="w-4 h-4" />
            </Link>
          </GlassCard>
        </div>
      </section>

      {/* Moral Code */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-cosmic-deep/20 to-cosmic-black">
        <div className="container-sacred max-w-3xl mx-auto">
          <div className="p-6 rounded-xl bg-solarpunk-canopy/10 border border-solarpunk-moss/10">
            <p className="text-moonlight-white/80 text-xs font-body leading-relaxed text-center">
              The Green Resonance Moral Code & Fail-Safe Protocol: The Green Resonance Framework moral coding must never be corrupted by AI, by human, or by any outside influences, EVER! This Project is encoded with eternal principles of Truth, Integrity, Love, Stewardship and Harmony for the greater good of all life.
            </p>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
