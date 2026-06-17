import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout, BookOpen, ArrowRight, Check, Sparkles, TreePine,
  Compass, Star, Flame, Waves, GraduationCap, Leaf, Heart,
  Map, FileText, Users, Pen, Network,
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SacredGeometry from '../components/SacredGeometry';
import CymaticWaves from '../components/CymaticWaves';
import MyceliumNetwork from '../components/MyceliumNetwork';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';
import { supabase } from '../lib/supabase';

const codexCards = [
  {
    title: 'Living Framework Codex',
    desc: 'Access the 6 Pillars, 7 Portals, Phoenix Principle, Ravenstar layer, and Rhythmic Weave.',
    icon: Compass,
  },
  {
    title: 'Practice Codex',
    desc: 'Daily reflections, affirmations, guided practices, ritual prompts, and integration exercises.',
    icon: Pen,
  },
  {
    title: 'Garden & Systems Codex',
    desc: 'Resonance Garden maps, permaculture notes, aquaponics, food forests, water systems, and regenerative design references.',
    icon: Leaf,
  },
  {
    title: 'Symbol & Sigil Codex',
    desc: 'Sacred geometry, master sigils, portal keys, alchemical correspondences, and mythic ecology architecture.',
    icon: Sparkles,
  },
];

const memberBenefits = [
  'Early access to The Codex',
  'Founding member updates',
  'Practice cards and reflection prompts',
  'Green Resonance field notes',
  'Workbook previews',
  'MUSEschool development updates',
  'Future workshop and course priority access',
  'Community circle invitations when available',
];

const codexPreviewItems = [
  { title: '6 Pillars', icon: BookOpen, path: '/pillars' },
  { title: '7 Portals', icon: Map, path: '/portals' },
  { title: 'Ravenstar', icon: Star, path: '/ravenstar' },
  { title: 'Phoenix Principle', icon: Flame, path: '/phoenix' },
  { title: 'Rhythmic Weave', icon: Waves, path: '/rhythmic-weave' },
  { title: 'Resonance Garden', icon: TreePine, path: '/garden' },
  { title: 'MUSEschool', icon: GraduationCap, path: '/museschool' },
  { title: 'Alchemical Harmonic Key', icon: Sparkles, path: '/codex' },
  { title: 'Practice Cards', icon: FileText, path: '/codex' },
  { title: 'Green Resonance Workbook', icon: Pen, path: '/resources' },
];

const interestOptions = [
  'Codex Access',
  'Workbook',
  'MUSEschool',
  'Garden Systems',
  'Events',
  'Community',
];

