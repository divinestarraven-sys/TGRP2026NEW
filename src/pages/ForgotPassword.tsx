import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await resetPassword(email.trim());
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-start justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <SectionHeading title="Reset Password" subtitle="We'll send you a link to reset your password" />

          {submitted ? (
            <div className="mt-8 p-6 rounded-xl bg-emerald-glow/10 border border-emerald-glow/20">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="w-6 h-6 text-emerald-glow" />
                <h3 className="text-lg font-heading text-moonlight-white">Check your email</h3>
              </div>
              <p className="text-sm font-body text-moonlight-white/70 leading-relaxed">
                If an account exists with that email address, we've sent a password reset link.
                Please check your inbox and spam folder.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 mt-4 text-sm font-body text-emerald-glow/70 hover:text-emerald-glow transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-body text-moonlight-white/70 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-moonlight-white font-body placeholder-white/30 focus:border-emerald-glow/50 focus:ring-1 focus:ring-emerald-glow/30 outline-none transition-colors"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-glow/80 to-solarpunk-canopy/80 text-moonlight-white font-heading font-semibold tracking-wide hover:from-emerald-glow hover:to-solarpunk-canopy transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mail className="w-5 h-5" />}
                {submitting ? 'Sending...' : 'Send Reset Link'}
              </motion.button>

              <p className="text-center text-sm font-body text-moonlight-white/50">
                <Link to="/login" className="text-emerald-glow/70 hover:text-emerald-glow transition-colors">
                  Back to sign in
                </Link>
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </PageTransition>
  );
}
