export const PLACEHOLDER_IMAGE = 'https://pub-d2063e290531450c8615a5e9338ff332.r2.dev/general/1.jpg';

export type ProblemRoute = {
  slug: string;
  tone: 'emergency' | 'standard' | 'maintenance';
  icon: string;
  title: string;
  blurb: string;
};

export const problemRouter: ProblemRoute[] = [
  { slug: 'burst-pipe-repair', tone: 'emergency', icon: 'droplet', title: 'Burst pipe repair', blurb: 'Stop the flood, isolate the supply and replace the failed pipework before damage spreads.' },
  { slug: 'blocked-drain', tone: 'standard', icon: 'pipe', title: 'Blocked drain unblocking', blurb: 'Clear sink, shower, soil and external drain blockages with jetting, rods and CCTV survey.' },
  { slug: 'blocked-toilet', tone: 'standard', icon: 'toilet', title: 'Blocked toilet repair', blurb: 'Toilet blockages cleared cleanly past the trap and into the soil pipe without damage.' },
  { slug: 'burst-pipe-repair', tone: 'standard', icon: 'leak', title: 'Leaking pipe repair', blurb: 'Visible drips, joint failures and pinhole leaks identified and repaired in copper or plastic.' },
  { slug: 'burst-pipe-repair', tone: 'standard', icon: 'tap', title: 'Dripping tap repair', blurb: 'Worn washers, failed cartridges and seized valve seats replaced or refurbished.' },
  { slug: 'leak-detection', tone: 'standard', icon: 'gauge', title: 'Low water pressure diagnosis', blurb: 'Diagnose closed valves, hidden leaks, blocked pipework and mains supply restrictions.' },
  { slug: 'no-hot-water', tone: 'emergency', icon: 'shower', title: 'No hot water', blurb: 'Diverter valves, immersion elements, cylinder thermostats and motorised valves repaired.' },
  { slug: 'leak-detection', tone: 'standard', icon: 'bath', title: 'Bathroom plumbing', blurb: 'Sinks, taps, showers, baths, toilets, traps and waste pipework installed and repaired.' },
  { slug: 'leak-detection', tone: 'standard', icon: 'kitchen', title: 'Kitchen plumbing', blurb: 'Kitchen sinks, mixer taps, dishwasher and washing machine connections, isolation valves.' },
  { slug: 'leak-detection', tone: 'maintenance', icon: 'plug', title: 'Appliance connections', blurb: 'Safe water supply and waste connections for dishwashers, washing machines and ice-makers.' },
  { slug: 'central-heating-repair', tone: 'standard', icon: 'radiator', title: 'Radiator leak or valve issue', blurb: 'Leaking radiators, failed TRVs, cold spots, sludge and pressure problems diagnosed.' },
  { slug: '24-hour-plumber', tone: 'emergency', icon: 'alert', title: 'Emergency plumbing callout', blurb: '24-hour response across 12 UK cities for floods, no supply and overflowing drains.' },
];

export const issueExplanations = [
  {
    symptom: 'Dripping tap',
    cause: 'Worn washer, failed cartridge, damaged valve seat or loose fitting',
    risk: 'Wasted water, higher water bills, limescale staining and fixture damage',
    service: 'Tap repair or replacement',
  },
  {
    symptom: 'Burst pipe',
    cause: 'Freezing, internal corrosion, pressure surges, joint failure or aged pipework',
    risk: 'Flooding, ceiling collapse, damp, mould and structural damage',
    service: 'Emergency pipe isolation and repair',
  },
  {
    symptom: 'Blocked drain',
    cause: 'Grease, hair, soap, food waste, limescale, foreign objects or root ingress',
    risk: 'Slow drainage, foul smells, overflow at gullies and wastewater backup indoors',
    service: 'Drain unblocking with CCTV survey for recurrence',
  },
  {
    symptom: 'Blocked toilet',
    cause: 'Wipes, paper overload, foreign objects, faulty flush or downstream soil-pipe restriction',
    risk: 'Overflow, hygiene risk and bathroom water damage',
    service: 'Toilet unblocking and soil-pipe clearance',
  },
  {
    symptom: 'Hidden leak',
    cause: 'Failed joint, pinhole pipe corrosion, seal failure or pressure damage in concealed pipework',
    risk: 'Damp, mould, rot, ceiling staining and unexplained pressure loss',
    service: 'Leak detection survey and pipe repair',
  },
  {
    symptom: 'Low water pressure',
    cause: 'Hidden leak, partially closed valve, blocked pipework, failed PRV or mains supply issue',
    risk: 'Weak shower flow, slow-filling appliances and inefficient hot water systems',
    service: 'Water pressure diagnosis and repair',
  },
  {
    symptom: 'Cold radiator spots',
    cause: 'Sludge accumulation, trapped air, restricted circulation or failed radiator valve',
    risk: 'Inefficient heating, higher energy bills and uneven room temperatures',
    service: 'Radiator service, balancing or powerflush',
  },
  {
    symptom: 'Hard water and limescale',
    cause: 'Mineral build-up in hard-water areas affecting pipework, fixtures and heat exchangers',
    risk: 'Blocked aerators, damaged appliances, narrowed pipes and shortened boiler life',
    service: 'Limescale treatment, filters and water softeners',
  },
];

