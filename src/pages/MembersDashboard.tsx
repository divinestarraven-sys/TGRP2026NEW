import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Crown, Sprout, Network, BookOpen, Users,
  CreditCard, LogOut, Loader2, Check, ArrowRight,
  Lock,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import GlassCard from '../components/GlassCard';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';

const TIER_CONFIG = {
  seed: { label: 'Seed', icon: Sprout, color: 'emerald-glow', gradient: 'from-emerald-glow/80 to-solarpunk-canopy/80' },
  mycelium: { label: 'Mycelium', icon: Network, color: 'gold-sacred', gradient: 'from-gold-sacred/80 to-amber-500/80' },
  canopy: { label: 'Canopy', icon: Crown, color: 'cyan-glow', gradient: 'from-cyan-glow/80 to-emerald-glow/80' },
} as const;

const STATUS_LABELS: Record<string, { label: string; style: string }> = {
  free: { label: 'Free', style: 'bg-emerald-glow/20 text-emerald-glow border-emerald-glow/30' },
  active: { label: 'Active', style: 'bg-emerald-glow/20 text-emerald-glow border-emerald-glow/30' },
  past_due: { label: 'Payment Overdue', style: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  incomplete: { label: 'Payment Pending', style: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  canceled: { label: 'Cancelled', style: 'bg-red-500/20 text-red-300 border-red-500/30' },
};

export default function MembersDashboard() {
  const { user, entitlement, signOut, refreshEntitlement } = useAuth();
  const [params] = useSearchParams();
  const [showSuccess, setShowSuccess] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    if (params.get('checkout') === 'success') {
      setShowSuccess(true);
      refreshEntitlement();
      const t = setTimeout(() => setShowSuccess(false), 8000);
      return () => clearTimeout(t);
    }
  }, [params, refreshEntitlement]);

  const tier = entitlement?.tier ?? 'seed';
  const status = entitlement?.status ?? 'free';
  const cfg = TIER_CONFIG[tier] || TIER_CONFIG.seed;
  const statusInfo = STATUS_LABELS[status] || STATUS_LABELS.free;
  const isPaid = status === 'active';
  const periodEnd = entitlement?.current_period_end
    ? new Date(entitlement.current_period_end).toLocaleDateString('en-AU', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : null;

  const handlePortal = async () => {
    if (!entitlement?.stripe_customer_id) return;
    setPortalLoading(true);
    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-portal-session`;
      const session = await (await import('../lib/supabase')).supabase?.auth.getSession();
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.data.session?.access_token}`,
        },
      });
      if (!res.ok) throw new Error('Could not open billing portal');
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch {
      // Silently fail — user can retry
    } finally {
      setPortalLoading(false);
    }
  };

  const memberResources = [
    {
      title: 'The Living Codex',
      description: 'Explore the full framework — Pillars, Portals, Ravenstar, Phoenix Principle, and more.',
      icon: BookOpen,
      path: '/codex',
      tier: 'seed' as const,
    },
    {
      title: 'Symbolic Keys Library',
      description: 'All 20 Symbolic Keys with detailed guidance, practices, and visual references.',
      icon: BookOpen,
      path: '/symbolic-keys',
      tier: 'seed' as const,
    },
    {
      title: 'Resources & Publications',
      description: 'Access project publications, recommended reading, and external research links.',
      icon: BookOpen,
      path: '/resources',
      tier: 'seed' as const,
    },
    {
      title: 'Community Events',
      description: 'Monthly timetable, circle invitations, and seasonal gathering information.',
      icon: Users,
      path: '/community',
      tier: 'seed' as const,
    },
    {
      title: 'Canopy Member Area',
      description: 'Exclusive Canopy content — mentorship, Design Lab, early access materials.',
      icon: Crown,
      path: '/members/canopy',
      tier: 'canopy' as const,
      requiresPaid: true,
    },
  ];

  const TIER_LEVEL: Record<string, number> = { seed: 0, mycelium: 1, canopy: 2 };
  const userLevel = TIER_LEVEL[tier] ?? 0;

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-emerald-glow/15 border border-emerald-glow/30 flex items-center gap-3"
            >
              <Check className="w-5 h-5 text-emerald-glow flex-shrink-0" />
              <p className="text-sm font-body text-emerald-glow">
                Welcome! Your membership is being activated. It may take a moment to appear.
              </p>
            </motion.div>
          )}

          <SectionHeading title="Member Dashboard" subtitle={user?.email || ''} />

          {/* Tier Status */}
          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg bg-${cfg.color}/10 border border-${cfg.color}/20`}>
                  <cfg.icon className={`w-6 h-6 text-${cfg.color}`} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-moonlight-white">{cfg.label} Membership</h3>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-body border ${statusInfo.style}`}>
                    {statusInfo.label}
                  </span>
                </div>
              </div>
              {periodEnd && isPaid && (
                <p className="text-sm font-body text-moonlight-white/50">
                  Current period ends: {periodEnd}
                </p>
              )}
              {status === 'canceled' && periodEnd && (
                <p className="text-sm font-body text-amber-400/80">
                  Access continues until {periodEnd}
                </p>
              )}
            </GlassCard>

            <GlassCard className="p-6 flex flex-col justify-between">
              <h3 className="font-heading font-semibold text-moonlight-white mb-3">Account</h3>
              <div className="space-y-2">
                {entitlement?.stripe_customer_id && (
                  <motion.button
                    onClick={handlePortal}
                    disabled={portalLoading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-2.5 rounded-lg bg-white/5 border border-white/10 text-moonlight-white/80 font-body text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {portalLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
                    Manage Billing
                  </motion.button>
                )}
                <button
                  onClick={signOut}
                  className="w-full py-2.5 rounded-lg bg-white/5 border border-white/10 text-moonlight-white/60 font-body text-sm hover:bg-white/10 hover:text-moonlight-white/80 transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </GlassCard>
          </div>

          {/* Upgrade Prompt */}
          {tier === 'seed' && status === 'free' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6"
            >
              <GlassCard className="p-6 border-gold-sacred/20">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-heading font-semibold text-gold-sacred mb-1">Upgrade Your Membership</h3>
                    <p className="text-sm font-body text-moonlight-white/60">
                      Unlock weekly practices, community circles, and more with Mycelium or Canopy.
                    </p>
                  </div>
                  <div className="flex gap-3 flex-shrink-0">
                    <Link
                      to="/mycelium-membership"
                      className="px-4 py-2 rounded-lg bg-gold-sacred/20 border border-gold-sacred/30 text-gold-sacred text-sm font-heading font-semibold hover:bg-gold-sacred/30 transition-colors"
                    >
                      Mycelium — $40/mo
                    </Link>
                    <Link
                      to="/canopy-membership"
                      className="px-4 py-2 rounded-lg bg-cyan-glow/20 border border-cyan-glow/30 text-cyan-glow text-sm font-heading font-semibold hover:bg-cyan-glow/30 transition-colors"
                    >
                      Canopy — $100/mo
                    </Link>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Resources */}
          <div className="mt-10">
            <h2 className="text-xl font-heading font-semibold text-moonlight-white mb-6">Your Resources</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {memberResources.map((r) => {
                const resourceLevel = TIER_LEVEL[r.tier] ?? 0;
                const locked = r.requiresPaid && (!isPaid || userLevel < resourceLevel);

                return (
                  <GlassCard key={r.title} className={`p-5 ${locked ? 'opacity-60' : ''}`}>
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${locked ? 'bg-white/5' : 'bg-emerald-glow/10 border border-emerald-glow/20'}`}>
                        {locked ? (
                          <Lock className="w-5 h-5 text-moonlight-white/30" />
                        ) : (
                          <r.icon className="w-5 h-5 text-emerald-glow" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-heading font-semibold text-moonlight-white text-sm mb-1">
                          {r.title}
                        </h4>
                        <p className="text-xs font-body text-moonlight-white/50 leading-relaxed mb-3">
                          {r.description}
                        </p>
                        {locked ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-body text-moonlight-white/30">
                            <Lock className="w-3 h-3" />
                            Requires {r.tier.charAt(0).toUpperCase() + r.tier.slice(1)} membership
                          </span>
                        ) : (
                          <Link
                            to={r.path}
                            className="inline-flex items-center gap-1.5 text-xs font-body text-emerald-glow/70 hover:text-emerald-glow transition-colors"
                          >
                            Open <ArrowRight className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
