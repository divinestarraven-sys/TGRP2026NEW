export interface SymbolicKeySource {
  id: string;
  label: string;
  url: string;
  publisher: string;
  title: string;
  reviewDate: string;
}

export interface SymbolicKey {
  number: number;
  name: string;
  slug: string;
  theme: string;
  introduction: string;
  greenResonance: string;
  historicalContext: string;
  practice: string;
  gardenApplication: string;
  reflectionQuestion: string;
  relatedPages: { path: string; label: string }[];
  relatedKeys: number[];
  sources: SymbolicKeySource[];
  disclaimers: string[];
  galleryImage: string | null;
  galleryImageAlt: string | null;
}

export const symbolicKeys: SymbolicKey[] = [
  {
    number: 1,
    name: 'Mystic Path',
    slug: 'mystic-path',
    theme: 'Humility, curiosity, discernment, and service.',
    introduction:
      'The Mystic Path invites careful observation before interpretation. It asks you to slow down and notice what is actually present, rather than what you expect or hope to find.',
    greenResonance:
      'Within Green Resonance, the Mystic Path is the practice of beginning every inquiry with honest observation. Before applying any framework or symbol, we look at what is really there. This grounds the entire project in humility and curiosity rather than assumption.',
    historicalContext:
      'Contemplative observation traditions appear across many cultures and periods. The emphasis on separating observation from inference has parallels in scientific method, mindfulness practice, and naturalist traditions. No single historical source is claimed here; the Mystic Path is a Green Resonance synthesis.',
    practice:
      'Observe one living place — a garden bed, a park corner, a windowsill — for five minutes. Afterwards, write two lists: what you actually noticed, and what you inferred or assumed. Notice the difference.',
    gardenApplication:
      'Keep a garden observation journal. Record what you see each week before deciding what to change. Let the garden teach you before you act.',
    reflectionQuestion: 'What did I assume today that I could have observed instead?',
    relatedPages: [
      { path: '/framework', label: 'Framework' },
      { path: '/pillars', label: '6 Pillars' },
      { path: '/garden', label: 'Resonance Garden' },
    ],
    relatedKeys: [8, 10, 13],
    sources: [],
    disclaimers: [
      'The Mystic Path is a Green Resonance project practice. It draws on widely shared contemplative principles but does not claim to represent any single tradition.',
    ],
    galleryImage: '/Gallery/01-best-new-garden-map.jpg',
    galleryImageAlt: 'Green Resonance garden map — an overview of the living systems layout.',
  },
  {
    number: 2,
    name: 'Seven Hermetic Principles',
    slug: 'seven-hermetic-principles',
    theme: 'Mentalism, correspondence, vibration, polarity, rhythm, cause and effect, and gender.',
    introduction:
      'The Seven Hermetic Principles are a philosophical framework presented in The Kybalion, a 1908 text attributed to "Three Initiates." They describe patterns of thought and nature that have influenced Western esoteric and philosophical traditions.',
    greenResonance:
      'Green Resonance uses these principles as reflective lenses, not as proven laws. The principle of Correspondence ("as above, so below") invites us to notice patterns across scales. The principle of Rhythm reminds us that gardens, communities, and personal energy all move in cycles. We treat these as thinking tools, not certainties.',
    historicalContext:
      'The Kybalion was published in 1908 by the Yogi Publication Society. While it claims ancient Hermetic lineage, modern scholarship attributes it to William Walker Atkinson and associates. The seven principles it describes — Mentalism, Correspondence, Vibration, Polarity, Rhythm, Cause and Effect, and Gender — draw on earlier Hermetic, Neoplatonic, and New Thought traditions. The historical concept of "gender" in this text refers to generative and receptive qualities, not to human gender identity or biological sex. Green Resonance does not treat it as a biological law or use it to prescribe roles.',
    practice:
      'Notice a recurring pattern in your week — a mood cycle, a social dynamic, a garden rhythm. Now test an alternative explanation: could something else be causing that pattern? Separate observation from the story you tell about it.',
    gardenApplication:
      'Use the principle of Rhythm to track seasonal cycles in your garden. Note what thrives in each phase rather than fighting the cycle.',
    reflectionQuestion: 'Which of these seven ideas do I most often use as a lens, and what might I be overlooking because of it?',
    relatedPages: [
      { path: '/codex', label: 'Codex' },
      { path: '/framework', label: 'Framework' },
    ],
    relatedKeys: [8, 11, 16],
    sources: [
      {
        id: 'A',
        label: 'The Kybalion (full text)',
        url: 'https://www.gutenberg.org/ebooks/14209',
        publisher: 'Project Gutenberg',
        title: 'The Kybalion: A Study of the Hermetic Philosophy of Ancient Egypt and Greece',
        reviewDate: '2026-09-24',
      },
    ],
    disclaimers: [
      'The Kybalion is a 1908 text, not an authenticated ancient Egyptian document. Green Resonance uses its principles as reflective tools, not proven laws.',
      'The concept of "gender" in the Hermetic tradition refers to generative and receptive qualities. It is not a statement about human gender identity, biological sex, or prescribed social roles.',
    ],
    galleryImage: null,
    galleryImageAlt: null,
  },
  {
    number: 3,
    name: 'Magician / Manifestation',
    slug: 'magician-manifestation',
    theme: 'Intention becomes useful through skill, resources, effort, feedback, and action.',
    introduction:
      'The Magician archetype represents the capacity to combine intention with practical skill. In the tarot tradition, the Magician stands with tools at hand, ready to act. Green Resonance emphasises that wishing alone does not change the world — effort, feedback, and material resources are essential.',
    greenResonance:
      'Within the project, "manifestation" means translating an idea into a concrete plan with real steps. The Magician reminds us that good intentions need soil, water, time, and honest assessment. We do not promise that thought alone changes external reality.',
    historicalContext:
      'The Magician (or Juggler) appears in the earliest known tarot decks from 15th-century Italy. Over centuries, the card evolved from a street performer figure to a symbol of creative will. The Metropolitan Museum of Art provides context on tarot history and structure.',
    practice:
      'Choose one goal you care about. Identify one resource you already have and one achievable step you can take this week. Write these down. That is practical manifestation.',
    gardenApplication:
      'Turn a garden wish into a small planting or maintenance plan. Choose one bed, one plant, and one weekend to begin.',
    reflectionQuestion: 'What intention have I been holding that needs one concrete step to move forward?',
    relatedPages: [
      { path: '/pillars', label: '6 Pillars' },
      { path: '/garden', label: 'Resonance Garden' },
    ],
    relatedKeys: [1, 6, 17],
    sources: [
      {
        id: 'B',
        label: 'History and structure of tarot',
        url: 'https://www.metmuseum.org/ja/perspectives/tarot-2',
        publisher: 'Metropolitan Museum of Art',
        title: 'The History of Tarot Cards',
        reviewDate: '2026-09-24',
      },
    ],
    disclaimers: [
      'Green Resonance does not claim that thought alone changes external reality. Manifestation here means intention combined with practical action.',
      'Tarot historical context is provided for cultural background, not as a divination endorsement.',
    ],
    galleryImage: null,
    galleryImageAlt: null,
  },
  {
    number: 4,
    name: 'Sacred Relationship Mirror',
    slug: 'sacred-relationship-mirror',
    theme: 'Consent, boundaries, reciprocity, honest listening, and repair.',
    introduction:
      'The Sacred Relationship Mirror reflects the quality of our connections with others. It asks us to examine whether our relationships are built on genuine consent, clear boundaries, and mutual care.',
    greenResonance:
      'Green Resonance treats healthy relationship as a practice, not a destiny. The Mirror invites us to look honestly at how we listen, how we respond to boundaries, and whether reciprocity is present. This applies equally to personal relationships, community dynamics, and ecological stewardship.',
    historicalContext:
      'Reflection on relationship quality appears across philosophical, spiritual, and therapeutic traditions. The specific emphasis on consent, boundaries, and repair draws from modern relational ethics and restorative practice. This key is a Green Resonance synthesis.',
    practice:
      'In your next meaningful conversation, distinguish three things: an observation (what actually happened), a feeling (your emotional response), and a respectful request (what you would like). Practice saying all three without blame.',
    gardenApplication:
      'Run a community check-in where each person has equal speaking time. Listen without planning your response.',
    reflectionQuestion: 'In my closest relationships, is energy flowing in both directions?',
    relatedPages: [
      { path: '/community', label: 'Community' },
      { path: '/stewardship-games', label: 'Stewardship Games' },
    ],
    relatedKeys: [7, 9, 13],
    sources: [],
    disclaimers: [
      'Green Resonance never declares someone a destined partner or encourages pursuit after refusal. Consent is non-negotiable.',
      'This key is a project synthesis drawing on relational ethics, not a claim to represent any single tradition.',
    ],
    galleryImage: null,
    galleryImageAlt: null,
  },
  {
    number: 5,
    name: 'Dingir / Star Above',
    slug: 'dingir-star-above',
    theme: 'Orientation toward values larger than personal status.',
    introduction:
      'Dingir refers to the cuneiform AN sign, used in ancient Mesopotamia as a determinative for deities and for the sky. "Star Above" is the Green Resonance interpretation: a reminder to orient toward guiding values rather than personal gain.',
    greenResonance:
      'Within the project, the Star Above represents the practice of choosing a guiding principle — truth, care, justice, ecological health — and letting it orient daily decisions. It connects to the Ravenstar layer as a navigational symbol: what are you steering by?',
    historicalContext:
      'The AN sign is one of the oldest and most common cuneiform signs. In Sumerian, it could be read as "an" (sky, heaven) or used as a determinative before divine names. The ORACC project at the University of Pennsylvania provides scholarly context on An/Anu as a deity and the sign\'s various readings. "Star Above" is the project\'s interpretive name, not a literal translation of every historical use of the AN sign.',
    practice:
      'Name one guiding value that matters to you — not an abstract ideal, but something you can demonstrate through action. Then name one specific thing you did or could do today that demonstrates it.',
    gardenApplication:
      'Before starting a garden project, name the value guiding it: food sharing, biodiversity, beauty, learning. Let that value shape your choices.',
    reflectionQuestion: 'What value am I orienting toward right now, and does my behaviour actually reflect it?',
    relatedPages: [
      { path: '/ravenstar', label: 'Ravenstar' },
      { path: '/codex', label: 'Codex' },
    ],
    relatedKeys: [1, 10, 19],
    sources: [
      {
        id: 'C',
        label: 'An/Anu (scholarly entry)',
        url: 'https://oracc.museum.upenn.edu/amgg/listofdeities/an/',
        publisher: 'ORACC / University of Pennsylvania Museum',
        title: 'Ancient Mesopotamian Gods and Goddesses: An (Anu)',
        reviewDate: '2026-09-24',
      },
    ],
    disclaimers: [
      '"Star Above" is the Green Resonance project\'s interpretation, not a literal translation of every historical use of the AN/Dingir sign.',
    ],
    galleryImage: '/Gallery/09-phoenix-master-sigil.jpg',
    galleryImageAlt: 'Phoenix Master Sigil — symbolic orientation toward guiding values.',
  },
  {
    number: 6,
    name: 'Hand of Correspondence',
    slug: 'hand-of-correspondence',
    theme: 'Using a visual map to connect values, attention, and action.',
    introduction:
      'The Hand of Correspondence is a memory and reflection tool. Each finger represents a chosen value, creating a portable map you can consult when making decisions or checking your priorities.',
    greenResonance:
      'This is a modern Green Resonance practice tool. You choose five values that matter to you and assign one to each finger. When facing a choice, you can "consult your hand" as a quick values check. It is a mnemonic device, not a claim about anatomy or energy meridians.',
    historicalContext:
      'Hand-based memory systems appear in medieval mnemonics and various folk traditions. The specific five-value practice described here is a Green Resonance creation. We do not claim historical lineage for this particular exercise.',
    practice:
      'Assign five self-chosen values to your five fingers — for example, honesty, courage, care, curiosity, and service. Review them each morning for a week. Notice which ones you are living and which ones need attention.',
    gardenApplication:
      'Use the Hand as a project-planning check: does this garden decision serve at least three of your five values?',
    reflectionQuestion: 'Which of my five chosen values did I express today, and which one needs more attention?',
    relatedPages: [
      { path: '/pillars', label: '6 Pillars' },
      { path: '/codex', label: 'Codex' },
    ],
    relatedKeys: [2, 3, 11],
    sources: [],
    disclaimers: [
      'The Hand of Correspondence exercise is a modern Green Resonance mnemonic practice. It is not presented as medical anatomy, energy meridian mapping, or diagnosis.',
    ],
    galleryImage: null,
    galleryImageAlt: null,
  },
  {
    number: 7,
    name: 'Ancestors / Seers / Healers',
    slug: 'ancestors-seers-healers',
    theme: 'Memory, gratitude, inherited skills, and critical discernment.',
    introduction:
      'This key honours the knowledge passed down through generations — practical skills, stories, and wisdom — while maintaining critical discernment about what we inherit and how we share it.',
    greenResonance:
      'Green Resonance values inherited knowledge alongside contemporary evidence. We honour ancestral skills in gardening, cooking, building, music, and community care. At the same time, we respect cultural ownership, avoid unsupported healing claims, and always record stories with the storyteller\'s informed consent.',
    historicalContext:
      'Oral history and intergenerational knowledge transmission are documented across every known human culture. The Oral History Association provides widely respected best practices for ethical recording and sharing. Green Resonance follows these principles when preserving community knowledge.',
    practice:
      'Record a story or practical skill from someone in your community — with their clear, informed consent. Ask what they would like shared and what they would prefer to keep private.',
    gardenApplication:
      'Build a community archive of gardening knowledge, cooking traditions, repair skills, and music. Credit contributors and respect their wishes about sharing.',
    reflectionQuestion: 'What practical skill did I inherit that I could pass on, and who taught it to me?',
    relatedPages: [
      { path: '/ravenstar', label: 'Ravenstar' },
      { path: '/community', label: 'Community' },
      { path: '/museschool', label: 'MUSEschool' },
    ],
    relatedKeys: [4, 9, 20],
    sources: [
      {
        id: 'D',
        label: 'Oral history best practices',
        url: 'https://oralhistory.org/best-practices/',
        publisher: 'Oral History Association',
        title: 'OHA Best Practices',
        reviewDate: '2026-09-24',
      },
    ],
    disclaimers: [
      'Always record stories with informed consent. Respect cultural ownership and restrictions on sharing.',
      'Green Resonance does not make unsupported healing claims or present traditional remedies as medical treatment.',
    ],
    galleryImage: null,
    galleryImageAlt: null,
  },
  {
    number: 8,
    name: 'Macrocosm / Microcosm',
    slug: 'macrocosm-microcosm',
    theme: 'Examining relationships across personal, household, garden, community, and ecological scales.',
    introduction:
      'The Macrocosm / Microcosm principle invites us to notice patterns that appear at different scales — from a single plant to an ecosystem, from a household to a region. It is a lens for systems thinking, not a claim that all scales operate identically.',
    greenResonance:
      'Green Resonance uses this principle to encourage looking at how personal choices connect to household systems, garden ecology, community dynamics, and broader environmental patterns. Resemblance across scales is a useful starting point for inquiry, not proof of identical causes.',
    historicalContext:
      'The idea that small systems mirror large ones has roots in Hermetic philosophy, Renaissance thought, and systems ecology. Modern agroecology uses multi-scale analysis as a practical research method. The FAO\'s Ten Elements of Agroecology provide a contemporary framework for examining relationships across scales.',
    practice:
      'Trace one material flow in your life — where does your water come from? Where does your food waste go? Map the journey from personal use to community infrastructure to ecological impact.',
    gardenApplication:
      'Look at your garden as a microcosm: what water, nutrient, and energy flows mirror patterns in the wider landscape?',
    reflectionQuestion: 'What pattern in my daily life also appears at a larger community or ecological scale?',
    relatedPages: [
      { path: '/framework', label: 'Framework' },
      { path: '/garden', label: 'Resonance Garden' },
      { path: '/industrial-transition', label: 'Industrial Transition' },
    ],
    relatedKeys: [2, 11, 17],
    sources: [
      {
        id: 'E',
        label: 'Ten Elements of Agroecology',
        url: 'https://www.fao.org/agroecology/overview/the-10-elements-of-agroecology/en',
        publisher: 'Food and Agriculture Organization of the United Nations',
        title: 'The 10 Elements of Agroecology',
        reviewDate: '2026-09-24',
      },
    ],
    disclaimers: [
      'Resemblance across scales is a useful observation tool, not proof that identical causes operate at every level.',
    ],
    galleryImage: '/Gallery/06-green-resonance-framework-six-pillars-maxres.jpg',
    galleryImageAlt: 'Green Resonance Framework — six pillars showing multi-scale relationships.',
  },
  {
    number: 9,
    name: 'Student-Teacher Yin Yang Dragons',
    slug: 'student-teacher-yin-yang-dragons',
    theme: 'Reciprocal learning, complementary perspectives, and humility.',
    introduction:
      'This key represents the dance between learning and teaching. In any genuine exchange, both participants give and receive. The dragon imagery combines Eastern yin-yang balance with the project\'s mythic ecology.',
    greenResonance:
      'Green Resonance treats this combined image as a project synthesis — the intertwined dragons symbolise that teaching and learning are not separate roles but complementary movements. In community, every person is both student and teacher. This is not presented as a single established ancient tradition.',
    historicalContext:
      'Yin-yang philosophy originates in Chinese cosmology. Dragon symbolism appears across many cultures with varied meanings. The specific combined image of student-teacher dragons is a Green Resonance creation that draws on these traditions respectfully without claiming to represent any single one.',
    practice:
      'Partner with someone in your community. Each person teaches one skill they know well and learns one skill from the other. Notice what changes when you shift between roles.',
    gardenApplication:
      'In a community garden, pair experienced gardeners with beginners. The beginner brings fresh questions; the experienced gardener shares technique. Both learn.',
    reflectionQuestion: 'What did I learn from someone I was trying to teach?',
    relatedPages: [
      { path: '/museschool', label: 'MUSEschool' },
      { path: '/community', label: 'Community' },
    ],
    relatedKeys: [4, 7, 18],
    sources: [
      {
        id: 'E-shared',
        label: 'Co-creation and sharing of knowledge',
        url: 'https://www.fao.org/agroecology/overview/the-10-elements-of-agroecology/co-creation-and-sharing-of-knowledge/en',
        publisher: 'Food and Agriculture Organization of the United Nations',
        title: 'Co-creation and Sharing of Knowledge — 10 Elements of Agroecology',
        reviewDate: '2026-09-24',
      },
    ],
    disclaimers: [
      'The student-teacher dragon image is a Green Resonance project synthesis. It is not claimed as a single established ancient tradition.',
    ],
    galleryImage: null,
    galleryImageAlt: null,
  },
  {
    number: 10,
    name: 'Raven-Phoenix Union',
    slug: 'raven-phoenix-union',
    theme: 'Ravenstar observes and remembers; Phoenix revises and renews.',
    introduction:
      'The Raven-Phoenix Union brings together the project\'s two central mythic figures. The Raven observes, records, and remembers. The Phoenix transforms, releases, and renews. Together they form a cycle of learning and change.',
    greenResonance:
      'This is one of the core symbolic pairings in Green Resonance. The Raven (Ravenstar) represents honest observation and memory. The Phoenix represents the courage to revise what is not working. Applied to any situation — a garden trial, a community event, a personal habit — the union asks: what happened, what did we learn, and what will we change?',
    historicalContext:
      'Raven and phoenix symbolism appear independently across many cultures. The raven is associated with intelligence and memory in Norse, Celtic, and Indigenous traditions. The phoenix represents renewal in Greek, Egyptian, and Chinese mythology. The specific pairing as "Raven-Phoenix Union" is a Green Resonance creation.',
    practice:
      'After any event or experiment, record what happened (Raven), identify one lesson (the meeting point), and change one action going forward (Phoenix). Do this without blame.',
    gardenApplication:
      'Review a garden trial or community event. What grew well? What failed? What will you do differently? Keep a Raven-Phoenix log.',
    reflectionQuestion: 'What am I holding onto that the Phoenix is asking me to release?',
    relatedPages: [
      { path: '/ravenstar', label: 'Ravenstar' },
      { path: '/phoenix', label: 'Phoenix Principle' },
    ],
    relatedKeys: [1, 5, 13],
    sources: [],
    disclaimers: [
      'The Raven-Phoenix Union is a Green Resonance project symbol. It draws on widely known mythic traditions but is not claimed as a historical pairing.',
    ],
    galleryImage: '/Gallery/09-phoenix-master-sigil.jpg',
    galleryImageAlt: 'Phoenix Master Sigil — the union of observation and renewal.',
  },
  {
    number: 11,
    name: 'Hermetic / Zodiac / Elemental Wheel',
    slug: 'hermetic-zodiac-elemental-wheel',
    theme: 'A symbolic cycle for reflection and seasonal awareness.',
    introduction:
      'This wheel combines Hermetic elemental correspondences, zodiacal symbolism, and seasonal cycles into a reflective tool. It is important to distinguish between astronomy, historical astrology, and the project\'s own symbolic correspondences.',
    greenResonance:
      'Green Resonance uses this wheel as a seasonal reflection tool, not a predictive system. Each season invites different attention: planting, tending, harvesting, resting. The elemental and zodiacal layers add symbolic richness to that cycle. For Southern Hemisphere users, seasons are reversed from Northern Hemisphere astrology.',
    historicalContext:
      'Zodiacal symbolism dates back to Babylonian astronomy and was developed through Hellenistic, Islamic, and European traditions. Elemental correspondences (earth, water, air, fire) were systematised in Greek philosophy and later integrated into Hermetic and alchemical frameworks. The Kybalion presents a modern Hermetic interpretation of some of these ideas, but it does not substantiate every zodiacal or elemental correspondence.',
    practice:
      'Compare a symbolic seasonal reflection (what does "fire season" or "water season" suggest for your inner life?) with your actual local weather and garden conditions. Notice where the metaphor fits and where reality differs.',
    gardenApplication:
      'Create a seasonal garden calendar using local climate data alongside symbolic seasonal themes. Let both inform your planning.',
    reflectionQuestion: 'Which season — literal or symbolic — best describes where I am right now?',
    relatedPages: [
      { path: '/codex', label: 'Codex' },
      { path: '/rhythmic-weave', label: 'Rhythmic Weave' },
      { path: '/garden', label: 'Resonance Garden' },
    ],
    relatedKeys: [2, 8, 16],
    sources: [
      {
        id: 'A',
        label: 'The Kybalion (Hermetic layer only)',
        url: 'https://www.gutenberg.org/ebooks/14209',
        publisher: 'Project Gutenberg',
        title: 'The Kybalion: A Study of the Hermetic Philosophy of Ancient Egypt and Greece',
        reviewDate: '2026-09-24',
      },
    ],
    disclaimers: [
      'This wheel is a Green Resonance reflective tool, not a predictive astrology system.',
      'The Kybalion provides context for the modern Hermetic layer only. It does not substantiate every zodiacal or elemental correspondence.',
      'Use Southern Hemisphere seasons where applicable. Do not invent planting guarantees from symbolic correspondences.',
    ],
    galleryImage: '/Gallery/06-green-resonance-framework-six-pillars-maxres.jpg',
    galleryImageAlt: 'Six Pillars Framework — the structural foundation underlying the symbolic wheel.',
  },
  {
    number: 12,
    name: 'Solar Eclipse Pyramid',
    slug: 'solar-eclipse-pyramid',
    theme: 'Changing perspective, obscuration, and returning clarity.',
    introduction:
      'The Solar Eclipse Pyramid combines two powerful symbols: the eclipse (temporary obscuration followed by returning light) and the pyramid (structured perspective). This key explores what happens when clarity is temporarily lost and how we find our way back.',
    greenResonance:
      'Green Resonance separates the astronomy of eclipses from the project\'s pyramid symbolism. An eclipse is a measurable astronomical event. The pyramid represents structured perspective and layered understanding. Together they invite reflection on periods of confusion or obscured vision, and the patience to wait for clarity to return.',
    historicalContext:
      'Solar eclipses have been observed and recorded for millennia. NASA provides comprehensive scientific information about eclipse mechanics and viewing safety. Pyramid structures appear across many cultures for varied purposes. Green Resonance does not claim that all pyramids share one purpose, alignment, or energy property.',
    practice:
      'Journal about something in your life that feels temporarily unclear. What information are you missing? What might become visible if you wait patiently? Do not force a resolution.',
    gardenApplication:
      'In the garden, some problems become clear only with time and seasonal change. Record what is unclear now and revisit it in three months.',
    reflectionQuestion: 'What am I trying to force clarity on that might resolve itself with patience?',
    relatedPages: [
      { path: '/ravenstar', label: 'Ravenstar' },
      { path: '/codex', label: 'Codex' },
    ],
    relatedKeys: [5, 17, 15],
    sources: [
      {
        id: 'F',
        label: 'NASA: Eclipses',
        url: 'https://science.nasa.gov/eclipses/',
        publisher: 'NASA',
        title: 'Eclipses',
        reviewDate: '2026-09-24',
      },
      {
        id: 'F-safety',
        label: 'NASA: Eclipse viewing safety',
        url: 'https://science.nasa.gov/eclipses/future-eclipses/eclipse-2024/safety/',
        publisher: 'NASA',
        title: 'Eclipse Safety',
        reviewDate: '2026-09-24',
      },
    ],
    disclaimers: [
      'Green Resonance does not claim pyramid energy or encourage unprotected Sun viewing. Always use certified eclipse glasses.',
      'Not all ancient pyramids share one purpose or astronomical alignment.',
    ],
    galleryImage: null,
    galleryImageAlt: null,
  },
  {
    number: 13,
    name: 'Dark Winged Wanderer',
    slug: 'dark-winged-wanderer',
    theme: 'Uncertainty, reflective solitude, belonging, and asking for support.',
    introduction:
      'The Dark Winged Wanderer represents the experience of moving through uncertainty — feeling lost, unmoored, or between places. It honours that experience without romanticising suffering or isolation.',
    greenResonance:
      'Green Resonance acknowledges that uncertainty and solitude are natural parts of life. This key invites reflective walking or seated observation as a practice during difficult times. It also reminds us to notice overlooked people, places, and maintenance needs — the wanderer sees what the settled resident misses.',
    historicalContext:
      'Wanderer and pilgrim archetypes appear across many mythic and literary traditions. The specific emphasis on noticing the overlooked and asking for support is a Green Resonance synthesis. We do not romanticise isolation, distress, or suffering as inherently noble or transformative.',
    practice:
      'Take an accessible observation walk — or a seated reflection if walking is not possible. Notice three things that others might overlook: a neglected corner, a person who seems alone, a maintenance need.',
    gardenApplication:
      'Walk through your garden or community space with wanderer\'s eyes. What has been overlooked? What needs tending that nobody has claimed?',
    reflectionQuestion: 'When I feel lost, do I ask for support, or do I try to handle it alone?',
    relatedPages: [
      { path: '/ravenstar', label: 'Ravenstar' },
      { path: '/community', label: 'Community' },
    ],
    relatedKeys: [1, 4, 10],
    sources: [],
    disclaimers: [
      'Green Resonance does not romanticise isolation, distress, or suffering. If you are in crisis, please reach out to a support service.',
    ],
    galleryImage: null,
    galleryImageAlt: null,
  },
  {
    number: 14,
    name: 'Iron Rose / Hematite',
    slug: 'iron-rose-hematite',
    theme: 'Strength with tenderness; boundaries with care.',
    introduction:
      'The Iron Rose combines the beauty and softness of a rose with the hardness and grounding of iron. Hematite, an iron oxide mineral, provides the material metaphor: strength that does not sacrifice beauty or care.',
    greenResonance:
      'This key explores the practice of holding firm boundaries while remaining generous and tender. In community life, setting limits is an act of care — for yourself and for others. The Iron Rose reminds us that strength and softness are not opposites.',
    historicalContext:
      'Hematite is a common iron oxide mineral (Fe\u2082O\u2083) found worldwide. The name derives from the Greek word for blood, referring to the red colour of its powdered form. Rose symbolism appears across many cultures as a representation of beauty, love, and sometimes secrecy. The combination as "Iron Rose" is a Green Resonance metaphor.',
    practice:
      'Name one boundary you need to hold this week and one generous action you can take for someone else. Notice that both can coexist.',
    gardenApplication:
      'In the garden, fences protect tender seedlings. Boundaries in community protect vulnerable members. Both allow growth.',
    reflectionQuestion: 'Where am I being too rigid without care, or too soft without boundaries?',
    relatedPages: [
      { path: '/phoenix', label: 'Phoenix Principle' },
      { path: '/pillars', label: '6 Pillars' },
    ],
    relatedKeys: [4, 10, 15],
    sources: [],
    disclaimers: [
      'Green Resonance does not claim crystal-healing properties for hematite or any mineral. The iron/rose imagery is symbolic.',
      'Mineralogical facts about hematite are standard geological knowledge, not spiritual claims.',
    ],
    galleryImage: null,
    galleryImageAlt: null,
  },
  {
    number: 15,
    name: 'Vajra / Null State',
    slug: 'vajra-null-state',
    theme: 'Indestructible clarity and the pause before deliberate action.',
    introduction:
      'The vajra is a ritual object in Buddhist and Hindu traditions symbolising indestructible truth. "Null State" is Green Resonance terminology for the deliberate pause before responding — a moment of clarity before action.',
    greenResonance:
      '"Null State" in the Green Resonance context means choosing a moment of conscious pause before reacting. It is not a traditional translation of vajra, nor a claim about quantum physics or zero-point energy. It is simply the practice of pausing comfortably, noticing your impulse, and then choosing one deliberate action.',
    historicalContext:
      'The vajra (Sanskrit) or dorje (Tibetan) is a ritual implement in Vajrayana Buddhism, Hinduism, and Jainism. It represents firmness of spirit and spiritual power. The Metropolitan Museum of Art holds examples in its collection. Green Resonance treats this object with respect for its religious significance and does not claim to teach its traditional use.',
    practice:
      'Before responding to a provocation, request, or strong emotion, pause comfortably for three breaths. Then choose one deliberate action rather than reacting from impulse.',
    gardenApplication:
      'Before pulling a weed or cutting a plant, pause. Is it actually a weed? Is now the right time? The null-state moment prevents hasty garden mistakes.',
    reflectionQuestion: 'When did I last pause before reacting, and what did that pause make possible?',
    relatedPages: [
      { path: '/codex', label: 'Codex' },
      { path: '/pillars', label: '6 Pillars' },
    ],
    relatedKeys: [1, 12, 14],
    sources: [
      {
        id: 'G',
        label: 'Vajra (museum collection record)',
        url: 'https://www.metmuseum.org/art/collection/search/39090',
        publisher: 'Metropolitan Museum of Art',
        title: 'Vajra',
        reviewDate: '2026-09-24',
      },
    ],
    disclaimers: [
      '"Null State" is Green Resonance terminology, not a traditional translation of vajra or a quantum-physics claim.',
      'The vajra is a sacred object in living religious traditions. Green Resonance treats it with respect and does not claim to teach its ritual use.',
    ],
    galleryImage: null,
    galleryImageAlt: null,
  },
  {
    number: 16,
    name: 'Prime / Multiplication Pattern Map',
    slug: 'prime-multiplication-pattern-map',
    theme: 'Number patterns as reflective tools, not cosmic forces.',
    introduction:
      'This key explores prime numbers, multiplication patterns, and digital roots as mathematical objects. It includes the Green Resonance 3-6-9 reflective framework while clearly distinguishing mathematical facts from symbolic interpretation.',
    greenResonance:
      'Green Resonance uses the 3-6-9 pattern as a reflective practice: 3 = orient, 6 = relate, 9 = return and learn. This is a symbolic application of number-pattern observation, not a claim about cosmic forces. Digital roots (the iterative digit sum of a number) reveal interesting base-10 patterns, but these patterns do not establish universal energy or spiritual laws.',
    historicalContext:
      'Digital roots are a well-defined mathematical concept. For positive integers, digitalRoot(n) = 1 + ((n - 1) mod 9); digitalRoot(0) = 0. Wolfram MathWorld provides the formal definition. The popular association of 3, 6, and 9 with Nikola Tesla is based on widely circulated but unverified quotations. Green Resonance does not attribute a scientific "369 theory" to Tesla.',
    practice:
      'Pick any number and calculate its digital root. Explore the digital-root patterns in the multiplication tables. Notice how 3, 6, and 9 cycle. Then ask: does noticing a pattern prove it has meaning, or does the meaning come from how you use it?',
    gardenApplication:
      'Use the 3-6-9 cycle in garden planning: orient (assess conditions), relate (connect plants, water, soil), return (review and learn). It is a planning rhythm, not a planting schedule.',
    reflectionQuestion: 'Am I finding a pattern because it is there, or because I am looking for it?',
    relatedPages: [
      { path: '/framework', label: 'Framework' },
      { path: '/codex', label: 'Codex' },
      { path: '/museschool', label: 'MUSEschool' },
    ],
    relatedKeys: [2, 8, 11],
    sources: [
      {
        id: 'H',
        label: 'Digital Root (formal definition)',
        url: 'https://mathworld.wolfram.com/DigitalRoot.html',
        publisher: 'Wolfram MathWorld',
        title: 'Digital Root',
        reviewDate: '2026-09-24',
      },
    ],
    disclaimers: [
      'Digital root patterns are base-10 mathematical properties. They do not establish cosmic forces or spiritual laws.',
      'The famous Tesla "key to the universe" quotation about 3, 6, and 9 has no verified primary source.',
      'Green Resonance presents 3-6-9 as a reflective practice, not a scientific theory.',
    ],
    galleryImage: '/Gallery/04-six-pillars-latest-update.jpg',
    galleryImageAlt: 'Six Pillars — the structural framework that the number patterns map onto.',
  },
  {
    number: 17,
    name: 'Solar Pyramid Alignment',
    slug: 'solar-pyramid-alignment',
    theme: 'Aligning intentions with real conditions.',
    introduction:
      'Solar Pyramid Alignment explores how sunlight, orientation, and physical conditions shape what is possible. It separates measurable solar knowledge from symbolic or spiritual interpretation of pyramid structures.',
    greenResonance:
      'Green Resonance uses this key to encourage practical observation: where does the sun fall on your garden? Which areas get morning light versus afternoon shade? Understanding real solar conditions helps align intentions with what the land can actually support.',
    historicalContext:
      'Solar orientation has been used in architecture and agriculture across cultures for millennia. NASA provides reliable information about solar mechanics. Green Resonance does not claim that all ancient pyramids share one purpose, alignment, or energy property. Each structure belongs to its own cultural and historical context.',
    practice:
      'Observe your garden or outdoor space at different times of day. Create a simple sunlight map showing which areas receive morning sun, afternoon sun, full shade, and partial shade. Use this to plan planting.',
    gardenApplication:
      'Match plants to their actual sunlight needs based on your observations, not assumptions. A sun-loving plant in deep shade will struggle regardless of symbolism.',
    reflectionQuestion: 'Where am I trying to grow something in conditions that do not support it?',
    relatedPages: [
      { path: '/garden', label: 'Resonance Garden' },
      { path: '/biohabitation', label: 'Biohabitation' },
    ],
    relatedKeys: [3, 8, 12],
    sources: [
      {
        id: 'F',
        label: 'NASA: Eclipses and solar information',
        url: 'https://science.nasa.gov/eclipses/',
        publisher: 'NASA',
        title: 'Eclipses',
        reviewDate: '2026-09-24',
      },
    ],
    disclaimers: [
      'Green Resonance does not claim all pyramids share one purpose or alignment.',
      'Use NASA source for astronomy, not for unsupported pyramid history.',
    ],
    galleryImage: null,
    galleryImageAlt: null,
  },
  {
    number: 18,
    name: 'Raven Stage / Sacred Performance Architecture',
    slug: 'raven-stage-sacred-performance-architecture',
    theme: 'Music, storytelling, participation, and ecological care.',
    introduction:
      'The Raven Stage envisions performance and gathering as acts of community care. It connects music, storytelling, and shared experience to ecological responsibility — every gathering has an impact, and thoughtful planning reduces harm while increasing joy.',
    greenResonance:
      'Green Resonance connects performance to the Rhythmic Weave and community stewardship. A well-planned gathering includes accessible participation, clear responsibilities, a quiet area for those who need rest, and a cleanup plan. No event dates are invented; this key provides principles for when gatherings do occur.',
    historicalContext:
      'Performance, ritual, and communal gathering are among the oldest human activities. The specific concept of "Sacred Performance Architecture" is a Green Resonance framework for planning gatherings that honour participants, neighbours, and the environment.',
    practice:
      'Plan a small gathering — a garden party, a music session, a storytelling circle. Include: accessible entry, clear start and end times, assigned responsibilities, a quiet area, and a cleanup plan. Ask participants what they need beforehand.',
    gardenApplication:
      'Host a garden open day or seed swap using Raven Stage principles: accessibility, cleanup, and shared responsibility.',
    reflectionQuestion: 'When I plan a gathering, whose needs do I tend to overlook?',
    relatedPages: [
      { path: '/rhythmic-weave', label: 'Rhythmic Weave' },
      { path: '/community', label: 'Community' },
      { path: '/stewardship-games', label: 'Stewardship Games' },
    ],
    relatedKeys: [4, 9, 20],
    sources: [],
    disclaimers: [
      'Green Resonance does not invent event dates or claim sound frequencies cure illness.',
      '"Sacred Performance Architecture" is a Green Resonance planning framework, not a historical term.',
    ],
    galleryImage: null,
    galleryImageAlt: null,
  },
  {
    number: 19,
    name: 'Vegv\u00EDsir / Mythic Compass',
    slug: 'vegvisir-mythic-compass',
    theme: 'Values-based navigation through difficult decisions.',
    introduction:
      'The Vegv\u00EDsir is a symbol found in the Huld manuscript, an Icelandic collection of magical staves compiled in the 19th century. It is popularly associated with wayfinding, though its historical use as a navigation instrument is not authenticated for the Viking Age.',
    greenResonance:
      'Green Resonance uses the Vegv\u00EDsir as inspiration for a "Mythic Compass" — a personal values-navigation tool. When facing a difficult decision, you orient by your chosen values rather than by external pressure. The symbolic compass is distinct from real navigation equipment.',
    historicalContext:
      'The Vegv\u00EDsir appears in the Huld manuscript (IB 383 4to), compiled circa 1860 by Geir Vigf\u00FAsson. The manuscript is held by the National and University Library of Iceland. While the symbol is widely marketed as a "Viking compass," there is no authenticated evidence of its use in the Viking Age (c. 793\u20131066 CE). Green Resonance respects this distinction and presents the Vegv\u00EDsir as a post-medieval Icelandic cultural artefact.',
    practice:
      'Draw a simple compass with four directions. Label each direction with a value that matters to you (e.g., honesty, courage, care, curiosity). When facing a difficult decision, check which direction your values point.',
    gardenApplication:
      'When planning a new garden feature, consult your values compass: does this serve beauty, food production, community, or biodiversity? Let your priorities guide the design.',
    reflectionQuestion: 'When I feel lost in a decision, which core value could I use to orient myself?',
    relatedPages: [
      { path: '/ravenstar', label: 'Ravenstar' },
      { path: '/framework', label: 'Framework' },
    ],
    relatedKeys: [1, 5, 6],
    sources: [
      {
        id: 'I',
        label: 'Huld manuscript catalogue',
        url: 'https://handrit.is/manuscript/view/is/IB04-0383',
        publisher: 'Handrit.is / National and University Library of Iceland',
        title: 'IB 383 4to (Huld)',
        reviewDate: '2026-09-24',
      },
    ],
    disclaimers: [
      'The Vegv\u00EDsir is not an authenticated Viking-age navigation instrument. It appears in a 19th-century Icelandic manuscript.',
      'Green Resonance uses it as symbolic inspiration, keeping it distinct from real navigation equipment.',
    ],
    galleryImage: null,
    galleryImageAlt: null,
  },
  {
    number: 20,
    name: 'Ogham Grove / Tree Alphabet',
    slug: 'ogham-grove-tree-alphabet',
    theme: 'Historical writing, tree knowledge, and ecological observation.',
    introduction:
      'Ogham is a historical writing system found primarily in Ireland and parts of Britain, dating from approximately the 4th to 7th centuries CE. Later sources associated some Ogham letter names with trees, though not all letter names originally represented trees.',
    greenResonance:
      'Green Resonance uses the Ogham Grove as an invitation to learn about trees — specifically those appropriate to your local ecology. Rather than importing culturally associated trees without ecological suitability checks, we encourage observing and recording what grows well in your area.',
    historicalContext:
      'Ogham inscriptions are found on stone monuments across Ireland and western Britain. The script was used primarily for short inscriptions, often names. The tree associations come from medieval Irish texts like the Ogham Tract, written centuries after the script\'s origin. The National Museum of Ireland provides educational resources about Ogham. Scholars distinguish between the historical script and later symbolic interpretations.',
    practice:
      'Learn about one tree that grows well in your local area. Visit it, observe it across a season, and record what you notice: bark texture, leaf shape, seasonal changes, what lives in and around it.',
    gardenApplication:
      'Before planting a tree, research whether it suits your local climate, soil, and available space. One well-chosen local tree beats an imported symbol.',
    reflectionQuestion: 'What tree grows near me that I have never really looked at closely?',
    relatedPages: [
      { path: '/garden', label: 'Resonance Garden' },
      { path: '/ravenstar', label: 'Ravenstar' },
      { path: '/museschool', label: 'MUSEschool' },
    ],
    relatedKeys: [1, 7, 8],
    sources: [
      {
        id: 'J',
        label: 'Ogham activity (educational resource)',
        url: 'https://source.museum.ie/en-IE/Museums/Archaeology/Engage-And-Learn/Museum-at-Home/Ogham-Code',
        publisher: 'National Museum of Ireland',
        title: 'Ogham Code Activity',
        reviewDate: '2026-09-24',
      },
    ],
    disclaimers: [
      'Not all Ogham letter names originally represented trees. The tree associations come from later medieval sources.',
      'Do not import culturally associated trees without checking ecological suitability for your local area.',
    ],
    galleryImage: null,
    galleryImageAlt: null,
  },
];

export function getKeyBySlug(slug: string): SymbolicKey | undefined {
  return symbolicKeys.find((k) => k.slug === slug);
}

export function getKeyByNumber(num: number): SymbolicKey | undefined {
  return symbolicKeys.find((k) => k.number === num);
}

export function getAdjacentKeys(num: number): { prev: SymbolicKey | undefined; next: SymbolicKey | undefined } {
  return {
    prev: num > 1 ? getKeyByNumber(num - 1) : undefined,
    next: num < 20 ? getKeyByNumber(num + 1) : undefined,
  };
}