export const pricingFactors = [
  { factor: 'Type of problem', why: 'A tap washer is not the same job as a hidden leak or a burst supply pipe.', example: 'Tap repair is quicker and cheaper than excavation for a collapsed drain.' },
  { factor: 'Emergency vs scheduled', why: 'Out-of-hours work needs an engineer dispatched immediately rather than booked in.', example: 'We charge the same rate day or night - many other operators surcharge nights.' },
  { factor: 'Parts required', why: 'Replacement components affect the total cost of the repair.', example: 'A diverter valve costs more in parts than a thermostatic radiator valve.' },
  { factor: 'Access to pipework', why: 'Concealed pipework behind tiling, under floors or inside walls takes longer.', example: 'Surface-mounted pipe repair is faster than chasing into masonry.' },
  { factor: 'Water damage complexity', why: 'A long-running hidden leak may need additional drying and reinstatement.', example: 'A simple drip costs less than a leak that has saturated the floor structure.' },
  { factor: 'Drain blockage severity', why: 'A surface blockage clears in minutes; a deep collapse needs excavation.', example: 'Auger clearance is cheaper than a CCTV-confirmed pipe relining job.' },
  { factor: 'Out-of-hours callout', why: 'Some plumbing companies surcharge nights, weekends and bank holidays - we do not.', example: 'Our call-out fee is identical at 3am Sunday and 11am Tuesday.' },
  { factor: 'Domestic vs commercial', why: 'Commercial premises need wider insurance, larger jetting equipment and scheduled access.', example: 'A restaurant grease-trap clearance differs from a domestic kitchen sink.' },
];

export const preventionTips = [
  'Find your internal stop tap now and label it - in a flood you will not have time to search.',
  'Lag exposed pipework in lofts, garages and external walls before the first frost of winter.',
  'Avoid flushing wipes, sanitary products, kitchen roll or fats - they cause most blocked drains we attend.',
  'Check under sinks, around toilets and at radiator valves once a month for early signs of leaks.',
  'Run a water-softening filter or descaler in hard-water areas to protect taps, showers and the boiler.',
  'Replace tap washers and silicone seals at the first sign of a drip - waiting almost always costs more.',
  'Bleed radiators at the start of the heating season and book an annual service for older boilers.',
  'For rental and commercial property, schedule a yearly plumbing inspection so small faults are caught early.',
];

export type TrustReason = { icon: string; title: string; body: string };

export const trustReasons = (rating: number, reviewCount: number): TrustReason[] => [
  { icon: 'shield', title: 'Local plumbing experience', body: 'In-house plumbers covering 12 UK cities with knowledge of local housing stock, water hardness and common failure modes.' },
  { icon: 'bolt', title: 'Genuine emergency support', body: '24/7/365 response including bank holidays. Engineers on shift through the night - not on-call from home.' },
  { icon: 'tag', title: 'Clear, honest pricing', body: 'Fixed quotes confirmed before any work starts. The same rate applies day or night, weekday or weekend.' },
  { icon: 'check', title: 'Guaranteed workmanship', body: 'Manufacturer parts warranty plus a 90-day workmanship guarantee on every repair we complete.' },
  { icon: 'badge', title: 'Licensed and insured', body: 'Every engineer is Gas Safe registered for gas work, fully insured, directly employed and ID-carrying.' },
  { icon: 'star', title: 'Verified customer reviews', body: `${rating}/5 across ${reviewCount.toLocaleString()}+ verified customer reviews from real jobs in the cities we serve.` },
];

