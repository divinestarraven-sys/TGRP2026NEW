import { motion } from 'framer-motion';

interface Props {
  size?: number;
  className?: string;
}

export default function PhoenixSigil({ size = 200, className = '' }: Props) {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <defs>
          <radialGradient id="phoenixGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#d4a843" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="phoenixLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#d4a843" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>

        <circle cx="100" cy="100" r="90" fill="url(#phoenixGlow)" />

        <g stroke="url(#phoenixLine)" strokeWidth="0.8" fill="none" opacity="0.6">
          <circle cx="100" cy="100" r="80" />
          <circle cx="100" cy="100" r="60" />
          <circle cx="100" cy="100" r="40" />
          <circle cx="100" cy="100" r="20" />

          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (Math.PI / 3) * i;
            const x1 = 100 + Math.cos(angle) * 20;
            const y1 = 100 + Math.sin(angle) * 20;
            const x2 = 100 + Math.cos(angle) * 80;
            const y2 = 100 + Math.sin(angle) * 80;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}

          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
            const angle = (Math.PI / 6) * i;
            const x = 100 + Math.cos(angle) * 50;
            const y = 100 + Math.sin(angle) * 50;
            return <circle key={i} cx={x} cy={y} r="8" />;
          })}
        </g>

        <motion.g
          stroke="#d4a843"
          strokeWidth="1.2"
          fill="none"
          opacity="0.8"
          animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M100 30 L110 70 L100 55 L90 70 Z" />
          <path d="M100 170 L110 130 L100 145 L90 130 Z" />
          <path d="M30 100 L70 90 L55 100 L70 110 Z" />
          <path d="M170 100 L130 90 L145 100 L130 110 Z" />
        </motion.g>
      </motion.svg>

      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
