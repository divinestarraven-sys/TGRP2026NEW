import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Leaf } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/framework', label: 'Framework' },
  { path: '/pillars', label: '6 Pillars' },
  { path: '/portals', label: '7 Portals' },
  { path: '/ravenstar', label: 'Ravenstar' },
  { path: '/phoenix', label: 'The Phoenix Principle' },
  { path: '/rhythmic-weave', label: 'Weave' },
  { path: '/garden', label: 'Garden' },
  { path: '/museschool', label: 'MUSEschool' },
  { path: '/community', label: 'Community' },
  { path: '/resources', label: 'Resources' },
  { path: '/codex', label: 'Codex' },
  { path: '/seed-membership', label: 'Seed Membership' },
  { path: '/mycelium-membership', label: 'Mycelium' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/join', label: 'Join' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [nearTop, setNearTop] = useState(false);
  const location = useLocation();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isDesktop = () => typeof window !== 'undefined' && window.innerWidth >= 1280;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-minimize on desktop after 2.5s
  useEffect(() => {
    if (!isDesktop()) return;
    timerRef.current = setTimeout(() => {
      if (!isOpen) setMinimized(true);
    }, 2500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If mobile menu opens, never minimized
  useEffect(() => {
    if (isOpen) setMinimized(false);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleMouseEnter = () => {
    if (!isDesktop()) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setNearTop(true);
    setMinimized(false);
  };

  const handleMouseLeave = () => {
    if (!isDesktop()) return;
    setNearTop(false);
    if (!isOpen) {
      timerRef.current = setTimeout(() => setMinimized(true), 800);
    }
  };

  const showFull = !minimized || nearTop || isOpen;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Persistent glowing top rail */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-20 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.7) 25%, rgba(212,168,67,0.8) 50%, rgba(16,185,129,0.7) 75%, transparent 100%)',
          boxShadow: '0 0 8px rgba(16,185,129,0.5), 0 0 20px rgba(212,168,67,0.3)',
        }}
      />

      {/* Main nav body — collapses to thin rail on desktop */}
      <motion.div
        animate={{ height: minimized && !nearTop && !isOpen ? 10 : 'auto' }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="overflow-hidden"
      >
        {/* Glass background */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            scrolled || showFull
              ? 'backdrop-blur-2xl'
              : ''
          }`}
          style={{
            background: scrolled || showFull
              ? 'linear-gradient(180deg, rgba(3,12,8,0.97) 0%, rgba(7,21,16,0.93) 60%, rgba(3,12,8,0.88) 100%)'
              : 'linear-gradient(180deg, rgba(3,12,8,0.5) 0%, transparent 100%)',
          }}
        />

        {/* Gold bottom border rail */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(212,168,67,0.35) 30%, rgba(16,185,129,0.45) 50%, rgba(212,168,67,0.35) 70%, transparent 100%)',
          }}
        />

        <div className="relative container-sacred">
          <div className="flex items-center justify-between h-16 sm:h-20 xl:h-[5.5rem]">

            {/* Brand / Logo */}
            <Link to="/" className="flex items-center gap-3 group shrink-0 min-w-0">
              <motion.div
                className="relative flex-shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full"
                whileHover={{ rotate: 20, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                style={{
                  background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, rgba(212,168,67,0.1) 70%, transparent 100%)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  boxShadow: '0 0 14px rgba(16,185,129,0.25), 0 0 32px rgba(16,185,129,0.07)',
                }}
              >
                <Leaf className="w-5 h-5 text-emerald-glow" />
                {/* Subtle second leaf for depth */}
                <Leaf
                  className="absolute w-3 h-3 opacity-30"
                  style={{ top: 4, right: 3, color: '#d4a843', transform: 'rotate(45deg)' }}
                />
              </motion.div>

              <div className="flex flex-col leading-none">
                <span
                  className="font-display tracking-wider text-sm sm:text-base xl:text-lg leading-tight whitespace-nowrap"
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #6ee7b7 30%, #d4a843 60%, #f0d78c 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 10px rgba(16,185,129,0.4))',
                  }}
                >
                  The Green Resonance Project
                </span>
                <span className="hidden xl:block font-sacred text-[9px] tracking-[0.4em] mt-0.5"
                  style={{ color: 'rgba(212,168,67,0.45)' }}>
                  6 Pillars&nbsp;&bull;&nbsp;7 Portals&nbsp;&bull;&nbsp;One Living Whole
                </span>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden xl:flex items-center gap-0.5 ml-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-2 py-2 text-xs font-body tracking-wide transition-all duration-300 whitespace-nowrap ${
                    location.pathname === link.path
                      ? 'text-emerald-glow'
                      : 'text-moonlight-white/45 hover:text-moonlight-white/90'
                  }`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1 right-1 h-0.5 rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #10b981, #d4a843, #10b981)',
                        boxShadow: '0 0 6px rgba(16,185,129,0.5)',
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden p-2 rounded-lg text-moonlight-white/70 hover:text-emerald-glow transition-colors"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="xl:hidden backdrop-blur-2xl border-t"
            style={{
              background: 'linear-gradient(180deg, rgba(3,12,8,0.98) 0%, rgba(7,21,16,0.97) 100%)',
              borderColor: 'rgba(212,168,67,0.15)',
            }}
          >
            <div className="container-sacred py-4 space-y-1 max-h-[75vh] overflow-y-auto">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.025 }}
                >
                  <Link
                    to={link.path}
                    className={`block px-4 py-2.5 rounded-lg text-sm font-body tracking-wide transition-all ${
                      location.pathname === link.path
                        ? 'text-emerald-glow bg-emerald-glow/8'
                        : 'text-moonlight-white/50 hover:text-moonlight-white/90 hover:bg-emerald-glow/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
