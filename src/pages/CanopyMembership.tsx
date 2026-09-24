import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  TreePine, Check, Crown, Users, BookOpen, Sparkles,
  Calendar, Star, Loader2, ArrowRight,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import GlassCard from '../components/GlassCard';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';
import MyceliumNetwork from '../components/MyceliumNetwork';

const CANOPY_PRICE_USD = 100;

const canopyBenefits = [
  {
    title: '1. All Mycelium Benefits',
    description:
      'Everything included in the Mycelium tier — weekly guided practices, New Moon Council access, resource library, community events circle, and all Seed content.',
    icon: Users,
  },
  {
    title: '2. Annual Resonance Gathering',
    description:
      'Priority access and invitation to the annual multi-day immersive gathering — a living convergence of the Green Resonance community.',
    icon: Calendar,
  },
  {
    title: '3. One-on-One Mentorship',
    description:
      'Personal guidance sessions with Green Resonance mentors for deeper integration of practices, frameworks, and life design.',
    icon: Sparkles,
  },
  {
    title: '4. Regenerative Design Lab',
    description:
      'Participate in the quarterly Design Lab — collaborative sessions exploring regenerative systems, biohabitation, and community resilience.',
    icon: TreePine,
  },
  {
    title: '5. Early Access to All Content',
    description:
      'Preview and access new publications, practice materials, MUSEschool courses, and framework updates before general release.',
    icon: BookOpen,
  },
  {
    title: '6. Honorary Founding Member Recognition',
    description:
      'Be recognised as a founding Canopy member in the Green Resonance archives and community records.',
    icon: Star,
  },
];

export default function CanopyMembership() {
  const { user, entitlement } = useAuth();
  const navigate = useNavigate();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  const isCanopy = entitlement?.tier === 'canopy' && entitlement.status === 'active';

  const handleJoinCanopy = async () => {
    if (!user) {
      navigate('/signup?redirect=/canopy-membership');
      return;
    }

    if (isCanopy) {
      navigate('/members/canopy');
      return;
    }

    setCheckoutLoading(true);
    setCheckoutError('');

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`;
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await (await import('../lib/supabase')).supabase?.auth.getSession())?.data.session?.access_token}`,
        },
        body: JSON.stringify({ tier: 'canopy' }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || 'Could not start checkout');
      }

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      setCheckoutError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen">
        <MyceliumNetwork />

        {/* Hero */}
        <section className="relative pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-glow/10 border border-cyan-glow/20 mb-6">
                <Crown className="w-4 h-4 text-cyan-glow" />
                <span className="text-sm font-body text-cyan-glow">Full Immersion Membership</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-moonlight-white leading-tight mb-4">
                Canopy Membership
              </h1>
              <p className="text-lg md:text-xl font-body text-moonlight-white/70 max-w-2xl mx-auto leading-relaxed">
                The highest tier of the Green Resonance community — full access to every resource,
                mentorship, gatherings, and early content.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Card */}
        <section className="relative pb-16 px-4">
          <div className="max-w-lg mx-auto">
            <GlassCard className="p-8 text-center border-cyan-glow/20">
              <div className="mb-4">
                <span className="text-5xl font-heading font-bold text-moonlight-white">
                  ${CANOPY_PRICE_USD}
                </span>
                <span className="text-lg font-body text-moonlight-white/50 ml-2">/ month</span>
              </div>
              <p className="text-sm font-body text-moonlight-white/60 mb-6">
                Full immersion in the living framework
              </p>

              <ul className="text-left space-y-3 mb-8">
                {[
                  'All Mycelium tier benefits',
                  'Annual Resonance Gathering access',
                  'One-on-one mentorship sessions',
                  'Regenerative Design Lab',
                  'Early access to all content',
                  'Honorary Founding Member recognition',
                ].map(f => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-cyan-glow flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-body text-moonlight-white/80">{f}</span>
                  </li>
                ))}
              </ul>

              {checkoutError && (
                <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200 text-sm font-body mb-4">
                  {checkoutError}
                </div>
              )}

              {isCanopy ? (
                <Link
                  to="/members/canopy"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-cyan-glow/20 border border-cyan-glow/30 text-cyan-glow font-heading font-semibold"
                >
                  <Crown className="w-5 h-5" />
                  You're a Canopy Member — Go to Dashboard
                </Link>
              ) : (
                <motion.button
                  onClick={handleJoinCanopy}
                  disabled={checkoutLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-glow/80 to-emerald-glow/80 text-moonlight-white font-heading font-semibold tracking-wide hover:from-cyan-glow hover:to-emerald-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {checkoutLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <ArrowRight className="w-5 h-5" />
                  )}
                  {checkoutLoading
                    ? 'Preparing checkout...'
                    : user
                    ? 'Join Canopy — $100/month'
                    : 'Create Account to Join'}
                </motion.button>
              )}

              {!user && (
                <p className="mt-3 text-xs font-body text-moonlight-white/40">
                  Already have an account?{' '}
                  <Link to="/login?redirect=/canopy-membership" className="text-emerald-glow/70 hover:text-emerald-glow">
                    Sign in
                  </Link>
                </p>
              )}
            </GlassCard>
          </div>
        </section>

        {/* Benefits Detail */}
        <section className="relative pb-20 px-4">
          <div className="max-w-5xl mx-auto">
            <SectionHeading title="What's Included" subtitle="Everything in the Canopy tier" />
            <div className="mt-10 grid md:grid-cols-2 gap-6">
              {canopyBenefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GlassCard className="p-6 h-full">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-cyan-glow/10 border border-cyan-glow/20 flex-shrink-0">
                        <b.icon className="w-5 h-5 text-cyan-glow" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-moonlight-white mb-2">
                          {b.title}
                        </h3>
                        <p className="text-sm font-body text-moonlight-white/60 leading-relaxed">
                          {b.description}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tier Comparison */}
        <section className="relative pb-20 px-4">
          <div className="max-w-3xl mx-auto">
            <SectionHeading title="Compare Tiers" subtitle="Choose the path that fits your journey" />
            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              {[
                { name: 'Seed', price: 'Free', path: '/seed-membership', color: 'emerald-glow' },
                { name: 'Mycelium', price: '$40/month', path: '/mycelium-membership', color: 'gold-sacred' },
                { name: 'Canopy', price: '$100/month', path: '#', color: 'cyan-glow', current: true },
              ].map(t => (
                <GlassCard key={t.name} className={`p-5 text-center ${t.current ? 'border-cyan-glow/30 ring-1 ring-cyan-glow/20' : ''}`}>
                  <h4 className={`font-heading font-semibold text-${t.color} mb-1`}>{t.name}</h4>
                  <p className="text-sm font-body text-moonlight-white/60 mb-3">{t.price}</p>
                  {t.current ? (
                    <span className="text-xs font-body text-cyan-glow/70">You are here</span>
                  ) : (
                    <Link to={t.path} className="text-xs font-body text-emerald-glow/70 hover:text-emerald-glow transition-colors">
                      Learn more
                    </Link>
                  )}
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
