import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, Compass } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SacredGeometry from '../components/SacredGeometry';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';
import CymaticWaves from '../components/CymaticWaves';
import GalleryShowcase from '../components/GalleryShowcase';

interface PortalData {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  chakra: string;
  chakraLabel: string;
  coreFrequency: string[];
  features: string[];
  color: string;
  colorLight: string;
  position: number; // angle in degrees for radial layout
}

const portals: PortalData[] = [
  {
    id: 1,
    number: 'I',
    title: 'North Portal of Awareness',
    subtitle: 'The Silver Grove',
    chakra: 'Crown Chakra',
    chakraLabel: 'Violet',
    coreFrequency: ['Awareness', 'Discernment', 'Perception', 'Presence'],
    features: [
      'Food forest',
      'Alchemical herb garden',
      'Meditation groves',
      'Ravenstar Moon Observatory',
      'Reflection areas',
      'Sacred geometry beds',
      'Mycelium networks',
      'Solar lighting',
    ],
    color: '#AB47BC',
    colorLight: 'rgba(171, 71, 188, 0.15)',
    position: 270, // North
  },
  {
    id: 2,
    number: 'II',
    title: 'Portal of Ethics',
    subtitle: 'The Hearth of Integrity',
    chakra: 'Solar Plexus Chakra',
    chakraLabel: 'Yellow',
    coreFrequency: ['Integrity', 'Responsibility', 'Service', 'Community', 'Reciprocity'],
    features: [
      'Eco-housing cluster',
      'Community kitchen',
      'Council circle',
      'Shared food systems',
      'Greywater',
      'Solar systems',
      'Toolshed',
      'Barn',
      'Compost systems',
    ],
    color: '#FDD835',
    colorLight: 'rgba(253, 216, 53, 0.15)',
    position: 180, // West-ish, placed between
  },
  {
    id: 3,
    number: 'III',
    title: 'East Portal of Earth',
    subtitle: 'The Manifestation Grounds',
    chakra: 'Root Chakra',
    chakraLabel: 'Red',
    coreFrequency: ['Earth Connection', 'Labour', 'Regeneration', 'Nourishment', 'Stability'],
    features: [
      'No-dig raised beds',
      'Biodynamic beds',
      'Chickens',
      'Aquaponics/hydroponics',
      'Compost',
      'Biochar',
      'Food production',
    ],
    color: '#E53935',
    colorLight: 'rgba(229, 57, 53, 0.15)',
    position: 90, // East
  },
  {
    id: 4,
    number: 'IV',
    title: 'South Portal of Flow',
    subtitle: 'The Pattern Trails',
    chakra: 'Throat Chakra',
    chakraLabel: 'Blue',
    coreFrequency: ['Flow', 'Communication', 'Systems Intelligence', 'Water', 'Adaptability'],
    features: [
      'Swales',
      'Water systems',
      'Lemniscate flow forms',
      'Ponds',
      'Wetlands',
      'Pattern trails',
      'Wildlife corridor',
      'Native forest regeneration',
    ],
    color: '#1E88E5',
    colorLight: 'rgba(30, 136, 229, 0.15)',
    position: 0, // South
  },
  {
    id: 5,
    number: 'V',
    title: 'The 5th Dimensional Gate',
    subtitle: 'Astral Portal \u2014 The Rhythmic Weave',
    chakra: 'Third Eye Chakra',
    chakraLabel: 'Indigo',
    coreFrequency: ['Unity', 'Music', 'Ceremony', 'Synchronicity', 'Collective Coherence'],
    features: [
      'Musement Stage',
      'Dancefloor',
      'Lighting booth',
      'Sound dome',
      'Ceremony circle',
      'Meditation pavilions',
      'Ecstatic dance',
      'Monthly gathering',
    ],
    color: '#5C6BC0',
    colorLight: 'rgba(92, 107, 192, 0.15)',
    position: 30, // between south and west
  },
  {
    id: 6,
    number: 'VI',
    title: 'West Ethereal Muse Portal',
    subtitle: 'The Play-Space',
    chakra: 'Heart Chakra',
    chakraLabel: 'Green',
    coreFrequency: ['Creativity', 'Play', 'Sacred Humour', 'Art', 'Inspiration'],
    features: [
      'Creative gardens',
      'Art studios',
      'Interactive ambient sound garden',
      'Play gardens',
      'Sound sculptures',
      'Native pollinator areas',
    ],
    color: '#43A047',
    colorLight: 'rgba(67, 160, 71, 0.15)',
    position: 150, // West
  },
];

