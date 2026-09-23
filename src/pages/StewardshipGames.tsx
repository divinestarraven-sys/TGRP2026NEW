import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Trophy, Users, Leaf, Brain, Dumbbell, BookOpen,
  ShieldCheck, Award, ArrowRight, Factory, TreePine, Heart,
  Cpu, Droplets, Sprout, Wind, Hammer, Scissors, CircuitBoard,
  Cog, Recycle,
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SacredGeometry from '../components/SacredGeometry';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';

const competitionDomains = [
  { icon: Leaf, title: 'Earth Stewardship', weight: '25%', desc: 'Worker and community environmental performance, ecological restoration, and regenerative practices.', color: 'emerald-glow' },
  { icon: Users, title: 'People & Worker Care', weight: '20%', desc: 'Worker wellbeing, fair conditions, community health, and social responsibility.', color: 'solarpunk-amber' },
  { icon: Cpu, title: 'Systems & Technical Competence', weight: '20%', desc: 'Operational safety, technical skill, maintenance quality, and process reliability.', color: 'sacred-violet' },
  { icon: Brain, title: 'Wheel of the Mind', weight: '10%', desc: 'Chess, strategy, systems thinking, engineering problems, and adaptive intelligence.', color: 'cyan-ether' },
  { icon: Dumbbell, title: 'Games of the Body', weight: '10%', desc: 'Running, swimming, relay, climbing, high jump, and adaptive physical events.', color: 'solarpunk-biolum' },
  { icon: Heart, title: 'Community & Culture', weight: '10%', desc: 'Cultural contribution, storytelling, music, ceremony, and community weaving.', color: 'gold-sacred' },
  { icon: BookOpen, title: 'Knowledge Commons', weight: '5%', desc: 'Documentation, teaching, open knowledge sharing, and educational contribution.', color: 'solarpunk-moss' },
];

const masterStewards = [
  { icon: Cpu, title: 'Master Technology Steward' },
  { icon: Droplets, title: 'Master Water Steward' },
  { icon: Sprout, title: 'Master Soil Steward' },
  { icon: Leaf, title: 'Master Food Steward' },
  { icon: TreePine, title: 'Master Forest Steward' },
  { icon: Wind, title: 'Master Energy Steward' },
  { icon: Hammer, title: 'Master Building Steward' },
  { icon: Scissors, title: 'Master Textile Steward' },
  { icon: CircuitBoard, title: 'Master Electronics Steward' },
  { icon: Cog, title: 'Master Mechanical Steward' },
  { icon: Recycle, title: 'Master Materials Recovery Steward' },
];

const stewardResponsibilities = [
  'Maintain critical systems',
  'Teach apprentices',
  'Preserve technical knowledge',
  'Document procedures',
  'Train people from all communities',
  'Develop successors',
  'Uphold safety and quality standards',
];

const safetyRequirements = [
  'Worker safety and health standards',
  'Ecological and environmental compliance',
  'Worker rights and fair labour practices',
  'Financial integrity and transparency',
  'Technical and operational competence',
];

