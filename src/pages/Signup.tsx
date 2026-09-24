import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';

export default function Signup() {
  const { signUp, user } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get('redirect') || '/members';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (user) {
    navigate(redirect, { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    const { error: err } = await signUp(email.trim(), password);
    setSubmitting(false);

    if (err) {
      if (err.toLowerCase().includes('already registered')) {
        setError('An account with that email already exists. Try signing in instead.');
      } else {
        setError('Could not create account. Please try again.');
      }
    } else {
      navigate(redirect, { replace: true });
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-start justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <SectionHeading title="Create Account" subtitle="Join The Green Resonance Project" />

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200 text-sm font-body">
                {error}
              </div>
            )}

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

            <div>
              <label htmlFor="password" className="block text-sm font-body text-moonlight-white/70 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  required
                  minLength={8}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-white/5 border border-white/10 text-moonlight-white font-body placeholder-white/30 focus:border-emerald-glow/50 focus:ring-1 focus:ring-emerald-glow/30 outline-none transition-colors"
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-moonlight-white/40 hover:text-moonlight-white/70 transition-colors"
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirm" className="block text-sm font-body text-moonlight-white/70 mb-1">
                Confirm Password
              </label>
              <input
                id="confirm"
                type={showPw ? 'text' : 'password'}
                required
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-moonlight-white font-body placeholder-white/30 focus:border-emerald-glow/50 focus:ring-1 focus:ring-emerald-glow/30 outline-none transition-colors"
                placeholder="Repeat your password"
                autoComplete="new-password"
              />
            </div>

            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-glow/80 to-solarpunk-canopy/80 text-moonlight-white font-heading font-semibold tracking-wide hover:from-emerald-glow hover:to-solarpunk-canopy transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserPlus className="w-5 h-5" />}
              {submitting ? 'Creating account...' : 'Create Account'}
            </motion.button>

            <p className="text-center text-sm font-body text-moonlight-white/50">
              Already have an account?{' '}
              <Link
                to={`/login${redirect !== '/members' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`}
                className="text-emerald-glow/70 hover:text-emerald-glow transition-colors"
              >
                Sign in
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </PageTransition>
  );
}
