import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, MapPin, Send, Check, MessageCircle } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SacredGeometry from '../components/SacredGeometry';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';

const contactMethods = [
  { icon: Mail, title: 'Email', value: 'resonance@greenresonance.org', desc: 'For inquiries, collaborations, and deep conversations.' },
  { icon: MapPin, title: 'Bioregion', value: 'Global Network', desc: 'Rooted in the Nordic wilderness, connected worldwide.' },
  { icon: MessageCircle, title: 'Oracle', value: 'AI Chat', desc: 'Use the Oracle chatbot in the bottom-right corner for immediate guidance.' },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', type: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
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
          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-wider text-gradient-emerald mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Contact
          </motion.h1>

          <motion.p
            className="font-sacred text-moonlight-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Reach out. The grid is listening.
          </motion.p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="section-padding">
        <div className="container-sacred">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            {contactMethods.map((method, i) => (
              <GlassCard key={method.title} delay={i * 0.1} className="p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-glow/10 flex items-center justify-center mx-auto mb-4">
                  <method.icon className="w-6 h-6 text-emerald-glow" />
                </div>
                <h3 className="font-display text-lg tracking-wider text-moonlight-white mb-1">{method.title}</h3>
                <p className="font-display text-sm text-emerald-glow mb-2">{method.value}</p>
                <p className="font-body text-moonlight-white/40 text-sm">{method.desc}</p>
              </GlassCard>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-xl mx-auto">
            <SectionHeading
              title="Send a Signal"
              subtitle="Every message is a thread in the weave."
            />

            {!submitted ? (
              <GlassCard className="p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-display text-xs tracking-widest text-moonlight-white/40 mb-2">NAME</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-cosmic-deep/50 border border-emerald-glow/10 text-sm font-body text-moonlight-white placeholder:text-moonlight-white/20 focus:outline-none focus:border-emerald-glow/30 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block font-display text-xs tracking-widest text-moonlight-white/40 mb-2">EMAIL</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-cosmic-deep/50 border border-emerald-glow/10 text-sm font-body text-moonlight-white placeholder:text-moonlight-white/20 focus:outline-none focus:border-emerald-glow/30 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-display text-xs tracking-widest text-moonlight-white/40 mb-2">INQUIRY TYPE</label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-cosmic-deep/50 border border-emerald-glow/10 text-sm font-body text-moonlight-white focus:outline-none focus:border-emerald-glow/30 transition-colors appearance-none"
                    >
                      <option value="" className="bg-cosmic-deep">Select inquiry type</option>
                      <option value="collaboration" className="bg-cosmic-deep">Collaboration</option>
                      <option value="workshop" className="bg-cosmic-deep">Workshop Inquiry</option>
                      <option value="media" className="bg-cosmic-deep">Media Inquiry</option>
                      <option value="retreat" className="bg-cosmic-deep">Retreat / Garden Interest</option>
                      <option value="general" className="bg-cosmic-deep">General</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-display text-xs tracking-widest text-moonlight-white/40 mb-2">SUBJECT</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-cosmic-deep/50 border border-emerald-glow/10 text-sm font-body text-moonlight-white placeholder:text-moonlight-white/20 focus:outline-none focus:border-emerald-glow/30 transition-colors"
                      placeholder="What calls you?"
                    />
                  </div>
                  <div>
                    <label className="block font-display text-xs tracking-widest text-moonlight-white/40 mb-2">MESSAGE</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-cosmic-deep/50 border border-emerald-glow/10 text-sm font-body text-moonlight-white placeholder:text-moonlight-white/20 focus:outline-none focus:border-emerald-glow/30 transition-colors resize-none"
                      placeholder="Speak your truth..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-emerald-glow/20 border border-emerald-glow/30 hover:bg-emerald-glow/30 transition-all font-display text-sm tracking-widest text-emerald-glow flex items-center justify-center gap-2"
                  >
                    Send Signal
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </GlassCard>
            ) : (
              <GlassCard gold className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-glow/10 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-emerald-glow" />
                  </div>
                  <h3 className="font-display text-xl tracking-wider text-gradient-emerald mb-2">
                    Signal Received
                  </h3>
                  <p className="font-sacred text-moonlight-white/50 leading-relaxed">
                    Your message has entered the weave. We will respond in resonance.
                  </p>
                </motion.div>
              </GlassCard>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
