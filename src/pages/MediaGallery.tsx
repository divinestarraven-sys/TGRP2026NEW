import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import SacredGeometry from '../components/SacredGeometry';
import PageTransition from '../components/PageTransition';
import GalleryImageCard from '../components/GalleryImageCard';
import { galleryImages, categoryLabels } from '../data/gallery';

const filterCategories = ['All', 'framework', 'pillars', 'phoenix', 'keys', 'garden', 'resources'];

export default function MediaGallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  }, [filtered.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));
  }, [filtered.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, closeLightbox, goPrev, goNext]);

  const currentImage = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <PageTransition>
      {/* ── Hero ── */}
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
            <Camera className="w-6 h-6 text-emerald-glow" />
            <span className="font-sacred text-emerald-glow/80 text-sm tracking-[0.3em]">MEDIA GALLERY</span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-wider text-gradient-emerald mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Visual Resonance
          </motion.h1>

          <motion.p
            className="font-sacred text-moonlight-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Maps, frameworks, sigils, and living artwork from The Green Resonance Project.
          </motion.p>
        </div>
      </section>

      {/* ── Filter + Grid ── */}
      <section className="section-padding">
        <div className="container-sacred">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setLightboxIndex(null); }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-display tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? 'text-emerald-glow border border-emerald-glow/40'
                    : 'text-moonlight-white/40 border border-moonlight-white/10 hover:text-moonlight-white/70 hover:border-moonlight-white/20'
                }`}
                style={activeCategory === cat ? { background: 'rgba(16,185,129,0.12)' } : {}}
              >
                {categoryLabels[cat] ?? cat}
              </button>
            ))}
          </div>

          {/* Image grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item, i) => (
              <GalleryImageCard
                key={item.src}
                image={item}
                index={i}
                onClick={() => setLightboxIndex(i)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-moonlight-white/30 font-sacred py-16">
              No images in this category yet.
            </p>
          )}
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && currentImage && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.97)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Fullscreen image viewer"
          >
            {/* Close */}
            <button
              className="absolute top-5 right-5 z-10 p-2.5 rounded-full transition-all"
              style={{
                background: 'rgba(16,185,129,0.15)',
                border: '1px solid rgba(16,185,129,0.3)',
              }}
              onClick={closeLightbox}
              aria-label="Close fullscreen view"
            >
              <X className="w-5 h-5 text-emerald-400" />
            </button>

            {/* Prev */}
            {filtered.length > 1 && (
              <button
                className="absolute left-3 sm:left-6 z-10 p-2.5 rounded-full transition-all"
                style={{
                  background: 'rgba(16,185,129,0.12)',
                  border: '1px solid rgba(16,185,129,0.25)',
                }}
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-emerald-400" />
              </button>
            )}

            {/* Image */}
            <motion.div
              className="flex flex-col items-center justify-center px-16 sm:px-20"
              onClick={(e) => e.stopPropagation()}
              key={currentImage.src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.22 }}
            >
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="rounded-2xl"
                style={{
                  display: 'block',
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '96vw',
                  maxHeight: '90vh',
                  objectFit: 'contain',
                }}
              />
              <div className="mt-4 text-center">
                <p className="font-display tracking-wider text-moonlight-white/80 text-sm sm:text-base">
                  {currentImage.title}
                </p>
                {currentImage.description && (
                  <p className="font-sacred text-moonlight-white/35 text-xs mt-1 max-w-lg mx-auto">
                    {currentImage.description}
                  </p>
                )}
                <p className="font-sacred text-moonlight-white/20 text-xs mt-2">
                  {(lightboxIndex ?? 0) + 1} / {filtered.length}
                </p>
              </div>
            </motion.div>

            {/* Next */}
            {filtered.length > 1 && (
              <button
                className="absolute right-3 sm:right-6 z-10 p-2.5 rounded-full transition-all"
                style={{
                  background: 'rgba(16,185,129,0.12)',
                  border: '1px solid rgba(16,185,129,0.25)',
                }}
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 text-emerald-400" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
