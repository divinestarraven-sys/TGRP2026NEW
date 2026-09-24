import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Leaf } from 'lucide-react';

interface NavLink {
  path: string;
  label: string;
  group: string;
}

const navLinks: NavLink[] = [
  { path: '/', label: 'Home', group: 'Start' },
  { path: '/framework', label: 'Framework', group: 'Framework' },
  { path: '/pillars', label: '6 Pillars', group: 'Framework' },
  { path: '/portals', label: '7 Portals', group: 'Framework' },
  { path: '/ravenstar', label: 'Ravenstar', group: 'Mythic' },
  { path: '/phoenix', label: 'Phoenix Principle', group: 'Mythic' },
  { path: '/rhythmic-weave', label: 'Rhythmic Weave', group: 'Mythic' },
  { path: '/garden', label: 'Garden', group: 'Living' },
  { path: '/museschool', label: 'MUSEschool', group: 'Living' },
  { path: '/community', label: 'Community', group: 'Living' },
  { path: '/stewardship-games', label: 'Stewardship Games', group: 'Future' },
  { path: '/industrial-transition', label: 'Industrial Transition', group: 'Future' },
  { path: '/biohabitation', label: 'Biohabitation', group: 'Future' },
  { path: '/codex', label: 'Codex', group: 'Knowledge' },
  { path: '/resources', label: 'Resources', group: 'Knowledge' },
  { path: '/gallery', label: 'Gallery', group: 'Knowledge' },
  { path: '/seed-membership', label: 'Seed', group: 'Membership' },
  { path: '/mycelium-membership', label: 'Mycelium', group: 'Membership' },
  { path: '/join', label: 'Join', group: 'Membership' },
  { path: '/contact', label: 'Contact', group: 'About' },
];

const groupOrder = ['Start', 'Framework', 'Mythic', 'Living', 'Future', 'Knowledge', 'Membership', 'About'];

const groupColors: Record<string, string> = {
  Start: 'rgba(16,185,129,0.7)',
  Framework: 'rgba(16,185,129,0.5)',
  Mythic: 'rgba(171,71,188,0.5)',
  Living: 'rgba(67,160,71,0.5)',
  Future: 'rgba(212,168,67,0.5)',
  Knowledge: 'rgba(30,136,229,0.5)',
  Membership: 'rgba(212,168,67,0.4)',
  About: 'rgba(240,244,241,0.3)',
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [nearTop, setNearTop] = useState(false);
  const location = useLocation();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const isDesktop = () => typeof window !== 'undefined' && window.innerWidth >= 1280;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isDesktop()) return;
    timerRef.current = setTimeout(() => {
      if (!isOpen) setMinimized(true);
    }, 2500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpen) setMinimized(false);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Keyboard: close on Escape
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) setIsOpen(false);
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

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
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Main navigation"
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
          {/* Brand bar */}
          <div className="flex items-center justify-between h-14 sm:h-16 xl:h-16">
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
              </div>
            </Link>

            {/* Desktop mini-links when minimized */}
            {minimized && !nearTop && !isOpen && (
              <div className="hidden xl:flex items-center gap-3 text-xs font-body text-moonlight-white/80">
                <span>Hover or scroll to top for full navigation</span>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden p-2 rounded-lg text-moonlight-white/80 hover:text-emerald-glow transition-colors"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-nav-menu"
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

          {/* Desktop two-row mega-menu grid */}
          {showFull && (
            <div className="hidden xl:block pb-3" role="menubar">
              <div
                className="mx-auto"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(10rem, 1fr))',
                  gridTemplateRows: 'repeat(2, auto)',
                  gap: '0.35rem 0.5rem',
                  width: 'min(96vw, 1500px)',
                  maxWidth: 'calc(100vw - 24px)',
                }}
              >
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      role="menuitem"
                      aria-current={isActive ? 'page' : undefined}
                      className="relative text-center transition-all duration-300 rounded-md"
                      style={{
                        minWidth: 0,
                        whiteSpace: 'normal',
                        lineHeight: 1.15,
                        fontSize: 'clamp(1.08rem, 1.275vw, 1.35rem)',
                        padding: '0.45rem 0.35rem',
                        overflowWrap: 'anywhere',
                        color: isActive ? '#10b981' : 'rgba(240,244,241,0.55)',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.color = 'rgba(240,244,241,0.9)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.color = 'rgba(240,244,241,0.55)';
                      }}
                    >
                      <span
                        className="block w-[3px] h-[3px] rounded-full mx-auto mb-1 opacity-60"
                        aria-hidden="true"
                        style={{ backgroundColor: groupColors[link.group] || 'rgba(16,185,129,0.4)' }}
                      />
                      {link.label}
                      {isActive && (
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
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-menu"
            ref={mobileMenuRef}
            role="menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="xl:hidden backdrop-blur-2xl border-t"
            style={{
              background: 'linear-gradient(180deg, rgba(3,12,8,0.98) 0%, rgba(7,21,16,0.97) 100%)',
              borderColor: 'rgba(212,168,67,0.15)',
              maxHeight: '75vh',
              overflowY: 'auto',
            }}
          >
            <div className="container-sacred py-4 space-y-1">
              {groupOrder.map((groupName) => {
                const groupLinks = navLinks.filter((l) => l.group === groupName);
                if (groupLinks.length === 0) return null;
                return (
                  <div key={groupName} className="mb-2" role="group" aria-label={groupName}>
                    <p className="font-display text-[15px] tracking-[0.3em] uppercase px-4 py-1"
                      style={{ color: groupColors[groupName] || 'rgba(212,168,67,0.4)' }}
                      aria-hidden="true">
                      {groupName}
                    </p>
                    {groupLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        role="menuitem"
                        aria-current={location.pathname === link.path ? 'page' : undefined}
                        className={`block px-4 py-2.5 rounded-lg text-sm font-body tracking-wide transition-all ${
                          location.pathname === link.path
                            ? 'text-emerald-glow bg-emerald-glow/8'
                            : 'text-moonlight-white/80 hover:text-moonlight-white/90 hover:bg-emerald-glow/5'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
