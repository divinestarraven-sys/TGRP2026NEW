import { motion } from 'framer-motion';
import { BookOpen, Search, ChevronRight, Sprout, ArrowRight, Network, Compass, Archive, Moon, Flame, Music, Footprints, Sparkles, Shield, Eye } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import SacredGeometry from '../components/SacredGeometry';
import CymaticWaves from '../components/CymaticWaves';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';

const codexEntries = [
  {
    title: 'The Origin Pattern',
    category: 'Cosmology',
    desc: 'In the beginning was the pattern — not a word, but a geometry. The flower of life, embedded in the fabric of space, is the template from which all form emerges. This is not metaphor. This is mathematics.',
  },
  {
    title: 'Mycelium as Model',
    category: 'Ecology',
    desc: 'The mycelial network is the Earth\'s nervous system — a decentralized intelligence that has been solving distribution problems for a billion years. Our social architectures would be wiser if they followed its pattern.',
  },
  {
    title: 'The Phoenix Principle',
    category: 'Philosophy',
    desc: 'Destruction is not the opposite of creation — it is its prerequisite. The Phoenix does not rise despite the fire; it rises because of it. Burn what is false. Protect what is true. Rise in alignment.',
  },
  {
    title: 'Cymatics & The Visible Sound',
    category: 'Science',
    desc: 'When sound moves through matter, it creates patterns. Cymatics reveals what the ancients knew: the universe is vibrational. Form follows frequency. Reality is resonance made visible.',
  },
  {
    title: 'The Nordic Thread',
    category: 'Mysticism',
    desc: 'The Norse understood the weave — the Norns spinning fate, Yggdrasil connecting worlds, the runes as vibrational keys. The Green Resonance draws from this deep well of Northern European earth-wisdom.',
  },
  {
    title: 'Solarpunk as Praxis',
    category: 'Design',
    desc: 'Solarpunk is not an aesthetic — it is a design philosophy. It asks: what if our technology worked with nature instead of against it? What if our cities were forests, our energy was sunlight, our economy was a garden?',
  },
  {
    title: 'The Rhythmic Weave Explained',
    category: 'Framework',
    desc: 'The Rhythmic Weave is the sixth pillar and the connective tissue of the entire framework. It is the recognition that all systems — ecological, social, cosmic — are rhythmic, and that harmony is the alignment of these rhythms.',
  },
  {
    title: 'Ethical Living in Practice',
    category: 'Practice',
    desc: 'Ethical living is not about perfection — it is about alignment. It begins with awareness, deepens with practice, and matures into embodiment. The ethical life is not a constraint; it is a liberation from contradiction.',
  },
  {
    title: 'Systems Intelligence: A Primer',
    category: 'Systems',
    desc: 'Systems intelligence is the ability to see wholes, perceive patterns, and design interventions that account for complexity. It is the antidote to reductionism and the foundation of regenerative design.',
  },
  {
    title: 'The Garden as Way of Life',
    category: 'Philosophy',
    desc: 'The garden is not merely a place — it is a way of life. It is the practice of cultivating conditions where life thrives. This applies to soil, to community, to consciousness, to civilization itself.',
  },
];

const categories = ['All', 'Cosmology', 'Ecology', 'Philosophy', 'Science', 'Mysticism', 'Design', 'Framework', 'Practice', 'Systems', '6 Pillars', '7 Portals', 'Ravenstar', 'Phoenix', 'Rhythmic Weave', 'Permaculture', 'Sacred Geometry', 'Alchemical', 'Community'];

const mythicSubsystems = [
  {
    title: 'The Mythic Compass',
    desc: 'Archetypal orientation and symbolic pattern recognition.',
    icon: Compass,
  },
  {
    title: 'The Signal Archives',
    desc: 'Mythic memory, dreams, conversations, poems, and symbolic transmission.',
    icon: Archive,
  },
  {
    title: 'The Night Garden',
    desc: 'Shadow work, emotional composting, humility, grief literacy, and sacred descent.',
    icon: Moon,
  },
  {
    title: 'The Phoenix Principle',
    desc: 'Transformation, fire, sacrifice, regeneration, and embodied change.',
    icon: Flame,
  },
  {
    title: 'The Ember Choir',
    desc: 'Voice, storytelling, poetry, music, teaching, and resonant transmission.',
    icon: Music,
  },
  {
    title: 'The Featherpath',
    desc: 'Pilgrimage, wandering, landscape myth, and living initiation.',
    icon: Footprints,
  },
  {
    title: 'The Rhythmic Weave',
    desc: 'Creativity, synchronicity, MoiraMUSEment, sacred play, and harmonic living.',
    icon: Sparkles,
  },
];

