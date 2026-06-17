import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import GalleryImageCard from './GalleryImageCard';
import { galleryImages, GalleryImage } from '../data/gallery';

interface GalleryShowcaseProps {
  title?: string;
  subtitle?: string;
  category?: string;
  /** Override with specific image src paths to show */
  srcs?: string[];
  limit?: number;
  linkToGallery?: boolean;
}

export default function GalleryShowcase({
  title = 'Visual Resonance',
  subtitle = 'Images from The Green Resonance Project collection',
  category,
  srcs,
  limit = 3,
  linkToGallery = true,
}: GalleryShowcaseProps) {
  let images: GalleryImage[] = [];

  if (srcs && srcs.length > 0) {
    images = srcs
      .map((s) => galleryImages.find((img) => img.src === s))
      .filter((img): img is GalleryImage => img !== undefined)
      .slice(0, limit);
  } else if (category) {
    images = galleryImages.filter((img) => img.category === category).slice(0, limit);
  } else {
    images = galleryImages.slice(0, limit);
  }

  if (images.length === 0) return null;

  const cols =
    images.length === 1
      ? 'grid-cols-1 max-w-sm mx-auto'
      : images.length === 2
      ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto'
      : images.length === 3
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';

  return (
    <section className="section-padding">
      <div className="container-sacred">
        <div className="text-center mb-10">
          <motion.h2
            className="font-display text-2xl sm:text-3xl tracking-wider text-gradient-emerald mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="font-sacred text-moonlight-white/40 text-sm"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {subtitle}
          </motion.p>
        </div>

        <div className={`grid gap-5 ${cols}`}>
          {images.map((image, i) => (
            <GalleryImageCard
              key={image.src}
              image={image}
              index={i}
              eager={i === 0}
            />
          ))}
        </div>

        {linkToGallery && (
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-glow/15 border border-emerald-glow/25 hover:bg-emerald-glow/25 transition-all font-display text-sm tracking-widest text-emerald-glow"
            >
              View Full Gallery
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
