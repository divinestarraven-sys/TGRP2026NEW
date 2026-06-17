import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Brain,
  MessageCircle,
  Flower2,
  Palette,
  Wrench,
  Eye,
  Users,
  GraduationCap,
  MapPin,
  Heart,
  Package,
  Video,
  Mail,
  FileText,
  Layers,
  ArrowRight,
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SacredGeometry from '../components/SacredGeometry';
import MyceliumNetwork from '../components/MyceliumNetwork';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';

const educationPathways = [
  {
    title: 'Ecological Literacy',
    desc: 'Understanding the language of living systems, from soil food webs to climate patterns',
    icon: BookOpen,
    color: 'emerald-glow',
  },
  {
    title: 'Systems Thinking',
    desc: 'Perceiving the whole: feedback loops, emergence, leverage points, and interdependence',
    icon: Brain,
    color: 'cyan-glow',
  },
  {
    title: 'Conscious Communication',
    desc: 'Speaking with clarity, listening with presence, resolving through understanding',
    icon: MessageCircle,
    color: 'gold-sacred',
  },
  {
    title: 'Inner Practice',
    desc: 'Meditation, contemplation, reflection, and the cultivation of inner stillness',
    icon: Flower2,
    color: 'gold-sacred',
  },
  {
    title: 'Creative Expression',
    desc: 'Art, music, writing, and craft as pathways of knowing and sharing',
    icon: Palette,
    color: 'solarpunk-biolum',
  },
  {
    title: 'Practical Resilience',
    desc: 'Hands-on skills for self-reliance: growing food, building shelter, repairing systems',
    icon: Wrench,
    color: 'emerald-glow',
  },
  {
    title: 'Symbolic Literacy',
    desc: 'Reading the language of myth, archetype, and pattern across cultures and time',
    icon: Eye,
    color: 'cyan-glow',
  },
  {
    title: 'Community Cooperation',
    desc: 'Collaborative design, shared governance, mutual aid, and collective intelligence',
    icon: Users,
    color: 'solarpunk-biolum',
  },
];

const learningPrinciples = [
  {
    title: 'Learn by Doing',
    desc: 'Every concept is practiced, not just studied',
    icon: GraduationCap,
    color: 'emerald-glow',
  },
  {
    title: 'Learn in Place',
    desc: 'Education is rooted in the bioregion, the garden, and the community',
    icon: MapPin,
    color: 'cyan-glow',
  },
  {
    title: 'Learn Together',
    desc: 'Knowledge is co-created, not transmitted from above',
    icon: Heart,
    color: 'gold-sacred',
  },
];

const productEcosystem = [
  { title: 'Free Digital Guide', icon: FileText },
  { title: 'Premium Workbook', icon: Layers },
  { title: 'Practice Cards', icon: Package },
  { title: 'Online Course', icon: GraduationCap },
  { title: 'Workshops & Retreats', icon: Users },
  { title: 'Garden Blueprint Series', icon: BookOpen },
  { title: 'Community Membership', icon: Heart },
  { title: 'YouTube / Media Channel', icon: Video },
  { title: 'Newsletter', icon: Mail },
];

export default function MUSEschool() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-emerald-deep/15 to-cosmic-black" />
        <div className="absolute inset-0 opacity-30">
          <MyceliumNetwork nodeCount={25} />
        </div>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
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
            <span className="font-sacred text-gold-sacred/80 text-sm tracking-[0.3em]">REGENERATIVE LEARNING</span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-wider text-gradient-emerald mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            MUSEschool
          </motion.h1>

          <motion.p
            className="font-sacred text-moonlight-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            A Regenerative Learning Ecosystem
          </motion.p>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding relative">
        <div className="absolute inset-0 opacity-10">
          <SacredGeometry size={600} opacity={0.04} />
        </div>
        <div className="container-sacred relative z-10 max-w-3xl">
          <GlassCard className="p-8 sm:p-10">
            <motion.p
              className="font-body text-moonlight-white/60 text-lg leading-relaxed text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              MUSEschool integrates ecological literacy, emotional intelligence, symbolic education, systems thinking, creative arts, practical resilience, and contemplative practice into a living educational ecosystem. It is designed as a future eco-village model and regenerative school.
            </motion.p>
          </GlassCard>
        </div>
      </section>

      {/* Education Pathways */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-cosmic-deep to-cosmic-black relative">
        <div className="absolute inset-0 opacity-15">
          <MyceliumNetwork nodeCount={12} />
        </div>
        <div className="container-sacred relative z-10">
          <SectionHeading
            title="Education Pathways"
            subtitle="Eight interwoven pathways forming a complete ecology of learning."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {educationPathways.map((pathway, i) => (
              <GlassCard key={pathway.title} delay={i * 0.08} className="p-6 sm:p-8">
                <div className="flex items-start gap-5">
                  <div className={`w-12 h-12 rounded-xl bg-${pathway.color}/10 flex items-center justify-center shrink-0`}>
                    <pathway.icon className={`w-6 h-6 text-${pathway.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-moonlight-white/20 font-display text-sm tracking-widest">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-lg tracking-wider text-moonlight-white">
                        {pathway.title}
                      </h3>
                    </div>
                    <p className="font-body text-moonlight-white/50 leading-relaxed">
                      {pathway.desc}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Model */}
      <section className="section-padding relative">
        <div className="container-sacred">
          <SectionHeading
            title="Learning Model"
            subtitle="Three principles that shape every encounter with knowledge."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningPrinciples.map((principle, i) => (
              <GlassCard key={principle.title} delay={i * 0.15} className="p-6 sm:p-8 text-center">
                <div className={`w-14 h-14 rounded-full bg-${principle.color}/10 flex items-center justify-center mx-auto mb-5`}>
                  <principle.icon className={`w-7 h-7 text-${principle.color}`} />
                </div>
                <h3 className={`font-display text-xl tracking-wider text-${principle.color} mb-3`}>
                  {principle.title}
                </h3>
                <p className="font-body text-moonlight-white/50 leading-relaxed">
                  {principle.desc}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Product Ecosystem */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-cosmic-deep to-cosmic-black relative">
        <div className="container-sacred">
          <SectionHeading
            title="Product Ecosystem"
            subtitle="Resources and offerings to support every stage of the journey."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {productEcosystem.map((product, i) => (
              <GlassCard key={product.title} delay={i * 0.05} className="p-4 sm:p-5 text-center">
                <product.icon className="w-5 h-5 text-emerald-glow/50 mx-auto mb-2" />
                <h4 className="font-display text-sm tracking-wider text-moonlight-white/60">
                  {product.title}
                </h4>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative">
        <div className="container-sacred text-center">
          <GlassCard gold className="p-8 sm:p-12 max-w-2xl mx-auto">
            <GraduationCap className="w-8 h-8 text-gold-sacred mx-auto mb-4" />
            <h3 className="font-display text-2xl tracking-wider text-gradient-gold mb-4">
              Join The Learning
            </h3>
            <p className="font-sacred text-moonlight-white/50 mb-6 leading-relaxed">
              Step into a living ecosystem of regenerative education. The path begins with a single intention.
            </p>
            <Link
              to="/join"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-sacred/20 border border-gold-sacred/30 hover:bg-gold-sacred/30 transition-all font-display text-sm tracking-widest text-gold-sacred"
            >
              Join The Learning
              <ArrowRight className="w-4 h-4" />
            </Link>
          </GlassCard>
        </div>
      </section>
    </PageTransition>
  );
}
