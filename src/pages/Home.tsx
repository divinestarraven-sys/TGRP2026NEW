import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Eye, Heart, Cpu, Globe, Zap, Waves, Leaf, Sprout,
  Star, TreePine, BookOpen, Compass, Flame, GraduationCap,
  Map, Sparkles, Network,
} from 'lucide-react';
import SacredGeometry from '../components/SacredGeometry';
import SacredGeometryHero from '../components/SacredGeometryHero';
import PhoenixSigilBackground from '../components/PhoenixSigilBackground';
import LivingVines from '../components/LivingVines';
import GlassCard from '../components/GlassCard';
import CymaticWaves from '../components/CymaticWaves';
import MyceliumNetwork from '../components/MyceliumNetwork';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';
import RavenstarConstellation from '../components/RavenstarConstellation';
import AuroraEffect from '../components/AuroraEffect';
import GalleryShowcase from '../components/GalleryShowcase';

const pillars = [
  { icon: Eye, title: 'Awareness & Discernment', key: 'I See Clearly', desc: 'Cultivate stillness, discernment, honest observation, and inner clarity.', color: 'sacred-violet' },
  { icon: Heart, title: 'Moral Objectivity & Ethical Living', key: 'I Choose Wisely', desc: 'Align action with truth, compassion, accountability, and service.', color: 'gold-sacred' },
  { icon: Cpu, title: 'Reality & Systems Intelligence', key: 'I Understand & Integrate', desc: 'Recognise patterns, feedback loops, interdependence, and living systems.', color: 'cyan-ether' },
  { icon: Globe, title: 'Human & Earth Integration', key: 'I Nurture & Regenerate', desc: 'Restore relationship with soil, water, biodiversity, and the living Earth.', color: 'emerald-glow' },
  { icon: Zap, title: 'Embodiment & Conscious Action', key: 'I Act & Manifest', desc: 'Transform insight into embodied action, practical contribution, and resilient creation.', color: 'solarpunk-amber' },
  { icon: Waves, title: 'Ethereal Resonance & The Rhythmic Weave', key: 'I Weave Harmony', desc: 'Live as a conscious thread within the greater tapestry of life.', color: 'solarpunk-biolum' },
];

const featuredSystems = [
  { icon: Eye, title: 'The 6 Pillars', desc: 'Six facets of a daily living rhythm of seeing, choosing, understanding, regenerating, manifesting, and weaving.', path: '/pillars' },
  { icon: Compass, title: 'The 7 Portals', desc: 'Seven thresholds into the living garden — each a chakra-aligned gateway of practice and place.', path: '/portals' },
  { icon: Star, title: 'Ravenstar', desc: 'The celestial navigation layer and symbolic orientation system above the garden.', path: '/ravenstar' },
  { icon: Flame, title: 'Phoenix Principle', desc: 'The central transformation archetype: conscious regeneration through awareness.', path: '/phoenix' },
  { icon: Sprout, title: 'Resonance Garden', desc: 'The living curriculum — an ecological classroom and regenerative systems laboratory.', path: '/garden' },
  { icon: GraduationCap, title: 'MUSEschool', desc: 'A regenerative learning ecosystem integrating ecology, creativity, and contemplative practice.', path: '/museschool' },
  { icon: Waves, title: 'The Rhythmic Weave', desc: 'Resonance, reciprocity, rhythm, reflection, reverence, and remembrance.', path: '/rhythmic-weave' },
  { icon: BookOpen, title: 'Resources & Workbooks', desc: 'Guides, practice cards, garden blueprints, and the living archive.', path: '/resources' },
];

const introColumns = [
  { title: 'Inner Practice', desc: 'Meditation, contemplation, reflection, and the cultivation of inner stillness and discernment.', icon: Sparkles, color: 'sacred-violet' },
  { title: 'Living Systems', desc: 'Ecological design, permaculture, systems thinking, and the intelligence of nature.', icon: TreePine, color: 'emerald-glow' },
  { title: 'Community Culture', desc: 'Cooperation, shared governance, mutual aid, ceremony, and collective resilience.', icon: Heart, color: 'gold-sacred' },
];

