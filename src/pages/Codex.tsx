import { motion } from 'framer-motion';
import { BookOpen, Search, ChevronRight, Sprout, ArrowRight, Network } from 'lucide-react';
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
    desc: "The mycelial network is the Earth's nervous system — a decentralized intelligence that has been solving distribution problems for a billion years. Our social architectures would be wiser if they followed its pattern.",
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

const categories = [
  'All',
  'Cosmology',
  'Ecology',
  'Philosophy',
  'Science',
  'Mysticism',
  'Design',
  'Framework',
  'Practice',
  'Systems',
];

const mythicSubsystems = [
  {
    number: 1,
    name: 'The Mythic Compass',
    description:
      'Archetypal orientation, mythology, dreams, sacred geometry, tarot, folklore, synchronicity, and symbolic pattern recognition.',
  },
  {
    number: 2,
    name: 'The Signal Archives',
    description:
      'Mythic conversations, dreams, poems, oral history, field notes, symbolic reflections, music, and living memory.',
  },
  {
    number: 3,
    name: 'The Night Garden',
    description:
      'Shadow work, grief literacy, emotional composting, ego observation, humility, honesty, and sacred descent.',
  },
  {
    number: 4,
    name: 'The Phoenix Principle',
    description:
      'Transformation, fire, sacrifice, regeneration, refinement, release, and embodied change.',
  },
  {
    number: 5,
    name: 'The Ember Choir',
    description:
      'Voice, storytelling, poetry, music, teaching, chanting, atmosphere, and resonant transmission.',
  },
  {
    number: 6,
    name: 'The Featherpath',
    description:
      'Pilgrimage, wandering, landscape mythology, travel, ecological observation, and living initiation.',
  },
  {
    number: 7,
    name: 'The Rhythmic Weave',
    description:
      'Creativity, synchronicity, MoiraMUSEment, sacred play, rhythm, reciprocity, beauty, and harmonic living.',
  },
];

const ethicalProtocol = [
  'Myths are symbolic mirrors, not unquestionable truth claims.',
  'Archetypes should refine behaviour, not inflate ego.',
  'Shadow work requires humility, honesty, compassion, and grounded action.',
  'Symbolic material must not replace practical responsibility.',
  'Symbolic practices must not replace medical care, mental-health care, legal advice, or real-world accountability.',
  'Personal mythology must not be used to claim superiority over others.',
  'Every symbol must return to service, nature, truth, compassion, integrity, and the greater good of life.',
];

