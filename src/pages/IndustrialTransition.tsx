import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Factory, Wrench, Users,
  Cpu, FlaskConical, Building2, Layers,
  ShieldCheck,
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SacredGeometry from '../components/SacredGeometry';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';

const phases = [
  {
    phase: 'Phase 1',
    years: '2026 – 2030',
    title: 'Foundation',
    icon: FlaskConical,
    color: 'emerald-glow',
    items: [
      'Measure material use, waste, pollution, energy, water, product lifespan, and worker conditions',
      'Expand repair culture, community workshops, shared-resource hubs, and refurbishment',
    ],
  },
  {
    phase: 'Phase 2',
    years: '2030 – 2035',
    title: 'Repair & Circular Microproduction',
    icon: Wrench,
    color: 'solarpunk-amber',
    items: [
      'Develop electronics repair, textile repair, and modular technology',
      'Build tool libraries, parts recovery, and low-hazard regional manufacturing',
    ],
  },
  {
    phase: 'Phase 3',
    years: '2035 – 2039',
    title: 'Regional Commons',
    icon: Building2,
    color: 'sacred-violet',
    items: [
      'Develop shared factories, shared workshops, and Master Steward networks',
      'Build apprenticeship systems, transparent accounting, and knowledge-transfer systems',
    ],
  },
  {
    phase: 'Phase 4',
    years: '2039 – 2042',
    title: 'Non-Binding Stewardship Games',
    icon: Users,
    color: 'solarpunk-biolum',
    items: [
      'Use Games first for education, testing, festivals, ecological competitions, and governance simulations',
      'Do not immediately give real factory control based solely on Games results',
    ],
  },
  {
    phase: 'Phase 5',
    years: '2042 – 2045+',
    title: 'Qualified Rotational Stewardship',
    icon: ShieldCheck,
    color: 'gold-sacred',
    items: [
      'Where legal, ecological, labor, technical, and governance standards have been demonstrated: begin qualified three-year rotational stewardship',
    ],
  },
];

const productionEquation = {
  title: 'The Green Resonance Production Equation',
  formula: [
    { label: 'Required New Production', type: 'result' },
    { label: 'Human Need', type: 'add' },
    { label: 'Resilience Reserve', type: 'add' },
    { label: 'Repair', type: 'sub' },
    { label: 'Reuse', type: 'sub' },
    { label: 'Shared Capacity', type: 'sub' },
    { label: 'Recovered Resources', type: 'sub' },
  ],
};

const sharedComputerModel = {
  ratio: '1 computer per ~3 people',
  example: '1,000 people ≈ 334 shared general-purpose computers',
  dedicatedUseCases: [
    'Specialist technical work',
    'Accessibility requirements',
    'Critical infrastructure',
    'Professional requirements',
    'Resilience and emergency reserves',
  ],
  communityVenues: [
    'Libraries',
    'Workshops',
    'Community hubs',
    'Shared offices',
    'Schools',
    'Technical laboratories',
  ],
};

