import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, Check, TreePine, Users, Zap, Sprout, Network } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import SacredGeometry from '../components/SacredGeometry';
import CymaticWaves from '../components/CymaticWaves';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';

const tiers = [
  {
    name: 'Seed',
    price: 'Free',
    desc: 'Begin your journey into the resonance.',
    features: ['Access to the Codex', 'Monthly reflection emails', 'Community forum access', 'Portal Quiz'],
    icon: TreePine,
    color: 'emerald-glow',
  },
  {
    name: 'Mycelium',
    price: 'Monthly',
    desc: 'Deepen your practice and connect with the grid.',
    features: ['All Seed benefits', 'Weekly guided practices', 'New Moon Council access', 'Resource library', 'Community circles'],
    icon: Users,
    color: 'gold-sacred',
    featured: true,
  },
  {
    name: 'Canopy',
    price: 'Annual',
    desc: 'Full immersion in the living framework.',
    features: ['All Mycelium benefits', 'Annual Gathering access', '1-on-1 mentorship', 'Design Lab participation', 'Early access to all content', 'Founding member recognition'],
    icon: Zap,
    color: 'cyan-glow',
  },
];

export default function JoinResonance() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [interest, setInterest] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-emerald-deep/15 to-cosmic-black" />
        <div className="absolute inset-0 opacity-20">
          <CymaticWaves frequency={2} />
        </div>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <SacredGeometry size={500} opacity={0.06} />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-wider text-gradient-emerald mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Join The Resonance
          </motion.h1>

          <motion.p
            className="font-sacred text-moonlight-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            The grid grows stronger with every node. Choose your path and enter the living framework.
          </motion.p>
        </div>
      </section>

      {/* Tiers */}
      <section className="section-padding">
        <div className="container-sacred">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tiers.map((tier, i) => (
              <GlassCard
                key={tier.name}
                delay={i * 0.15}
                gold={tier.featured}
                className={`p-6 sm:p-8 flex flex-col ${tier.featured ? 'ring-1 ring-gold-sacred/30' : ''}`}
              >
                <div className={`w-12 h-12 rounded-xl bg-${tier.color}/10 flex items-center justify-center mb-4`}>
                  <tier.icon className={`w-6 h-6 text-${tier.color}`} />
                </div>
                <h3 className="font-display text-xl tracking-wider text-moonlight-white mb-1">{tier.name}</h3>
                <p className={`font-display text-sm tracking-wider text-${tier.color} mb-2`}>{tier.price}</p>
                <p className="font-body text-moonlight-white/40 text-sm mb-6">{tier.desc}</p>

                <ul className="space-y-2 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm font-body text-moonlight-white/50">
                      <Check className={`w-4 h-4 text-${tier.color} shrink-0 mt-0.5`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-xl font-display text-sm tracking-widest transition-all ${
                    tier.featured
                      ? 'bg-gold-sacred/20 border border-gold-sacred/30 text-gold-sacred hover:bg-gold-sacred/30'
                      : 'bg-emerald-glow/10 border border-emerald-glow/20 text-emerald-glow hover:bg-emerald-glow/20'
                  }`}
                >
                  Join as {tier.name}
                </button>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Seed Membership */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-emerald-deep/8 to-cosmic-black">
        <div className="container-sacred max-w-xl mx-auto">
          <SectionHeading
            title="Seed Membership"
            subtitle="Founding access to the living Codex and practice ecosystem."
          />
          <GlassCard gold className="p-6 sm:p-8 text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-glow/10 flex items-center justify-center mx-auto mb-4">
              <Sprout className="w-6 h-6 text-emerald-glow" />
            </div>
            <h3 className="font-display text-xl tracking-wider text-moonlight-white mb-2">Become a Seed Member</h3>
            <p className="font-body text-moonlight-white/40 text-sm leading-relaxed mb-6">
              Early access to The Codex, practice systems, symbolic archives, founding member updates, and MUSEschool development previews.
            </p>
            <div className="flex flex-col items-center gap-3">
              <Link
                to="/seed-membership"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-glow/20 border border-emerald-glow/30 hover:bg-emerald-glow/30 transition-all font-display text-sm tracking-widest text-emerald-glow"
              >
                Explore Seed Membership
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/seed-membership#join-form"
                className="inline-flex items-center gap-1.5 text-gold-sacred/60 hover:text-gold-sacred transition-colors font-sacred text-xs tracking-wide"
              >
                Join the Seed Circle
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Mycelium Membership */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-cosmic-deep/50 to-cosmic-black">
        <div className="container-sacred max-w-xl mx-auto">
          <SectionHeading
            title="Mycelium Membership"
            subtitle="The deeper living network layer — $40 USD."
          />
          <GlassCard gold className="p-6 sm:p-8 text-center">
            <div className="w-12 h-12 rounded-xl bg-gold-sacred/10 flex items-center justify-center mx-auto mb-4">
              <Network className="w-6 h-6 text-gold-sacred" />
            </div>
            <h3 className="font-display text-xl tracking-wider text-moonlight-white mb-2">Enter the Mycelium Network</h3>
            <p className="font-body text-moonlight-white/40 text-sm leading-relaxed mb-6">
              Join the deeper community layer for $40 USD. Includes weekly guided practices, New Moon Council access,
              resource library, community events circle, and all Seed Membership sections.
            </p>
            <Link
              to="/mycelium-membership"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-display text-sm tracking-widest text-cosmic-black transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #d4a843, #10b981)' }}
            >
              Join Mycelium Membership
              <ArrowRight className="w-4 h-4" />
            </Link>
          </GlassCard>
        </div>
      </section>

      {/* Sign Up Form */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-cosmic-deep to-cosmic-black">
        <div className="container-sacred max-w-xl">
          <SectionHeading
            title="Enter The Grid"
            subtitle="Begin with your name and email. The resonance will find you."
          />

          {!submitted ? (
            <GlassCard gold className="p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-display text-xs tracking-widest text-moonlight-white/40 mb-2">NAME</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-cosmic-deep/50 border border-emerald-glow/10 text-sm font-body text-moonlight-white placeholder:text-moonlight-white/20 focus:outline-none focus:border-emerald-glow/30 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block font-display text-xs tracking-widest text-moonlight-white/40 mb-2">EMAIL</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-cosmic-deep/50 border border-emerald-glow/10 text-sm font-body text-moonlight-white placeholder:text-moonlight-white/20 focus:outline-none focus:border-emerald-glow/30 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block font-display text-xs tracking-widest text-moonlight-white/40 mb-2">INTEREST</label>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-cosmic-deep/50 border border-emerald-glow/10 text-sm font-body text-moonlight-white focus:outline-none focus:border-emerald-glow/30 transition-colors appearance-none"
                  >
                    <option value="" className="bg-cosmic-deep">Select your interest</option>
                    <option value="workbook" className="bg-cosmic-deep">Workbook</option>
                    <option value="events" className="bg-cosmic-deep">Events</option>
                    <option value="garden" className="bg-cosmic-deep">Garden</option>
                    <option value="courses" className="bg-cosmic-deep">Courses</option>
                    <option value="community" className="bg-cosmic-deep">Community</option>
                    <option value="media" className="bg-cosmic-deep">Media</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-glow/20 border border-emerald-glow/30 hover:bg-emerald-glow/30 transition-all font-display text-sm tracking-widest text-emerald-glow flex items-center justify-center gap-2"
                >
                  Enter The Resonance
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </GlassCard>
          ) : (
            <GlassCard gold className="p-8 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 rounded-full bg-emerald-glow/10 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-emerald-glow" />
                </div>
                <h3 className="font-display text-xl tracking-wider text-gradient-emerald mb-2">
                  Welcome to the Grid
                </h3>
                <p className="font-sacred text-moonlight-white/50 leading-relaxed">
                  The resonance has received you. Watch for the first signal.
                </p>
              </motion.div>
            </GlassCard>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