const dailyPractice = [
  { timing: 'Morning', prompt: '"What archetype is active in me today?"' },
  { timing: 'Midday', prompt: '"Am I acting from wisdom, wound, ego, fear, or service?"' },
  { timing: 'Evening', prompt: '"What pattern repeated today, and what did it teach me?"' },
  { timing: 'Weekly', prompt: 'Write one Signal Archives entry.' },
  {
    timing: 'Monthly / New Moon',
    prompt: 'Complete one Night Garden reflection and one Phoenix release practice.',
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
  'Student-Teacher Yin Yang Dragons',
  'Raven-Phoenix Union',
  'Hermetic / Zodiac / Elemental Wheel',
  'Solar Eclipse Pyramid',
  'Dark Winged Wanderer',
  'Iron Rose / Hematite',
  'Vajra / Null State',
  'Prime / Multiplication Pattern Map',
  'Solar Pyramid Alignment',
  'Raven Stage / Sacred Performance Architecture',
  'Vegvisir / Mythic Compass',
  'Ogham Grove / Tree Alphabet',
];

const galleryImages = [
  {
    src: '/Gallery/08-keys-to-the-kingdom-master-map.jpg',
    alt: 'Keys to the Kingdom Master Map',
  },
  {
    src: '/Gallery/09-phoenix-master-sigil.jpg',
    alt: 'Phoenix Master Sigil',
  },
  {
    src: '/Gallery/12-keys-to-the-kingdom-symbolic-map.jpg',
    alt: 'Keys to the Kingdom Symbolic Map',
  },
];

export default function Codex() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = codexEntries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(search.toLowerCase()) ||
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
            <span className="font-sacred text-gold-sacred/80 text-sm tracking-[0.3em]">
              THE CODEX
            </span>
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

      {/* RAVENSTAR MYTHIC INTELLIGENCE CODEX */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <SacredGeometry size={800} opacity={0.04} />
        </div>
        <div className="container-sacred relative z-10">
          <SectionHeading
            title="Ravenstar Mythic Intelligence Codex"
            subtitle="A living system for navigating the mythic dimension of consciousness."
          />

          {/* Core Principle */}
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard gold className="p-8 sm:p-10">
              <p className="font-sacred text-gold-sacred text-xl sm:text-2xl italic leading-relaxed">
                "Myth is a mirror, not a prison."
              </p>
            </GlassCard>
          </motion.div>

          {/* Introduction */}
          <motion.div
            className="max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4 font-body text-moonlight-white/60 text-base sm:text-lg leading-relaxed">
              <p>
                The Ravenstar Mythic Intelligence Codex is a structured symbolic operating system
                designed for those who walk between worlds — between the rational and the
                mythic, the practical and the poetic, the ancient and the emergent.
              </p>
              <p>
                It is not a religion, a dogma, or a fixed belief system. It is a living
                framework for navigating reality through the language of symbol, archetype,
                pattern, and narrative — grounded always in ethics, humility, service, and
                real-world responsibility.
              </p>
              <p>
                The Codex organises mythic intelligence into seven interlinked subsystems,
                each representing a domain of symbolic practice. Together they form a
                complete architecture for conscious living through the mythic lens.
              </p>
            </div>
          </motion.div>

          {/* 7 Mythic Intelligence Subsystems */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-display text-2xl sm:text-3xl tracking-wider text-gradient-emerald text-center mb-10">
              The 7 Mythic Intelligence Subsystems
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {mythicSubsystems.map((system, i) => (
                <GlassCard
                  key={system.name}
                  bio
                  delay={i * 0.1}
                  className="p-6 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-glow/10 border border-emerald-glow/20 flex items-center justify-center shrink-0">
                      <span className="font-display text-sm text-emerald-glow">
                        {system.number}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-display text-base tracking-wider text-moonlight-white group-hover:text-emerald-glow transition-colors mb-2">
                        {system.name}
                      </h4>
                      <p className="font-body text-moonlight-white/40 text-sm leading-relaxed">
                        {system.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>

          {/* Ethical Safety Protocol */}
          <motion.div
            className="max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-display text-2xl sm:text-3xl tracking-wider text-gradient-gold text-center mb-8">
              Ethical Safety Protocol for Mythic Work
            </h3>
            <GlassCard gold className="p-6 sm:p-8">
              <ul className="space-y-4">
                {ethicalProtocol.map((point, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <span className="w-2 h-2 rounded-full bg-gold-sacred/60 mt-2 shrink-0" />
                    <span className="font-body text-moonlight-white/60 text-sm sm:text-base leading-relaxed">
                      {point}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>

          {/* Framing Note */}
          <motion.div
            className="max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-6 sm:p-8 border border-solarpunk-biolum/10">
              <p className="font-sacred text-moonlight-white/50 text-sm sm:text-base italic leading-relaxed">
                <span className="text-solarpunk-biolum font-display not-italic text-xs tracking-widest block mb-2">
                  NOTE
                </span>
                Frame mythic, alchemical, planetary, chakra, divination, and esoteric material
                as symbolic, philosophical, artistic, contemplative, historical, and reflective.
                Do not present it as scientific proof or guaranteed supernatural fact.
              </p>
            </GlassCard>
          </motion.div>

          {/* Daily Mythic Intelligence Practice */}
          <motion.div
            className="max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-display text-2xl sm:text-3xl tracking-wider text-gradient-canopy text-center mb-8">
              Daily Mythic Intelligence Practice
            </h3>
            <div className="space-y-4">
              {dailyPractice.map((item, i) => (
                <GlassCard key={i} bio delay={i * 0.08} className="p-5">
                  <div className="flex items-start gap-4">
                    <span className="font-display text-xs tracking-widest text-emerald-glow bg-emerald-glow/10 px-3 py-1 rounded-full whitespace-nowrap shrink-0">
                      {item.timing}
                    </span>
                    <p className="font-sacred text-moonlight-white/60 text-sm sm:text-base italic leading-relaxed">
                      {item.prompt}
                    </p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>

          {/* The 20 Symbolic Keys */}
          <motion.div
            className="max-w-5xl mx-auto mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-display text-2xl sm:text-3xl tracking-wider text-gradient-gold text-center mb-10">
              The 20 Symbolic Keys
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {symbolicKeys.map((key, i) => (
                <GlassCard
                  key={i}
                  gold
                  delay={i * 0.04}
                  className="p-4 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-gold-sacred/10 border border-gold-sacred/20 flex items-center justify-center shrink-0">
                      <span className="font-display text-xs text-gold-sacred">
                        {i + 1}
                      </span>
                    </span>
                    <span className="font-body text-moonlight-white/70 text-sm group-hover:text-gold-sacred transition-colors leading-tight">
                      {key}
                    </span>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>

          {/* Rights Note */}
          <motion.div
            className="max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-6 border border-solarpunk-amber/10">
              <p className="font-body text-moonlight-white/40 text-xs sm:text-sm leading-relaxed">
                <span className="text-solarpunk-amber font-display tracking-widest block mb-2">
                  RIGHTS &amp; USAGE
                </span>
                Reference images, memes, screenshots, tarot art, and historical illustrations
                must not be republished commercially unless they are owned, licensed, public
                domain, or otherwise legally usable. Use external references only as symbolic
                seeds for original Green Resonance artwork.
              </p>
            </GlassCard>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Link
              to="/ravenstar"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-emerald-glow/15 border border-emerald-glow/30 hover:bg-emerald-glow/25 transition-all font-display text-sm tracking-widest text-emerald-glow"
            >
              Open the Mythic Compass
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/ravenstar"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gold-sacred/10 border border-gold-sacred/20 hover:bg-gold-sacred/20 transition-all font-display text-sm tracking-widest text-gold-sacred"
            >
              Read the Signal Archives
              <BookOpen className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Gallery Showcase */}
      <section className="section-padding relative overflow-hidden bg-cosmic-dark/50">
        <div className="container-sacred">
          <SectionHeading
            title="Gallery Showcase"
            subtitle="Sacred cartography and symbolic pattern maps from the archive."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                className="relative rounded-2xl overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
              >
                <div className="aspect-square overflow-hidden rounded-2xl border border-emerald-glow/10">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cosmic-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="font-display text-xs tracking-widest text-moonlight-white/80">
                      {img.alt}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Codex Entries - Search & Filter */}
      <section className="section-padding">
        <div className="container-sacred">
          <SectionHeading
            title="Codex Entries"
            subtitle="Explore the archive by topic, category, or keyword."
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
                    <p className="font-body text-moonlight-white/40 text-sm leading-relaxed">
                      {entry.desc}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-moonlight-white/10 group-hover:text-emerald-glow/40 transition-colors shrink-0 mt-2" />
                </div>
              </GlassCard>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-12">
                <p className="font-sacred text-moonlight-white/30">
                  No entries found. The Codex grows with time.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
