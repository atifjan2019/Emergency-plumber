import { cities } from './cities';

export type Area = {
  /** URL slug, unique within the parent city (e.g. 'camden') */
  slug: string;
  /** Parent city slug (must match a slug in cities.ts) */
  citySlug: string;
  /** Display name (e.g. 'Camden') */
  name: string;
  /** One-line, area-specific opener used in the hero and meta description */
  intro: string;
  /** Real postcode districts within this area (a subset of the parent city's) */
  postcodes: string[];
  /** Average dispatch time to this area */
  responseTime: string;
  /** Two paragraphs of genuinely area-specific local insight (\n\n separated) */
  housingNotes: string;
  /** Area-specific common call-out reasons */
  commonIssues: string[];
  /** Real local landmarks / neighbourhoods within the area */
  landmarks: string[];
  /** Approximate centroid for schema/maps */
  geo: { lat: number; lng: number };
  /** Sibling area slugs in the same city, for internal linking */
  nearbyAreas: string[];

  // ── Optional rich content (present on hand-deepened pages) ───────────────────
  /** One-paragraph positioning lead shown under the hero. */
  overview?: string;
  /** Named sub-areas / neighbourhoods within this area, each with a unique note. */
  neighbourhoods?: { name: string; note: string }[];
  /** Richer common-problem cards; preferred over commonIssues when present. */
  commonProblems?: { title: string; detail: string }[];
  /** Area-specific coverage/access note; replaces the boilerplate postcode intro. */
  responseNote?: string;
  /** Area-specific prevention/advice tips. */
  localTips?: string[];
  /** Hand-written, area-specific FAQ; preferred over the generated FAQ when present. */
  faqs?: { question: string; answer: string }[];
};

// ─── London (pilot) ─────────────────────────────────────────────────────────
// Parent city data (water board, hardness, call-out fee, hourly rate, region)
// is inherited from cities.ts via getCityBySlug(area.citySlug).