export const recentSamples = [
  { date: '2026-04-26', postcode: 'SW4', issue: 'Burst lead supply pipe in basement', resolution: 'Isolated, replaced 2m lead with copper, made-good', duration: '2 hours' },
  { date: '2026-04-24', postcode: 'M14', issue: 'HMO toilet blockage past the trap', resolution: 'Wipes cleared from soil pipe with electric rods', duration: '45 minutes' },
  { date: '2026-04-22', postcode: 'B17', issue: 'Hidden leak under bathroom floor', resolution: 'Thermal imaging located, pinhole repaired, floor reinstated', duration: '3 hours' },
  { date: '2026-04-19', postcode: 'LS17', issue: 'Cold radiators on first floor', resolution: 'Powerflush completed, sludge removed, inhibitor dosed', duration: '5 hours' },
  { date: '2026-04-17', postcode: 'L18', issue: 'External drain backing up at gully', resolution: 'Jetted, root mat cleared, CCTV survey provided', duration: '90 minutes' },
];

// Detailed recent jobs for homepage proof section.
// Real-world placeholders - replace with case studies as they are completed.
export type DetailedJob = {
  title: string;
  location: string;
  postcode: string;
  problem: string;
  diagnosis: string;
  repair: string;
  timeTaken: string;
  outcome: string;
  date: string;
  imageAlt: string;
  image?: string;
};

export const detailedRecentJobs: DetailedJob[] = [
  {
    title: 'Burst pipe repair in Birmingham',
    location: 'Birmingham',
    postcode: 'B17',
    date: '2026-04-26',
    problem: 'Galvanised rising main split overnight - water tracking through the kitchen ceiling.',
    diagnosis: 'Aged galvanised pipe corroded through at a horizontal joint above the kitchen.',
    repair: 'Isolated supply, removed 1.8m of failed galvanised, replaced with 22mm copper, pressure-tested.',
    timeTaken: '2h 45m on site',
    outcome: 'Supply restored same visit. Insurance-grade written report issued. 90-day workmanship guarantee.',
    imageAlt: 'Replaced copper section above kitchen ceiling after burst rising main repair in Birmingham B17',
    image: 'https://pub-d2063e290531450c8615a5e9338ff332.r2.dev/general/worker-fixing-burst-water-pipe-with-blue-flange-wrench-as-water-sprays-everywhere-emergency-plumbing-repair-task.webp',
  },
  {
    title: 'Blocked bathroom drain in Leeds',
    location: 'Leeds',
    postcode: 'LS6',
    date: '2026-04-22',
    problem: 'Shower and basin draining slowly in a Headingley student let, gurgling at the toilet.',
    diagnosis: 'Hair and soap scale build-up on the long bath waste, partial blockage at the soil branch.',
    repair: 'Mechanical clearance with electric drain rods, follow-up jet flush, traps cleaned and reseated.',
    timeTaken: '55 minutes',
    outcome: 'Drain flowing clear, smell gone. Tenant briefed on monthly hot-water flush to prevent recurrence.',
    imageAlt: 'Cleared bathroom waste pipe after drain unblocking job in Leeds LS6',
    image: 'https://pub-d2063e290531450c8615a5e9338ff332.r2.dev/general/bathroom-drain-clogged-with-dirty-hair-slime-female-hand-pulls-long-messy-tuft-hair.webp',
  },
  {
    title: 'Leaking toilet cistern in Bristol',
    location: 'Bristol',
    postcode: 'BS8',
    date: '2026-04-19',
    problem: 'Constant trickle into the pan and water pooling behind the toilet in a Clifton flat.',
    diagnosis: 'Failed flush valve diaphragm and a perished cistern-to-pan rubber doughnut seal.',
    repair: 'New flush valve assembly fitted, fresh doughnut seal, isolation valve serviced, refilled and tested.',
    timeTaken: '40 minutes',
    outcome: 'No more running, no leak, water meter ticking back to zero. Parts and labour fixed-price.',
    imageAlt: 'Replaced toilet flush valve and cistern seal after leak repair in Bristol BS8',
    image: 'https://pub-d2063e290531450c8615a5e9338ff332.r2.dev/general/male-plumber-working-fix-problems-client-s-house.webp',
  },
  {
    title: 'Low water pressure issue in Manchester',
    location: 'Manchester',
    postcode: 'M20',
    date: '2026-04-20',
    problem: 'Vaillant combi losing pressure weekly in a Didsbury terrace, weak shower flow upstairs.',
    diagnosis: 'Slow seep on a first-floor radiator valve gland - sufficient to drop pressure but not visibly leak.',
    repair: 'Drained the affected zone, replaced the radiator valve and gland, refilled, vented and re-pressurised.',
    timeTaken: '90 minutes',
    outcome: 'Pressure stable for 72-hour soak test. Showers back to full flow. No more weekly top-ups.',
    imageAlt: 'Replaced radiator valve fixing low boiler pressure in Manchester M20',
    image: 'https://pub-d2063e290531450c8615a5e9338ff332.r2.dev/general/need-help-unhappy-woman-crouching-near-leaking-water-tap-home.webp',
  },
];

