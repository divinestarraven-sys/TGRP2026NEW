import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Network, Lock, Unlock, Moon, CalendarDays, Library,
  Sprout, CircleDollarSign, Sparkles, Users, BookOpen,
  ShieldCheck, ArrowRight, Check, Leaf,
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SacredGeometry from '../components/SacredGeometry';
import MyceliumNetwork from '../components/MyceliumNetwork';
import CymaticWaves from '../components/CymaticWaves';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';
import { supabase } from '../lib/supabase';
import {
  MYCELIUM_PRICE_USD,
  MYCELIUM_STRIPE_PAYMENT_LINK,
  myceliumAccessKeys,
  monthlyCommunityTimetable,
} from '../data/memberships';

const accessKeyIcons = [
  Sprout, Sparkles, Moon, Library, CalendarDays,
  BookOpen, Leaf, Network, Sparkles, Users, Network,
];

export default function MyceliumMembership() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleJoin = () => {
    if (MYCELIUM_STRIPE_PAYMENT_LINK) {
      window.open(MYCELIUM_STRIPE_PAYMENT_LINK, '_blank', 'noopener,noreferrer');
      return;
    }
    const el = document.getElementById('mycelium-paywall');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');

    const { error } = await supabase
      .from('mycelium_membership_waitlist')
      .insert({ name, email, interest, message });

    if (error) {
      setFormState(error.code === '23505' ? 'success' : 'error');
    } else {
      setFormState('success');
    }
  };

  return (
    <PageTransition>
      {/* ===== Hero ===== */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-emerald-deep/20 to-cosmic-black" />
        <div className="absolute inset-0 opacity-15">
          <MyceliumNetwork nodeCount={35} />
        </div>
        <div className="absolute inset-0 opacity-8">
          <CymaticWaves frequency={0.8} />
        </div>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <SacredGeometry size={620} opacity={0.05} animated />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            className="w-20 h-20 rounded-full bg-emerald-glow/10 border border-gold-sacred/25 flex items-center justify-center mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{ boxShadow: '0 0 50px rgba(16,185,129,0.25)' }}
          >
            <Network className="w-10 h-10 text-gold-sacred" />
          </motion.div>

          <motion.p
            className="font-sacred text-gold-sacred/70 text-sm tracking-[0.35em] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            THE GREEN RESONANCE PROJECT
          </motion.p>

          <motion.h1
            className="font-display text-4xl sm:text-6xl lg:text-7xl tracking-wider leading-tight mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
          >
            <span className="text-gradient-harvest">Mycelium</span>
            <br />
            <span className="text-gradient-biolum">Membership</span>
          </motion.h1>

          <motion.p
            className="font-body text-moonlight-white/50 text-base sm:text-lg max-w-3xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8 }}
          >
            Join the deeper living network of the Green Resonance ecosystem — weekly guided practices,
            New Moon Council access, the resource library, monthly community events circle, and full
            access to all Seed Membership sections.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <button
              onClick={handleJoin}
              className="group px-8 py-4 rounded-full font-display text-sm tracking-widest text-cosmic-black flex items-center gap-2 transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #d4a843 0%, #10b981 50%, #6ee7b7 100%)',
                boxShadow: '0 0 30px rgba(212,168,67,0.3)',
              }}
            >
              <CircleDollarSign className="w-4 h-4" />
              Join for ${MYCELIUM_PRICE_USD} USD
            </button>
            <a
              href="#mycelium-benefits"
              className="px-8 py-4 rounded-full border border-gold-sacred/30 hover:border-gold-sacred/60 transition-all font-display text-sm tracking-widest text-gold-sacred/80 hover:text-gold-sacred"
            >
              View Member Access
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== 11 Access Keys ===== */}
      <section id="mycelium-benefits" className="section-padding relative scroll-mt-20">
        <SectionHeading
          title="What Mycelium Members Receive"
          subtitle="11 access keys — including all Seed Membership layers plus weekly practice, council, library, community, and living network access."
        />
        <div className="container-sacred">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {myceliumAccessKeys.map((item, i) => {
              const Icon = accessKeyIcons[i % accessKeyIcons.length];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.04, duration: 0.55 }}
                >
                  <GlassCard gold className="p-5 sm:p-6 h-full">
                    <div className="w-10 h-10 rounded-lg bg-gold-sacred/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-gold-sacred" />
                    </div>
                    <h3 className="font-display text-sm tracking-wider text-gold-sacred mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="font-body text-moonlight-white/45 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== New Moon Council & Resource Library ===== */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-emerald-deep/8 to-cosmic-black">
        <div className="container-sacred max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GlassCard gold delay={0} className="p-7 sm:p-9">
              <div className="w-12 h-12 rounded-xl bg-gold-sacred/10 flex items-center justify-center mb-5">
                <Moon className="w-6 h-6 text-gold-sacred" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl tracking-wider text-gradient-harvest mb-4">
                New Moon Council Access
              </h2>
              <p className="font-body text-moonlight-white/50 leading-relaxed">
                The New Moon Council is a monthly reflective gathering for release, renewal, intention setting,
                seasonal awareness, symbolic navigation, and community alignment.
              </p>
            </GlassCard>

            <GlassCard gold delay={0.1} className="p-7 sm:p-9">
              <div className="w-12 h-12 rounded-xl bg-gold-sacred/10 flex items-center justify-center mb-5">
                <Library className="w-6 h-6 text-gold-sacred" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl tracking-wider text-gradient-harvest mb-4">
                Resource Library
              </h2>
              <p className="font-body text-moonlight-white/50 leading-relaxed">
                Access member resources including guides, practice cards, symbolic references, workbook previews,
                garden system notes, Codex entries, and Green Resonance field materials.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ===== Community Events Circle / Timetable ===== */}
      <section className="section-padding">
        <div className="container-sacred">
          <div className="text-center mb-12">
            <motion.div
              className="w-14 h-14 rounded-full bg-emerald-glow/10 flex items-center justify-center mx-auto mb-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <CalendarDays className="w-7 h-7 text-emerald-glow" />
            </motion.div>
            <SectionHeading
              title="Community Events Circle"
              subtitle="A monthly rhythm for guided practice, study, council, creative weaving, and community planning."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {monthlyCommunityTimetable.map((event, i) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.08, duration: 0.55 }}
              >
                <GlassCard solar className="p-5 h-full">
                  <p className="font-display text-[10px] tracking-widest text-solarpunk-biolum/70 uppercase mb-2">
                    {event.week}
                  </p>
                  <h3 className="font-display text-base tracking-wider text-gold-sacred mb-2">
                    {event.title}
                  </h3>
                  <p className="font-body text-moonlight-white/40 text-xs leading-relaxed">
                    {event.focus}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Paywall / Join Section ===== */}
      <section id="mycelium-paywall" className="section-padding bg-gradient-to-b from-cosmic-black via-cosmic-deep to-cosmic-black scroll-mt-20">
        <div className="container-sacred max-w-4xl mx-auto">

          {/* Pricing card */}
          <GlassCard gold className="p-8 sm:p-12 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="w-12 h-12 rounded-xl bg-gold-sacred/10 flex items-center justify-center mb-5">
                  <Lock className="w-6 h-6 text-gold-sacred" />
                </div>
                <h2 className="font-display text-3xl sm:text-4xl tracking-wider text-gradient-harvest mb-4">
                  Unlock Mycelium Membership
                </h2>
                <p className="font-body text-moonlight-white/50 leading-relaxed mb-4">
                  Join for{' '}
                  <span className="text-gold-sacred font-display">$40 USD</span>
                  {' '}and unlock the deeper membership layer: weekly guided practices, New Moon Council access,
                  resource library, monthly community events circle, and all Seed Membership sections.
                </p>
                <ul className="space-y-2 mb-4">
                  {['Weekly guided practices', 'New Moon Council', 'Resource library', 'Community events circle', 'All Seed Membership access'].map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm font-body text-moonlight-white/55">
                      <Check className="w-4 h-4 text-emerald-glow shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Stripe placeholder notice */}
                {!MYCELIUM_STRIPE_PAYMENT_LINK && (
                  <div className="p-4 rounded-xl bg-solarpunk-amber/8 border border-solarpunk-amber/20 text-xs font-body text-solarpunk-amber/70 leading-relaxed">
                    Payment not yet configured. Add{' '}
                    <code className="bg-black/30 px-1 py-0.5 rounded text-solarpunk-amber">
                      VITE_MYCELIUM_STRIPE_PAYMENT_LINK
                    </code>{' '}
                    to your environment variables when your Stripe Payment Link is ready.
                  </div>
                )}
              </div>

              {/* Price + CTA */}
              <div className="rounded-2xl bg-cosmic-black/50 border border-gold-sacred/15 p-7 text-center">
                <p className="font-sacred text-gold-sacred/50 text-xs tracking-widest mb-3">MONTHLY ACCESS</p>
                <div className="flex items-end justify-center gap-2 mb-6">
                  <span className="font-display text-6xl text-moonlight-white">${MYCELIUM_PRICE_USD}</span>
                  <span className="font-body text-moonlight-white/40 mb-2">USD</span>
                </div>
                <button
                  onClick={handleJoin}
                  className="w-full py-4 rounded-full font-display text-sm tracking-widest text-cosmic-black flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, #d4a843, #10b981)',
                    boxShadow: '0 0 24px rgba(212,168,67,0.25)',
                  }}
                >
                  <CircleDollarSign className="w-4 h-4" />
                  Join Mycelium Membership
                </button>
                <p className="font-body text-moonlight-white/25 text-xs mt-3 leading-relaxed">
                  Secure payment via Stripe Checkout.
                  {/* TODO: Connect VITE_MYCELIUM_STRIPE_PAYMENT_LINK once live. */}
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Waitlist / Request Access form */}
          <GlassCard gold className="p-7 sm:p-9">
            <h3 className="font-display text-2xl tracking-wider text-gradient-harvest mb-2">
              Request Access — Join Waitlist
            </h3>
            <p className="font-body text-moonlight-white/40 text-sm mb-6">
              Register your interest and we will notify you when Mycelium Membership opens.
            </p>

            {formState === 'success' ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-6"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-glow/10 flex items-center justify-center mx-auto mb-4">
                  <Network className="w-7 h-7 text-emerald-glow" />
                </div>
                <h4 className="font-display text-lg tracking-wider text-gradient-biolum mb-2">
                  Thank you. Your mycelium thread has been planted.
                </h4>
                <p className="font-sacred text-moonlight-white/40 text-sm">
                  We will reach out when membership opens.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-display text-xs tracking-widest text-moonlight-white/40 mb-2">NAME</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl bg-cosmic-deep/50 border border-gold-sacred/10 text-sm font-body text-moonlight-white placeholder:text-moonlight-white/20 focus:outline-none focus:border-gold-sacred/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-display text-xs tracking-widest text-moonlight-white/40 mb-2">EMAIL</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-cosmic-deep/50 border border-gold-sacred/10 text-sm font-body text-moonlight-white placeholder:text-moonlight-white/20 focus:outline-none focus:border-gold-sacred/30 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-display text-xs tracking-widest text-moonlight-white/40 mb-2">MEMBERSHIP INTEREST</label>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-cosmic-deep/50 border border-gold-sacred/10 text-sm font-body text-moonlight-white focus:outline-none focus:border-gold-sacred/30 transition-colors appearance-none"
                  >
                    <option value="" className="bg-cosmic-deep">Select your interest</option>
                    <option value="weekly-practices" className="bg-cosmic-deep">Weekly Guided Practices</option>
                    <option value="new-moon-council" className="bg-cosmic-deep">New Moon Council</option>
                    <option value="resource-library" className="bg-cosmic-deep">Resource Library</option>
                    <option value="community-events" className="bg-cosmic-deep">Community Events Circle</option>
                    <option value="all-seed-sections" className="bg-cosmic-deep">All Seed Sections</option>
                    <option value="full-membership" className="bg-cosmic-deep">Full Mycelium Membership</option>
                  </select>
                </div>
                <div>
                  <label className="block font-display text-xs tracking-widest text-moonlight-white/40 mb-2">MESSAGE (OPTIONAL)</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    placeholder="Tell us what draws you to Mycelium Membership..."
                    className="w-full px-4 py-3 rounded-xl bg-cosmic-deep/50 border border-gold-sacred/10 text-sm font-body text-moonlight-white placeholder:text-moonlight-white/20 focus:outline-none focus:border-gold-sacred/30 transition-colors resize-none"
                  />
                </div>

                {formState === 'error' && (
                  <p className="text-red-400/80 text-xs font-body">Something went wrong. Please try again.</p>
                )}

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full py-3 rounded-xl bg-gold-sacred/15 border border-gold-sacred/30 hover:bg-gold-sacred/25 transition-all font-display text-sm tracking-widest text-gold-sacred flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {formState === 'submitting' ? 'Sending...' : 'Request Mycelium Access'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </GlassCard>
        </div>
      </section>

      {/* ===== Locked Member Area Preview ===== */}
      <section className="section-padding">
        <div className="container-sacred max-w-4xl mx-auto text-center">
          <motion.div
            className="w-14 h-14 rounded-full bg-gold-sacred/10 flex items-center justify-center mx-auto mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Unlock className="w-7 h-7 text-gold-sacred" />
          </motion.div>
          <SectionHeading
            title="Member Area Preview"
            subtitle="Once payment and account validation are connected, this section becomes the protected Mycelium member portal."
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {([
              ['Weekly Practices', BookOpen],
              ['Council Access', Users],
              ['Protected Library', ShieldCheck],
            ] as const).map(([title, Icon], i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard solar className="p-6 opacity-70">
                  <Icon className="w-8 h-8 text-gold-sacred/60 mx-auto mb-3" />
                  <h3 className="font-display text-base tracking-wider text-moonlight-white/60 mb-2">{title}</h3>
                  <div className="flex items-center justify-center gap-1.5 mt-3">
                    <Lock className="w-3 h-3 text-moonlight-white/20" />
                    <p className="font-body text-moonlight-white/30 text-xs">Locked until membership is active.</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Footer CTA ===== */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-emerald-deep/5 to-cosmic-black">
        <div className="container-sacred text-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <GlassCard solar className="p-5">
              <Sprout className="w-5 h-5 text-emerald-glow mx-auto mb-2" />
              <h4 className="font-display text-sm tracking-wider text-moonlight-white mb-2">Seed Membership</h4>
              <p className="font-body text-moonlight-white/30 text-xs mb-3">The founding layer.</p>
              <Link
                to="/seed-membership"
                className="inline-flex items-center gap-1.5 text-xs font-display tracking-widest text-emerald-glow hover:text-solarpunk-biolum transition-colors"
              >
                Explore
                <ArrowRight className="w-3 h-3" />
              </Link>
            </GlassCard>
            <GlassCard gold className="p-5">
              <BookOpen className="w-5 h-5 text-gold-sacred mx-auto mb-2" />
              <h4 className="font-display text-sm tracking-wider text-moonlight-white mb-2">The Codex</h4>
              <p className="font-body text-moonlight-white/30 text-xs mb-3">The living archive.</p>
              <Link
                to="/codex"
                className="inline-flex items-center gap-1.5 text-xs font-display tracking-widest text-gold-sacred hover:text-solarpunk-amber transition-colors"
              >
                Enter
                <ArrowRight className="w-3 h-3" />
              </Link>
            </GlassCard>
            <GlassCard solar className="p-5">
              <Users className="w-5 h-5 text-solarpunk-biolum mx-auto mb-2" />
              <h4 className="font-display text-sm tracking-wider text-moonlight-white mb-2">Community</h4>
              <p className="font-body text-moonlight-white/30 text-xs mb-3">The living network.</p>
              <Link
                to="/community"
                className="inline-flex items-center gap-1.5 text-xs font-display tracking-widest text-solarpunk-biolum hover:text-emerald-glow transition-colors"
              >
                Join
                <ArrowRight className="w-3 h-3" />
              </Link>
            </GlassCard>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