const centralPortal: PortalData = {
  id: 7,
  number: 'VII',
  title: 'Central Heart Portal',
  subtitle: 'The Resonance Circle',
  chakra: 'Soul Star Chakra',
  chakraLabel: 'White/Gold',
  coreFrequency: ['Unity', 'Integration', 'Wholeness', 'Ceremony', 'Community'],
  features: [
    'Oak Tree of Life',
    'Celtic maze/labyrinth',
    'Sacred fire space',
    'Meditation amphitheatre',
    'Ceremony circle',
    'Reflection pool',
    'Phoenix central master sigil',
  ],
  color: '#FFF8DC',
  colorLight: 'rgba(255, 248, 220, 0.15)',
  position: -1, // center
};

const allPortals = [...portals, centralPortal];

/* ───────────────────────────── Radial Map ───────────────────────────── */

function PortalMapNode({ portal, isCenter }: { portal: PortalData; isCenter: boolean }) {
  const size = isCenter ? 'w-24 h-24 sm:w-32 sm:h-32' : 'w-20 h-20 sm:w-24 sm:h-24';
  const fontSize = isCenter ? 'text-[10px] sm:text-xs' : 'text-[9px] sm:text-[10px]';

  return (
    <motion.div
      className={`absolute left-1/2 top-1/2 ${size} rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300`}
      style={{
        transform: 'translate(-50%, -50%)',
        border: `2px solid ${isCenter ? portal.color : portal.color}44`,
        background: `radial-gradient(circle, ${portal.colorLight} 0%, transparent 70%)`,
        boxShadow: `0 0 20px ${portal.color}15, 0 0 40px ${portal.color}08`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: isCenter ? 0 : 0.15 * portal.id }}
      whileHover={{
        scale: 1.15,
        boxShadow: `0 0 30px ${portal.color}30, 0 0 60px ${portal.color}15`,
      }}
    >
      <span
        className="font-display tracking-widest font-semibold leading-none"
        style={{ color: portal.color, fontSize: isCenter ? '1rem' : '0.75rem' }}
      >
        {portal.number}
      </span>
      <span
        className={`${fontSize} text-moonlight-white/60 font-body leading-tight text-center px-1 mt-0.5`}
      >
        {isCenter ? 'Heart' : portal.subtitle.split('\u2014')[0].replace('The ', '').trim()}
      </span>
    </motion.div>
  );
}

function ConnectionLines() {
  const radius = 38; // % from center
  const center = 50;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      {portals.map((p) => {
        const angle = (p.position * Math.PI) / 180;
        const x = center + radius * Math.cos(angle);
        const y = center - radius * Math.sin(angle);
        return (
          <motion.line
            key={`line-${p.id}`}
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            stroke={p.color}
            strokeWidth="0.3"
            strokeOpacity="0.2"
            strokeDasharray="2 2"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 + p.id * 0.1 }}
          />
        );
      })}
    </svg>
  );
}

