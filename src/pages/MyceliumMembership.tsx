import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Network, Check, Key, Users, BookOpen, Sparkles,
  Calendar, Star, Loader2, ArrowRight, Moon, Compass,
  TreePine, Flame,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import GlassCard from '../components/GlassCard';
import SacredGeometry from '../components/SacredGeometry';
import MyceliumNetwork from '../components/MyceliumNetwork';
import CymaticWaves from '../components/CymaticWaves';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';
import {
  MYCELIUM_PRICE_USD,
  myceliumAccessKeys,
  monthlyCommunityTimetable,
} from '../data/memberships';
import CoursePathway from '../components/learning/CoursePathway';

const interestOptions = [
  'Weekly Practices',
  'New Moon Council',
  'Resource Library',
  'Community Events',
  'Living Codex',
  'MUSEschool',
];

const accessKeyIcons = [
  BookOpen, Sparkles, Moon, Key, Calendar,
  Compass, Star, TreePine, Flame, Users, Network,
];

export default function MyceliumMembership() {
  const { user, entitlement } = useAuth();
  const navigate = useNavigate();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [newsletterConsent, setNewsletterConsent] = useState(false);

  const isMycelium =
    entitlement &&
    (entitlement.tier === 'mycelium' || entitlement.tier === 'canopy') &&
    entitlement.status === 'active';

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleJoinMycelium = async () => {
    if (!user) {
      navigate('/signup?redirect=/mycelium-membership');
      return;
    }
    if (isMycelium) {
      navigate('/members');
      return;
    }
    setCheckoutLoading(true);
    setCheckoutError('');
    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`;
      const session = await (await import('../lib/supabase')).supabase?.auth.getSession();
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.data.session?.access_token}`,
        },
        body: JSON.stringify({ tier: 'mycelium' }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || 'Could not start checkout');
      }
      const { url } = await res.json();
      if (url) window.location.href = url;
      else throw new Error('No checkout URL returned');
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mycelium-submit`;
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, interests: interests.join(', '), message, newsletter_consent: newsletterConsent }),
      });
      if (!res.ok) { setFormState('error'); return; }
      const data = await res.json();
      setFormState(data.ok ? 'success' : 'error');
    } catch {
      setFormState('error');
    }
  };

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-emerald-deep/15 to-cosmic-black" />
        <div className="absolute inset-0 opacity-15">
          <MyceliumNetwork nodeCount={35} />
        </div>
        <div className="absolute inset-0 opacity-10">
          <CymaticWaves frequency={1.5} />
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
            <Network className="w-6 h-6 text-gold-sacred" />
            <span className="font-sacred text-gold-sacred/80 text-sm tracking-[0.3em]">MYCELIUM MEMBERSHIP</span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-wider text-gradient-harvest mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Mycelium Membership
          </motion.h1>

          <motion.p
            className="font-sacred text-gold-sacred/60 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            The connected layer of the Green Resonance community — weekly practices, New Moon Councils, resource library, community events, and the living Codex.
          </motion.p>

          <motion.p
            className="font-body text-moonlight-white/40 text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Mycelium Members join a living network of practice, learning, reflection, and collaboration — rooted in the Green Resonance framework and growing together through weekly rhythms and monthly gatherings.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <button
              onClick={handleJoinMycelium}
              disabled={checkoutLoading}
              className="group px-8 py-4 rounded-full bg-gold-sacred/15 border border-gold-sacred/30 hover:bg-gold-sacred/25 hover:border-gold-sacred/50 transition-all font-display text-sm tracking-widest text-gold-sacred flex items-center gap-2 disabled:opacity-50"
            >
              {checkoutLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Network className="w-4 h-4 group-hover:scale-110 transition-transform" />}
              {isMycelium ? 'Go to Dashboard' : checkoutLoading ? 'Preparing...' : user ? `Join Mycelium — $${MYCELIUM_PRICE_USD}/month` : 'Create Account to Join'}
            </button>
            <a
              href="#waitlist"
              className="px-8 py-4 rounded-full bg-emerald-glow/10 border border-emerald-glow/20 hover:border-emerald-glow/40 transition-all font-display text-sm tracking-widest text-emerald-glow/80 hover:text-emerald-glow flex items-center gap-2"
            >
              Join the Waitlist
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {checkoutError && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200 text-sm font-body max-w-md mx-auto">
              {checkoutError}
            </motion.div>
          )}

          {!user && (
            <motion.p className="mt-4 text-xs font-body text-moonlight-white/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
              Already have an account?{' '}
              <Link to="/login?redirect=/mycelium-membership" className="text-emerald-glow/70 hover:text-emerald-glow">Sign in</Link>
            </motion.p>
          )}
        </div>
      </section>

      {/* Pricing Card */}
      <section className="section-padding relative bg-gradient-to-b from-cosmic-black via-emerald-deep/5 to-cosmic-black">
        <div className="container-sacred max-w-lg mx-auto">
          <GlassCard gold className="p-8 sm:p-10 text-center">
            <div className="mb-4">
              <span className="text-5xl font-heading font-bold text-moonlight-white">${MYCELIUM_PRICE_USD}</span>
              <span className="text-lg font-body text-moonlight-white/50 ml-2">/ month</span>
            </div>
            <p className="text-sm font-body text-moonlight-white/60 mb-6">The connected layer of the living framework</p>

            <ul className="text-left space-y-3 mb-8">
              {['All Seed tier benefits', 'Weekly guided practices', 'New Moon Council access', 'Resource library', 'Community events circle', 'Living Codex access', 'Practice archive', 'MUSEschool development notes', 'Member field notes', 'Circle invitations', 'Mycelium network access'].map(f => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gold-sacred flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-body text-moonlight-white/80">{f}</span>
                </li>
              ))}
            </ul>

            {isMycelium ? (
              <Link to="/members" className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-gold-sacred/20 border border-gold-sacred/30 text-gold-sacred font-heading font-semibold">
                <Network className="w-5 h-5" /> You're a Mycelium Member — Go to Dashboard
              </Link>
            ) : (
              <motion.button onClick={handleJoinMycelium} disabled={checkoutLoading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-gold-sacred/80 to-emerald-glow/80 text-moonlight-white font-heading font-semibold tracking-wide hover:from-gold-sacred hover:to-emerald-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {checkoutLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                {checkoutLoading ? 'Preparing checkout...' : user ? `Join Mycelium — $${MYCELIUM_PRICE_USD}/month` : 'Create Account to Join'}
              </motion.button>
            )}

            {!user && (
              <p className="mt-3 text-xs font-body text-moonlight-white/40">
                Already have an account?{' '}
                <Link to="/login?redirect=/mycelium-membership" className="text-emerald-glow/70 hover:text-emerald-glow">Sign in</Link>
              </p>
            )}
          </GlassCard>
        </div>
      </section>

      {/* Access Keys */}
      <section className="section-padding relative">
        <SectionHeading title="Your Access Keys" subtitle="Everything included in the Mycelium tier" />
        <div className="container-sacred">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {myceliumAccessKeys.map((key, i) => {
              const Icon = accessKeyIcons[i] || Key;
              return (
                <motion.div key={key.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ delay: i * 0.08, duration: 0.6 }}>
                  <GlassCard gold className="p-6 h-full">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-gold-sacred/10 border border-gold-sacred/20 flex-shrink-0">
                        <Icon className="w-5 h-5 text-gold-sacred" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-moonlight-white mb-2">{key.title}</h3>
                        <p className="text-sm font-body text-moonlight-white/60 leading-relaxed">{key.description}</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Timetable */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-emerald-deep/8 to-cosmic-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <SacredGeometry size={500} opacity={1} animated />
        </div>
        <div className="container-sacred relative z-10">
          <SectionHeading title="Monthly Community Timetable" subtitle="A living rhythm of practice, study, creativity, and gathering." />
          <div className="max-w-3xl mx-auto space-y-4">
            {monthlyCommunityTimetable.map((entry, i) => (
              <motion.div key={entry.week} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <GlassCard gold hover={false} className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
                    <div className="flex-shrink-0">
                      <span className="inline-block px-3 py-1 rounded-full bg-gold-sacred/10 border border-gold-sacred/20 font-display text-xs tracking-widest text-gold-sacred">{entry.week}</span>
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-moonlight-white mb-1">{entry.title}</h3>
                      <p className="text-sm font-body text-moonlight-white/50 leading-relaxed">{entry.focus}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Form */}
      <section id="waitlist" className="section-padding bg-gradient-to-b from-cosmic-black via-cosmic-deep to-cosmic-black scroll-mt-20">
        <div className="container-sacred max-w-xl">
          <SectionHeading title="Join the Mycelium Waitlist" subtitle="Leave your details and we will notify you when spaces open." />

          {formState === 'success' ? (
            <GlassCard gold className="p-8 text-center">
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
                <div className="w-16 h-16 rounded-full bg-gold-sacred/10 flex items-center justify-center mx-auto mb-4">
                  <Network className="w-8 h-8 text-gold-sacred" />
                </div>
                <h3 className="font-display text-xl tracking-wider text-gradient-harvest mb-2">You're on the List</h3>
                <p className="font-body text-moonlight-white/70 leading-relaxed text-sm">Thank you for your interest in Mycelium Membership. We will be in touch when spaces become available.</p>
              </motion.div>
            </GlassCard>
          ) : (
            <GlassCard gold className="p-8">
              <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                <div>
                  <label htmlFor="mycelium-name" className="block font-display text-xs tracking-widest text-moonlight-white/70 mb-2">NAME</label>
                  <input id="mycelium-name" type="text" autoComplete="name" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-cosmic-deep/50 border border-gold-sacred/10 text-sm font-body text-moonlight-white placeholder:text-moonlight-white/20 focus:outline-none focus:border-gold-sacred/30 transition-colors" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="mycelium-email" className="block font-display text-xs tracking-widest text-moonlight-white/70 mb-2">EMAIL</label>
                  <input id="mycelium-email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-cosmic-deep/50 border border-gold-sacred/10 text-sm font-body text-moonlight-white placeholder:text-moonlight-white/20 focus:outline-none focus:border-gold-sacred/30 transition-colors" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block font-display text-xs tracking-widest text-moonlight-white/70 mb-2">INTERESTS</label>
                  <div className="flex flex-wrap gap-2">
                    {interestOptions.map(opt => (
                      <button key={opt} type="button" aria-pressed={interests.includes(opt)} onClick={() => toggleInterest(opt)}
                        className={`px-3 py-1.5 rounded-full text-xs font-display tracking-wider transition-all ${interests.includes(opt) ? 'bg-gold-sacred/20 text-gold-sacred border border-gold-sacred/30' : 'bg-cosmic-deep/30 text-moonlight-white/40 border border-moonlight-white/10 hover:text-moonlight-white/60'}`}
                      >{opt}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="mycelium-message" className="block font-display text-xs tracking-widest text-moonlight-white/70 mb-2">MESSAGE (OPTIONAL)</label>
                  <textarea id="mycelium-message" value={message} onChange={e => setMessage(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl bg-cosmic-deep/50 border border-gold-sacred/10 text-sm font-body text-moonlight-white placeholder:text-moonlight-white/20 focus:outline-none focus:border-gold-sacred/30 transition-colors resize-none" placeholder="Tell us what interests you most..." />
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={newsletterConsent} onChange={e => setNewsletterConsent(e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-gold-sacred/20 bg-cosmic-deep/50 text-gold-sacred focus:ring-gold-sacred/30" />
                  <span className="font-body text-moonlight-white/70 text-xs leading-relaxed">Send me Green Resonance Project news and updates.</span>
                </label>
                {formState === 'error' && <p role="alert" className="text-red-400/80 text-xs font-body">Something went wrong. Please try again.</p>}
                <p className="font-body text-sm text-moonlight-white/60 leading-relaxed">We will use your email to notify you when Mycelium Membership spaces open. This is a waitlist request, not an active membership account.</p>
                <button type="submit" disabled={formState === 'submitting'} className="w-full py-3 rounded-xl bg-gold-sacred/20 border border-gold-sacred/30 hover:bg-gold-sacred/30 transition-all font-display text-sm tracking-widest text-gold-sacred flex items-center justify-center gap-2 disabled:opacity-50">
                  {formState === 'submitting' ? 'Connecting to the network...' : 'Join the Mycelium Waitlist'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </GlassCard>
          )}
        </div>
      </section>

      {/* Tier Comparison */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-emerald-deep/5 to-cosmic-black">
        <div className="container-sacred max-w-3xl mx-auto">
          <SectionHeading title="Compare Tiers" subtitle="Choose the path that fits your journey" />
          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            {[
              { name: 'Seed', price: 'Free', path: '/seed-membership', color: 'emerald-glow' },
              { name: 'Mycelium', price: `$${MYCELIUM_PRICE_USD}/month`, path: '#', color: 'gold-sacred', current: true },
              { name: 'Canopy', price: '$100/month', path: '/canopy-membership', color: 'cyan-glow' },
            ].map(t => (
              <GlassCard key={t.name} className={`p-5 text-center ${t.current ? 'border-gold-sacred/30 ring-1 ring-gold-sacred/20' : ''}`}>
                <h4 className={`font-heading font-semibold text-${t.color} mb-1`}>{t.name}</h4>
                <p className="text-sm font-body text-moonlight-white/60 mb-3">{t.price}</p>
                {t.current ? (
                  <span className="text-xs font-body text-gold-sacred/70">You are here</span>
                ) : (
                  <Link to={t.path} className="text-xs font-body text-emerald-glow/70 hover:text-emerald-glow transition-colors">Learn more</Link>
                )}
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Course Catalogue */}
      <section className="section-padding">
        <div className="container-sacred">
          <CoursePathway pathway="mycelium" />
        </div>
      </section>
    </PageTransition>
  );
}