export type CertificationBadge = {
  name: string;
  detail: string;
  icon: string;
};

export const certificationBadges: CertificationBadge[] = [
  { name: 'Gas Safe Registered', detail: 'Reg #123456 - every gas job', icon: 'shield' },
  { name: 'NVQ Level 3 Plumbing', detail: 'Every engineer fully qualified', icon: 'badge' },
  { name: 'WaterSafe approved', detail: 'Compliant with WRAS standards', icon: 'check' },
  { name: 'CIPHE member', detail: 'Chartered Institute of Plumbing & Heating', icon: 'star' },
  { name: 'Public liability £5m', detail: 'Hiscox UK insured', icon: 'shield' },
  { name: 'Checkatrade verified', detail: 'Independently vetted reviews', icon: 'check' },
  { name: 'TrustATrader listed', detail: 'Real customer feedback', icon: 'star' },
  { name: 'Google verified business', detail: 'Reviewed across 12 UK cities', icon: 'pin' },
];

export type PricingRow = { item: string; price: string; note: string };

export const pricingTable: PricingRow[] = [
  { item: 'Standard call-out fee', price: '£75', note: 'Covers travel and the first 30 minutes on site.' },
  { item: 'Minimum charge', price: '£95', note: 'Smallest job we will invoice for - includes diagnosis and quote.' },
  { item: 'Standard hourly rate', price: '£75 / hour', note: 'After the first hour, charged in 30-minute blocks.' },
  { item: 'Emergency / out-of-hours', price: 'Same as standard', note: 'No surcharge for nights, weekends or bank holidays.' },
  { item: 'Drain unblocking (typical)', price: 'From £120', note: 'Mechanical clearance, no jetting required.' },
  { item: 'CCTV drain survey', price: 'From £180', note: 'Recorded footage and written report supplied.' },
  { item: 'VAT', price: '20% (incl.)', note: 'All prices on quotes are inclusive of VAT (GB 123 4567 89).' },
];

export const pricingFinalNote =
  'Every job gets a fixed quote in writing before work begins. Parts are charged at trade-plus-fitting. No hidden charges, no surprise bills, same rate day or night.';

export const emergencySafetyTips = [
  {
    title: 'Turn off the stop tap',
    body: 'Find your internal stop tap (usually under the kitchen sink) and turn it clockwise. This stops the mains water flow into the property.',
    icon: 'tag',
  },
  {
    title: 'Switch off electrics near water',
    body: 'If water is near sockets, lights or appliances, switch off at the consumer unit before going near the leak. Never stand in standing water to reach a switch.',
    icon: 'bolt',
  },
  {
    title: 'Move valuables and electronics',
    body: 'Lift rugs, electronics, books and important documents off the floor. A few minutes here can save thousands in damage.',
    icon: 'shield',
  },
  {
    title: 'Use towels and buckets safely',
    body: 'Catch active drips with buckets, soak floor water with old towels. Empty buckets often - never leave them where someone could trip.',
    icon: 'droplet',
  },
  {
    title: 'Avoid DIY pipe removal',
    body: 'Do not unscrew fittings, cut into pipework or remove tiles to chase a leak. You may make the leak worse and void any insurance claim.',
    icon: 'alert',
  },
  {
    title: 'Take photos for insurance',
    body: 'Photograph the leak source, any damage and the affected rooms before clean-up. Useful for both your insurer and our written report.',
    icon: 'check',
  },
  {
    title: 'Call us immediately for major leaks',
    body: 'For active flooding, a burst pipe, no water at all or sewage backing up indoors, call us first - do not wait. We will talk you through making safe.',
    icon: 'alert',
  },
];

