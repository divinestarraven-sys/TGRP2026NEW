import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, MapPin, Send, Check, MessageCircle, Loader2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SacredGeometry from '../components/SacredGeometry';
import PageTransition from '../components/PageTransition';
import SectionHeading from '../components/SectionHeading';
const CONTACT_EMAIL = 'DivineStarRaven@gmail.com';

const contactMethods = [
  { icon: Mail, title: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, desc: 'For inquiries, collaborations, and deep conversations.' },
  { icon: MapPin, title: 'Bioregion', value: 'Global Network', href: null, desc: 'Rooted in the Nordic wilderness, connected worldwide.' },
  { icon: MessageCircle, title: 'Oracle', value: 'AI Chat', href: null, desc: 'Use the Oracle chatbot near the bottom-right corner for immediate guidance.' },
];

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'delivery_warning' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', type: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setErrorMsg('');

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/contact-submit`;
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          inquiry_type: form.type,
          message: form.message,
          newsletter_consent: newsletterConsent,
        }),
      });
      if (!res.ok) {
        setFormState('error');
        setErrorMsg('Something went wrong. Please try again.');
        return;
      }
      const data = await res.json();
      if (data.ok) {
        if (data.delivery === 'unavailable' || data.delivery === 'uncertain') {
          setFormState('delivery_warning');
        } else {
          setFormState('success');
        }
      } else {
        setFormState('error');
        setErrorMsg('Something went wrong. Please try again.');
      }
    } catch {
      setFormState('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
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
            className="font-sacred text-moonlight-white/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
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
                {method.href ? (
                  <a
                    href={method.href}
                    aria-label={`Send email to ${method.value}`}
                    className="font-display text-sm text-emerald-glow hover:text-solarpunk-biolum transition-colors underline underline-offset-2 mb-2 inline-block"
                  >
                    {method.value}
                  </a>
                ) : (
                  <p className="font-display text-sm text-emerald-glow mb-2">{method.value}</p>
                )}
                <p className="font-body text-moonlight-white/80 text-sm">{method.desc}</p>
              </GlassCard>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-xl mx-auto">
            <SectionHeading
              title="Send a Signal"
              subtitle="Every message is a thread in the weave."
            />

            {formState === 'success' ? (
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
                  <p className="font-body text-moonlight-white/80 text-sm leading-relaxed">
                    Your message has entered the weave. We will respond in resonance.
                    {newsletterConsent && ' Check your email for a confirmation link to complete your newsletter subscription.'}
                  </p>
                </motion.div>
              </GlassCard>
            ) : formState === 'delivery_warning' ? (
              <GlassCard gold className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 rounded-full bg-gold-sacred/10 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-gold-sacred" />
                  </div>
                  <h3 className="font-display text-xl tracking-wider text-gradient-gold mb-2">
                    Message Received
                  </h3>
                  <p className="font-body text-moonlight-white/80 text-sm leading-relaxed mb-4">
                    Your contact message has been saved, but we had trouble sending the newsletter confirmation email. You can try submitting again later.
                  </p>
                  <button
                    onClick={() => setFormState('idle')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-sacred/15 border border-gold-sacred/25 hover:bg-gold-sacred/25 transition-all font-display text-xs tracking-widest text-gold-sacred"
                  >
                    Try Again
                  </button>
                </motion.div>
              </GlassCard>
            ) : formState !== 'idle' && formState !== 'submitting' && formState !== 'error' ? null : (
              <GlassCard className="p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block font-display text-xs tracking-widest text-moonlight-white/80 mb-2">NAME</label>
                      <input
                        id="contact-name"
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-cosmic-deep/50 border border-emerald-glow/10 text-sm font-body text-moonlight-white placeholder:text-moonlight-white/80 focus:outline-none focus:border-emerald-glow/30 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block font-display text-xs tracking-widest text-moonlight-white/80 mb-2">EMAIL</label>
                      <input
                        id="contact-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-cosmic-deep/50 border border-emerald-glow/10 text-sm font-body text-moonlight-white placeholder:text-moonlight-white/80 focus:outline-none focus:border-emerald-glow/30 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-type" className="block font-display text-xs tracking-widest text-moonlight-white/80 mb-2">INQUIRY TYPE</label>
                    <select
                      id="contact-type"
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
                    <label htmlFor="contact-subject" className="block font-display text-xs tracking-widest text-moonlight-white/80 mb-2">SUBJECT</label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-cosmic-deep/50 border border-emerald-glow/10 text-sm font-body text-moonlight-white placeholder:text-moonlight-white/80 focus:outline-none focus:border-emerald-glow/30 transition-colors"
                      placeholder="What calls you?"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block font-display text-xs tracking-widest text-moonlight-white/80 mb-2">MESSAGE</label>
                    <textarea
                      id="contact-message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-cosmic-deep/50 border border-emerald-glow/10 text-sm font-body text-moonlight-white placeholder:text-moonlight-white/80 focus:outline-none focus:border-emerald-glow/30 transition-colors resize-none"
                      placeholder="Speak your truth..."
                    />
                  </div>
                  <label htmlFor="contact-newsletter" className="flex items-start gap-3 cursor-pointer">
                    <input
                      id="contact-newsletter"
                      type="checkbox"
                      checked={newsletterConsent}
                      onChange={(e) => setNewsletterConsent(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-emerald-glow/20 bg-cosmic-deep/50 text-emerald-glow focus:ring-emerald-glow/30"
                    />
                    <span className="font-body text-moonlight-white/80 text-xs leading-relaxed">
                      Send me Green Resonance Project news and updates.
                    </span>
                  </label>
                  {formState === 'error' && (
                    <p role="alert" className="text-red-400/80 text-xs font-body">{errorMsg}</p>
                  )}
                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full py-3 rounded-xl bg-emerald-glow/20 border border-emerald-glow/30 hover:bg-emerald-glow/30 transition-all font-display text-sm tracking-widest text-emerald-glow flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {formState === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Signal
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </GlassCard>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
