import { useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import { GalleryImage, categoryLabels } from '../data/gallery';

interface GalleryImageCardProps {
  image: GalleryImage;
  index?: number;
  onClick?: () => void;
  eager?: boolean;
}

export default function GalleryImageCard({
  image,
  index = 0,
  onClick,
  eager = false,
}: GalleryImageCardProps) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  const label = categoryLabels[image.category] ?? image.category;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
    >
      <div
        className="group cursor-pointer rounded-3xl overflow-hidden border border-[#D6B25E]/30 bg-[#0F2E2B]/60"
        style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,178,94,0.06)' }}
        onClick={onClick}
        role="button"
        aria-label={`View ${image.title} fullscreen`}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.(); }}
      >
        {/* Thumbnail frame */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#0a1f18]">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.04]"
            loading={eager ? 'eager' : 'lazy'}
            onError={() => setFailed(true)}
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#040d09]/85 via-transparent to-transparent" />
          {/* Expand icon */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(16,185,129,0.18)',
                border: '1px solid rgba(16,185,129,0.35)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Maximize2 className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          {/* Labels */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-display tracking-widest mb-1.5 inline-block capitalize"
              style={{
                background: 'rgba(16,185,129,0.12)',
                border: '1px solid rgba(16,185,129,0.2)',
                color: '#6ee7b7',
              }}
            >
              {label}
            </span>
            <h3 className="font-display text-xs sm:text-sm tracking-wider text-moonlight-white/90 leading-snug line-clamp-2">
              {image.title}
            </h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