const reflections = [
  "What pattern is asking to be seen in your life right now?",
  "Where does your action diverge from your knowing?",
  "What would it mean to live as if the Earth were your body?",
  "Which of the six pillars calls to you most deeply today?",
  "What is the rhythm beneath your restlessness?",
  "How might your discernment serve not just you, but the whole?",
];

function DailyReflection() {
  const today = new Date().getDate();
  const reflection = reflections[today % reflections.length];

  return (
    <GlassCard bio className="p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <motion.div
          className="w-10 h-10 rounded-full bg-solarpunk-biolum/15 flex items-center justify-center shrink-0"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <TreePine className="w-5 h-5 text-solarpunk-biolum" />
        </motion.div>
        <div>
          <h3 className="font-display text-sm tracking-widest text-solarpunk-biolum/80 mb-2">DAILY REFLECTION</h3>
          <p className="font-sacred text-moonlight-white/70 text-lg italic leading-relaxed">"{reflection}"</p>
        </div>
      </div>
    </GlassCard>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <PageTransition>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-solarpunk-horizon" />
        <SacredGeometryHero />
        <PhoenixSigilBackground />
        <AuroraEffect className="absolute" intensity={1.2} speed={1} />
        <LivingVines color="biolum" thickness={1} />

        <motion.div
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <motion.p
            className="font-sacred text-solarpunk-amber/80 text-sm sm:text-base tracking-[0.3em] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            THE GREEN RESONANCE PROJECT
          </motion.p>

          <motion.h1
            className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-wider leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            <span className="text-gradient-canopy">The Garden</span>
            <br />
            <span className="text-gradient-harvest">Is Not Merely</span>
            <br />
            <span className="text-gradient-biolum">A Place</span>
          </motion.h1>

          <motion.p
            className="font-sacred text-moonlight-white/50 text-lg sm:text-xl lg:text-2xl max-w-2xl mx-auto mb-4 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            It Is A Way Of Life.
          </motion.p>

          <motion.p
            className="font-body text-moonlight-white/35 text-sm sm:text-base max-w-3xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            A regenerative educational and contemplative living system for ecological intelligence,
            ethical action, creative expression, symbolic literacy, and conscious participation within the living world.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <Link
              to="/framework"
              className="group px-8 py-4 rounded-full bg-solarpunk-canopy/30 border border-solarpunk-biolum/25 hover:bg-solarpunk-canopy/50 hover:border-solarpunk-biolum/40 transition-all font-display text-sm tracking-widest text-solarpunk-biolum flex items-center gap-2 glow-biolum"
            >
              Explore The Framework
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/garden"
              className="px-8 py-4 rounded-full bg-solarpunk-biolum/10 border border-solarpunk-biolum/20 hover:border-solarpunk-biolum/40 transition-all font-display text-sm tracking-widest text-solarpunk-biolum/80 hover:text-solarpunk-biolum flex items-center gap-2"
            >
              Enter The Garden
              <Sprout className="w-4 h-4" />
            </Link>
            <Link
              to="/join"
              className="px-8 py-4 rounded-full glass-amber border border-solarpunk-amber/20 hover:border-solarpunk-amber/40 transition-all font-display text-sm tracking-widest text-solarpunk-amber"
            >
              Join The Resonance
            </Link>
          </motion.div>

          <motion.p
            className="font-body text-moonlight-white/20 text-xs mt-6 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            A grounded framework for regenerative living, systems awareness, creativity, and community resilience.
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-5 h-8 rounded-full border-2 border-solarpunk-biolum/25 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-solarpunk-biolum/40" />
          </div>
        </motion.div>
      </section>

      <div className="divider-organic" />

      {/* Intro: Humanity Heals */}
      <section className="section-padding relative bg-earth-warm bg-canopy-light">
        <div className="absolute inset-0 opacity-15">
          <MyceliumNetwork nodeCount={20} />
        </div>
        <div className="container-sacred relative z-10">
          <SectionHeading
            title="Humanity Heals Through Remembrance"
            subtitle="The Green Resonance Project invites people to remember their relationship with nature, community, creativity, and conscious living. It blends contemplative practice, ecological design, symbolic storytelling, and practical sustainability into a living educational ecosystem."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {introColumns.map((col, i) => (
              <GlassCard key={col.title} solar delay={i * 0.15} className="p-6 sm:p-8 group">
                <div className={`w-12 h-12 rounded-xl bg-${col.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <col.icon className={`w-6 h-6 text-${col.color}`} />
                </div>
                <h3 className="font-display text-xl tracking-wider text-moonlight-white mb-3">{col.title}</h3>
                <p className="font-body text-moonlight-white/45 leading-relaxed">{col.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Systems */}
      <section className="section-padding relative bg-gradient-to-b from-cosmic-black via-emerald-deep/10 to-cosmic-black bg-canopy-light">
        <div className="container-sacred relative z-10">
          <SectionHeading
            title="The Living Framework"
            subtitle="Explore the systems, portals, and practices that form the Green Resonance ecosystem."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredSystems.map((system, i) => (
              <Link key={system.title} to={system.path}>
                <GlassCard solar delay={i * 0.08} className="p-5 sm:p-6 h-full group cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-emerald-glow/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <system.icon className="w-5 h-5 text-emerald-glow group-hover:text-solarpunk-biolum transition-colors" />
                  </div>
                  <h3 className="font-display text-base tracking-wider text-moonlight-white mb-2 group-hover:text-solarpunk-biolum transition-colors">
                    {system.title}
                  </h3>
                  <p className="font-body text-moonlight-white/40 text-sm leading-relaxed">{system.desc}</p>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Pillars Preview */}
      <section className="section-padding relative bg-gradient-to-b from-cosmic-black via-emerald-deep/15 to-cosmic-black bg-canopy-light">
        <div className="container-sacred relative z-10">
          <SectionHeading
            title="The 6 Pillars & Portal Keys"
            subtitle="The Six Pillars form a daily living rhythm of seeing, choosing, understanding, regenerating, manifesting, and weaving."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => (
              <Link key={pillar.title} to="/pillars">
                <GlassCard solar delay={i * 0.1} className="p-6 sm:p-8 h-full group cursor-pointer">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-${pillar.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <pillar.icon className={`w-6 h-6 text-${pillar.color}`} />
                    </div>
                    <span className="font-sacred text-xs tracking-widest text-moonlight-white/25 italic">"{pillar.key}"</span>
                  </div>
                  <h3 className="font-display text-lg tracking-wider text-moonlight-white mb-2 group-hover:text-solarpunk-biolum transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="font-body text-moonlight-white/40 text-sm leading-relaxed">{pillar.desc}</p>
                </GlassCard>
              </Link>
            ))}
          </div>
          {/* Transformation Cycle */}
          <motion.div
            className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {['Seeing', 'Choosing', 'Understanding', 'Regenerating', 'Manifesting', 'Weaving'].map((step, i) => (
              <div key={step} className="flex items-center gap-2 sm:gap-3">
                <span className="font-sacred text-sm sm:text-base text-emerald-glow/70 bg-emerald-glow/5 px-3 py-1.5 rounded-full">
                  {step}
                </span>
                {i < 5 && <ArrowRight className="w-4 h-4 text-emerald-glow/30 hidden sm:block" />}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Ravenstar Constellation */}
      <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-cosmic-deep/50 to-cosmic-black" />
        <div className="relative z-10 container-sacred">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Star className="w-5 h-5 text-solarpunk-amber/60" />
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-wider text-gradient-harvest">
                The Ravenstar
              </h2>
              <Star className="w-5 h-5 text-solarpunk-amber/60" />
            </div>
            <p className="font-sacred text-moonlight-white/40 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              The Signal Above The Garden — a constellation of remembrance, orientation, and symbolic literacy.
            </p>
          </motion.div>
          <div className="relative w-full max-w-4xl mx-auto" style={{ height: 'clamp(350px, 50vw, 550px)' }}>
            <RavenstarConstellation className="absolute inset-0" />
          </div>
          <div className="flex justify-center mt-8">
            <Link
              to="/ravenstar"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sacred-violet/15 border border-sacred-violet/25 hover:bg-sacred-violet/25 transition-all font-display text-sm tracking-widest text-sacred-violet"
            >
              Explore Ravenstar
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Phoenix Principle Preview */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-solarpunk-canopy/5 to-cosmic-black" />
        <div className="container-sacred relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Flame className="w-8 h-8 text-solarpunk-amber/60 mx-auto mb-4" />
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-wider text-gradient-harvest mb-6">
                The Phoenix Principle
              </h2>
              <p className="font-sacred text-gold-sacred/80 text-xl sm:text-2xl tracking-wide mb-4">
                "Burn what is false. Protect what is true. Rise in alignment."
              </p>
              <p className="font-body text-moonlight-white/40 leading-relaxed mb-8">
                The central transformation archetype: conscious transformation, regeneration through adversity,
                refinement through challenge, and resilience through awareness.
              </p>
              <Link
                to="/phoenix"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-solarpunk-amber/15 border border-solarpunk-amber/25 hover:bg-solarpunk-amber/25 transition-all font-display text-sm tracking-widest text-solarpunk-amber"
              >
                Enter The Fire
                <Flame className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative overflow-hidden bg-earth-warm">
        <div className="absolute inset-0 opacity-30">
          <CymaticWaves frequency={3} />
        </div>
        <div className="container-sacred relative z-10">
          <SectionHeading
            title="Enter The Resonance"
            subtitle="Choose your path into the living grid. Each doorway leads to the same center."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: 'Explore The Framework', path: '/framework', icon: Sprout },
              { label: 'Enter The Garden', path: '/garden', icon: Leaf },
              { label: 'Walk The Portals', path: '/portals', icon: Map },
              { label: 'Join The Living Grid', path: '/join', icon: Heart },
              { label: 'Become a Seed Member', path: '/seed-membership', icon: Sprout },
              { label: 'Join Mycelium Membership', path: '/mycelium-membership', icon: Network },
            ].map((cta, i) => (
              <motion.div
                key={cta.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <Link
                  to={cta.path}
                  className="group block p-6 rounded-2xl glass-solar hover:bg-solarpunk-canopy/20 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <cta.icon className="w-4 h-4 text-solarpunk-moss/60 group-hover:text-solarpunk-biolum transition-colors" />
                      <span className="font-display text-sm tracking-wider text-moonlight-white/70 group-hover:text-solarpunk-biolum transition-colors">
                        {cta.label}
                      </span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-solarpunk-biolum/30 group-hover:text-solarpunk-biolum group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Reflection */}
      <section className="section-padding bg-canopy-light">
        <div className="container-sacred max-w-2xl">
          <DailyReflection />
        </div>
      </section>

      {/* Portal Quiz Teaser */}
      <section className="section-padding relative bg-gradient-to-b from-cosmic-black via-solarpunk-canopy/10 to-cosmic-black">
        <div className="container-sacred text-center">
          <GlassCard bio className="p-8 sm:p-12 max-w-2xl mx-auto">
            <motion.div
              className="w-16 h-16 rounded-full bg-solarpunk-biolum/10 flex items-center justify-center mx-auto mb-6"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              <SacredGeometry size={64} opacity={0.3} animated={false} />
            </motion.div>
            <h3 className="font-display text-2xl tracking-wider text-gradient-biolum mb-4">
              Discover Your Pillar
            </h3>
            <p className="font-sacred text-moonlight-white/50 mb-6 leading-relaxed">
              Which of the six pillars resonates most deeply with your path? Take the portal quiz and find your alignment.
            </p>
            <Link
              to="/pillars"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-solarpunk-biolum/15 border border-solarpunk-biolum/25 hover:bg-solarpunk-biolum/25 transition-all font-display text-sm tracking-widest text-solarpunk-biolum"
            >
              Begin The Quiz
              <ArrowRight className="w-4 h-4" />
            </Link>
          </GlassCard>
        </div>
      </section>

      {/* Featured Gallery */}
      <GalleryShowcase
        srcs={[
          '/Gallery/01-best-new-garden-map.jpg',
          '/Gallery/03-green-resonance-poster-artwork.jpg',
          '/Gallery/09-phoenix-master-sigil.jpg',
        ]}
        limit={3}
        title="Visual Resonance"
        subtitle="Featured images from The Green Resonance Project"
      />
    </PageTransition>
  );
}