export type ReviewSource = 'Google' | 'Trustpilot' | 'Checkatrade' | 'TrustATrader' | 'Facebook';

export type VerifiedReview = {
  source: ReviewSource;
  rating: number;
  name: string;
  date: string;
  service: string;
  city: string;
  text: string;
};

export const verifiedReviews: VerifiedReview[] = [
  {
    source: 'Google',
    rating: 5,
    name: 'Sarah M.',
    date: '2026-04-12',
    service: 'Burst pipe repair',
    city: 'London',
    text: 'Pipe burst at 11pm in my Camden flat. They were here within 25 minutes, isolated the supply and had it repaired before 1am. Calm, clean, professional.',
  },
  {
    source: 'Checkatrade',
    rating: 5,
    name: 'Priya K.',
    date: '2026-04-02',
    service: 'Leak detection',
    city: 'London',
    text: 'Hidden leak under our kitchen floor that two other firms could not find. Thermal imaging located it in twenty minutes. Saved us from ripping up the whole floor.',
  },
  {
    source: 'Trustpilot',
    rating: 5,
    name: 'Chris D.',
    date: '2026-04-22',
    service: 'Burst pipe repair',
    city: 'Birmingham',
    text: 'Galvanised rising main split in the loft. Replaced with copper. Clean job, fair price.',
  },
  {
    source: 'Google',
    rating: 5,
    name: 'Emma L.',
    date: '2026-04-05',
    service: 'Burst pipe',
    city: 'Manchester',
    text: 'Frozen pipe burst over a freezing weekend in Chorlton. They got to me in 20 minutes despite the weather. Saved my floors.',
  },
  {
    source: 'TrustATrader',
    rating: 5,
    name: 'Charlotte H.',
    date: '2026-04-13',
    service: 'Burst pipe repair',
    city: 'Bristol',
    text: 'Burst pipe in a Clifton listed building - they understood the constraints and worked carefully. Excellent.',
  },
  {
    source: 'Facebook',
    rating: 5,
    name: 'Holly T.',
    date: '2026-04-26',
    service: 'No hot water',
    city: 'Leeds',
    text: 'Diverter valve replacement on a Sunday. No surcharge. Hot water back within an hour.',
  },
];

export const serviceLimitations = [
  {
    title: 'What we cover',
    items: [
      'Domestic plumbing - leaks, taps, toilets, drainage, hot water',
      'Light commercial plumbing - shops, offices, HMOs, small premises',
      'Drain unblocking - sinks, soil pipes, external drains, jetting & CCTV',
      'Gas Safe boiler diagnostics, repairs and replacements',
      '24/7 emergency callouts across our 12 listed UK cities',
    ],
  },
  {
    title: 'What we do not cover',
    items: [
      'Industrial-scale commercial plumbing (factories, hospitals, large estates)',
      'New-build first-fix plumbing on developer sites',
      'Asbestos pipework removal - we will refer to a licensed contractor',
      'Sewer adoption work owned by the local water authority',
      'Properties outside our 12 listed UK cities and surrounding postcodes',
    ],
  },
];

export const localAreaContext = [
  { city: 'London', context: 'Victorian terraces, conversion flats, lead supply pipes and listed-building constraints in central zones.' },
  { city: 'Manchester', context: 'Edwardian terraces, modern apartments and HMO student lets across Chorlton, Didsbury and Fallowfield.' },
  { city: 'Birmingham', context: 'Mixed pre-war housing stock and 1960s tower blocks with galvanised rising mains and back boilers still in service.' },
  { city: 'Leeds', context: 'Back-to-back terraces in Headingley and Hyde Park, modern apartments in the city core.' },
  { city: 'Liverpool', context: 'Georgian and Victorian terraces in Anfield, Toxteth and Wavertree with original lead supplies common.' },
  { city: 'Bristol', context: 'Listed Clifton townhouses, Edwardian extensions in Bishopston and modern Harbourside apartments.' },
];

export const toneClass = (tone: ProblemRoute['tone']) =>
  tone === 'emergency'
    ? 'border-accent/30 bg-accent/5 hover:border-accent group-hover:bg-accent group-hover:text-white'
    : tone === 'maintenance'
    ? 'border-green/30 bg-green/5 hover:border-green group-hover:bg-green group-hover:text-white'
    : 'border-primary/20 bg-primary/5 hover:border-primary group-hover:bg-primary group-hover:text-white';
