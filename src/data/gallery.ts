export interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  category: string;
  description: string;
}

// All images use the /gallery/ subfolder in /public
export const galleryImages: GalleryImage[] = [
  {
    src: '/Gallery/01-best-new-garden-map.png',
    alt: 'Best New Resonance Garden Map — complete bioregional layout of the living garden system',
    title: 'Resonance Garden — Best New Map',
    category: 'garden',
    description: 'The latest and most complete map of the Resonance Garden bioregional layout.',
  },
  {
    src: '/Gallery/02-new-green-resonance-garden-map-delta.png',
    alt: 'Green Resonance Garden Map Delta — updated delta version showing ecological zones and portal connections',
    title: 'Green Resonance Garden Map — Delta',
    category: 'garden',
    description: 'Delta edition of the Green Resonance Garden Master Map showing updated portal connections.',
  },
  {
    src: '/Gallery/03-really-good-for-poster.png',
    alt: 'Green Resonance Project — high quality poster artwork for the living framework',
    title: 'Green Resonance — Poster Artwork',
    category: 'framework',
    description: 'High quality poster artwork representing the Green Resonance living framework.',
  },
  {
    src: '/Gallery/04-six-pillars-latest-update.png',
    alt: 'Six Pillars of the Green Resonance Framework — latest update showing all six foundational pillars',
    title: 'Six Pillars — Latest Update',
    category: 'pillars',
    description: 'The latest update to the Six Pillars diagram showing all foundational relationships.',
  },
  {
    src: '/Gallery/05-six-pillars-rhythmic-weave-edition.png',
    alt: 'Six Pillars Rhythmic Weave Edition — the connective thread woven through all six pillars',
    title: 'Six Pillars — Rhythmic Weave Edition',
    category: 'pillars',
    description: 'The Rhythmic Weave edition emphasising the connective thread between all six pillars.',
  },
  {
    src: '/Gallery/06-green-resonance-framework-six-pillars-maxres.png',
    alt: 'The Green Resonance Framework Six Pillars — maximum resolution complete overview of the integrated system',
    title: 'The Green Resonance Framework — Six Pillars (MaxRes)',
    category: 'framework',
    description: 'Maximum resolution overview of the complete Green Resonance Framework six-pillar system.',
  },
  {
    src: '/Gallery/07-keys-to-the-kingdom-keys.png',
    alt: 'Keys to The Kingdom — symbolic keys representing portal gates and transformation stages',
    title: 'Keys to The Kingdom — The Keys',
    category: 'keys',
    description: 'Symbolic keys representing the portal gates and transformation stages of the journey.',
  },
  {
    src: '/Gallery/08-keys-to-the-kingdom-master-map.png',
    alt: 'Keys to The Kingdom Master Map — complete map of all portals, pathways and interconnections',
    title: 'Keys to The Kingdom — Master Map',
    category: 'keys',
    description: 'The complete master map showing all portals, pathways, and their interconnections.',
  },
  {
    src: '/Gallery/09-phoenix-master-sigil.png',
    alt: 'The Phoenix Master Sigil — sacred symbol of transformation, rebirth, and rising from ashes',
    title: 'The Phoenix Master Sigil',
    category: 'phoenix',
    description: 'The sacred sigil of the Phoenix principle — burn what is false, protect what is true, rise in alignment.',
  },
  {
    src: '/Gallery/10-green-resonance-workbook-cover.png',
    alt: 'The Green Resonance Workbook — cover of the complete practice workbook for the resonance journey',
    title: 'The Green Resonance Workbook',
    category: 'resources',
    description: 'Cover of the complete workbook for the Green Resonance practice journey.',
  },
];

export const categoryLabels: Record<string, string> = {
  All: 'All',
  framework: 'Framework',
  pillars: 'Pillars',
  phoenix: 'Phoenix',
  keys: 'Keys',
  garden: 'Garden',
  resources: 'Resources',
};

export const getImagesByCategory = (category: string): GalleryImage[] =>
  galleryImages.filter((img) => img.category === category);

export const getFeaturedImages = (limit = 3): GalleryImage[] =>
  galleryImages.slice(0, limit);
