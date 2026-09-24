import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Crown, Calendar, Sparkles, TreePine, BookOpen, Star,
  ArrowLeft, Lock,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import GlassCard from '../components/GlassCard';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';

const canopySections = [
  {
    title: 'Annual Resonance Gathering',
    description:
      'Your invitation and details for the next gathering will appear here when announced. Previous gatherings and recordings are archived below.',
    icon: Calendar,
    available: false,
    note: 'Next gathering date to be announced',
  },
  {
    title: 'One-on-One Mentorship',
    description:
      'Schedule personal guidance sessions with Green Resonance mentors. Booking opens when mentors are available.',
    icon: Sparkles,
    available: false,
    note: 'Mentorship scheduling coming soon',
  },
  {
    title: 'Regenerative Design Lab',
    description:
      'Collaborative quarterly sessions exploring regenerative systems, biohabitation, and community resilience.',
    icon: TreePine,
    available: false,
    note: 'Next Design Lab session to be announced',
  },
  {
    title: 'Early Access Materials',
    description:
      'Preview upcoming publications, practice materials, and framework updates before they are released to other tiers.',
    icon: BookOpen,
    available: false,
    note: 'No early-access materials available yet',
  },
  {
    title: 'Founding Member Archive',
    description:
      'Your place in the Green Resonance founding records. This recognition is permanent and will be preserved in all future archives.',
    icon: Star,
    available: true,
    note: null,
  },
];

export default function MembersCanopy() {
  const { entitlement } = useAuth();

  const periodEnd = entitlement?.current_period_end
    ? new Date(entitlement.current_period_end).toLocaleDateString('en-AU', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : null;

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/members"
            className="inline-flex items-center gap-2 text-sm font-body text-moonlight-white/50 hover:text-moonlight-white/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>

          <SectionHeading title="Canopy Member Area" subtitle="Your exclusive resources and community spaces" />

          {/* Status Bar */}
          <div className="mt-6 mb-10">
            <GlassCard className="p-4 border-cyan-glow/20">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <Crown className="w-5 h-5 text-cyan-glow" />
                  <span className="font-heading font-semibold text-cyan-glow text-sm">Canopy Member</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-body bg-emerald-glow/20 text-emerald-glow border border-emerald-glow/30">
                    Active
                  </span>
                </div>
                {periodEnd && (
                  <span className="text-xs font-body text-moonlight-white/40">
                    Current period ends: {periodEnd}
                  </span>
                )}
              </div>
            </GlassCard>
          </div>

          {/* Content Sections */}
          <div className="grid gap-6">
            {canopySections.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <GlassCard className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg flex-shrink-0 ${
                      s.available
                        ? 'bg-cyan-glow/10 border border-cyan-glow/20'
                        : 'bg-white/5 border border-white/10'
                    }`}>
                      {s.available ? (
                        <s.icon className="w-5 h-5 text-cyan-glow" />
                      ) : (
                        <Lock className="w-5 h-5 text-moonlight-white/30" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-moonlight-white mb-2">
                        {s.title}
                      </h3>
                      <p className="text-sm font-body text-moonlight-white/60 leading-relaxed">
                        {s.description}
                      </p>
                      {s.note && (
                        <p className="mt-3 text-xs font-body text-moonlight-white/40 italic">
                          {s.note}
                        </p>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Community Links */}
          <div className="mt-10">
            <h2 className="text-lg font-heading font-semibold text-moonlight-white mb-4">
              Explore the Framework
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: 'The Living Codex', path: '/codex' },
                { label: 'Symbolic Keys', path: '/symbolic-keys' },
                { label: 'Community', path: '/community' },
              ].map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm font-body text-moonlight-white/70 hover:bg-white/10 hover:text-moonlight-white transition-colors text-center"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
