import { motion } from 'framer-motion';
import { BookOpen, Video, Podcast, FileText, ExternalLink, ArrowRight, Link as LinkIcon, Sprout, Network } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import SacredGeometry from '../components/SacredGeometry';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';
import GalleryShowcase from '../components/GalleryShowcase';

const resourceColorMap: Record<string, { bg: string; text: string }> = {
  'emerald-glow': { bg: 'bg-emerald-glow/10', text: 'text-emerald-glow' },
  'cyan-glow': { bg: 'bg-cyan-glow/10', text: 'text-cyan-glow' },
  'gold-sacred': { bg: 'bg-gold-sacred/10', text: 'text-gold-sacred' },
};

const categories = [
  {
    title: 'Sacred Texts & Writings',
    icon: BookOpen,
    color: 'emerald-glow',
    items: [
      { title: 'The Original Pattern: Sacred Geometry in Nature', type: 'Essay' },
      { title: 'Mycelium and the Intelligence of Networks', type: 'Research', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6976561/' },
      { title: 'The Six Pillars: A Complete Guide', type: 'Guide' },
      { title: 'Nordic Mysticism and the Green Resonance', type: 'Essay' },
      { title: 'Solarpunk: Architecture of the Possible', type: 'Manifesto' },
    ],
  },
  {
    title: 'Visual & Media',
    icon: Video,
    color: 'cyan-glow',
    items: [
      { title: 'Cymatic Patterns: Sound Made Visible', type: 'Documentary' },
      { title: 'The Forest Underground: Mycelium Networks', type: 'Film', url: 'https://www.youtube.com/watch?v=tWdS0NpsXEs' },
      { title: 'Sacred Geometry: The Language of Creation', type: 'Series', url: 'https://www.youtube.com/watch?v=6c2jQpTqQ_Q' },
      { title: 'Phoenix Rising: The Sigil Animation', type: 'Animation' },
    ],
  },
  {
    title: 'Audio & Podcasts',
    icon: Podcast,
    color: 'gold-sacred',
    items: [
      { title: 'The Rhythmic Weave: Season 1', type: 'Podcast' },
      { title: 'Resonance Frequencies: 432Hz Meditations', type: 'Audio' },
      { title: 'Council Recordings: New Moon Archives', type: 'Archive' },
      { title: 'The Green Resonance: Guided Practices', type: 'Practice' },
    ],
  },
  {
    title: 'Tools & Frameworks',
    icon: FileText,
    color: 'emerald-glow',
    items: [
      { title: 'The Resonance Journal: Daily Practice Template', type: 'Template' },
      { title: 'Systems Mapping Canvas', type: 'Tool' },
      { title: 'Ethical Living Audit Checklist', type: 'Checklist' },
      { title: 'Bioregional Study Guide', type: 'Guide' },
    ],
  },
];

const externalLinks = [
  { title: 'Sacred Geometry International', desc: 'The mathematics of creation' },
  { title: 'The Mycelium Project', desc: 'Underground network science' },
  { title: 'Solarpunk Community', desc: 'Positive futures in practice' },
  { title: 'Regenerative Design Institute', desc: 'Designing with living systems' },
];

export default function Resources() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-emerald-deep/15 to-cosmic-black" />
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
            <BookOpen className="w-6 h-6 text-emerald-glow" />
            <span className="font-sacred text-emerald-glow/80 text-sm tracking-[0.3em]">RESOURCES</span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-wider text-gradient-emerald mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Resource Library
          </motion.h1>

          <motion.p
            className="font-sacred text-moonlight-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Texts, media, tools, and guides for the regenerative path. A curated collection of resources aligned with The Green Resonance Framework.
          </motion.p>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="section-padding">
        <div className="container-sacred">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {categories.map((category, i) => {
              const colors = resourceColorMap[category.color];
              return (
                <GlassCard key={category.title} delay={i * 0.1} className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
                      <category.icon className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <h3 className="font-display text-lg tracking-wider text-moonlight-white">{category.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {category.items.map((item) => (
                      <motion.div key={item.title} whileHover={{ x: item.url ? 4 : 0 }}>
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-emerald-glow/5 transition-colors cursor-pointer group"
                          >
                            <div>
                              <p className="font-body text-sm text-moonlight-white/70 group-hover:text-emerald-glow transition-colors">
                                {item.title}
                              </p>
                              <span className="text-xs text-moonlight-white/20 font-display tracking-wider">{item.type}</span>
                            </div>
                            <ExternalLink className="w-4 h-4 text-moonlight-white/10 group-hover:text-emerald-glow/40 transition-colors shrink-0" />
                          </a>
                        ) : (
                          <div className="flex items-center justify-between p-3 rounded-lg cursor-default">
                            <div>
                              <p className="font-body text-sm text-moonlight-white/50">
                                {item.title}
                              </p>
                              <span className="text-xs text-moonlight-white/20 font-display tracking-wider">{item.type} &middot; Coming Soon</span>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Allied Networks */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-cosmic-deep to-cosmic-black">
        <div className="container-sacred">
          <SectionHeading
            title="Allied Networks"
            subtitle="Connected organizations and movements in the regenerative web."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {externalLinks.map((link, i) => (
              <GlassCard key={link.title} delay={i * 0.1} className="p-5 cursor-default">
                <div className="flex items-center gap-3">
                  <LinkIcon className="w-4 h-4 text-emerald-glow/40" />
                  <div>
                    <h4 className="font-display text-sm tracking-wider text-moonlight-white/70">
                      {link.title}
                    </h4>
                    <p className="text-xs text-moonlight-white/30 font-body">{link.desc}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-sacred text-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
            <GlassCard solar className="p-6">
              <BookOpen className="w-6 h-6 text-emerald-glow mx-auto mb-3" />
              <h3 className="font-display text-sm tracking-wider text-moonlight-white mb-2">Starter Guide</h3>
              <p className="font-body text-moonlight-white/35 text-xs mb-3">Free PDF introduction to the framework</p>
              <Link
                to="/codex"
                className="px-4 py-2 rounded-full bg-emerald-glow/15 border border-emerald-glow/25 text-xs font-display tracking-widest text-emerald-glow hover:bg-emerald-glow/25 transition-all inline-block"
              >
                Open Guide
              </Link>
            </GlassCard>
            <GlassCard gold className="p-6">
              <FileText className="w-6 h-6 text-gold-sacred mx-auto mb-3" />
              <h3 className="font-display text-sm tracking-wider text-moonlight-white mb-2">Mailing List</h3>
              <p className="font-body text-moonlight-white/35 text-xs mb-3">Weekly reflections and updates</p>
              <Link
                to="/join"
                className="px-4 py-2 rounded-full bg-gold-sacred/15 border border-gold-sacred/25 text-xs font-display tracking-widest text-gold-sacred hover:bg-gold-sacred/25 transition-all inline-block"
              >
                Subscribe
              </Link>
            </GlassCard>
            <GlassCard solar className="p-6">
              <BookOpen className="w-6 h-6 text-cyan-glow mx-auto mb-3" />
              <h3 className="font-display text-sm tracking-wider text-moonlight-white mb-2">The Codex</h3>
              <p className="font-body text-moonlight-white/35 text-xs mb-3">Living archive of symbols & systems</p>
              <Link
                to="/codex"
                className="px-4 py-2 rounded-full bg-cyan-glow/15 border border-cyan-glow/25 text-xs font-display tracking-widest text-cyan-glow hover:bg-cyan-glow/25 transition-all inline-block"
              >
                Explore
              </Link>
            </GlassCard>
          </div>

          <GlassCard solar className="p-6 sm:p-8 max-w-2xl mx-auto mb-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-emerald-glow/10 flex items-center justify-center shrink-0">
                <Sprout className="w-6 h-6 text-emerald-glow" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg tracking-wider text-moonlight-white mb-1">
                  Seed Membership + Codex Access
                </h3>
                <p className="font-body text-moonlight-white/40 text-sm leading-relaxed">
                  Early access to the living Codex, practice systems, symbolic archives, and Green Resonance learning materials.
                </p>
              </div>
              <Link
                to="/seed-membership"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-glow/15 border border-emerald-glow/25 hover:bg-emerald-glow/25 transition-all font-display text-xs tracking-widest text-emerald-glow whitespace-nowrap shrink-0"
              >
                Explore Seed Membership
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </GlassCard>

          <GlassCard gold className="p-6 sm:p-8 max-w-2xl mx-auto mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-gold-sacred/10 flex items-center justify-center shrink-0">
                <Network className="w-6 h-6 text-gold-sacred" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg tracking-wider text-moonlight-white mb-1">
                  Mycelium Membership
                </h3>
                <p className="font-body text-moonlight-white/40 text-sm leading-relaxed">
                  Paid member access to weekly guided practices, New Moon Council, resource library, community events circle, and all Seed sections.
                </p>
              </div>
              <Link
                to="/mycelium-membership"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-display text-xs tracking-widest text-cosmic-black whitespace-nowrap shrink-0 transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #d4a843, #10b981)' }}
              >
                Join Mycelium
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </GlassCard>

          <GlassCard gold className="p-8 sm:p-12 max-w-2xl mx-auto">
            <h3 className="font-display text-2xl tracking-wider text-gradient-gold mb-4">
              Explore The Codex
            </h3>
            <p className="font-sacred text-moonlight-white/50 mb-6 leading-relaxed">
              The Codex is the living archive of the Green Resonance — a deeper dive into the framework.
            </p>
            <Link
              to="/codex"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-sacred/20 border border-gold-sacred/30 hover:bg-gold-sacred/30 transition-all font-display text-sm tracking-widest text-gold-sacred"
            >
              Enter The Codex
              <ArrowRight className="w-4 h-4" />
            </Link>
          </GlassCard>
        </div>
      </section>

      {/* Resources Gallery */}
      <GalleryShowcase
        srcs={[
          '/Gallery/10-green-resonance-workbook-cover.jpg',
          '/Gallery/07-keys-to-the-kingdom-keys.jpg',
          '/Gallery/13-six-pillars-daily-practice-cards.jpg',
        ]}
        limit={3}
        title="Practice Materials"
        subtitle="Workbooks, keys, and guides for the regenerative path"
      />
    </PageTransition>
  );
}
