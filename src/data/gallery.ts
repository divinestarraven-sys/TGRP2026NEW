export interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  category: GalleryCategory;
  description: string;
}

export type GalleryCategory =
  | 'framework'
  | 'pillars'
  | 'phoenix'
  | 'keys'
  | 'garden'
  | 'resources'
  | 'ravenstar'
  | 'codex';

// Public assets live in /public/Gallery.
// Keep the capital G consistent: Linux/Bolt hosting is case-sensitive.
export const GALLERY_BASE_PATH = '/Gallery';

// Add future gallery uploads here after placing optimized .jpg files in /public/Gallery.
// Use JPG for photographic/poster artwork to keep the Bolt project lightweight.
export const galleryImages: GalleryImage[] = [
  {
    src: `${GALLERY_BASE_PATH}/01-best-new-garden-map.jpg`,
    alt: 'Best New Resonance Garden Map — complete bioregional layout of the living garden system',
    title: 'Resonance Garden — Best New Map',
    category: 'garden',
    description: 'The latest complete Resonance Garden bioregional layout for the Green Resonance Project.',
  },
  {
    src: `${GALLERY_BASE_PATH}/02-new-green-resonance-garden-map-delta.jpg`,
    alt: 'Green Resonance Garden Map Delta — updated map showing ecological zones and portal connections',
    title: 'Green Resonance Garden Map — Delta',
    category: 'garden',
    description: 'Delta edition of the Green Resonance Garden Master Map showing updated portal connections and systems.',
  },
  {
    src: `${GALLERY_BASE_PATH}/03-green-resonance-poster-artwork.jpg`,
    alt: 'Green Resonance Project poster artwork for the living framework',
    title: 'Green Resonance — Poster Artwork',
    category: 'framework',
    description: 'Poster-ready artwork representing the Green Resonance living framework.',
  },
  {
    src: `${GALLERY_BASE_PATH}/04-six-pillars-latest-update.jpg`,
    alt: 'Six Pillars of the Green Resonance Framework — latest update showing all six foundational pillars',
    title: 'Six Pillars — Latest Update',
    category: 'pillars',
    description: 'Latest Six Pillars diagram showing the core pillar relationships and practice structure.',
  },
  {
    src: `${GALLERY_BASE_PATH}/05-six-pillars-rhythmic-weave-edition.jpg`,
    alt: 'Six Pillars Rhythmic Weave Edition — connective thread woven through all six pillars',
    title: 'Six Pillars — Rhythmic Weave Edition',
    category: 'pillars',
    description: 'Rhythmic Weave edition emphasising resonance, reciprocity, rhythm, reflection, reverence, and remembrance.',
  },
  {
    src: `${GALLERY_BASE_PATH}/06-green-resonance-framework-six-pillars-maxres.jpg`,
    alt: 'The Green Resonance Framework Six Pillars — maximum resolution complete overview of the integrated system',
    title: 'The Green Resonance Framework — Six Pillars MaxRes',
    category: 'framework',
    description: 'Maximum resolution overview of the complete Green Resonance Framework six-pillar system.',
  },
  {
    src: `${GALLERY_BASE_PATH}/07-keys-to-the-kingdom-keys.jpg`,
    alt: 'Keys to The Kingdom symbolic keys representing portal gates and transformation stages',
    title: 'Keys to The Kingdom — The Keys',
    category: 'keys',
    description: 'Symbolic keys representing the portal gates and transformation stages of the Green Resonance journey.',
  },
  {
    src: `${GALLERY_BASE_PATH}/08-keys-to-the-kingdom-master-map.jpg`,
    alt: 'Keys to The Kingdom Master Map — complete map of portals, pathways and interconnections',
    title: 'Keys to The Kingdom — Master Map',
    category: 'keys',
    description: 'The complete master key map showing portals, pathways, symbols, and their interconnections.',
  },
  {
    src: `${GALLERY_BASE_PATH}/09-phoenix-master-sigil.jpg`,
    alt: 'The Phoenix Master Sigil — sacred symbol of transformation, rebirth, and rising from ashes',
    title: 'The Phoenix Master Sigil',
    category: 'phoenix',
    description: 'The sacred sigil of the Phoenix Principle: burn what is false, protect what is true, rise in alignment.',
  },
  {
    src: `${GALLERY_BASE_PATH}/10-green-resonance-workbook-cover.jpg`,
    alt: 'The Green Resonance Workbook cover artwork for the complete practice workbook',
    title: 'The Green Resonance Workbook Cover',
    category: 'resources',
    description: 'Cover artwork for the Green Resonance workbook and practice journey.',
  },
  {
    src: `${GALLERY_BASE_PATH}/11-keys-to-the-kingdom-delta-master-map.jpg`,
    alt: 'Keys to The Kingdom Delta Master Key Map integrating six keys, seven portals, and the Garden system',
    title: 'Keys to The Kingdom — Delta Garden Integration',
    category: 'keys',
    description: 'A detailed master key map integrating six keys, seven portals, harmonic correspondences, and Garden infrastructure.',
  },
  {
    src: `${GALLERY_BASE_PATH}/12-keys-to-the-kingdom-symbolic-map.jpg`,
    alt: 'Keys to The Kingdom symbolic map showing six master keys, terrain, ethics, and associated symbols',
    title: 'Keys to The Kingdom — Symbolic Map',
    category: 'keys',
    description: 'A symbolic map of the six master keys, safety ethics, topography, apothecary guilds, and sacred geometry.',
  },
  {
    src: `${GALLERY_BASE_PATH}/13-six-pillars-daily-practice-cards.jpg`,
    alt: 'Green Resonance Framework daily practice cards showing six pillars and six portal keys',
    title: 'Six Pillars — Daily Practice Cards',
    category: 'pillars',
    description: 'A complete daily practice card spread for the six pillars, six portal keys, and Rhythmic Weave principles.',
  },
  {
    src: `${GALLERY_BASE_PATH}/14-six-pillars-portal-keys-expanded.jpg`,
    alt: 'Expanded Green Resonance daily practice cards with six portal keys and sigils',
    title: 'Six Pillars — Portal Keys Expanded',
    category: 'pillars',
    description: 'Expanded six-pillar card system with portal key sigils, affirmations, action steps, and living integration.',
  }
];

export const categoryLabels: Record<'All' | GalleryCategory, string> = {
  All: 'All',
  framework: 'Framework',
  pillars: 'Pillars',
  phoenix: 'Phoenix',
  keys: 'Keys',
  garden: 'Garden',
  resources: 'Resources',
  ravenstar: 'Ravenstar',
  codex: 'Codex',
};

export const galleryCategories: Array<'All' | GalleryCategory> = [
  'All',
  'framework',
  'pillars',
  'phoenix',
  'keys',
  'garden',
  'resources',
  'ravenstar',
  'codex',
];

export const getImagesByCategory = (category: GalleryCategory): GalleryImage[] =>
  galleryImages.filter((img) => img.category === category);

export const getFeaturedImages = (limit = 4): GalleryImage[] =>
  galleryImages.slice(0, limit);

const normaliseImageKey = (src: string): string =>
  src
    .toLowerCase()
    .replace(/^\/?gallery\//, '')
    .replace(/^\/?public\/gallery\//, '')
    .replace(/\.(png|jpe?g|webp|gif|avif)$/i, '');

export const findGalleryImageBySrc = (src: string): GalleryImage | undefined => {
  const wanted = normaliseImageKey(src);

  return galleryImages.find((img) => normaliseImageKey(img.src) === wanted);
};
