import { motion } from 'framer-motion';

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({ title, subtitle, className = '', align = 'center' }: Props) {
  return (
    <motion.div
      className={`mb-12 sm:mb-16 ${align === 'center' ? 'text-center' : ''} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-wider text-gradient-canopy mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="font-sacred text-moonlight-white/45 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <motion.div
        className={`h-px bg-gradient-to-r from-transparent via-solarpunk-biolum/30 to-transparent mt-6 ${
          align === 'center' ? 'mx-auto' : ''
        }`}
        style={{ maxWidth: 200 }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      />
    </motion.div>
  );
}
