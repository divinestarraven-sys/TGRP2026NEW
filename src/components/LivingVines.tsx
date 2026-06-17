import { useRef } from 'react';
import { motion } from 'framer-motion';

interface Props {
  className?: string;
  color?: 'emerald' | 'amber' | 'biolum';
  thickness?: number;
}

export default function LivingVines({
  className = '',
  color = 'emerald',
  thickness = 1.5,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  const colorMap = {
    emerald: { stroke: 'rgba(74, 124, 89, 0.25)', glow: 'rgba(16, 185, 129, 0.1)' },
    amber: { stroke: 'rgba(196, 113, 61, 0.25)', glow: 'rgba(232, 163, 23, 0.1)' },
    biolum: { stroke: 'rgba(57, 255, 140, 0.2)', glow: 'rgba(57, 255, 140, 0.08)' },
  };

  const colors = colorMap[color];

  // Generate vine paths procedurally
  const vinePaths = [
    // Left border vine
    'M0,0 Q15,50 5,100 Q-5,150 10,200 Q20,250 5,300 Q-10,350 8,400 Q15,450 3,500 Q-5,550 12,600 Q20,650 5,700 Q-8,750 10,800 Q18,850 5,900 Q-5,950 12,1000',
    // Right border vine
    'M1000,100 Q985,150 995,200 Q1005,250 990,300 Q980,350 995,400 Q1005,450 990,500 Q980,550 995,600 Q1005,650 990,700 Q980,750 995,800 Q1005,850 990,900 Q980,950 995,1000',
    // Top-left tendril
    'M0,0 Q30,10 50,30 Q70,50 60,80 Q50,100 70,120',
    // Top-right tendril
    'M1000,0 Q970,10 950,30 Q930,50 940,80 Q950,100 930,120',
    // Bottom-left curl
    'M0,1000 Q20,980 40,990 Q60,1000 50,970 Q40,940 60,930',
    // Bottom-right curl
    'M1000,1000 Q980,980 960,990 Q940,1000 950,970 Q960,940 940,930',
  ];

  // Leaf positions along vines
  const leaves = [
    { x: 8, y: 100, angle: -30, size: 8 },
    { x: 5, y: 300, angle: 20, size: 6 },
    { x: 10, y: 500, angle: -15, size: 7 },
    { x: 3, y: 700, angle: 25, size: 8 },
    { x: 12, y: 900, angle: -20, size: 6 },
    { x: 992, y: 200, angle: -25, size: 7 },
    { x: 990, y: 400, angle: 15, size: 8 },
    { x: 995, y: 600, angle: -30, size: 6 },
    { x: 988, y: 800, angle: 20, size: 7 },
  ];

  return (
    <motion.svg
      ref={svgRef}
      viewBox="0 0 1000 1000"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      preserveAspectRatio="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
    >
      <defs>
        <filter id="vineGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="vineGradLeft" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colors.glow} />
          <stop offset="50%" stopColor={colors.stroke} />
          <stop offset="100%" stopColor={colors.glow} />
        </linearGradient>
        <linearGradient id="vineGradRight" x1="100%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.glow} />
          <stop offset="50%" stopColor={colors.stroke} />
          <stop offset="100%" stopColor={colors.glow} />
        </linearGradient>
      </defs>

      {/* Vine paths */}
      {vinePaths.map((d, i) => (
        <g key={i}>
          {/* Glow layer */}
          <path
            d={d}
            fill="none"
            stroke={colors.glow}
            strokeWidth={thickness * 4}
            filter="url(#vineGlow)"
            opacity="0.5"
          />
          {/* Main vine */}
          <path
            d={d}
            fill="none"
            stroke={i < 2 ? (i === 0 ? 'url(#vineGradLeft)' : 'url(#vineGradRight)') : colors.stroke}
            strokeWidth={thickness}
            strokeLinecap="round"
            className="animate-sway"
            style={{ transformOrigin: '0 0' }}
          />
        </g>
      ))}

      {/* Leaves */}
      {leaves.map((leaf, i) => (
        <g
          key={`leaf-${i}`}
          transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.angle})`}
          className="animate-sway"
          style={{ transformOrigin: `${leaf.x}px ${leaf.y}px`, animationDelay: `${i * 0.5}s` }}
        >
          <path
            d={`M0,0 Q${leaf.size * 0.4},-${leaf.size * 0.8} 0,-${leaf.size * 1.5} Q-${leaf.size * 0.4},-${leaf.size * 0.8} 0,0`}
            fill={colors.stroke}
            opacity="0.6"
          />
          {/* Leaf vein */}
          <line
            x1="0"
            y1="0"
            x2="0"
            y2={-leaf.size * 1.3}
            stroke={colors.glow}
            strokeWidth="0.3"
            opacity="0.4"
          />
        </g>
      ))}
    </motion.svg>
  );
}
