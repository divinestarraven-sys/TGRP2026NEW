import { Link } from 'react-router-dom';
import { TreePine, ArrowUp, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const footerLinks = [
  {
    title: 'Explore',
    links: [
      { path: '/framework', label: 'The Framework' },
      { path: '/pillars', label: 'The 6 Pillars' },
      { path: '/portals', label: 'The 7 Portals' },
      { path: '/ravenstar', label: 'Ravenstar' },
      { path: '/phoenix', label: 'Phoenix Principle' },
    ],
  },
  {
    title: 'Experience',
    links: [
      { path: '/rhythmic-weave', label: 'Rhythmic Weave' },
      { path: '/garden', label: 'Resonance Garden' },
      { path: '/museschool', label: 'MUSEschool' },
      { path: '/community', label: 'Community' },
      { path: '/gallery', label: 'Media Gallery' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { path: '/resources', label: 'Resources' },
      { path: '/codex', label: 'The Codex' },
      { path: '/seed-membership', label: 'Seed Membership' },
      { path: '/mycelium-membership', label: 'Mycelium Membership' },
      { path: '/join', label: 'Join The Resonance' },
      { path: '/contact', label: 'Contact' },
    ],
  },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative z-10 border-t border-solarpunk-moss/15 bg-gradient-to-b from-cosmic-dark/90 to-cosmic-black backdrop-blur-xl">
      <div className="container-sacred py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <TreePine className="w-6 h-6 text-emerald-glow" />
              <span
                className="font-display text-base tracking-wider"
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #6ee7b7 35%, #d4a843 70%, #f0d78c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                The Green Resonance Project
              </span>
            </Link>
            <p className="text-moonlight-white/40 text-sm font-body leading-relaxed mb-4">
              The Garden Is Not Merely A Place — It Is A Way Of Life.
            </p>
            <p className="text-moonlight-white/25 text-xs font-body leading-relaxed mb-6">
              A regenerative educational and contemplative living system integrating ecological intelligence, systems thinking, ethical living, symbolic literacy, creative expression, and community resilience.
            </p>
            <div className="flex items-center gap-2 text-solarpunk-amber/40">
              <Leaf className="w-4 h-4" />
              <span className="text-xs font-body">Rooted in Nature. Guided by Truth. Aligned by Integrity.</span>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-display text-sm tracking-widest text-solarpunk-amber/70 mb-4 uppercase">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.path + link.label}>
                    <Link
                      to={link.path}
                      className="text-moonlight-white/35 hover:text-solarpunk-biolum text-sm font-body transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-solarpunk-moss/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sacred text-solarpunk-amber/50 text-sm italic text-center sm:text-left">
            "Burn what is false. Protect what is true. Rise in alignment."
          </p>
          <motion.button
            onClick={scrollToTop}
            className="p-2 rounded-full glass-solar hover:glow-biolum transition-all"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-5 h-5 text-solarpunk-biolum" />
          </motion.button>
        </div>

        <div className="mt-8 p-4 rounded-xl bg-solarpunk-canopy/10 border border-solarpunk-moss/10">
          <p className="text-moonlight-white/25 text-xs font-body leading-relaxed text-center">
            The Green Resonance Moral Code & Fail-Safe Protocol: The Green Resonance Framework moral coding must never be corrupted by AI, by human, or by any outside influences, EVER! This Project is encoded with eternal principles of Truth, Integrity, Love, Stewardship and Harmony for the greater good of all life.
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-moonlight-white/20 text-xs font-body">
            &copy; 2026 The Green Resonance Project. All Rights Reserved.
          </p>
          <p className="text-moonlight-white/15 text-[10px] font-body mt-1">
            &copy; Raven Star &amp; Kelly Murphy — The Green Resonance Framework — All Rights Reserved
          </p>
          <p className="text-moonlight-white/10 text-[10px] font-body mt-1 max-w-xl mx-auto leading-relaxed">
            Framework concepts, symbolism, portal systems, philosophical structures, sigils, written material, and associated creative works are protected intellectual property. Unauthorized reproduction or commercial use without permission is prohibited.
          </p>
        </div>
      </div>
    </footer>
  );
}
