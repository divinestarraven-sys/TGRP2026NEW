import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Heart, Cpu, Globe, Zap, Waves, ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import SacredGeometry from '../components/SacredGeometry';
import CymaticWaves from '../components/CymaticWaves';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';
import GalleryShowcase from '../components/GalleryShowcase';

const pillars = [
  {
    id: 1,
    title: 'Awareness & Discernment',
    portalKey: 'I See Clearly',
    icon: Eye,
    color: 'sacred-violet',
    chakra: 'Crown — Violet',
    shortDesc: 'Cultivate stillness, discernment, honest observation, and inner clarity.',
    fullDesc: 'Awareness is the foundation of all transformation. Without clear perception, action is blind. Discernment is the ability to distinguish truth from illusion, signal from noise, essence from appearance. It is not judgment — it is clarity. In a world of infinite information and manufactured consent, discernment is the most radical act of sovereignty.',
    practices: ['Daily silence practice — 20 minutes of unmediated observation', 'Media fasting — one day per week without digital input', 'Pattern journaling — track recurring themes in your perception', 'Nature immersion — let the forest teach you its language'],
    question: 'What pattern is asking to be seen in your life right now?',
  },
  {
    id: 2,
    title: 'Moral Objectivity & Ethical Living',
    portalKey: 'I Choose Wisely',
    icon: Heart,
    color: 'gold-sacred',
    chakra: 'Solar Plexus — Yellow',
    shortDesc: 'Align action with truth, compassion, accountability, and service.',
    fullDesc: 'Ethics are not external rules — they are the natural expression of a system in harmony. When we live ethically, we are not constraining ourselves; we are freeing ourselves from the chaos of misalignment. Ethical living means that our actions, our consumption, our relationships, and our work all arise from the same root of truth. It is the architecture of a life that does not contradict itself.',
    practices: ['Conscious consumption audit — trace the origin of what you buy', 'Truth alignment check — do your actions match your stated values?', 'Relationship inventory — where does integrity call for change?', 'Service practice — one act of genuine service per day'],
    question: 'Where does your action diverge from your knowing?',
  },
  {
    id: 3,
    title: 'Reality & Systems Intelligence',
    portalKey: 'I Understand & Integrate',
    icon: Cpu,
    color: 'cyan-ether',
    chakra: 'Throat — Blue',
    shortDesc: 'Recognise patterns, feedback loops, interdependence, and living systems.',
    fullDesc: 'The world is not a collection of isolated parts — it is a web of interdependent systems. Systems intelligence is the capacity to perceive these webs, understand feedback loops, and design interventions that honor complexity. It is the difference between treating symptoms and healing systems. A systems thinker sees the forest, the soil, the mycelium, and the climate as one interconnected intelligence.',
    practices: ['Systems mapping — draw the feedback loops in your life', 'Second-order thinking — trace consequences beyond the first effect', 'Ecosystem study — observe how nature solves problems', 'Design practice — redesign one system in your life using living systems principles'],
    question: 'What system in your life is asking to be redesigned?',
  },
  {
    id: 4,
    title: 'Human & Earth Integration',
    portalKey: 'I Nurture & Regenerate',
    icon: Globe,
    color: 'emerald-glow',
    chakra: 'Root — Red/Green',
    shortDesc: 'Restore relationship with soil, water, biodiversity, and the living Earth.',
    fullDesc: 'The separation between human and Earth is the original illusion — the wound from which all other wounds flow. When we remember that we are not separate from the Earth but expressions of it, everything changes. Our economics, our agriculture, our architecture, our medicine — all must be redesigned as if the Earth were our own body. Because it is.',
    practices: ['Grounding practice — bare feet on earth, daily', 'Bioregional study — learn the ecology of where you live', 'Regenerative action — one act that leaves the land better than you found it', 'Seasonal alignment — align your rhythms with the turning of the year'],
    question: 'What would it mean to live as if the Earth were your body?',
  },
  {
    id: 5,
    title: 'Embodiment & Conscious Action',
    portalKey: 'I Act & Manifest',
    icon: Zap,
    color: 'solarpunk-amber',
    chakra: 'Sacral — Red/Gold',
    shortDesc: 'Transform insight into embodied action, practical contribution, and resilient creation.',
    fullDesc: 'Knowing without doing is a half-truth. Understanding without embodiment is a dream. This pillar calls us to close the gap between what we know and how we live. Conscious action is not about perfection — it is about presence. It is the practice of bringing full awareness to each choice, each movement, each breath. When action arises from presence, it becomes sacred — not because of ritual, but because of attention.',
    practices: ['Mindful movement — one daily activity performed with complete presence', 'Decision practice — before acting, pause and ask: does this align?', 'Body scan meditation — reconnect with the intelligence of the body', 'Conscious speech — one conversation per day with full attention'],
    question: 'What do you know that you have not yet embodied?',
  },
  {
    id: 6,
    title: 'Ethereal Resonance & The Rhythmic Weave',
    portalKey: 'I Weave Harmony',
    icon: Waves,
    color: 'solarpunk-biolum',
    chakra: 'Third Eye — Indigo',
    shortDesc: 'Live as a conscious thread within the greater tapestry of life through creativity, rhythm, beauty, and symbolic awareness.',
    fullDesc: 'Beyond the visible, there is a frequency — a resonance that connects all living things. The Rhythmic Weave is the cosmic pattern that underlies all growth, all harmony, all transformation. When we tune to this frequency, we stop fighting the current and begin to flow with it. This is not mysticism divorced from reality — it is the deepest reality, the pattern that science is only beginning to name.',
    practices: ['Sound meditation — listen to the resonance beneath silence', 'Rhythm practice — find and follow the natural rhythm of your day', 'Synchronicity journaling — track the patterns that connect seemingly random events', 'Harmonic practice — create or listen to music that mirrors natural frequencies'],
    question: 'What is the rhythm beneath your restlessness?',
  },
];