function RadialMap() {
  const radius = 38; // % from center

  return (
    <div className="relative w-full max-w-lg mx-auto aspect-square">
      {/* Outer ring decoration */}
      <motion.div
        className="absolute inset-[8%] rounded-full border border-moonlight-white/5"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />

      {/* Connection lines SVG */}
      <ConnectionLines />

      {/* Center portal */}
      <PortalMapNode portal={centralPortal} isCenter />

      {/* Outer portals */}
      {portals.map((p) => {
        const angle = (p.position * Math.PI) / 180;
        const x = 50 + radius * Math.cos(angle);
        const y = 50 - radius * Math.sin(angle);

        return (
          <div
            key={p.id}
            className="absolute"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <PortalMapNode portal={p} isCenter={false} />
          </div>
        );
      })}
    </div>
  );
}

/* ───────────────────────── Connection Diagram ───────────────────────── */

function ConnectionDiagram() {
  const cx = 200;
  const cy = 200;
  const r = 140;

  return (
    <motion.div
      className="relative w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <svg viewBox="0 0 400 400" className="w-full h-auto">
        {/* Outer ring */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(240,244,241,0.05)" strokeWidth="1" />

        {/* Connection lines from center to each portal */}
        {portals.map((p) => {
          const angle = (p.position * Math.PI) / 180;
          const x = cx + r * Math.cos(angle);
          const y = cy - r * Math.sin(angle);
          return (
            <g key={`conn-${p.id}`}>
              <line
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke={p.color}
                strokeWidth="1"
                strokeOpacity="0.2"
              />
              {/* Portal dot */}
              <circle cx={x} cy={y} r="8" fill={p.color} fillOpacity="0.3" stroke={p.color} strokeWidth="1" strokeOpacity="0.5" />
              {/* Portal label */}
              <text
                x={x + (Math.cos((p.position * Math.PI) / 180) > 0 ? 14 : -14)}
                y={y + 4}
                textAnchor={Math.cos((p.position * Math.PI) / 180) > 0 ? 'start' : 'end'}
                fill="rgba(240,244,241,0.5)"
                fontSize="8"
                fontFamily="Inter, sans-serif"
              >
                {p.number}
              </text>
            </g>
          );
        })}

        {/* Center dot */}
        <circle cx={cx} cy={cy} r="12" fill="#FFF8DC" fillOpacity="0.2" stroke="#FFF8DC" strokeWidth="1.5" strokeOpacity="0.4" />
        <text x={cx} y={cy + 3} textAnchor="middle" fill="#FFF8DC" fillOpacity="0.6" fontSize="7" fontFamily="Cinzel, serif">
          VII
        </text>
      </svg>
    </motion.div>
  );
}

/* ───────────────────────── Portal Card ───────────────────────── */

function PortalCard({ portal, isExpanded, onToggle, index }: { portal: PortalData; isExpanded: boolean; onToggle: () => void; index: number }) {
  const isCentral = portal.id === 7;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
    >
      <GlassCard hover={false} className="p-6 sm:p-8 cursor-pointer group" gold={isCentral}>
        {/* Animated glow border overlay */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            border: `1px solid ${portal.color}20`,
            boxShadow: isExpanded
              ? `0 0 25px ${portal.color}18, 0 0 50px ${portal.color}08, inset 0 0 25px ${portal.color}05`
              : `0 0 10px ${portal.color}08`,
            transition: 'box-shadow 0.5s ease',
          }}
        />

        <button
          onClick={onToggle}
          className="w-full text-left relative z-10"
        >
          {/* Header row */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              {/* Portal number badge */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-display text-sm tracking-widest font-semibold"
                style={{
                  background: portal.colorLight,
                  color: portal.color,
                }}
              >
                {portal.number}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-display text-lg sm:text-xl tracking-wider text-moonlight-white">
                    {portal.title}
                  </h3>
                </div>
                <p className="font-sacred text-sm mt-0.5" style={{ color: `${portal.color}aa` }}>
                  {portal.subtitle}
                </p>
              </div>
            </div>

            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="shrink-0"
            >
              <ChevronDown className="w-5 h-5" style={{ color: `${portal.color}60` }} />
            </motion.div>
          </div>

          {/* Chakra + Frequency row (always visible) */}
          <div className="mt-4 flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{
                  backgroundColor: portal.color,
                  boxShadow: `0 0 8px ${portal.color}60`,
                }}
              />
              <span className="font-body text-sm text-moonlight-white/50">
                {portal.chakra} — {portal.chakraLabel}
              </span>
            </div>
          </div>

          {/* Core Frequency pills (always visible) */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {portal.coreFrequency.map((freq) => (
              <span
                key={freq}
                className="px-2.5 py-0.5 rounded-full text-xs font-body"
                style={{
                  background: portal.colorLight,
                  color: portal.color,
                  border: `1px solid ${portal.color}20`,
                }}
              >
                {freq}
              </span>
            ))}
          </div>
        </button>

        {/* Expandable content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="mt-6 pt-6" style={{ borderTop: `1px solid ${portal.color}15` }}>
                {/* Features */}
                <h4
                  className="font-display text-sm tracking-widest mb-3"
                  style={{ color: portal.color }}
                >
                  FEATURES
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                  {portal.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-2 text-sm font-body text-moonlight-white/50">
                      <span className="mt-1" style={{ color: `${portal.color}50` }}>-</span>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Portal reflection */}
                <div
                  className="rounded-xl p-4"
                  style={{
                    background: portal.colorLight,
                    border: `1px solid ${portal.color}15`,
                  }}
                >
                  <p className="font-sacred text-sm italic" style={{ color: `${portal.color}cc` }}>
                    {isCentral
                      ? 'All paths converge here. The centre holds the whole.'
                      : `Enter the ${portal.subtitle} — where ${portal.coreFrequency.slice(0, 2).join(' and ')} become lived experience.`
                    }
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </motion.div>
  );
}

