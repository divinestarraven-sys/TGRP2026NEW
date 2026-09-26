/** Proposed curriculum approved for drafting, September 2026. No scheduled places or prices. */
export interface LearningOffering {
  slug: string;
  title: string;
  kind: 'session' | 'bundle' | 'programme';
  pathway: 'mycelium' | 'canopy';
  format: string;
  contactMinutes: number;
  independentMinutes: number;
  schedule: string;
  summary: string;
  modules: { title: string; content: string; outcome: string }[];
  fields: number[];
}
export const learningPolicy = 'Green Resonance is freely available to everyone. Explore, learn, create and participate without a membership fee. Contributions of time, knowledge, care or money are welcome and entirely optional.';
export const enquiryEmail = 'DivineStarRaven@gmail.com';
export function enquiryHref(title: string) {
  return `mailto:${enquiryEmail}?subject=${encodeURIComponent(`Green Resonance expression of interest: ${title}`)}&body=${encodeURIComponent(`Hello, I am interested in ${title}.\n\nMy preferred format/time zone:\nMy availability:\nAccess needs I would like to discuss (optional):\n\nPlease contact me when details are confirmed.`)}`;
}
export function duration(minutes: number) {
  return minutes % 60 === 0 ? `${minutes / 60} hours` : `${minutes} minutes`;
}
const sessionInputs = [
  ['begin-the-journey', 'Begin the Green Resonance Journey', 60, 'Six Pillars, seven Portals, Central Heart and turning values into practice.', 'A seven-day personal practice plan.', [1, 7]],
  ['observe-before-you-interpret', 'Observe Before You Interpret', 75, 'Awareness, discernment, observation versus assumption and reflective journalling.', 'An observation journal and one question to investigate.', [2]],
  ['map-a-living-system', 'Map a Living System', 90, 'Feedback loops, resources, relationships and unintended consequences.', 'A map of a household, garden or community system.', [2, 3, 5]],
  ['gardens-first-step', 'Design Your Garden’s First Step', 90, 'Site observation, sunlight, water, soil care and a realistic first intervention.', 'A small garden action plan; this is not a professional site design.', [3]],
  ['rhythmic-weave', 'The Rhythmic Weave', 75, 'Listening, music, optional gentle movement and creative reflection, with seated alternatives.', 'A personal rhythm practice.', [4]],
  ['community-care', 'Community Care & Shared Responsibility', 90, 'Consent, listening, role rotation, handovers and conflict repair.', 'A draft responsibility roster and meeting agreement.', [5]],
  ['symbols-as-mirrors', 'Symbols as Mirrors', 75, 'Selected symbolic keys, source awareness and optional tarot reflection. Separate historical meanings, project interpretation and factual evidence.', 'A reflective exercise that separates symbolism from factual claims.', [6]],
] as const;
export const offerings: LearningOffering[] = [
  ...sessionInputs.map(([slug, title, contactMinutes, summary, outcome, fields]) => ({
    slug, title, contactMinutes, independentMinutes: 0, summary, fields: [...fields],
    kind: 'session' as const, pathway: 'mycelium' as const, format: 'Live online group session',
    schedule: 'One standalone session; date, time zone and group size to be confirmed.',
    modules: [{ title: 'Guided learning and practice', content: summary, outcome }],
  })),
  {
    slug: 'roots', title: 'Roots — Six Pillars in Daily Life', kind: 'bundle', pathway: 'mycelium',
    format: 'Live online course', contactMinutes: 540, independentMinutes: 180,
    schedule: 'Six weekly sessions of 90 minutes, plus 30 minutes of personal practice each week.',
    summary: 'Explore one Pillar each week and build a sustainable personal practice plan.', fields: [1, 2, 3, 4, 5, 6, 7],
    modules: [
      { title: 'Awareness & Discernment', content: 'Observe carefully; distinguish what you notice from what you assume.', outcome: 'An observation journal.' },
      { title: 'Moral Objectivity & Ethical Living', content: 'Discuss values, consent and accountable action, with room for disagreement.', outcome: 'A values-to-actions practice.' },
      { title: 'Reality & Systems Intelligence', content: 'Map relationships, feedback and unintended consequences.', outcome: 'A small system map.' },
      { title: 'Human & Earth Integration', content: 'Connect everyday choices to soil, water and ecological care.', outcome: 'One realistic stewardship action.' },
      { title: 'Embodiment & Conscious Action', content: 'Turn intentions into manageable habits and review their effects.', outcome: 'A weekly practice routine.' },
      { title: 'Ethereal Resonance & The Rhythmic Weave', content: 'Explore listening, optional movement and creative reflection. Frame metaphysical language as project symbolism.', outcome: 'An integrated personal practice plan.' },
    ],
  },
  {
    slug: 'living-garden', title: 'Living Garden — Observe, Design, Care', kind: 'bundle', pathway: 'mycelium',
    format: 'Live online course with local observation tasks', contactMinutes: 360, independentMinutes: 180,
    schedule: 'Four weekly sessions of 90 minutes, plus 45 minutes of independent practice each week.',
    summary: 'Plan and review a small garden intervention, grounded in site observation.', fields: [3, 2],
    modules: [
      { title: 'Observe a place', content: 'Notice sunlight, water, soil and existing life using an accessible site or container garden.', outcome: 'A site observation record.' },
      { title: 'Map living flows', content: 'Trace soil, water and material flows and identify limits.', outcome: 'A garden system map.' },
      { title: 'Choose a small intervention', content: 'Scope a manageable action and identify any specialist advice needed.', outcome: 'A practical action plan.' },
      { title: 'Review and care', content: 'Compare observations, discuss uncertainty and adapt ongoing care.', outcome: 'A review and stewardship plan.' },
    ],
  },
  {
    slug: 'community-weave', title: 'Community Weave — Cooperate & Create', kind: 'bundle', pathway: 'mycelium',
    format: 'Live online course', contactMinutes: 360, independentMinutes: 120,
    schedule: 'Four weekly sessions of 90 minutes, plus 30 minutes of independent practice each week.',
    summary: 'Develop agreements, shared responsibilities and a small community project.', fields: [5, 4, 8],
    modules: [
      { title: 'Agree how to participate', content: 'Consent, listening, inclusion and group agreements.', outcome: 'A draft meeting agreement.' },
      { title: 'Share responsibility', content: 'Rotate roles, document decisions and practise clear handovers.', outcome: 'A responsibility roster.' },
      { title: 'Practise cooperation', content: 'Use creative activities and cooperative stewardship games.', outcome: 'A short group activity.' },
      { title: 'Create and review', content: 'Plan a small community project with a feedback and conflict-repair process.', outcome: 'A scoped community project plan.' },
    ],
  },
  {
    slug: 'facilitator-foundations', title: 'Green Resonance Facilitator Foundations', kind: 'programme', pathway: 'canopy',
    format: 'In person; proposed group of 6–8 adults', contactMinutes: 1440, independentMinutes: 360,
    schedule: 'Four teaching days, ideally across two weekends. Proposed daily hours: 9:30 am–4:30 pm, including a 30-minute lunch and two 15-minute breaks. Venue, dates and local time zone to be confirmed.',
    summary: 'An internal, non-accredited programme preparing participants to facilitate introductory Green Resonance activities.', fields: [7, 1, 2, 3, 4, 5, 6, 8],
    modules: [
      { title: 'Day 1 — Facilitate with Care · 6 hours', content: 'Framework orientation, consent, inclusion, boundaries, listening and manageable session design. Lead: adult educator; support: community and framework educators.', outcome: 'A group agreement and first lesson outline.' },
      { title: 'Day 2 — Teach Through Place · 6 hours', content: 'Outdoor observation, garden-system mapping, accessible practical activities, checking evidence and recognising specialist boundaries. Lead: garden/ecology educator; support: adult educator.', outcome: 'A supervised place-based learning activity.' },
      { title: 'Day 3 — Rhythm, Story & Cooperation · 6 hours', content: 'Sound, storytelling, optional movement, symbolic literacy, cooperative games, rotating roles and handovers. Lead: music/community-arts facilitator; support: community facilitator and symbolic-literacy guest.', outcome: 'A short group activity and stewardship plan.' },
      { title: 'Day 4 — Practise, Receive Feedback, Improve · 6 hours', content: 'Twenty-minute participant micro-teaching, peer feedback, practical scenarios, revised plans and next steps. Lead: adult educator with relevant subject specialists.', outcome: 'A reviewed session plan and personal development record.' },
    ],
  },
];
export const teachingFields = [
  { id: 1, name: 'Framework, ethics & personal practice', content: 'Six Pillars, Portals, Central Heart, values, daily practice and reflective journals.', specialist: 'Green Resonance framework educator, supported by an experienced ethics educator.', role: 'Lead orientation and review ethical claims and discussion exercises.' },
  { id: 2, name: 'Discernment & systems thinking', content: 'Observation, evidence, feedback loops, resource mapping and unintended consequences.', specialist: 'Systems-thinking educator; science educator or researcher for evidence review.', role: 'Teach system mapping and check factual accuracy.' },
  { id: 3, name: 'Regenerative gardening & ecology', content: 'Site observation, soil, sunlight, water, compost, food gardens, native regeneration and biodiversity.', specialist: 'Experienced horticulturist or permaculture educator, with an ecologist/restoration practitioner for habitat content.', role: 'Lead practical learning and review local ecological guidance.' },
  { id: 4, name: 'Rhythm, music & creative expression', content: 'Rhythmic Weave, listening, storytelling, creative play and optional movement.', specialist: 'Music/community-arts facilitator; experienced inclusive dance or movement teacher for movement instruction.', role: 'Lead creative sessions and provide accessible participation options.' },
  { id: 5, name: 'Community cooperation & stewardship', content: 'Consent, agreements, rotating roles, meetings, handovers and conflict repair.', specialist: 'Community-development practitioner and experienced group facilitator; mediator for conflict modules.', role: 'Teach cooperation and facilitate challenging exercises.' },
  { id: 6, name: 'Symbolic literacy & cultural context', content: 'Twenty Keys, myth, reflective symbolism, tarot and historical versus modern interpretations.', specialist: 'Religious-studies, folklore or history educator; source-literate tarot educator for tarot practice.', role: 'Review provenance and teach symbolism as reflection, not factual prediction.' },
  { id: 7, name: 'Teaching & inclusive facilitation', content: 'Lesson plans, learning outcomes, accessible activities, micro-teaching, feedback and assessment.', specialist: 'Adult educator or teacher trainer with inclusive-learning experience.', role: 'Lead Canopy facilitator training and assess observed practice.' },
  { id: 8, name: 'Practical delivery & event operations', content: 'Equipment, sound, venue setup, outdoor activities, communication and incident procedures.', specialist: 'Experienced event producer/outdoor programme leader, with relevant safety specialists for particular activities.', role: 'Prepare delivery plans and supervise practical operations.' },
];