const symbolicKeys = [
  'Mystic Path',
  'Seven Hermetic Principles',
  'Magician / Manifestation',
  'Sacred Relationship Mirror',
  'Dingir / Star Above',
  'Hand of Correspondence',
  'Ancestors / Seers / Healers',
  'Macrocosm / Microcosm',
  'Student\u2013Teacher Yin Yang Dragons',
  'Raven\u2013Phoenix Union',
  'Hermetic / Zodiac / Elemental Wheel',
  'Solar Eclipse Pyramid',
  'Dark Winged Wanderer',
  'Iron Rose / Hematite',
  'Vajra / Null State',
  'Prime / Multiplication Pattern Map',
  'Solar Pyramid Alignment',
  'Raven Stage / Sacred Performance Architecture',
  'Vegv\u00edsir / Mythic Compass',
  'Ogham Grove / Tree Alphabet',
];

const ethicalProtocol = [
  'Myths are symbolic mirrors, not unquestionable truth claims.',
  'Archetypes should refine behaviour, not inflate ego.',
  'Shadow work requires humility, honesty, and grounded action.',
  'Symbolic material must not replace practical responsibility, medical care, legal advice, or real-world accountability.',
  'Every symbol must return to service, compassion, nature, truth, and integrity.',
];

const dailyPractice = [
  { time: 'Morning', prompt: 'What archetype is active in me today?' },
  { time: 'Midday', prompt: 'Am I acting from wisdom, wound, ego, or service?' },
  { time: 'Evening', prompt: 'What pattern repeated today, and what did it teach me?' },
  { time: 'Weekly', prompt: 'Write one Signal Archives entry.' },
  { time: 'Monthly / New Moon', prompt: 'Do one Night Garden reflection and one Phoenix release practice.' },
];

