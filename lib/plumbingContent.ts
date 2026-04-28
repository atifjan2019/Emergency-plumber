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

export const toneClass = (tone: ProblemRoute['tone']) =>
  tone === 'emergency'
    ? 'border-accent/30 bg-accent/5 hover:border-accent group-hover:bg-accent group-hover:text-white'
    : tone === 'maintenance'
    ? 'border-green/30 bg-green/5 hover:border-green group-hover:bg-green group-hover:text-white'
    : 'border-primary/20 bg-primary/5 hover:border-primary group-hover:bg-primary group-hover:text-white';