const quizQuestions = [
  {
    question: 'When faced with a complex problem, you first...',
    options: [
      { text: 'Step back and observe the whole picture', pillar: 1 },
      { text: 'Consider what the right thing to do is', pillar: 2 },
      { text: 'Map the systems and feedback loops', pillar: 3 },
      { text: 'Check in with your body and the land', pillar: 4 },
      { text: 'Take immediate conscious action', pillar: 5 },
      { text: 'Listen for the deeper pattern', pillar: 6 },
    ],
  },
  {
    question: 'The quality you most value in a community is...',
    options: [
      { text: 'Clarity and truth-telling', pillar: 1 },
      { text: 'Integrity and trust', pillar: 2 },
      { text: 'Intelligence and adaptability', pillar: 3 },
      { text: 'Connection to place and Earth', pillar: 4 },
      { text: 'Presence and aliveness', pillar: 5 },
      { text: 'Harmony and resonance', pillar: 6 },
    ],
  },
  {
    question: 'Your ideal morning practice would be...',
    options: [
      { text: 'Silent observation and meditation', pillar: 1 },
      { text: 'Setting an intention for conscious action', pillar: 2 },
      { text: 'Reviewing your systems and goals', pillar: 3 },
      { text: 'Walking barefoot on the earth', pillar: 4 },
      { text: 'Mindful movement or yoga', pillar: 5 },
      { text: 'Listening to natural sounds or music', pillar: 6 },
    ],
  },
];

