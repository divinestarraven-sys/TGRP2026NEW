export const MYCELIUM_PRICE_USD = 40;

// TODO: Replace the empty string with your live Stripe Payment Link
// e.g. https://buy.stripe.com/YOUR_REAL_PAYMENT_LINK
// Set the env var: VITE_MYCELIUM_STRIPE_PAYMENT_LINK=https://buy.stripe.com/...
export const MYCELIUM_STRIPE_PAYMENT_LINK =
  import.meta.env.VITE_MYCELIUM_STRIPE_PAYMENT_LINK || '';

export const myceliumAccessKeys = [
  {
    title: '1. Access to All Seed Sections',
    description:
      'Includes the full Seed Membership layer, Codex previews, early framework updates, practice ecosystem entries, and foundational Green Resonance archives.',
  },
  {
    title: '2. Weekly Guided Practices',
    description:
      'Receive weekly guided reflections, grounding prompts, embodiment practices, symbolic inquiry, and integration exercises.',
  },
  {
    title: '3. New Moon Council Access',
    description:
      'Join the monthly New Moon Council for intention setting, reflection, symbolic navigation, community sharing, and regenerative planning.',
  },
  {
    title: '4. Resource Library',
    description:
      'Access member resources including PDFs, practice cards, workbook previews, garden notes, sigil references, and learning materials.',
  },
  {
    title: '5. Community Events Circle',
    description:
      'Receive access to the monthly community timetable, event invitations, live circle updates, and seasonal gathering notes.',
  },
  {
    title: '6. Living Codex Access',
    description:
      'Explore the growing Codex of pillars, portals, Ravenstar, Phoenix Principle, Rhythmic Weave, Garden systems, and symbolic maps.',
  },
  {
    title: '7. Practice Archive',
    description:
      'Browse archived guided practices, journal prompts, meditations, breathwork notes, and embodiment exercises.',
  },
  {
    title: '8. MUSEschool Development Notes',
    description:
      'Follow the development of the MUSEschool ecosystem, learning pathways, workshops, and regenerative education model.',
  },
  {
    title: '9. Member Field Notes',
    description:
      'Receive Green Resonance field notes on ecology, systems thinking, symbolic literacy, emotional resilience, and practical stewardship.',
  },
  {
    title: '10. Circle Invitations',
    description:
      'Priority invitations to future online circles, community calls, workshops, creative gatherings, and seasonal events.',
  },
  {
    title: '11. Mycelium Network Access',
    description:
      'Enter the deeper member layer of the Green Resonance community — a living network for practice, learning, reflection, and collaboration.',
  },
];

export const monthlyCommunityTimetable = [
  {
    week: 'Week 1',
    title: 'Rooting Circle',
    focus: 'Grounding, intention setting, weekly practice orientation, and member check-in.',
  },
  {
    week: 'Week 2',
    title: 'Living Systems Study',
    focus: 'Framework study, regenerative design, systems thinking, resource library focus, and guided inquiry.',
  },
  {
    week: 'Week 3',
    title: 'Creative Weave Circle',
    focus: 'Symbolic literacy, art, music, storytelling, sacred humour, and creative integration.',
  },
  {
    week: 'New Moon',
    title: 'New Moon Council',
    focus: 'Reflection, release, intention setting, seasonal awareness, community wisdom, and alignment.',
  },
  {
    week: 'Monthly',
    title: 'Community Events Circle',
    focus: 'Monthly event planning, workshop previews, member announcements, and future gathering updates.',
  },
];