export default function SeedMembership() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    const { error } = await supabase
      .from('seed_membership_waitlist')
      .insert({ name, email, interests, message });

    if (error) {
      if (error.code === '23505') {
        setFormState('success');
      } else {
        setFormState('error');
      }
    } else {
      setFormState('success');
    }
  };

  return (
    <PageTransition>
      {/* ===== Hero ===== */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-emerald-deep/15 to-cosmic-black" />
        <div className="absolute inset-0 opacity-15">
          <MyceliumNetwork nodeCount={25} />
        </div>
        <div className="absolute inset-0 opacity-10">
          <CymaticWaves frequency={1} />
        </div>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <SacredGeometry size={600} opacity={0.05} animated />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Sprout className="w-6 h-6 text-emerald-glow" />
            <span className="font-sacred text-emerald-glow/80 text-sm tracking-[0.3em]">SEED MEMBERSHIP</span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-wider text-gradient-emerald mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Become a Seed Member
          </motion.h1>

          <motion.p
            className="font-sacred text-gold-sacred/60 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Founding access to The Green Resonance Codex, living practices, symbolic systems, regenerative learning, and the evolving MUSEschool ecosystem.
          </motion.p>

          <motion.p
            className="font-body text-moonlight-white/40 text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Seed Members are early supporters of The Green Resonance Project — helping cultivate the living Codex, regenerative education, symbolic literacy, daily practice systems, and future MUSEschool pathways.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <Link
              to="/codex"
              className="group px-8 py-4 rounded-full bg-emerald-glow/15 border border-emerald-glow/30 hover:bg-emerald-glow/25 hover:border-emerald-glow/50 transition-all font-display text-sm tracking-widest text-emerald-glow flex items-center gap-2"
            >
              Access The Codex
              <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </Link>
            <a
              href="#join-form"
              className="px-8 py-4 rounded-full bg-gold-sacred/10 border border-gold-sacred/20 hover:border-gold-sacred/40 transition-all font-display text-sm tracking-widest text-gold-sacred/80 hover:text-gold-sacred flex items-center gap-2"
            >
              Join The Seed Circle
              <Sprout className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== Why Seed Membership Exists ===== */}
      <section className="section-padding relative bg-gradient-to-b from-cosmic-black via-emerald-deep/5 to-cosmic-black">
        <div className="container-sacred relative z-10 max-w-3xl mx-auto text-center">
          <SectionHeading
            title="Why Seed Membership Exists"
            subtitle=""
          />
          <motion.p
            className="font-body text-moonlight-white/50 text-base sm:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
          >
            The Green Resonance Project grows like a living system. Seed Membership supports the early cultivation of the Codex, the workbook, the practice system, the Resonance Garden blueprint, and the future MUSEschool ecosystem. This is not just a subscription — it is participation in the first layer of a regenerative educational archive.
          </motion.p>
        </div>
      </section>

      {/* ===== Seed Member Codex Access ===== */}
      <section className="section-padding relative">
        <SectionHeading
          title="Seed Member Codex Access"
          subtitle="Seed Membership includes access to The Codex — a living archive of Green Resonance symbols, practices, frameworks, maps, teachings, and regenerative design systems."
        />
        <div className="container-sacred">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {codexCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <GlassCard gold className="p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gold-sacred/10 flex items-center justify-center mb-4">
                    <card.icon className="w-6 h-6 text-gold-sacred" />
                  </div>
                  <h3 className="font-display text-lg tracking-wider text-moonlight-white mb-2">
                    {card.title}
                  </h3>
                  <p className="font-body text-moonlight-white/45 text-sm leading-relaxed mb-4">
                    {card.desc}
                  </p>
                  <Link
                    to="/codex"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-sacred/10 border border-gold-sacred/20 hover:bg-gold-sacred/20 transition-all font-display text-xs tracking-widest text-gold-sacred"
                  >
                    Open Codex
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== What Members Receive ===== */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-emerald-deep/8 to-cosmic-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <SacredGeometry size={500} opacity={1} animated />
        </div>
        <div className="container-sacred relative z-10">
          <SectionHeading
            title="What Members Receive"
            subtitle="Seed Membership is the founding layer of the Green Resonance ecosystem."
          />
          <div className="max-w-2xl mx-auto">
            <GlassCard gold className="p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-glow/10 flex items-center justify-center">
                  <Sprout className="w-6 h-6 text-emerald-glow" />
                </div>
                <div>
                  <h3 className="font-display text-xl tracking-wider text-moonlight-white">Seed Membership</h3>
                  <p className="font-sacred text-emerald-glow/50 text-sm">Founding Access</p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {memberBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm font-body text-moonlight-white/55">
                    <Check className="w-4 h-4 text-emerald-glow shrink-0 mt-0.5" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="p-4 rounded-xl bg-emerald-glow/5 border border-emerald-glow/10">
                <p className="font-sacred text-moonlight-white/35 text-xs leading-relaxed italic">
                  This is the first seed stage of the membership ecosystem. More features will grow over time.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ===== The Living Codex Preview ===== */}
      <section className="section-padding relative">
        <SectionHeading
          title="The Living Codex Preview"
          subtitle="Explore the categories within the growing Codex archive."
        />
        <div className="container-sacred">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {codexPreviewItems.map((item, i) => (
              <Link key={item.title} to={item.path}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                >
                  <GlassCard solar className="p-4 text-center h-full group cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-emerald-glow/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5 text-emerald-glow group-hover:text-gold-sacred transition-colors" />
                    </div>
                    <h4 className="font-display text-xs tracking-wider text-moonlight-white/70 group-hover:text-emerald-glow transition-colors leading-tight">
                      {item.title}
                    </h4>
                  </GlassCard>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Founding Seed Circle ===== */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-emerald-deep/5 to-cosmic-black">
        <div className="container-sacred max-w-3xl mx-auto text-center">
          <SectionHeading
            title="The Founding Seed Circle"
            subtitle="Early members who help shape the direction and depth of the living archive."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Users, title: 'Community Learning', desc: 'Collaborative exploration and shared practice.' },
              { icon: Heart, title: 'Creative Stewardship', desc: 'Supporting the growth of a regenerative educational archive.' },
              { icon: TreePine, title: 'Living Participation', desc: 'Contributing to a practice ecosystem as it evolves.' },
            ].map((item, i) => (
              <GlassCard key={item.title} solar delay={i * 0.1} className="p-5">
                <div className="w-10 h-10 rounded-lg bg-emerald-glow/10 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-5 h-5 text-emerald-glow" />
                </div>
                <h4 className="font-display text-sm tracking-wider text-moonlight-white mb-2">{item.title}</h4>
                <p className="font-body text-moonlight-white/35 text-xs leading-relaxed">{item.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Join / Request Access Form ===== */}
      <section id="join-form" className="section-padding bg-gradient-to-b from-cosmic-black via-cosmic-deep to-cosmic-black scroll-mt-20">
        <div className="container-sacred max-w-xl">
          <SectionHeading
            title="Request Seed Access"
            subtitle="Leave your details and we will notify you when membership opens."
          />

          {formState === 'success' ? (
            <GlassCard gold className="p-8 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 rounded-full bg-emerald-glow/10 flex items-center justify-center mx-auto mb-4">
                  <Sprout className="w-8 h-8 text-emerald-glow" />
                </div>
                <h3 className="font-display text-xl tracking-wider text-gradient-emerald mb-2">
                  Thank you. Your seed has been planted.
                </h3>
                <p className="font-sacred text-moonlight-white/50 leading-relaxed">
                  We will reach out when the Seed Membership ecosystem is ready for you.
                </p>
              </motion.div>
            </GlassCard>
          ) : (
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
                  <label className="block font-display text-xs tracking-widest text-moonlight-white/40 mb-2">INTERESTS</label>
                  <div className="flex flex-wrap gap-2">
                    {interestOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleInterest(opt)}
                        className={`px-3 py-1.5 rounded-full text-xs font-display tracking-wider transition-all ${
                          interests.includes(opt)
                            ? 'bg-emerald-glow/20 text-emerald-glow border border-emerald-glow/30'
                            : 'bg-cosmic-deep/30 text-moonlight-white/40 border border-moonlight-white/10 hover:text-moonlight-white/60'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block font-display text-xs tracking-widest text-moonlight-white/40 mb-2">MESSAGE (OPTIONAL)</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-cosmic-deep/50 border border-emerald-glow/10 text-sm font-body text-moonlight-white placeholder:text-moonlight-white/20 focus:outline-none focus:border-emerald-glow/30 transition-colors resize-none"
                    placeholder="Tell us what interests you most..."
                  />
                </div>

                {formState === 'error' && (
                  <p className="text-red-400/80 text-xs font-body">
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full py-3 rounded-xl bg-emerald-glow/20 border border-emerald-glow/30 hover:bg-emerald-glow/30 transition-all font-display text-sm tracking-widest text-emerald-glow flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {formState === 'submitting' ? 'Planting your seed...' : 'Request Seed Access'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </GlassCard>
          )}
        </div>
      </section>

      {/* ===== Deeper Layer CTA ===== */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-emerald-deep/5 to-cosmic-black">
        <div className="container-sacred max-w-2xl mx-auto">
          <GlassCard gold className="p-7 sm:p-9 text-center">
            <div className="w-12 h-12 rounded-xl bg-gold-sacred/10 flex items-center justify-center mx-auto mb-4">
              <Network className="w-6 h-6 text-gold-sacred" />
            </div>
            <p className="font-sacred text-gold-sacred/60 text-xs tracking-widest mb-2">READY TO GO DEEPER?</p>
            <h3 className="font-display text-2xl tracking-wider text-gradient-harvest mb-3">
              Mycelium Membership
            </h3>
            <p className="font-body text-moonlight-white/45 text-sm leading-relaxed mb-6">
              Continue deeper into the living network — weekly guided practices, New Moon Council access,
              resource library, community events circle, and all Seed sections. $40 USD.
            </p>
            <Link
              to="/mycelium-membership"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-display text-sm tracking-widest text-cosmic-black transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #d4a843, #10b981)' }}
            >
              Enter the Mycelium Network
              <ArrowRight className="w-4 h-4" />
            </Link>
          </GlassCard>
        </div>
      </section>

      {/* ===== Footer CTA ===== */}
      <section className="section-padding">
        <div className="container-sacred text-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <GlassCard gold className="p-6 sm:p-8">
              <BookOpen className="w-6 h-6 text-gold-sacred mx-auto mb-3" />
              <h3 className="font-display text-lg tracking-wider text-gradient-gold mb-3">
                Explore The Codex
              </h3>
              <p className="font-body text-moonlight-white/40 text-sm mb-4">
                The living archive of the Green Resonance framework.
              </p>
              <Link
                to="/codex"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-sacred/15 border border-gold-sacred/25 hover:bg-gold-sacred/25 transition-all font-display text-xs tracking-widest text-gold-sacred"
              >
                Enter The Codex
                <ArrowRight className="w-3 h-3" />
              </Link>
            </GlassCard>
            <GlassCard solar className="p-6 sm:p-8">
              <BookOpen className="w-6 h-6 text-emerald-glow mx-auto mb-3" />
              <h3 className="font-display text-lg tracking-wider text-gradient-emerald mb-3">
                Browse Resources
              </h3>
              <p className="font-body text-moonlight-white/40 text-sm mb-4">
                Writings, practices, tools, and media for the regenerative path.
              </p>
              <Link
                to="/resources"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-glow/15 border border-emerald-glow/25 hover:bg-emerald-glow/25 transition-all font-display text-xs tracking-widest text-emerald-glow"
              >
                View Resources
                <ArrowRight className="w-3 h-3" />
              </Link>
            </GlassCard>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
