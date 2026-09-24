import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MailX, Check, AlertTriangle, Loader2, ArrowRight, XCircle } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SacredGeometry from '../components/SacredGeometry';
import PageTransition from '../components/PageTransition';

type UnsubState =
  | 'ready'
  | 'processing'
  | 'unsubscribed'
  | 'already_unsubscribed'
  | 'invalid'
  | 'error';

const API_BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/unsubscribe`;

export default function Unsubscribe() {
  const [params] = useSearchParams();
  const token = params.get('token') ?? '';
  const [state, setState] = useState<UnsubState>(token ? 'ready' : 'invalid');

  useEffect(() => {
    if (!token || token.length !== 64) setState('invalid');
  }, [token]);

  const handleUnsubscribe = useCallback(async () => {
    setState('processing');
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      if (!res.ok) {
        setState('error');
        return;
      }
      const data = await res.json();
      const status: string = data.status ?? 'error';
      if (status === 'unsubscribed') setState('unsubscribed');
      else if (status === 'already_unsubscribed') setState('already_unsubscribed');
      else if (status === 'invalid') setState('invalid');
      else setState('error');
    } catch {
      setState('error');
    }
  }, [token]);

  return (
    <PageTransition>
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-emerald-deep/15 to-cosmic-black" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <SacredGeometry size={500} opacity={0.05} />
        </motion.div>

        <div className="relative z-10 w-full max-w-md mx-auto px-4">
          {state === 'ready' && (
            <GlassCard gold className="p-8 sm:p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-gold-sacred/10 flex items-center justify-center mx-auto mb-6">
                <MailX className="w-8 h-8 text-gold-sacred" />
              </div>
              <h1 className="font-display text-2xl tracking-wider text-gradient-gold mb-3">
                Unsubscribe
              </h1>
              <p className="font-body text-moonlight-white/50 text-sm leading-relaxed mb-8">
                Press the button below to unsubscribe from all marketing and
                newsletter emails from The Green Resonance Project.
              </p>
              <button
                onClick={handleUnsubscribe}
                className="w-full py-3.5 rounded-xl bg-gold-sacred/20 border border-gold-sacred/30 hover:bg-gold-sacred/30 transition-all font-display text-sm tracking-widest text-gold-sacred flex items-center justify-center gap-2"
              >
                Confirm Unsubscribe
                <MailX className="w-4 h-4" />
              </button>
            </GlassCard>
          )}

          {state === 'processing' && (
            <GlassCard gold className="p-8 sm:p-10 text-center">
              <Loader2 className="w-10 h-10 text-gold-sacred animate-spin mx-auto mb-4" />
              <p className="font-display text-lg tracking-wider text-moonlight-white/70">
                Processing...
              </p>
            </GlassCard>
          )}

          {state === 'unsubscribed' && (
            <GlassCard gold className="p-8 sm:p-10 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 rounded-full bg-emerald-glow/10 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-emerald-glow" />
                </div>
                <h1 className="font-display text-2xl tracking-wider text-gradient-emerald mb-3">
                  Unsubscribed
                </h1>
                <p className="font-body text-moonlight-white/50 text-sm leading-relaxed mb-6">
                  You have been unsubscribed and will no longer receive marketing
                  or newsletter emails from us.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-glow/15 border border-emerald-glow/25 hover:bg-emerald-glow/25 transition-all font-display text-xs tracking-widest text-emerald-glow"
                >
                  Return Home
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            </GlassCard>
          )}

          {state === 'already_unsubscribed' && (
            <GlassCard gold className="p-8 sm:p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-gold-sacred/10 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-gold-sacred" />
              </div>
              <h1 className="font-display text-2xl tracking-wider text-gradient-gold mb-3">
                Already Unsubscribed
              </h1>
              <p className="font-body text-moonlight-white/50 text-sm leading-relaxed mb-6">
                This email address is already unsubscribed. You will not receive
                any marketing or newsletter emails from us.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-sacred/15 border border-gold-sacred/25 hover:bg-gold-sacred/25 transition-all font-display text-xs tracking-widest text-gold-sacred"
              >
                Return Home
                <ArrowRight className="w-3 h-3" />
              </Link>
            </GlassCard>
          )}

          {state === 'invalid' && (
            <GlassCard gold className="p-8 sm:p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-8 h-8 text-red-400" />
              </div>
              <h1 className="font-display text-2xl tracking-wider text-moonlight-white mb-3">
                Invalid Link
              </h1>
              <p className="font-body text-moonlight-white/50 text-sm leading-relaxed mb-6">
                This unsubscribe link is not valid. If you need help managing
                your email preferences, please contact us.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-glow/15 border border-emerald-glow/25 hover:bg-emerald-glow/25 transition-all font-display text-xs tracking-widest text-emerald-glow"
              >
                Contact Us
                <ArrowRight className="w-3 h-3" />
              </Link>
            </GlassCard>
          )}

          {state === 'error' && (
            <GlassCard gold className="p-8 sm:p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <h1 className="font-display text-2xl tracking-wider text-moonlight-white mb-3">
                Something Went Wrong
              </h1>
              <p className="font-body text-moonlight-white/50 text-sm leading-relaxed mb-6">
                We could not process your request right now. Please try again in
                a few minutes.
              </p>
              <button
                onClick={() => setState('ready')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-sacred/15 border border-gold-sacred/25 hover:bg-gold-sacred/25 transition-all font-display text-xs tracking-widest text-gold-sacred"
              >
                Try Again
              </button>
            </GlassCard>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