export default function Codex() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = codexEntries.filter((entry) => {
    const matchesSearch = entry.title.toLowerCase().includes(search.toLowerCase()) ||
      entry.desc.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || entry.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PageTransition>
      {/* Seed Member Banner */}
      <div className="relative z-20 bg-emerald-glow/5 border-b border-emerald-glow/10">
        <div className="container-sacred py-3 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <div className="flex items-center gap-2">
            <Sprout className="w-4 h-4 text-emerald-glow" />
            <span className="font-body text-moonlight-white/50 text-sm">
              Seed Members receive guided access to the Living Codex as it grows.
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/seed-membership"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-glow/15 border border-emerald-glow/25 hover:bg-emerald-glow/25 transition-all font-display text-xs tracking-widest text-emerald-glow whitespace-nowrap"
            >
              Become a Seed Member
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              to="/mycelium-membership"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full font-display text-xs tracking-widest text-cosmic-black whitespace-nowrap transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #d4a843, #10b981)' }}
            >
              <Network className="w-3 h-3" />
              Mycelium Membership
            </Link>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-emerald-deep/15 to-cosmic-black" />
        <div className="absolute inset-0 opacity-20">
          <CymaticWaves frequency={1.5} />
        </div>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <SacredGeometry size={500} opacity={0.06} />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <BookOpen className="w-6 h-6 text-gold-sacred" />
            <span className="font-sacred text-gold-sacred/80 text-sm tracking-[0.3em]">THE CODEX</span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-wider text-gradient-gold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            The Living Archive
          </motion.h1>

          <motion.p
            className="font-sacred text-moonlight-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            A compendium of wisdom, science, and practice for the regenerative path.
          </motion.p>
        </div>
      </section>

      {/* Ravenstar Mythic Intelligence Codex */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-amber-950/8 to-cosmic-black" />
        <div className="container-sacred relative z-10">
          <SectionHeading
            title="Ravenstar Mythic Intelligence Codex"
            subtitle="The symbolic navigation layer of The Green Resonance Project"
          />

          <div className="max-w-3xl mx-auto mb-16">
            <GlassCard gold className="p-8 sm:p-10 text-center">
              <Eye className="w-8 h-8 text-amber-400 mx-auto mb-4" />
              <p className="font-display text-xl sm:text-2xl tracking-wider bg-gradient-to-r from-amber-300 to-emerald-300 bg-clip-text text-transparent mb-6">
                "Myth is a mirror, not a prison."
              </p>
              <p className="font-body text-moonlight-white/50 leading-relaxed text-sm sm:text-base">
                The Ravenstar Mythic Intelligence Codex is the symbolic navigation layer of The Green Resonance Project. It gathers mythological reflection, archetypal wisdom, dream symbolism, oracle dialogue, shadow work, sacred storytelling, poetic transmission, and personal transformation into one grounded reflective system. It does not present myth as literal doctrine. It uses myth as a mirror for pattern recognition, ethical imagination, emotional composting, and grounded action.
              </p>
            </GlassCard>
          </div>

          {/* 7 Mythic Intelligence Subsystems */}
          <div className="mb-16">
            <motion.h3
              className="font-display text-xl sm:text-2xl tracking-wider text-center text-gradient-emerald mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              The 7 Mythic Intelligence Subsystems
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {mythicSubsystems.map((sub, i) => (
                <GlassCard key={sub.title} delay={i * 0.06} className="p-5 group">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center shrink-0 group-hover:bg-amber-400/15 transition-colors">
                      <sub.icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-moonlight-white/20 font-display text-xs tracking-widest">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h4 className="font-display text-sm tracking-wider text-moonlight-white">
                          {sub.title}
                        </h4>
                      </div>
                      <p className="font-body text-moonlight-white/40 text-xs leading-relaxed">
                        {sub.desc}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Ethical Safety Protocol */}
          <div className="mb-16 max-w-3xl mx-auto">
            <motion.h3
              className="font-display text-xl sm:text-2xl tracking-wider text-center text-gradient-emerald mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ethical Safety Protocol for Mythic Work
            </motion.h3>
            <GlassCard className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <Shield className="w-6 h-6 text-emerald-glow" />
                <span className="font-display text-sm tracking-widest text-emerald-glow/80">SACRED BOUNDARIES</span>
              </div>
              <ul className="space-y-3">
                {ethicalProtocol.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-glow/60 mt-2 shrink-0" />
                    <p className="font-body text-moonlight-white/50 text-sm leading-relaxed">{item}</p>
                  </motion.li>
                ))}
              </ul>
            </GlassCard>
          </div>

          {/* Daily Mythic Intelligence Practice */}
          <div className="mb-16 max-w-3xl mx-auto">
            <motion.h3
              className="font-display text-xl sm:text-2xl tracking-wider text-center text-gradient-gold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Daily Mythic Intelligence Practice
            </motion.h3>
            <div className="space-y-3">
              {dailyPractice.map((item, i) => (
                <GlassCard key={i} delay={i * 0.06} className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="font-display text-xs tracking-widest text-amber-400/80 sm:w-36 shrink-0 uppercase">
                      {item.time}
                    </span>
                    <p className="font-sacred text-moonlight-white/55 text-sm italic leading-relaxed">
                      "{item.prompt}"
                    </p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Symbolic Keys */}
          <div className="max-w-4xl mx-auto">
            <motion.h3
              className="font-display text-xl sm:text-2xl tracking-wider text-center text-gradient-gold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              The 20 Symbolic Keys
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {symbolicKeys.map((key, i) => (
                <motion.div
                  key={key}
                  className="flex items-center gap-3 p-3 rounded-xl border border-amber-400/10 bg-amber-400/[0.03]"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                >
                  <span className="font-display text-[10px] text-amber-400/50 tracking-widest w-5 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-body text-moonlight-white/50 text-xs leading-snug">{key}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="section-padding">
        <div className="container-sacred">
          <SectionHeading
            title="Codex Entries"
            subtitle="Browse the living archive of wisdom, science, and practice"
          />

          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-moonlight-white/20" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search the Codex..."
                className="w-full pl-12 pr-4 py-3 rounded-xl glass border border-emerald-glow/10 text-sm font-body text-moonlight-white placeholder:text-moonlight-white/20 focus:outline-none focus:border-emerald-glow/30 transition-colors"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-display tracking-wider transition-all ${
                    activeCategory === cat
                      ? 'bg-emerald-glow/20 text-emerald-glow border border-emerald-glow/30'
                      : 'glass text-moonlight-white/40 hover:text-moonlight-white/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Entries */}
          <div className="max-w-3xl mx-auto space-y-4">
            {filtered.map((entry, i) => (
              <GlassCard key={entry.title} delay={i * 0.05} className="p-5 sm:p-6 group cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-full bg-gold-sacred/10 text-gold-sacred text-xs font-display tracking-wider">
                        {entry.category}
                      </span>
                    </div>
                    <h3 className="font-display text-lg tracking-wider text-moonlight-white group-hover:text-emerald-glow transition-colors mb-2">
                      {entry.title}
                    </h3>
                    <p className="font-body text-moonlight-white/40 text-sm leading-relaxed">{entry.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-moonlight-white/10 group-hover:text-emerald-glow/40 transition-colors shrink-0 mt-2" />
                </div>
              </GlassCard>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-12">
                <p className="font-sacred text-moonlight-white/30">No entries found. The Codex grows with time.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