const london: Area[] = [
  {
    slug: 'camden',
    citySlug: 'london',
    name: 'Camden',
    intro: 'From the Georgian terraces of Camden Town to the stucco villas of Primrose Hill, Camden mixes period property and canal-side conversions that each fail in their own way.',
    postcodes: ['NW1', 'NW3', 'NW5', 'N7', 'N19', 'WC1'],
    responseTime: '30 minutes',
    overview: `Camden is one of the most plumbing-varied boroughs in London. In the space of a single mile you move from the canal-side warehouse conversions of Camden Lock to the Georgian shopfront terraces of Camden Town, the grand stucco villas of Primrose Hill, the dense Victorian flat-conversions of Kentish Town and the red-brick mansion blocks of Belsize Park. Each was built to a different standard, plumbed in a different decade, and fails in a different way - so our Camden engineers turn up with a kit calibrated to the property in front of them rather than a one-size-fits-all van.`,
    housingNotes: `The everyday workhorse of Camden's housing is the Victorian and early-Victorian terrace that fills Camden Town and Kentish Town. Built fast for a city that was growing just as quickly, these houses were never engineered for the way modern households use water, and most have since been carved into flats or extended upward into the roof. Original lead rising mains, cast-iron soil stacks and waste runs sized for a single cold tap now feed two and three bathrooms apiece, and the joints between the original pipework and the retrofitted runs are where the majority of our leaks and slow drains begin.

Climb the hill into Primrose Hill and Belsize Park and the stock changes completely. Here the houses are grand stucco-fronted villas and mansion blocks, almost all with lower-ground and basement levels, and the pipework runs behind cornicing, panelling and lath-and-plaster that cannot simply be cut into. Much of this part of Camden is listed or sits inside a conservation area, which shapes how an emergency repair has to be carried out - we lead with non-invasive detection rather than exploratory holes.

Threading through all of it is Thames Water's very hard supply, often above 300 parts per million. Limescale is the single biggest driver of the boiler and immersion failures we attend across the borough: combi heat exchangers scale up, start to kettle, and deliver lukewarm water years before they should. Combined with the borough's appetite for basement conversions - where any leak from above collects at the lowest level out of sight - it makes Camden a borough where fast isolation and accurate tracing matter more than almost anywhere else we cover.`,
    neighbourhoods: [
      { name: 'Camden Town (NW1)', note: 'Georgian and early-Victorian terraces around the market and the canal, many split into flats above shops and bars. Original lead rising mains, retrofitted upstairs bathrooms and mixed residential-commercial drainage are the usual culprits.' },
      { name: 'Primrose Hill (NW1, NW3)', note: 'Grand stucco-fronted villas, almost all with lower-ground and basement levels. The defining problem is water from an upper floor or a failed mains run migrating down and pooling at the lowest level, out of sight.' },
      { name: 'Kentish Town (NW5)', note: 'Denser Victorian terraces heavily converted into flats. Thames hard water furs up the combi heat exchangers, shared soil stacks back up between flats, and decades of retrofitted bathrooms overload the original waste runs.' },
      { name: 'Belsize Park (NW3)', note: 'Red-brick mansion blocks and large period conversions running communal cold-water risers and vertical waste stacks - so one flat\'s leak or blockage is felt several floors below, and unvented cylinders raise the stakes when a valve fails.' },
      { name: 'Gospel Oak & Dartmouth Park (NW5)', note: 'A mix of post-war estates and hillside Victorian terraces toward the Highgate boundary - estate blocks bring communal-stack work while the terraces bring lead pipes and limescale.' },
      { name: 'Somers Town (NW1)', note: 'Post-war social-housing estates between Euston and King\'s Cross with shared risers and communal plumbing, where isolation is coordinated with the block rather than a single flat.' },
    ],
    commonProblems: [
      { title: 'Limescale-furred combi boilers', detail: 'Thames Water supplies Camden with very hard water, often above 300ppm. In the flat-conversions of Kentish Town and Camden Town that scale narrows the combi heat exchanger until the boiler kettles, the hot water runs lukewarm and pressure starts cycling. We descale or replace the heat exchanger and fit a scale-reducer to slow it happening again.' },
      { title: 'Lead supply-pipe leaks in period terraces', detail: 'Pre-1970s terraces across Camden Town and Kentish Town still carry stretches of original lead rising main. As the metal degrades it produces pinhole leaks that surface under floorboards or behind plaster, and we replace the lead run with copper or MDPE as part of the repair rather than patching it.' },
      { title: 'Leak migration into basement flats', detail: 'Primrose Hill and Belsize Park are full of lower-ground and basement flats. Because they sit at the bottom of the building, a leak two floors up - or a failed mains run - tracks down and collects there, often appearing far from its source. Fast isolation and acoustic tracing limit the damage.' },
      { title: 'Listed and conservation-area constraints', detail: 'Large parts of Camden Town, Primrose Hill and the Hampstead fringe sit in conservation areas, and many homes are listed. We cannot chase into period fabric without thought, so we lead with thermal and acoustic detection and choose replacement materials that suit the building.' },
      { title: 'Communal riser and stack faults', detail: 'The Belsize Park mansion blocks and larger conversions run shared cold-water risers and vertical waste stacks, so a blockage or leak on one floor is felt by the flats below. We carry isolation tools and matting and know the access procedures for the managed blocks.' },
    ],
    commonIssues: ['Limescale-furred combi boilers in Kentish Town flats', 'Lead supply pipe leaks in Camden Town terraces', 'Leak migration into Primrose Hill basement flats', 'Listed and conservation-area repair constraints', 'Communal stack faults in Belsize Park mansion blocks'],
    responseNote: `Engineers covering Camden are dispatched from across north and central London, so we reach Camden Town, Kentish Town and Primrose Hill well inside our advertised window even through the borough's heavy traffic and controlled-parking zones. For the canal-side conversions and the larger managed blocks we plan access on the call, so the engineer arrives with the right approach and the isolation kit those buildings need.`,
    localTips: [
      'Find and label your stopcock now - in converted Camden flats it is often shared or tucked inside a hallway cupboard, and you will not want to hunt for it mid-leak.',
      'Fit a scale-reducer or inhibitor if you are on a combi - Thames Water\'s very hard supply is the single biggest cause of boiler failure we see across Camden.',
      'In Primrose Hill and Belsize Park basement flats, keep the lowest floor clear of anything valuable and check for damp early - leaks from above show here first.',
      'If your home is listed or in a conservation area, keep a note of which pipe and fitting materials are acceptable - it speeds up an emergency repair enormously.',
      'Lag any pipework in unheated Victorian lofts and cellars before winter - the exposed runs in Camden\'s older stock are the ones that split in a cold snap.',
    ],
    faqs: [
      { question: 'Do you cover listed and conservation-area homes in Camden?', answer: 'Yes. Much of Camden Town, Primrose Hill and the Hampstead fringe is listed or in a conservation area. We use non-invasive thermal and acoustic leak detection to avoid disturbing period fabric, and we choose repair materials appropriate to the building so an emergency fix does not create a planning problem later.' },
      { question: 'Why does my Camden combi boiler keep scaling up or losing pressure?', answer: 'Thames Water supplies Camden with very hard water, which deposits limescale inside the combi heat exchanger over time. That causes kettling, lukewarm hot water and pressure that cycles up and down. We descale or replace the heat exchanger and can fit a scale-reducer to slow it recurring, and we check for the small hidden leaks that also drop pressure.' },
      { question: 'My lower-ground flat in Primrose Hill takes water from upstairs - can you find the source?', answer: 'Yes, and it is one of the most common calls we get in Primrose Hill and Belsize Park. Water from an upper floor or a failed mains run travels down through the structure and collects in the basement, often metres from the actual leak. We isolate the supply, then use thermal imaging and acoustic detection to pinpoint the source before any cutting.' },
      { question: 'How quickly can you reach Camden Town or Kentish Town?', answer: 'We aim to be with you in around 30 minutes. Engineers covering Camden are dispatched from across north and central London, and we plan around the borough\'s traffic and controlled-parking zones so the advertised window holds even at peak times.' },
      { question: 'Do you carry parts for the old lead and cast-iron pipework in Camden terraces?', answer: 'Yes. The pre-1970s terraces of Camden Town and Kentish Town still run lead supply pipe and cast-iron soil stacks. We carry copper, MDPE and the couplings needed to replace a failed lead run on the spot, rather than making a temporary patch that fails again.' },
      { question: 'Can you handle a leak in a Belsize Park mansion block that affects other flats?', answer: 'Yes. Mansion blocks and large conversions share cold-water risers and waste stacks, so a leak on one floor reaches the flats below. We carry isolation tools and absorbent matting, know the access procedures for most managed blocks, and coordinate isolation with the building where a communal riser is involved.' },
    ],
    landmarks: ['Camden Town', 'Primrose Hill', 'Kentish Town', 'Belsize Park', "Regent's Park"],
    geo: { lat: 51.539, lng: -0.1426 },
    nearbyAreas: ['islington', 'haringey'],
  },
  {
    slug: 'hackney',
    citySlug: 'london',
    name: 'Hackney',
    intro: 'Hackney pairs dense Victorian terraces around London Fields and Stoke Newington with Shoreditch-edge warehouse conversions, and the heavy retrofitting of both is what we get called to.',
    postcodes: ['E5', 'E8', 'E9', 'N1', 'N16'],
    responseTime: '30 minutes',
    housingNotes: `Hackney's terrace belt through London Fields, Dalston and Stoke Newington is some of the most heavily retrofitted stock in London. A decade of loft conversions, side-return kitchens and basement digs has layered modern pipework onto Victorian soil stacks and lead supply runs, and where those eras meet is where most of our leaks and blockages start. Toward the Shoreditch edge the picture changes to converted warehouses and new loft-style apartments, where pipework follows the path of least resistance through original brickwork and a failure is usually hidden behind a feature wall or under a screeded floor.

The borough's 1960s and 70s ex-council estates add a third pattern - communal waste stacks and shared risers where one flat's blockage backs up into the flat below. Thames Water's very hard supply scales up combi boilers across all of it, and the rapid pace of conversion work means we frequently find waste runs that were undersized for the number of bathrooms now feeding them. We carry acoustic and thermal detection as standard for the concealed-leak work the conversion stock generates.`,
    commonIssues: ['Retrofit and extension waste-run failures', 'Concealed leaks in warehouse conversions', 'Lead supply pipe corrosion in terraces', 'Communal stack faults on ex-council estates', 'Hard-water limescale in combi boilers'],
    landmarks: ['London Fields', 'Dalston', 'Stoke Newington', 'Hackney Central', 'Victoria Park'],
    geo: { lat: 51.545, lng: -0.0553 },
    nearbyAreas: ['islington', 'tower-hamlets'],
  },
  {
    slug: 'islington',
    citySlug: 'london',
    name: 'Islington',
    intro: 'Islington is Georgian squares, period conversions and basement flats around Angel, Highbury and Canonbury - elegant stock with plumbing that hides behind listed facades.',
    postcodes: ['N1', 'N5', 'N7', 'N19'],
    responseTime: '30 minutes',
    housingNotes: `Islington is defined by its Georgian and early-Victorian squares - Canonbury, Barnsbury and the streets off Upper Street - much of it listed or sitting inside conservation areas. A large share of this stock has been carved into flats over the decades, which means shared cold-water risers, communal soil stacks and a single original lead rising main feeding what are now three or four separate households. When that main fails, every flat in the house loses supply at once, and conservation status limits how we can route a replacement.

Basement and garden flats are the borough's defining vulnerability. Islington sits low along the buried course of the New River and the Fleet, and lower-ground flats around Angel and Holloway are the first to take water in heavy rain and the place leaks from upstairs collect. Thames Water's very hard supply furs up the boilers in these conversions, and we plan repairs in the listed terraces around minimal-disturbance access - acoustic detection before any cutting, and replacement runs chosen to suit the period fabric.`,
    commonIssues: ['Basement and garden-flat flooding around Angel', 'Lead rising-main failure in Georgian terraces', 'Shared-stack leaks in period conversions', 'Listed-terrace repair constraints', 'Limescale-blocked boilers in flat conversions'],
    landmarks: ['Angel', 'Highbury', 'Canonbury', 'Upper Street', 'Holloway'],
    geo: { lat: 51.5362, lng: -0.1033 },
    nearbyAreas: ['camden', 'hackney'],
  },
  {
    slug: 'wandsworth',
    citySlug: 'london',
    name: 'Wandsworth',
    intro: "Between the commons of Clapham, Balham and Tooting sit Wandsworth's double-fronted family terraces - extended in every direction - alongside the riverside towers of Battersea.",
    postcodes: ['SW11', 'SW12', 'SW15', 'SW17', 'SW18'],
    responseTime: '30 minutes',
    housingNotes: `Wandsworth's signature is the large double-fronted Victorian family terrace of the "between the commons" belt through Clapham, Balham and Northcote Road, and almost every one has been extended - side-return kitchens, loft conversions with new bathrooms, and dug-out basements. Each extension adds pipework that converges on an original soil stack and a single garden run to the sewer, and the joints between old and new are where we find most leaks and slow drainage. Loft bathrooms over occupied rooms below are a particular source of ceiling leaks across the borough.

The riverside at Battersea and Nine Elms is the opposite world: high-rise apartment blocks with pressurised, unvented systems, communal risers and the rapid escalation that comes with them - a small leak on an upper floor can flood several flats before the supply is isolated. Thames Water's very hard supply scales up the combi boilers in the family homes and the heat exchangers in the towers alike, so limescale-related failures run through the whole borough regardless of property age.`,
    commonIssues: ['Side-return and loft-extension waste leaks', 'Unvented-system failures in Battersea towers', 'Ceiling leaks from loft bathrooms', 'Lead pipes in Victorian family terraces', 'Limescale in family-home combi boilers'],
    landmarks: ['Clapham', 'Balham', 'Tooting', 'Battersea', 'Putney'],
    geo: { lat: 51.457, lng: -0.191 },
    nearbyAreas: ['lambeth', 'southwark'],
  },
  {
    slug: 'lambeth',
    citySlug: 'london',
    name: 'Lambeth',
    intro: 'Lambeth spans Georgian Kennington, the Victorian terraces of Brixton and Streatham, and the new Nine Elms towers - three eras of plumbing in one borough.',
    postcodes: ['SE11', 'SE24', 'SE27', 'SW2', 'SW4', 'SW8'],
    responseTime: '30 minutes',
    housingNotes: `Lambeth packs three distinct housing eras into a narrow strip. Kennington holds Georgian terraces under listed and conservation protection; Brixton, Clapham and Streatham are dense Victorian terrace belts; and the Vauxhall and Nine Elms riverfront has filled with new pressurised high-rise apartment blocks over the last decade. The terraces bring the familiar inner-London problems - original lead supply pipes, undersized waste runs and soil stacks shared between converted flats - and the conservation status around Kennington shapes how we can carry out a repair.

The Nine Elms towers are where escalation is fastest: unvented cylinders, pressure-reducing valves and expansion vessels that, when they fail, turn a slow drip into a flooded ceiling across multiple flats in minutes. Lambeth also carries a large stock of post-war council estates with communal risers and ageing internal pipework. Thames Water's very hard supply scales boilers and immersion heaters across every one of these property types, and our local engineers carry the isolation tools the high-rise blocks demand.`,
    commonIssues: ['PRV and unvented-system failures in Nine Elms towers', 'Lead supply pipe leaks in Brixton terraces', 'Communal riser leaks on council estates', 'Listed-building constraints in Kennington', 'Hard-water limescale across boiler stock'],
    landmarks: ['Brixton', 'Clapham', 'Streatham', 'Kennington', 'Vauxhall'],
    geo: { lat: 51.4607, lng: -0.1163 },
    nearbyAreas: ['wandsworth', 'southwark'],
  },
  {
    slug: 'southwark',
    citySlug: 'london',
    name: 'Southwark',
    intro: 'Southwark runs from the Bermondsey warehouse conversions on the river to the Victorian terraces of Peckham and Camberwell, with dense estates in between.',
    postcodes: ['SE1', 'SE5', 'SE15', 'SE16', 'SE17'],
    responseTime: '30 minutes',
    housingNotes: `Southwark's riverside - Shad Thames, Bermondsey and Rotherhithe - is dominated by converted Victorian warehouses and newer dockside apartment blocks. The conversions hide their pipework in original brick and thick floor build-ups, so leaks are concealed and slow to surface, while the modern blocks bring pressurised unvented systems and communal stacks where an upper-floor failure cascades downward fast. Inland, Peckham, Camberwell and Walworth are Victorian and Georgian terrace country, much of it converted into flats with shared soil stacks and original lead rising mains.

The borough also carries some of London's largest post-war council estates, where communal waste stacks and shared risers mean one blockage affects several homes at once. Thames Water supplies the area with very hard water, so limescale-driven boiler failures are a constant background to the call-outs we attend. We bring thermal and acoustic detection to the warehouse conversions where guess-and-cut investigation is never acceptable to leaseholders.`,
    commonIssues: ['Concealed leaks in Bermondsey warehouse conversions', 'Riverside flat stack cascades', 'Lead supply pipes in Peckham terraces', 'Communal stack faults on large estates', 'Hard-water limescale in boilers'],
    landmarks: ['Bermondsey', 'Peckham', 'Camberwell', 'Borough', 'Rotherhithe'],
    geo: { lat: 51.473, lng: -0.079 },
    nearbyAreas: ['lambeth', 'lewisham'],
  },
  {
    slug: 'tower-hamlets',
    citySlug: 'london',
    name: 'Tower Hamlets',
    intro: "Tower Hamlets holds Canary Wharf's glass towers and the Victorian terraces of Bow and Bethnal Green side by side - pressurised high-rise systems against ageing lead pipework.",
    postcodes: ['E1', 'E2', 'E3', 'E14'],
    responseTime: '30 minutes',
    housingNotes: `Tower Hamlets is the sharpest contrast in our London coverage. Canary Wharf and the Isle of Dogs (E14) are a forest of high-rise glass towers running pressurised, unvented systems on communal risers - the failure mode here is speed, where a PRV fault or a split flexi on the twentieth floor can damage four flats below before the riser is isolated. We keep isolation tools and absorbent matting on every van for exactly this, and our engineers know the access procedures for the major managed blocks.

A few streets inland the stock flips to Victorian terraces through Bow and Bethnal Green and warehouse conversions around Wapping, carrying original lead supply pipes, undersized waste runs and concealed conversion pipework. Dense social-housing towers add communal-stack call-outs across the borough. Thames Water's very hard supply scales the heat exchangers in the towers and the combis in the terraces alike, and frozen condensate pipes on exposed tower balconies are a recurring winter fault here that you rarely see at ground level.`,
    commonIssues: ['Communal riser leaks in Canary Wharf towers', 'PRV and unvented-cylinder failures in high-rise flats', 'Lead supply pipes in Bow and Bethnal Green terraces', 'Concealed leaks in Wapping warehouse conversions', 'Frozen condensate pipes on tower balconies'],
    landmarks: ['Canary Wharf', 'Bow', 'Bethnal Green', 'Whitechapel', 'Wapping'],
    geo: { lat: 51.515, lng: -0.029 },
    nearbyAreas: ['hackney', 'newham'],
  },
  {
    slug: 'greenwich',
    citySlug: 'london',
    name: 'Greenwich',
    intro: 'Greenwich sets World Heritage listed terraces and Blackheath villas against the modern apartment blocks of the Peninsula - heritage constraints and new pressurised systems in one borough.',
    postcodes: ['SE3', 'SE7', 'SE10', 'SE18'],
    responseTime: '35 minutes',
    housingNotes: `Greenwich town centre and the streets around the park sit within a World Heritage Site, and much of the Georgian and early-Victorian terrace stock there is listed or in a conservation area. Repairs cannot disturb the fabric without careful planning, so we lead with non-invasive leak detection and choose replacement materials to suit the period. Blackheath adds substantial period villas with complex internal pipework, and Charlton and the streets toward Woolwich fill in with Victorian and Edwardian terraces carrying the usual lead-and-cast-iron weaknesses.

The Greenwich Peninsula is the modern counterweight - a dense cluster of new apartment blocks with unvented cylinders, pressurised systems and communal risers that escalate quickly when something fails on an upper floor. The river frontage adds persistent damp that speeds up corrosion of external soil pipes and rainwater goods. Thames Water's very hard supply scales boilers across the whole borough, so limescale failures are common in both the listed terraces and the Peninsula's modern flats.`,
    commonIssues: ['Listed-building constraints in Greenwich town centre', 'Unvented-system failures in Peninsula apartments', 'Lead pipes in Charlton and Woolwich terraces', 'Riverside damp accelerating external corrosion', 'Hard-water limescale in boilers'],
    landmarks: ['Greenwich', 'Blackheath', 'Charlton', 'Woolwich', 'Greenwich Peninsula'],
    geo: { lat: 51.4826, lng: 0.0077 },
    nearbyAreas: ['lewisham', 'southwark'],
  },
  {
    slug: 'lewisham',
    citySlug: 'london',
    name: 'Lewisham',
    intro: 'Lewisham climbs from the Victorian terraces of Brockley and Forest Hill up the hills toward Honor Oak, where topography drives both water pressure and drainage call-outs.',
    postcodes: ['SE4', 'SE6', 'SE8', 'SE13', 'SE23'],
    responseTime: '35 minutes',
    housingNotes: `Lewisham's defining feature is its topography. The borough rises steeply from the Ravensbourne valley toward Forest Hill, Honor Oak and the Blackheath edge, and that gradient shapes the work. Properties on the lower ground around Catford and Lewisham town centre sit at the bottom of long downhill drainage runs and back up first when anything blocks upstream in heavy rain; homes on the higher slopes see elevated static pressure on the rising main and occasional pressure drops when several uphill demands hit at once.

The housing itself is largely Victorian and Edwardian terrace, with the Brockley conservation area holding particularly fine stock where repairs are constrained, and Forest Hill carrying substantial period villas. Deptford and Lewisham town centre add newer regeneration apartment blocks with pressurised, unvented systems. Thames Water's very hard supply furs up boilers across all of it, and the period terraces still carry lead supply pipes and undersized waste runs that we replace as a routine part of leak repairs.`,
    commonIssues: ['Topographic pressure variation on the hills', 'Downhill drainage backing up around Catford', 'Brockley conservation-area repair constraints', 'Lead supply pipes in Victorian terraces', 'Unvented-system failures in Deptford new-builds'],
    landmarks: ['Forest Hill', 'Brockley', 'Catford', 'Deptford', 'Honor Oak'],
    geo: { lat: 51.4452, lng: -0.0209 },
    nearbyAreas: ['greenwich', 'southwark'],
  },
  {
    slug: 'haringey',
    citySlug: 'london',
    name: 'Haringey',
    intro: 'Haringey runs from the hillside Edwardian villas of Crouch End and Muswell Hill down to the Harringay Ladder terraces and the dense streets of Tottenham.',
    postcodes: ['N4', 'N8', 'N15', 'N17', 'N22'],
    responseTime: '35 minutes',
    housingNotes: `Haringey divides neatly along its hills. The western half - Crouch End, Muswell Hill and the Highgate edge - is high ground covered in large Edwardian villas and terraces, many extended with loft conversions and rear additions that add bathrooms the original pipework never anticipated. The elevation brings noticeable pressure variation: high static pressure on some streets, weak flow on others when demand peaks. The Harringay "Ladder", the famous grid of parallel Victorian terraces between Green Lanes and the railway, is dense lead-and-cast-iron stock where access for repairs is tight.

East toward Tottenham and Wood Green the housing shifts to Victorian terraces, post-war estates and ex-council high-rise blocks with communal waste stacks and shared risers. Thames Water's very hard supply scales boilers across the borough, and the extended villas of Crouch End in particular generate ceiling-leak call-outs from loft bathrooms sitting over occupied rooms. Frozen condensate and feed pipes are a winter pattern on the exposed higher ground.`,
    commonIssues: ['Hillside pressure variation around Muswell Hill', 'Loft-bathroom ceiling leaks in Crouch End villas', 'Lead pipes in the Harringay Ladder terraces', 'Communal stack faults in Tottenham high-rise', 'Hard-water limescale in boilers'],
    landmarks: ['Crouch End', 'Muswell Hill', 'Tottenham', 'Wood Green', 'Harringay'],
    geo: { lat: 51.5906, lng: -0.111 },
    nearbyAreas: ['camden', 'islington'],
  },
  {
    slug: 'newham',
    citySlug: 'london',
    name: 'Newham',
    intro: 'Newham combines the new Stratford and Royal Docks towers with dense, heavily converted Victorian terraces in East Ham and Forest Gate - high-rise systems and overloaded HMOs.',
    postcodes: ['E6', 'E7', 'E12', 'E13', 'E15', 'E16'],
    responseTime: '35 minutes',
    housingNotes: `Newham's housing splits between the new and the heavily worked. Stratford and the Olympic Park (E15 and E20) and the Royal Docks (E16) have filled with new apartment towers running pressurised, unvented systems on communal risers - modern stock whose failure mode is rapid escalation, where a PRV or flexi failure high in the block reaches several flats below before isolation. We carry the isolation kit and matting these blocks need on every van.

The older heart of the borough - East Ham, Forest Gate and Plaistow - is dense Victorian terrace, a large share of it converted into houses of multiple occupation. HMO use puts far more load on waste runs and bathrooms than the original two-up two-down layouts allow, so we attend overflowing bathrooms, blocked kitchen drains and boilers worn out by constant demand. Thames Water's very hard supply is among the harder in the capital here, scaling combi boilers heavily, and the terraces still carry lead supply pipes and undersized waste runs.`,
    commonIssues: ['HMO drainage overload in East Ham and Forest Gate', 'Stack and PRV failures in Stratford new-builds', 'Communal risers in Royal Docks towers', 'Lead pipes and undersized waste in terraces', 'Heavy hard-water limescale in boilers'],
    landmarks: ['Stratford', 'East Ham', 'Forest Gate', 'Plaistow', 'Royal Docks'],
    geo: { lat: 51.5255, lng: 0.0352 },
    nearbyAreas: ['tower-hamlets', 'hackney'],
  },
  {
    slug: 'ealing',
    citySlug: 'london',
    name: 'Ealing',
    intro: 'Ealing - the "Queen of the Suburbs" - is Edwardian and inter-war semis with generous gardens, alongside the Victorian terraces of Acton and the dense streets of Southall.',
    postcodes: ['W3', 'W5', 'W7', 'W13', 'UB1', 'UB6'],
    responseTime: '35 minutes',
    housingNotes: `Ealing earned its "Queen of the Suburbs" name from its leafy Edwardian and inter-war housing, and that age profile sets it apart from inner London. There are far more semi-detached and detached homes here than terraces, with larger plots and longer external supply runs to the property - which means more buried garden pipework to freeze in winter and more galvanised rising mains from the 1930s reaching the end of their life. Those galvanised mains corrode internally and fail at the threads, and replacing them is routine work across the Ealing, Hanwell and Greenford streets.

Acton brings denser Victorian terraces and a wave of new-build and conversion flats around the Crossrail stations, while Southall is dense terrace and HMO stock with the heavy waste-run loading that comes with multiple-occupancy use. Thames Water's very hard supply scales boilers across the borough, and the older suburban heating systems - some still on back-boilers or first-generation combis - are a steady source of breakdown call-outs. Longer dispatch distances out west are why we quote a slightly longer response here than for central zones.`,
    commonIssues: ['Galvanised rising-main failure in inter-war semis', 'Frozen and leaking long external supply runs', 'Conversion-flat leaks around Acton', 'HMO drainage overload in Southall', 'Hard-water limescale in ageing heating systems'],
    landmarks: ['Ealing Broadway', 'Acton', 'Hanwell', 'Southall', 'Greenford'],
    geo: { lat: 51.513, lng: -0.3089 },
    nearbyAreas: ['hackney', 'wandsworth'],
  },
];

export const areas: Area[] = [...london];

// ─── Lookups ──────────────────────────────────────────────────────────────────

export const getAreasByCity = (citySlug: string): Area[] =>
  areas.filter((a) => a.citySlug === citySlug);

export const getAreaBySlug = (citySlug: string, areaSlug: string): Area | undefined =>
  areas.find((a) => a.citySlug === citySlug && a.slug === areaSlug);

/** Every { city, area } pair that has real content - used by generateStaticParams. */
export const getAreaParams = (): { city: string; area: string }[] =>
  areas.map((a) => ({ city: a.citySlug, area: a.slug }));

/** True if a sub-area has a dedicated page (i.e. real data exists for it). */
export const hasAreaPage = (citySlug: string, areaSlug: string): boolean =>
  areas.some((a) => a.citySlug === citySlug && a.slug === areaSlug);

// Guard: every area must point at a real city.
const cityLookup = new Set(cities.map((c) => c.slug));
for (const a of areas) {
  if (!cityLookup.has(a.citySlug)) {
    throw new Error(`Area "${a.slug}" references unknown city "${a.citySlug}"`);
  }
}