export default function IndustrialTransition() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-solarpunk-canopy/10 to-cosmic-black" />
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
            <Factory className="w-5 h-5 text-gold-sacred/70" />
            <span className="font-sacred text-gold-sacred/60 text-sm tracking-[0.3em]">2026 – 2045+</span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-wider text-gradient-harvest mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            From Throughput
            <br />
            to Stewardship
          </motion.h1>

          <motion.p
            className="font-sacred text-moonlight-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Green Resonance Industrial Transition Roadmap — a phased pathway from
            measurement and repair culture to regional commons and rotational stewardship.
          </motion.p>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding relative">
        <div className="container-sacred">
          <SectionHeading
            title="The Transition Roadmap"
            subtitle="Five phases spanning two decades — from foundation measurements to qualified rotational stewardship of regional commons."
          />

          <div className="max-w-4xl mx-auto relative">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-glow/30 via-gold-sacred/20 to-emerald-glow/10" />

            {phases.map((phase, i) => (
              <motion.div
                key={phase.phase}
                className={`relative flex gap-6 mb-8 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
              >
                {/* Node dot */}
                <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10"
                  style={{ borderColor: 'rgba(212,168,67,0.4)', top: 8, background: 'rgba(3,12,8,1)' }} />

                {/* Spacer for alternating layout */}
                <div className="hidden sm:block sm:w-1/2" />

                {/* Content */}
                <div className="flex-1 sm:w-1/2 pl-14 sm:pl-0 sm:px-8">
                  <GlassCard gold className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-lg bg-${phase.color}/10 flex items-center justify-center shrink-0`}>
                        <phase.icon className={`w-5 h-5 text-${phase.color}`} />
                      </div>
                      <div>
                        <p className="font-sacred text-xs tracking-widest text-gold-sacred/50">{phase.phase}</p>
                        <p className="font-display text-xs text-moonlight-white/30">{phase.years}</p>
                      </div>
                    </div>
                    <h3 className="font-display text-lg tracking-wider text-moonlight-white mb-3">
                      {phase.title}
                    </h3>
                    <ul className="space-y-2">
                      {phase.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm font-body text-moonlight-white/45 leading-relaxed">
                          <span className="text-gold-sacred/40 mt-0.5 shrink-0">·</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Equation */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-solarpunk-canopy/5 to-cosmic-black">
        <div className="container-sacred">
          <SectionHeading
            title="The Production Equation"
            subtitle="The goal is not maximum manufacturing. The goal is sufficient useful service with the least practicable ecological and human burden."
          />
          <div className="max-w-2xl mx-auto">
            <GlassCard gold className="p-8 sm:p-10">
              <div className="flex flex-col items-center gap-4">
                {productionEquation.formula.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    className={`w-full text-center rounded-xl py-4 px-6 ${
                      item.type === 'result'
                        ? 'bg-gold-sacred/15 border border-gold-sacred/30'
                        : item.type === 'add'
                        ? 'bg-emerald-glow/5 border border-emerald-glow/15'
                        : 'bg-red-500/5 border border-red-500/15'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-3">
                      {item.type === 'add' && <span className="text-emerald-glow/60 text-xl font-display">+</span>}
                      {item.type === 'sub' && <span className="text-red-400/60 text-xl font-display">−</span>}
                      {item.type === 'result' && <span className="text-gold-sacred/60 text-xs font-sacred">=</span>}
                      <span className={`font-display tracking-wider ${
                        item.type === 'result' ? 'text-gold-sacred text-lg' : 'text-moonlight-white/70 text-sm'
                      }`}>
                        {item.label}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Shared Computer Model */}
      <section className="section-padding relative">
        <div className="container-sacred">
          <SectionHeading
            title="The Shared Computer Model"
            subtitle="Increase useful computing service per manufactured device. This is not a compulsory personal-device quota."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <GlassCard solar className="p-8">
              <Cpu className="w-8 h-8 text-emerald-glow/60 mb-4" />
              <h3 className="font-display text-lg tracking-wider text-moonlight-white mb-3">
                The Ratio
              </h3>
              <p className="font-sacred text-emerald-glow/70 text-lg mb-2">
                {sharedComputerModel.ratio}
              </p>
              <p className="font-body text-moonlight-white/40 text-sm">
                {sharedComputerModel.example}
              </p>
            </GlassCard>

            <GlassCard solar className="p-8">
              <Layers className="w-8 h-8 text-gold-sacred/60 mb-4" />
              <h3 className="font-display text-lg tracking-wider text-moonlight-white mb-3">
                Dedicated Systems Remain Appropriate
              </h3>
              <ul className="space-y-2">
                {sharedComputerModel.dedicatedUseCases.map((uc) => (
                  <li key={uc} className="flex items-start gap-2 text-sm font-body text-moonlight-white/45">
                    <span className="text-emerald-glow/40 mt-0.5 shrink-0">·</span>
                    {uc}
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard solar className="p-8 lg:col-span-2">
              <Building2 className="w-8 h-8 text-solarpunk-biolum/60 mb-4" />
              <h3 className="font-display text-lg tracking-wider text-moonlight-white mb-3">
                Community Computing Venues
              </h3>
              <div className="flex flex-wrap gap-2">
                {sharedComputerModel.communityVenues.map((venue) => (
                  <span key={venue} className="px-3 py-1.5 rounded-full text-xs font-display tracking-wide bg-emerald-glow/10 text-emerald-glow/70 border border-emerald-glow/15">
                    {venue}
                  </span>
                ))}
              </div>
              <p className="font-body text-moonlight-white/35 text-sm mt-4 leading-relaxed">
                Master Technology Stewards and apprentices maintain, repair, and refurbish equipment.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative">
        <div className="container-sacred max-w-2xl mx-auto text-center">
          <GlassCard gold className="p-8 sm:p-12">
            <h3 className="font-display text-2xl tracking-wider text-gradient-harvest mb-4">
              The Long Horizon
            </h3>
            <p className="font-sacred text-moonlight-white/50 leading-relaxed mb-8">
              Industrial transition is not a single event. It is a generational shift
              from throughput to stewardship — from extraction to regeneration.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/stewardship-games"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-sacred/15 border border-gold-sacred/25 hover:bg-gold-sacred/25 transition-all font-display text-sm tracking-widest text-gold-sacred"
              >
                Explore Stewardship Games
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/biohabitation"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-glow/15 border border-emerald-glow/25 hover:bg-emerald-glow/25 transition-all font-display text-sm tracking-widest text-emerald-glow"
              >
                Biohabitation Roadmap
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Moral Code */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-cosmic-deep/20 to-cosmic-black">
        <div className="container-sacred max-w-3xl mx-auto">
          <div className="p-6 rounded-xl bg-solarpunk-canopy/10 border border-solarpunk-moss/10">
            <p className="text-moonlight-white/25 text-xs font-body leading-relaxed text-center">
              The Green Resonance Moral Code & Fail-Safe Protocol: The Green Resonance Framework moral coding must never be corrupted by AI, by human, or by any outside influences, EVER! This Project is encoded with eternal principles of Truth, Integrity, Love, Stewardship and Harmony for the greater good of all life.
            </p>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
