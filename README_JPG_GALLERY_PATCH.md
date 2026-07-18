# Gallery Image Optimisation Patch

This patch converts all current Green Resonance PNG gallery images to optimized JPG files.

## Results

- Original PNG total: 47.24 MB
- Optimized JPG total: 9.44 MB
- Size reduction: 80.0%

## Install

Copy these folders into the Bolt/StackBlitz project:

- `public/Gallery/`
- `src/data/gallery.ts`
- `src/components/GalleryShowcase.tsx`
- `src/components/GalleryImageCard.tsx`
- `src/pages/MediaGallery.tsx`

Then run:

```bash
npm run typecheck
npm run build
```

## Future uploads

1. Convert future uploaded artwork/maps/posters to `.jpg` before adding them to Bolt.
2. Place them in `public/Gallery/`.
3. Add a new object to `src/data/gallery.ts`.
4. Keep the folder casing exactly `/Gallery/`.
5. Use `object-contain` for maps, posters, sigils, and text-heavy images.

Avoid mixing `/gallery/` and `/Gallery/`; deployed Linux hosting is case-sensitive.
