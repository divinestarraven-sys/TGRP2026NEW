import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sprout, Check, AlertTriangle, RotateCcw, Loader2, ArrowRight, XCircle } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SacredGeometry from '../components/SacredGeometry';
import PageTransition from '../components/PageTransition';

type ConfirmState =
  | 'ready'
  | 'confirming'
  | 'confirmed'
  | 'expired'
  | 'already_used'
  | 'invalid'
  | 'resending'
  | 'resent'
  | 'error';

const API_BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/confirm-email`;

export default function ConfirmEmail() {
  const [params] = useSearchParams();
  const token = params.get('token') ?? '';
  const [state, setState] = useState<ConfirmState>(token ? 'ready' : 'invalid');

  useEffect(() => {
    if (!token || token.length !== 64) setState('invalid');
  }, [token]);

  const handleConfirm = useCallback(async () => {
    setState('confirming');
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'confirm', token }),
      });
      if (!res.ok) {
        setState('error');
        return;
      }
      const data = await res.json();
      const status: string = data.status ?? 'error';
      if (status === 'confirmed') setState('confirmed');
      else if (status === 'expired') setState('expired');
      else if (status === 'already_used') setState('already_used');
      else if (status === 'invalid') setState('invalid');
      else setState('error');
    } catch {
      setState('error');
    }
  }, [token]);

  const handleResend = useCallback(async () => {
    setState('resending');
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'resend', token }),
      });
      if (!res.ok) {
        setState('error');
        return;
      }
      setState('resent');
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
          {/* READY — Confirm button */}
          {state === 'ready' && (
            <GlassCard gold className="p-8 sm:p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-glow/10 flex items-center justify-center mx-auto mb-6">
                <Sprout className="w-8 h-8 text-emerald-glow" />
              </div>
              <h1 className="font-display text-2xl tracking-wider text-gradient-emerald mb-3">
                Confirm Your Email
              </h1>
              <p className="font-body text-moonlight-white/50 text-sm leading-relaxed mb-8">
                Press the button below to confirm your email address and
                complete your Seed access request.
              </p>
              <button
                onClick={handleConfirm}
                className="w-full py-3.5 rounded-xl bg-emerald-glow/20 border border-emerald-glow/30 hover:bg-emerald-glow/30 transition-all font-display text-sm tracking-widest text-emerald-glow flex items-center justify-center gap-2"
              >
                Confirm Email Address
                <Check className="w-4 h-4" />
              </button>
            </GlassCard>
          )}

          {/* CONFIRMING — Loading */}
          {state === 'confirming' && (
            <GlassCard gold className="p-8 sm:p-10 text-center">
              <Loader2 className="w-10 h-10 text-emerald-glow animate-spin mx-auto mb-4" />
              <p className="font-display text-lg tracking-wider text-moonlight-white/70">
                Confirming...
              </p>
            </GlassCard>
          )}

          {/* CONFIRMED — Success */}
          {state === 'confirmed' && (
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
                  Email Confirmed
                </h1>
                <p className="font-body text-moonlight-white/50 text-sm leading-relaxed mb-6">
                  Your email has been verified and your Seed access request is
                  now active. We will reach out when the Seed Membership
                  ecosystem is ready for you.
                </p>
                <Link
                  to="/seed-membership"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-glow/15 border border-emerald-glow/25 hover:bg-emerald-glow/25 transition-all font-display text-xs tracking-widest text-emerald-glow"
                >
                  Back to Seed Membership
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            </GlassCard>
          )}

          {/* ALREADY USED */}
          {state === 'already_used' && (
            <GlassCard gold className="p-8 sm:p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-gold-sacred/10 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-gold-sacred" />
              </div>
              <h1 className="font-display text-2xl tracking-wider text-gradient-gold mb-3">
                Already Confirmed
              </h1>
              <p className="font-body text-moonlight-white/50 text-sm leading-relaxed mb-6">
                This confirmation link has already been used. Your email address
                is verified and your Seed access request is active.
              </p>
              <Link
                to="/seed-membership"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-sacred/15 border border-gold-sacred/25 hover:bg-gold-sacred/25 transition-all font-display text-xs tracking-widest text-gold-sacred"
              >
                Back to Seed Membership
                <ArrowRight className="w-3 h-3" />
              </Link>
            </GlassCard>
          )}

          {/* EXPIRED */}
          {state === 'expired' && (
            <GlassCard gold className="p-8 sm:p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-gold-sacred/10 flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-gold-sacred" />
              </div>
              <h1 className="font-display text-2xl tracking-wider text-gradient-gold mb-3">
                Link Expired
              </h1>
              <p className="font-body text-moonlight-white/50 text-sm leading-relaxed mb-6">
                This confirmation link has expired. You can request a fresh one
                below — check your inbox after pressing the button.
              </p>
              <button
                onClick={handleResend}
                className="w-full py-3.5 rounded-xl bg-gold-sacred/15 border border-gold-sacred/25 hover:bg-gold-sacred/25 transition-all font-display text-sm tracking-widest text-gold-sacred flex items-center justify-center gap-2"
              >
                Send a New Link
                <RotateCcw className="w-4 h-4" />
              </button>
            </GlassCard>
          )}

          {/* INVALID */}
          {state === 'invalid' && (
            <GlassCard gold className="p-8 sm:p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-8 h-8 text-red-400" />
              </div>
              <h1 className="font-display text-2xl tracking-wider text-moonlight-white mb-3">
                Invalid Link
              </h1>
              <p className="font-body text-moonlight-white/50 text-sm leading-relaxed mb-6">
                This confirmation link is not valid. If you requested Seed
                access, you can submit the form again to receive a new link.
              </p>
              <Link
                to="/seed-membership#join-form"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-glow/15 border border-emerald-glow/25 hover:bg-emerald-glow/25 transition-all font-display text-xs tracking-widest text-emerald-glow"
              >
                Go to Seed Membership
                <ArrowRight className="w-3 h-3" />
              </Link>
            </GlassCard>
          )}

          {/* RESENDING */}
          {state === 'resending' && (
            <GlassCard gold className="p-8 sm:p-10 text-center">
              <Loader2 className="w-10 h-10 text-gold-sacred animate-spin mx-auto mb-4" />
              <p className="font-display text-lg tracking-wider text-moonlight-white/70">
                Sending a new link...
              </p>
            </GlassCard>
          )}

          {/* RESENT */}
          {state === 'resent' && (
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
                  New Link Sent
                </h1>
                <p className="font-body text-moonlight-white/50 text-sm leading-relaxed">
                  If there is a pending request for your address, a fresh
                  confirmation link has been sent. Please check your inbox.
                </p>
              </motion.div>
            </GlassCard>
          )}

          {/* ERROR */}
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
                a few minutes or submit a new Seed access request.
              </p>
              <Link
                to="/seed-membership#join-form"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-glow/15 border border-emerald-glow/25 hover:bg-emerald-glow/25 transition-all font-display text-xs tracking-widest text-emerald-glow"
              >
                Go to Seed Membership
                <ArrowRight className="w-3 h-3" />
              </Link>
            </GlassCard>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