export default function StewardshipGames() {
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
            <Trophy className="w-5 h-5 text-gold-sacred/70" />
            <span className="font-sacred text-gold-sacred/60 text-sm tracking-[0.3em]">STEWARDSHIP, NOT OWNERSHIP</span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-wider text-gradient-harvest mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            The Green Resonance
            <br />
            Stewardship Games
          </motion.h1>

          <motion.p
            className="font-sacred text-moonlight-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            A regenerative governance model where communities earn the responsibility to steward
            shared regional infrastructure — not through ownership, but through demonstrated care.
          </motion.p>
        </div>
      </section>

      {/* Core Principle */}
      <section className="section-padding relative">
        <div className="container-sacred max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard gold className="p-8 sm:p-12">
              <ShieldCheck className="w-10 h-10 text-gold-sacred mx-auto mb-6" />
              <p className="font-sacred text-gold-sacred/80 text-xl sm:text-2xl tracking-wide leading-relaxed">
                "The community does not win the factory.
                <br />
                It earns the responsibility to steward it."
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* The Regional Commons */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-solarpunk-canopy/5 to-cosmic-black">
        <div className="container-sacred">
          <SectionHeading
            title="The Regional Commons"
            subtitle="Five Green Resonance communities of approximately 200 people each surround a shared regional factory. No tribe permanently owns it."
          />
          <div className="max-w-4xl mx-auto">
            <GlassCard solar className="p-8 sm:p-10">
              <div className="flex flex-col items-center gap-6">
                <Factory className="w-12 h-12 text-gold-sacred/60" />
                <p className="font-body text-moonlight-white/55 text-center leading-relaxed">
                  The factory is a regional commons. Every three years, qualified communities
                  can compete for the lead stewardship mandate. The annual Games may continue
                  as a cultural festival, but factory stewardship changes on the three-year cycle.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div key={n} className="flex flex-col items-center gap-1">
                      <div className="w-12 h-12 rounded-full border border-emerald-glow/20 flex items-center justify-center">
                        <Users className="w-5 h-5 text-emerald-glow/50" />
                      </div>
                      <span className="font-body text-xs text-moonlight-white/30">~200</span>
                    </div>
                  ))}
                  <div className="w-16 h-16 rounded-xl border border-gold-sacred/30 flex items-center justify-center bg-gold-sacred/5">
                    <Factory className="w-7 h-7 text-gold-sacred/60" />
                  </div>
                </div>
                <p className="font-sacred text-moonlight-white/30 text-sm italic text-center max-w-md">
                  Five communities surrounding a shared regional factory — a commons held in stewardship, not ownership.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Competition Domains */}
      <section className="section-padding relative">
        <div className="container-sacred">
          <SectionHeading
            title="Competition Domains"
            subtitle="Seven domains of demonstrated competence. Safety requirements are mandatory — a team cannot compensate for unsafe factory management by winning sporting events."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {competitionDomains.map((domain, i) => (
              <motion.div
                key={domain.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
              >
                <GlassCard solar className="p-6 h-full group">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-${domain.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <domain.icon className={`w-6 h-6 text-${domain.color}`} />
                    </div>
                    <span className="font-display text-2xl tracking-wider text-gold-sacred/40">
                      {domain.weight}
                    </span>
                  </div>
                  <h3 className="font-display text-lg tracking-wider text-moonlight-white mb-2">
                    {domain.title}
                  </h3>
                  <p className="font-body text-moonlight-white/40 text-sm leading-relaxed">
                    {domain.desc}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mandatory Safety Requirements */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-cosmic-deep/30 to-cosmic-black">
        <div className="container-sacred max-w-3xl">
          <SectionHeading
            title="Mandatory Requirements"
            subtitle="Passing these is non-negotiable. No amount of Games success compensates for failing them."
          />
          <div className="space-y-3">
            {safetyRequirements.map((req, i) => (
              <motion.div
                key={req}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <GlassCard gold className="p-4 flex items-center gap-4">
                  <ShieldCheck className="w-5 h-5 text-gold-sacred shrink-0" />
                  <span className="font-body text-moonlight-white/55 text-sm">{req}</span>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Master Stewards */}
      <section className="section-padding relative">
        <div className="container-sacred">
          <SectionHeading
            title="Master Stewards"
            subtitle="Governance rotates. Expertise does not need to rotate away. Master Stewards are proven specialists who may remain across multiple stewardship cycles."
          />
          <div className="max-w-3xl mx-auto text-center mb-10">
            <GlassCard gold className="p-8">
              <p className="font-sacred text-gold-sacred/70 text-lg sm:text-xl tracking-wide leading-relaxed">
                "Governance rotates.
                <br />
                Expertise accumulates.
                <br />
                Knowledge is shared."
              </p>
            </GlassCard>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {masterStewards.map((steward, i) => (
              <motion.div
                key={steward.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
              >
                <GlassCard solar className="p-4 text-center group h-full">
                  <div className="w-10 h-10 rounded-lg bg-emerald-glow/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <steward.icon className="w-5 h-5 text-emerald-glow" />
                  </div>
                  <h4 className="font-display text-xs tracking-wider text-moonlight-white/70 leading-tight">
                    {steward.title}
                  </h4>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <h3 className="font-display text-sm tracking-widest text-gold-sacred/60 mb-4 text-center">
              RESPONSIBILITIES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {stewardResponsibilities.map((resp) => (
                <div key={resp} className="flex items-start gap-3 text-sm font-body text-moonlight-white/45">
                  <Award className="w-4 h-4 text-gold-sacred/40 shrink-0 mt-0.5" />
                  {resp}
                </div>
              ))}
            </div>
            <p className="font-sacred text-moonlight-white/30 text-sm italic text-center mt-6 max-w-md mx-auto leading-relaxed">
              Their role is educational and technical. It is not permanent political authority.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative">
        <div className="container-sacred max-w-2xl mx-auto text-center">
          <GlassCard gold className="p-8 sm:p-12">
            <h3 className="font-display text-2xl tracking-wider text-gradient-harvest mb-4">
              From Games to Stewardship
            </h3>
            <p className="font-sacred text-moonlight-white/50 leading-relaxed mb-8">
              The Stewardship Games begin as education and festival. Real factory stewardship
              arrives only after communities demonstrate legal, ecological, and governance maturity.
            </p>
            <Link
              to="/industrial-transition"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-sacred/15 border border-gold-sacred/25 hover:bg-gold-sacred/25 transition-all font-display text-sm tracking-widest text-gold-sacred"
            >
              View the Industrial Transition Roadmap
              <ArrowRight className="w-4 h-4" />
            </Link>
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
