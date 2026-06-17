import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Calendar, MapPin, ArrowRight, MessageCircle, Globe, Heart, Music, Shield, Mic } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SacredGeometry from '../components/SacredGeometry';
import MyceliumNetwork from '../components/MyceliumNetwork';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';

const events = [
  {
    title: 'The Annual Resonance Gathering',
    date: 'Summer Solstice 2026',
    location: 'Sacred Grove, Nordic Wilderness',
    desc: 'A three-day immersion in the living framework. Ceremony, workshops, mycelium walks, and collective resonance practices.',
    type: 'Gathering',
  },
  {
    title: 'New Moon Council',
    date: 'Every New Moon',
    location: 'Virtual + Local Circles',
    desc: 'Monthly council where the community gathers to share reflections, set intentions, and weave collective rhythm.',
    type: 'Council',
  },
  {
    title: 'Regenerative Design Lab',
    date: 'Quarterly',
    location: 'Rotating Bioregions',
    desc: 'Hands-on workshops applying systems intelligence to local ecological and social challenges.',
    type: 'Workshop',
  },
  {
    title: 'The Silent Walk',
    date: 'Every Full Moon',
    location: 'Global — Your Local Land',
    desc: 'A worldwide synchronized walk in silence. Reconnecting with the Earth, one step at a time.',
    type: 'Practice',
  },
  {
    title: 'Sacred Humour Night',
    date: 'Monthly',
    location: 'Virtual + Local',
    desc: 'Laughter as liberation. An evening of sacred humour, storytelling, and the medicine of not taking ourselves too seriously.',
    type: 'Celebration',
  },
  {
    title: 'Garden Learning Days',
    date: 'Weekly',
    location: 'Resonance Garden',
    desc: 'Hands-on ecological education: food forests, aquaponics, composting, medicinal herbs, and permaculture design.',
    type: 'Workshop',
  },
  {
    title: 'Eco-Design Retreats',
    date: 'Seasonal',
    location: 'Rotating Venues',
    desc: 'Multi-day immersions in regenerative design, natural building, and ecological systems thinking.',
    type: 'Retreat',
  },
];

const communityValues = [
  { icon: Heart, title: 'Radical Care', desc: 'We prioritize the wellbeing of the whole — people, planet, and pattern.' },
  { icon: MessageCircle, title: 'Truth Telling', desc: 'We speak with honesty and listen with humility. Discernment is our shared practice.' },
  { icon: Globe, title: 'Bioregional Rooting', desc: 'We honor place. Every community is rooted in its land, its ecology, its rhythm.' },
  { icon: Users, title: 'Distributed Leadership', desc: 'No gurus. No hierarchy. The mycelial model — decentralized, resilient, intelligent.' },
  { icon: Shield, title: 'Harm Reduction', desc: 'Safety, consent, and care are non-negotiable. We protect the vulnerable.' },
  { icon: Music, title: 'Conscious Celebration', desc: 'Joy is sacred. We gather in music, dance, and ceremony as acts of collective coherence.' },
];

export default function Community() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-emerald-deep/15 to-cosmic-black" />
        <div className="absolute inset-0 opacity-15">
          <MyceliumNetwork nodeCount={30} />
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
            <Users className="w-6 h-6 text-emerald-glow" />
            <span className="font-sacred text-emerald-glow/80 text-sm tracking-[0.3em]">COMMUNITY & EVENTS</span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-wider text-gradient-emerald mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            The Living Grid
          </motion.h1>

          <motion.p
            className="font-sacred text-moonlight-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            A global mycelium of conscious humans, rooted in place, connected by resonance.
          </motion.p>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-sacred">
          <SectionHeading
            title="Our Values"
            subtitle="The principles that hold the grid together."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityValues.map((value, i) => (
              <GlassCard key={value.title} delay={i * 0.1} className="p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-glow/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-emerald-glow" />
                </div>
                <h3 className="font-display text-lg tracking-wider text-moonlight-white mb-2">{value.title}</h3>
                <p className="font-body text-moonlight-white/40 text-sm leading-relaxed">{value.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="section-padding bg-gradient-to-b from-cosmic-black via-cosmic-deep to-cosmic-black">
        <div className="container-sacred">
          <SectionHeading
            title="Upcoming Events"
            subtitle="Gatherings, councils, and practices that weave the grid."
          />

          <div className="space-y-4 max-w-3xl mx-auto">
            {events.map((event, i) => (
              <GlassCard key={event.title} delay={i * 0.1} className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-glow/10 text-emerald-glow text-xs font-display tracking-wider">
                        {event.type}
                      </span>
                    </div>
                    <h3 className="font-display text-lg tracking-wider text-moonlight-white mb-2">{event.title}</h3>
                    <p className="font-body text-moonlight-white/40 text-sm leading-relaxed mb-3">{event.desc}</p>
                    <div className="flex items-center gap-4 text-xs text-moonlight-white/30">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-sacred max-w-4xl">
          {/* Musement Stage Feature */}
          <GlassCard bio className="p-8 sm:p-10 mb-10">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-16 h-16 rounded-full bg-solarpunk-biolum/10 flex items-center justify-center shrink-0">
                <Mic className="w-8 h-8 text-solarpunk-biolum" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-display text-xl tracking-wider text-gradient-biolum mb-2">
                  The Ethereal Muse Portal — The Musement Stage
                </h3>
                <p className="font-body text-moonlight-white/50 leading-relaxed">
                  Monthly conscious celebration with music, dance, projection art, poetry, storytelling, live performance,
                  sacred humour, and community gathering. A space where creativity, play, and resonance converge.
                </p>
              </div>
            </div>
          </GlassCard>

          <div className="text-center">
            <GlassCard gold className="p-8 sm:p-12 max-w-2xl mx-auto">
              <h3 className="font-display text-2xl tracking-wider text-gradient-gold mb-4">
                Join The Living Grid
              </h3>
              <p className="font-sacred text-moonlight-white/50 mb-6 leading-relaxed">
                The grid grows stronger with every node. Your presence matters.
              </p>
              <Link
                to="/join"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-sacred/20 border border-gold-sacred/30 hover:bg-gold-sacred/30 transition-all font-display text-sm tracking-widest text-gold-sacred"
              >
                Join The Resonance
                <ArrowRight className="w-4 h-4" />
              </Link>
            </GlassCard>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