/* ───────────────────────── Main Page ───────────────────────── */

export default function Portals() {
  const [expandedPortal, setExpandedPortal] = useState<number | null>(null);

  const togglePortal = (id: number) => {
    setExpandedPortal(expandedPortal === id ? null : id);
  };

  return (
    <PageTransition>
      {/* ── Hero Section ── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-cosmic-deep to-cosmic-black" />
        <div className="absolute inset-0 opacity-[0.07]">
          <CymaticWaves frequency={1.5} />
        </div>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5 }}
        >
          <SacredGeometry size={600} opacity={0.04} />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="mb-6"
          >
            <Compass className="w-10 h-10 mx-auto text-gold-sacred/40" />
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-wider text-gradient-gold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            The 7 Portals
          </motion.h1>

          <motion.p
            className="font-sacred text-moonlight-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            The Green Resonance Garden Master Map 3.0 — Delta
          </motion.p>

          <motion.p
            className="font-display text-sm tracking-[0.3em] text-gold-sacred/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            6 Pillars &bull; 7 Portals &bull; One Living Whole
          </motion.p>
        </div>
      </section>

      {/* ── Portal Map Section ── */}
      <section className="section-padding relative">
        <div className="container-sacred">
          <SectionHeading
            title="Enter The Garden Map"
            subtitle="Each portal is a threshold into a different dimension of the living framework."
          />

          {/* Desktop: radial mandala layout */}
          <div className="hidden md:block">
            <RadialMap />
          </div>

          {/* Mobile: vertical stack with Central Heart first */}
          <div className="md:hidden space-y-3">
            {/* Central Heart first on mobile */}
            <motion.div
              className="flex items-center gap-3 p-4 rounded-xl"
              style={{
                background: centralPortal.colorLight,
                border: `1px solid ${centralPortal.color}25`,
              }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span
                className="w-10 h-10 rounded-full flex items-center justify-center font-display text-sm tracking-widest font-semibold shrink-0"
                style={{ background: `${centralPortal.color}20`, color: centralPortal.color }}
              >
                {centralPortal.number}
              </span>
              <div className="min-w-0">
                <p className="font-display text-sm tracking-wider text-moonlight-white truncate">
                  {centralPortal.title}
                </p>
                <p className="font-body text-xs text-moonlight-white/40">{centralPortal.subtitle}</p>
              </div>
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0 ml-auto"
                style={{ backgroundColor: centralPortal.color, boxShadow: `0 0 6px ${centralPortal.color}50` }}
              />
            </motion.div>

            {portals.map((p, i) => (
              <motion.div
                key={p.id}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{
                  background: p.colorLight,
                  border: `1px solid ${p.color}15`,
                }}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center font-display text-xs tracking-widest font-semibold shrink-0"
                  style={{ background: `${p.color}20`, color: p.color }}
                >
                  {p.number}
                </span>
                <div className="min-w-0">
                  <p className="font-display text-sm tracking-wider text-moonlight-white truncate">
                    {p.title}
                  </p>
                  <p className="font-body text-xs text-moonlight-white/40">{p.subtitle}</p>
                </div>
                <span
                  className="w-2 h-2 rounded-full shrink-0 ml-auto"
                  style={{ backgroundColor: p.color, boxShadow: `0 0 6px ${p.color}50` }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Connection Lines Section ── */}
      <section className="section-padding relative bg-gradient-to-b from-cosmic-black via-cosmic-deep/50 to-cosmic-black">
        <div className="container-sacred">
          <SectionHeading
            title="The Web of Connection"
            subtitle="All six outer portals converge in the Central Heart — the Resonance Circle that holds the whole."
          />

          <ConnectionDiagram />

          <motion.p
            className="text-center font-sacred text-moonlight-white/30 text-sm mt-8 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Each portal resonates at its own frequency, yet all are harmonics of the same chord.
            The garden is not seven places — it is one living instrument.
          </motion.p>
        </div>
      </section>

      {/* ── Individual Portal Cards ── */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-cosmic-deep/30 to-cosmic-black pointer-events-none" />
        <div className="container-sacred relative z-10">
          <SectionHeading
            title="The Seven Thresholds"
            subtitle="Click each portal to reveal its chakra, frequency, and the features that bring it to life."
          />

          <div className="space-y-4">
            {allPortals.map((portal, i) => (
              <PortalCard
                key={portal.id}
                portal={portal}
                isExpanded={expandedPortal === portal.id}
                onToggle={() => togglePortal(portal.id)}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="section-padding relative">
        <div className="container-sacred max-w-2xl">
          <GlassCard gold className="p-8 sm:p-12 text-center">
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SacredGeometry size={80} opacity={0.25} animated={false} />
            </motion.div>

            <h3 className="font-display text-2xl sm:text-3xl tracking-wider text-gradient-gold mb-4">
              Walk The Garden Path
            </h3>

            <p className="font-sacred text-moonlight-white/50 leading-relaxed mb-8 max-w-md mx-auto">
              The portals are open. The garden is alive. Step into the living framework
              and become part of the resonance.
            </p>

            <Link
              to="/join"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gold-sacred/15 border border-gold-sacred/30 hover:bg-gold-sacred/25 transition-all font-display text-sm tracking-widest text-gold-sacred"
            >
              Enter The Garden
              <ArrowRight className="w-4 h-4" />
            </Link>
          </GlassCard>
        </div>
      </section>

      {/* Portal Gallery */}
      <GalleryShowcase
        srcs={[
          '/Gallery/01-best-new-garden-map.png',
          '/Gallery/02-new-green-resonance-garden-map-delta.png',
          '/Gallery/07-keys-to-the-kingdom-keys.png',
          '/Gallery/08-keys-to-the-kingdom-master-map.png',
        ]}
        limit={4}
        title="Portal Maps & Keys"
        subtitle="Garden maps and symbolic keys to the seven thresholds"
      />
    </PageTransition>
  );
}