export default function Pillars() {
  const [expandedPillar, setExpandedPillar] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizScores, setQuizScores] = useState<number[]>(new Array(6).fill(0));
  const [quizResult, setQuizResult] = useState<number | null>(null);

  const handleQuizAnswer = (pillar: number) => {
    const newScores = [...quizScores];
    newScores[pillar - 1] += 1;
    setQuizScores(newScores);

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      const maxScore = Math.max(...newScores);
      const resultIndex = newScores.indexOf(maxScore);
      setQuizResult(resultIndex + 1);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizScores(new Array(6).fill(0));
    setQuizResult(null);
  };

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-emerald-deep/15 to-cosmic-black" />
        <div className="absolute inset-0 opacity-20">
          <CymaticWaves frequency={1.8} />
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
          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-wider text-gradient-emerald mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            The 6 Pillars
          </motion.h1>
          <motion.p
            className="font-sacred text-moonlight-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Six facets of a single truth. Each pillar is a doorway into the living framework.
          </motion.p>
        </div>
      </section>

      {/* Pillars Detail */}
      <section className="section-padding relative">
        <div className="container-sacred">
          <div className="space-y-4">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
              >
                <GlassCard
                  hover={false}
                  className="p-6 sm:p-8 cursor-pointer"
                >
                  <button
                    onClick={() => setExpandedPillar(expandedPillar === pillar.id ? null : pillar.id)}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-${pillar.color}/10 flex items-center justify-center shrink-0`}>
                          <pillar.icon className={`w-6 h-6 text-${pillar.color}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-moonlight-white/20 font-display text-sm tracking-widest">
                              {String(pillar.id).padStart(2, '0')}
                            </span>
                            <h3 className="font-display text-lg sm:text-xl tracking-wider text-moonlight-white">
                              {pillar.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-sacred text-xs tracking-widest text-moonlight-white/25 italic">Portal Key: "{pillar.portalKey}"</span>
                          </div>
                          <p className="font-body text-moonlight-white/40 text-sm mt-1">{pillar.shortDesc}</p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedPillar === pillar.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-emerald-glow/40" />
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedPillar === pillar.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 pt-6 border-t border-emerald-glow/10">
                          <p className="font-body text-moonlight-white/60 leading-relaxed mb-4">
                            {pillar.fullDesc}
                          </p>

                          <div className="flex items-center gap-2 mb-6">
                            <span className="text-xs font-display tracking-widest text-moonlight-white/30">CHAKRA</span>
                            <span className="text-xs font-sacred text-moonlight-white/50">{pillar.chakra}</span>
                          </div>

                          <h4 className="font-display text-sm tracking-widest text-emerald-glow mb-3">PRACTICES</h4>
                          <ul className="space-y-2 mb-6">
                            {pillar.practices.map((practice, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm font-body text-moonlight-white/50">
                                <span className="text-emerald-glow/40 mt-1">-</span>
                                {practice}
                              </li>
                            ))}
                          </ul>

                          <div className="glass-gold rounded-xl p-4">
                            <p className="font-sacred text-gold-sacred/80 text-sm italic">
                              Reflection: {pillar.question}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Cycle */}
      <section className="py-12 relative">
        <div className="container-sacred">
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {pillars.map((p, i) => (
              <div key={p.portalKey} className="flex items-center gap-3">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-10 h-10 rounded-full bg-${p.color}/15 flex items-center justify-center`}>
                    <p.icon className={`w-4 h-4 text-${p.color}`} />
                  </div>
                  <span className="font-sacred text-[10px] text-moonlight-white/40 text-center leading-tight max-w-[80px]">
                    {p.portalKey.replace('I ', '')}
                  </span>
                </div>
                {i < pillars.length - 1 && <ArrowRight className="w-4 h-4 text-moonlight-white/15 mt-[-12px]" />}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portal Quiz */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-cosmic-deep to-cosmic-black">
        <div className="container-sacred max-w-2xl">
          <SectionHeading
            title="Portal Quiz"
            subtitle="Discover which pillar resonates most deeply with your path."
          />

          {!showQuiz ? (
            <div className="text-center">
              <GlassCard gold className="p-8">
                <motion.div
                  className="w-16 h-16 rounded-full bg-gold-sacred/10 flex items-center justify-center mx-auto mb-6"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <SacredGeometry size={64} opacity={0.3} animated={false} />
                </motion.div>
                <p className="font-sacred text-moonlight-white/50 mb-6 leading-relaxed">
                  Three questions. One alignment. Find your pillar.
                </p>
                <button
                  onClick={() => setShowQuiz(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-sacred/20 border border-gold-sacred/30 hover:bg-gold-sacred/30 transition-all font-display text-sm tracking-widest text-gold-sacred"
                >
                  Begin The Quiz
                  <ArrowRight className="w-4 h-4" />
                </button>
              </GlassCard>
            </div>
          ) : quizResult ? (
            <GlassCard gold className="p-8 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {(() => {
                  const pillar = pillars.find(p => p.id === quizResult);
                  if (!pillar) return null;
                  return (
                    <>
                      <div className={`w-16 h-16 rounded-full bg-${pillar.color}/10 flex items-center justify-center mx-auto mb-4`}>
                        <pillar.icon className={`w-8 h-8 text-${pillar.color}`} />
                      </div>
                      <p className="font-sacred text-gold-sacred/80 text-sm tracking-widest mb-2">YOUR ALIGNMENT</p>
                      <h3 className="font-display text-2xl tracking-wider text-gradient-gold mb-4">
                        {pillar.title}
                      </h3>
                      <p className="font-body text-moonlight-white/60 leading-relaxed mb-6">{pillar.shortDesc}</p>
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={resetQuiz}
                          className="px-4 py-2 rounded-full glass text-sm font-display tracking-wider text-moonlight-white/60 hover:text-moonlight-white transition-colors"
                        >
                          Retake
                        </button>
                        <Link
                          to="/rhythmic-weave"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-glow/20 border border-emerald-glow/30 text-sm font-display tracking-wider text-emerald-glow"
                        >
                          Enter The Weave
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </GlassCard>
          ) : (
            <GlassCard className="p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-moonlight-white/20 font-display text-sm tracking-widest">
                    {String(quizStep + 1).padStart(2, '0')} / {String(quizQuestions.length).padStart(2, '0')}
                  </span>
                  <div className="flex gap-1.5">
                    {quizQuestions.map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          i <= quizStep ? 'bg-gold-sacred' : 'bg-moonlight-white/10'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <h3 className="font-display text-xl tracking-wider text-moonlight-white mb-6">
                  {quizQuestions[quizStep].question}
                </h3>
                <div className="space-y-2">
                  {quizQuestions[quizStep].options.map((option, i) => (
                    <motion.button
                      key={i}
                      onClick={() => handleQuizAnswer(option.pillar)}
                      className="w-full text-left p-4 rounded-xl glass hover:glass-strong transition-all group"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="font-body text-sm text-moonlight-white/60 group-hover:text-emerald-glow transition-colors">
                        {option.text}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </GlassCard>
          )}
        </div>
      </section>

      {/* Pillars Gallery */}
      <GalleryShowcase
        srcs={[
          '/Gallery/04-six-pillars-latest-update.jpg',
          '/Gallery/05-six-pillars-rhythmic-weave-edition.jpg',
          '/Gallery/06-green-resonance-framework-six-pillars-maxres.jpg',
          '/Gallery/13-six-pillars-daily-practice-cards.jpg',
          '/Gallery/14-six-pillars-portal-keys-expanded.jpg',
        ]}
        limit={5}
        title="The Six Pillars — Visualized"
        subtitle="Framework diagrams for the six foundational pillars of the Green Resonance"
      />
    </PageTransition>
  );
}
