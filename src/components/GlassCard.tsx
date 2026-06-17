import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gold?: boolean;
  solar?: boolean;
  bio?: boolean;
  delay?: number;
}

export default function GlassCard({ children, className = '', hover = true, gold = false, solar = false, bio = false, delay = 0 }: Props) {
  const glassClass = bio ? 'glass-bio' : solar ? 'glass-solar' : gold ? 'glass-gold' : 'glass-solar';

  return (
    <motion.div
      className={`${glassClass} rounded-2xl overflow-hidden relative ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      whileHover={hover ? {
        y: -4,
        transition: { duration: 0.3 },
      } : undefined}
    >
      {/* Subtle inner glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-solarpunk-biolum/5 via-transparent to-solarpunk-amber/5" />
      {children}
    </motion.div>
  );
}
