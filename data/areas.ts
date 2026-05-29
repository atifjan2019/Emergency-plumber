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
    overview: `Hackney is a borough mid-transformation, and its plumbing tells the story. The dense Victorian terraces of London Fields, Stoke Newington and Clapton have been loft-converted, side-returned and basement-dug for two decades; the old industrial fringe toward Shoreditch has filled with warehouse conversions and new apartment blocks; and between them sit the large post-war estates of Homerton and Woodberry Down. Each layer was plumbed to a different standard, so our Hackney engineers carry the detection kit and the parts to handle whichever one they walk into.`,
    housingNotes: `Hackney's terrace belt through London Fields, Dalston, Stoke Newington and Clapton is some of the most heavily retrofitted stock in London. A decade and more of loft conversions, side-return kitchens and dug-out basements has layered modern pipework onto Victorian soil stacks and original lead supply runs, and the joints where those eras meet are where the majority of our leaks and slow drains begin. Waste runs sized for a single bathroom now serve two or three, so partial blockages and overflows are a constant.

Toward the Shoreditch and Haggerston edge the picture changes to converted warehouses and new loft-style apartments. Here the pipework was threaded through original brickwork and buried under thick screeded floors, so a failure rarely shows where it starts - it tracks along a joist and surfaces metres away, behind a feature wall or above a downstairs ceiling. Guess-and-cut investigation is never acceptable to leaseholders here, so we lead with thermal imaging and acoustic detection on every conversion call.

The borough's third layer is its post-war estates - Pembury, Kingsmead, Woodberry Down and the Homerton blocks - where communal waste stacks and shared cold-water risers mean one flat's blockage or leak is quickly felt by its neighbours. Running through all of it is Thames Water's very hard supply, which scales up combi heat exchangers across terrace, conversion and flat alike, making limescale the steady background to a large share of our Hackney boiler call-outs.`,
    neighbourhoods: [
      { name: 'London Fields & Broadway Market (E8)', note: 'Sought-after Victorian terraces, almost all extended with side-return kitchens and loft bathrooms. Ceiling leaks from upstairs additions and waste runs overloaded by extra bathrooms are the staples here.' },
      { name: 'Dalston (E8)', note: 'A mix of terrace conversions and newer blocks along the busy Kingsland Road corridor, with plenty of flats above shops and bars - so we see mixed residential-commercial drainage and shared-stack faults.' },
      { name: 'Stoke Newington (N16)', note: 'Family Victorian terraces around Church Street and Clissold Park, much of it in conservation areas. Lead supply pipes and retrofitted bathrooms are common, and repairs are planned to respect the period stock.' },
      { name: 'Clapton (E5)', note: 'Terraces and grander villas around Clapton Square and toward the River Lea, with a steady run of conversions. Damp from the river fringe and lead pipework feature alongside the usual hard-water scaling.' },
      { name: 'Hackney Central & Homerton (E9)', note: 'Victorian terraces meeting large post-war estates near Victoria Park and Homerton Hospital. Communal-stack work on the estates sits alongside terrace lead-pipe and limescale call-outs.' },
      { name: 'Haggerston & the Shoreditch fringe (E2, E8)', note: 'Converted warehouses and new-build apartments with pressurised, unvented systems and concealed pipework - rapid-escalation leaks where fast isolation matters most.' },
    ],
    commonProblems: [
      { title: 'Retrofit and extension waste failures', detail: 'A decade of side-returns, loft bathrooms and basement digs has spliced modern pipework onto Victorian soil stacks across London Fields and Stoke Newington. The joints between old and new leak and block, and loft bathrooms over occupied rooms are a frequent source of ceiling leaks.' },
      { title: 'Concealed leaks in warehouse conversions', detail: 'In the Haggerston and Shoreditch-fringe conversions, pipework runs through original brick and under screeded floors, so a leak surfaces far from its source. We use thermal and acoustic detection to pinpoint it before any cutting, which leaseholders and managing agents require.' },
      { title: 'Lead supply-pipe corrosion in terraces', detail: 'The pre-1970s terraces of Stoke Newington, Clapton and Dalston still carry original lead rising mains that develop pinhole leaks as they age. We replace failed lead runs with copper or MDPE rather than patching them.' },
      { title: 'Communal stack faults on the estates', detail: 'On Pembury, Woodberry Down, Homerton and the other post-war estates, shared waste stacks and risers mean one flat\'s blockage backs up into another. We isolate at the right point and clear the stack rather than just the visible fitting.' },
      { title: 'Hard-water limescale in combi boilers', detail: 'Thames Water\'s very hard supply furs up combi heat exchangers across the borough, causing kettling, lukewarm hot water and cycling pressure. We descale or replace the exchanger and can fit a scale-reducer to slow it recurring.' },
    ],
    commonIssues: ['Retrofit and extension waste-run failures', 'Concealed leaks in warehouse conversions', 'Lead supply pipe corrosion in terraces', 'Communal stack faults on ex-council estates', 'Hard-water limescale in combi boilers'],
    responseNote: `Much of Hackney sits away from the Tube, so we dispatch the closest van by road and plan around the borough's heavy traffic and one-way systems around Dalston, Hackney Central and Stoke Newington. For the estates and the managed conversion blocks we confirm access on the call so the engineer arrives able to reach the riser or stack quickly.`,
    localTips: [
      'If you are in an extended terrace, know where the loft-bathroom isolation valve is - a leak up there shows on the ceiling below long before you find the source.',
      'Fit a scale-reducer on a combi - Thames Water\'s very hard supply is the biggest single cause of boiler failure across Hackney.',
      'In a warehouse conversion, ask the managing agent where the flat\'s stopcock and the communal isolation points are before you ever need them.',
      'Lag pipework in unheated loft conversions and cellars before winter - the exposed runs added during extensions are the ones that freeze.',
      'Avoid putting wipes and fat down the drain in older terraces - the original waste runs are narrow and block quickly under modern use.',
    ],
    faqs: [
      { question: 'Can you find a hidden leak in a Hackney warehouse conversion without ripping up the floor?', answer: 'Yes - it is one of our most common Hackney calls. In the Haggerston and Shoreditch-fringe conversions the pipework is buried in brick and screed, so we use thermal imaging and acoustic detection to pinpoint the leak before any cutting, which is what managing agents and leaseholders expect.' },
      { question: 'My extended terrace in London Fields has a ceiling leak - where does it come from?', answer: 'Usually a loft or first-floor bathroom added during a conversion, where the new waste run or seal has failed over a room below. We trace it to the source rather than opening the ceiling at the damp patch, and repair the run properly so it does not return.' },
      { question: 'How fast can you reach Stoke Newington or Clapton?', answer: 'We aim for around 30 minutes. Much of Hackney is off the Tube network, so we dispatch the nearest road van and plan around the borough\'s traffic so the advertised window holds even at busy times.' },
      { question: 'There is a blockage affecting several flats on my Hackney estate - can you help?', answer: 'Yes. On the post-war estates the flats share waste stacks and risers, so a blockage in one backs up into others. We identify where the shared run is blocked, isolate correctly and clear the stack itself, coordinating access with the block where needed.' },
      { question: 'Why does my Hackney boiler keep scaling up?', answer: 'Thames Water supplies Hackney with very hard water, which deposits limescale in the combi heat exchanger over time. That causes kettling and lukewarm water. We descale or replace the exchanger and can fit a scale-reducer to slow it happening again.' },
    ],
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
    overview: `Islington packs an extraordinary amount of period property into a small, dense borough - the Georgian squares of Barnsbury and Canonbury, the elegant terraces off Upper Street, the Victorian streets of Highbury and Holloway, and the basement and garden flats carved out of all of them. It is elegant stock, but its plumbing hides behind listed facades and runs through shared risers, which is exactly why an Islington emergency rewards an engineer who knows how the borough is built.`,
    housingNotes: `Islington is defined by its Georgian and early-Victorian squares - Canonbury, Barnsbury and the streets fanning off Upper Street - much of it listed or sitting inside a conservation area. A large share of this stock was carved into flats over the last century, which means shared cold-water risers, communal soil stacks and a single original lead rising main now feeding three or four separate households. When that main fails, every flat in the house loses supply at once, and conservation status limits how we can route a replacement, so we plan the repair carefully rather than reaching for the quickest cut.

Basement and garden flats are the borough's defining vulnerability. Islington sits low along the buried courses of the New River and the Fleet, and the lower-ground flats around Angel, Holloway and Caledonian Road are the first to take water in heavy rain and the place that leaks from upstairs collect. A drip two floors up arrives in the basement long before anyone upstairs notices, so fast isolation and accurate tracing are central to the work here.

Thames Water's very hard supply furs up the boilers and immersion heaters in these conversions, adding limescale failure to the mix across the whole borough. In the listed terraces of Barnsbury and Canonbury we work to minimal-disturbance access - acoustic and thermal detection before any cutting, and replacement runs chosen to suit the period fabric - because an emergency fix here cannot be allowed to damage the building or breach its protections.`,
    neighbourhoods: [
      { name: 'Angel & Barnsbury (N1)', note: 'Georgian squares and terraces, many split into flats with lower-ground levels. Basement leak collection and shared lead rising mains off Upper Street are the recurring calls.' },
      { name: 'Canonbury (N1)', note: 'Highly protected Georgian and early-Victorian stock, much of it listed. Repairs are planned around conservation constraints, with non-invasive detection before any work to the fabric.' },
      { name: 'Highbury (N5)', note: 'Victorian terraces and mansion flats around Highbury Fields and the Emirates Stadium. Lead supply pipes, period conversions with shared stacks, and hard-water boiler scaling are typical here.' },
      { name: 'Holloway (N7)', note: 'Denser Victorian terraces meeting post-war estates along the Holloway Road and Caledonian Road. Communal-stack work on the estates sits beside terrace lead-pipe and basement-flooding call-outs.' },
      { name: 'Archway & Tufnell Park (N19)', note: 'Hillier Victorian terraces climbing toward Highgate, many converted into flats. Pressure variation on the slopes and shared-stack leaks in the conversions are the usual issues.' },
      { name: 'Pentonville & Caledonian Road (N1, N7)', note: 'A mix of Georgian terraces, conversions and estates near King\'s Cross, on low ground where heavy rain backs up - so basement and ground-floor flooding features here.' },
    ],
    commonProblems: [
      { title: 'Basement and garden-flat flooding', detail: 'Islington sits on low ground over the buried New River and Fleet, so lower-ground flats around Angel, Holloway and Caledonian Road take water in heavy rain and collect leaks from the floors above. We isolate fast and trace the source rather than chasing the damp patch.' },
      { title: 'Lead rising-main failure in Georgian terraces', detail: 'The Barnsbury and Canonbury squares still run original lead rising mains, often feeding several converted flats from one pipe. As the lead degrades it leaks, and because it is shared, a failure can cut supply to the whole house - we replace the run with copper or MDPE.' },
      { title: 'Shared-stack leaks in period conversions', detail: 'Houses carved into flats share soil stacks and cold-water risers, so a leak or blockage in one flat reaches the others. We isolate at the right point and repair the shared run rather than just the visible fitting.' },
      { title: 'Listed and conservation-area constraints', detail: 'Much of central Islington is listed or in a conservation area. We cannot chase into period fabric without thought, so we lead with thermal and acoustic detection and choose materials and routes that suit the building and its protections.' },
      { title: 'Limescale-blocked boilers in conversions', detail: 'Thames Water\'s very hard supply scales the combi heat exchangers and immersion heaters common in Islington\'s flat conversions, causing kettling and lukewarm water. We descale or replace the affected part and can fit a scale-reducer.' },
    ],
    commonIssues: ['Basement and garden-flat flooding around Angel', 'Lead rising-main failure in Georgian terraces', 'Shared-stack leaks in period conversions', 'Listed-terrace repair constraints', 'Limescale-blocked boilers in flat conversions'],
    responseNote: `Islington is one of the densest boroughs we cover, and engineers are dispatched from nearby north and central London. We plan around the heavy traffic and controlled-parking zones along Upper Street, Holloway Road and Caledonian Road so we reach Angel, Highbury and Canonbury inside the advertised window, and we confirm access for converted houses and managed blocks on the call.`,
    localTips: [
      'In a converted house, find out whether your stopcock is your own or shared with the other flats - in many Islington Georgian conversions one rising main feeds the whole building.',
      'If you are in a basement or garden flat, keep valuables off the lowest floor and check for damp early - rain backup and upstairs leaks both show here first.',
      'For listed and conservation-area homes, keep a note of acceptable pipe and fitting materials so an emergency repair can proceed without a planning problem.',
      'Fit a scale-reducer on a combi boiler - Thames Water\'s very hard supply is the main cause of boiler failure across Islington.',
      'Check the gully and drain covers at the front of a lower-ground flat are clear before winter storms - blocked surface drains are a common cause of basement flooding.',
    ],
    faqs: [
      { question: 'My Islington basement flat floods or takes water from upstairs - can you find the cause?', answer: 'Yes, and it is one of our most common Islington calls. Lower-ground flats around Angel and Holloway sit on low ground and at the bottom of the building, so both rainwater backup and leaks from upstairs collect there. We isolate the supply, then use thermal and acoustic detection to find the true source before any cutting.' },
      { question: 'Do you work on listed and conservation-area homes in Barnsbury and Canonbury?', answer: 'Yes. Much of central Islington is listed or in a conservation area. We use non-invasive detection to avoid disturbing period fabric and choose repair routes and materials appropriate to the building, so an emergency fix does not create a planning issue afterwards.' },
      { question: 'The whole house has lost water - is it the shared main?', answer: 'Often, yes. Many Islington Georgian houses converted into flats still run a single original lead rising main for the whole building, so when it fails every flat loses supply at once. We locate and isolate the fault and replace the lead run with copper or MDPE.' },
      { question: 'How quickly can you reach Angel or Highbury?', answer: 'We aim for around 30 minutes. Engineers are dispatched from nearby north and central London, and we plan around the traffic and parking restrictions on Upper Street and Holloway Road so the window holds at busy times.' },
      { question: 'There is a leak between two flats in my converted Islington house - whose pipework is it?', answer: 'Converted houses share soil stacks and cold-water risers, so a leak in one flat often originates in the shared run rather than either flat alone. We trace and isolate the shared pipework and repair it, and can advise on which part is communal for your freeholder or managing agent.' },
    ],
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
    overview: `Wandsworth is a tale of two boroughs. Inland, the "between the commons" belt through Clapham, Balham and Northcote Road is wall-to-wall double-fronted Victorian family terraces, almost every one extended in three directions. On the river, Battersea and Nine Elms have become a wall of new high-rise apartment towers. The family homes fail at their extension joints; the towers fail fast under pressure - and our Wandsworth engineers are equipped for both.`,
    housingNotes: `Wandsworth's signature is the large double-fronted Victorian family terrace of the "between the commons" belt - Clapham, Balham and the streets around Northcote Road. Almost every one has been extended, often more than once: side-return kitchens, loft conversions with new bathrooms, and dug-out basements. Each addition splices fresh pipework onto an original soil stack and a single garden run to the sewer, and the joints between the eras are where we find most leaks and slow drainage. Loft bathrooms sitting over occupied rooms below make ceiling leaks one of the most common calls in the borough.

The riverside at Battersea and Nine Elms is the opposite world. The new high-rise apartment blocks run pressurised, unvented systems on communal risers, and their failure mode is speed - a split flexi or a failed pressure-reducing valve high in the block can reach several flats below before the supply is isolated. We carry isolation tools and absorbent matting for exactly this and know the access procedures for the major managed developments.

Tying the two worlds together is Thames Water's very hard supply. It scales the combi boilers in the family homes and the heat exchangers and unvented cylinders in the towers alike, so limescale-related failure runs right through the borough regardless of a property's age. Earlsfield, Tooting and the Putney slopes fill in between with their own mix of terraces and conversions, each carrying a share of the same lead-pipe and hard-water issues.`,
    neighbourhoods: [
      { name: 'Battersea & Nine Elms (SW11)', note: 'New riverside high-rise blocks with pressurised, unvented systems and communal risers. The defining problem is rapid escalation - an upper-floor leak reaching the flats below before isolation, plus PRV and expansion-vessel failures.' },
      { name: 'Clapham & Northcote Road (SW11)', note: 'The heart of "Nappy Valley" - large double-fronted family terraces extended with side-returns, lofts and basements. Ceiling leaks from loft bathrooms and overloaded waste runs are the staples.' },
      { name: 'Balham (SW12)', note: 'Victorian terraces and mansion flats around the High Road, heavily converted and extended. Lead supply pipes, shared stacks in the conversions and hard-water boiler scaling feature here.' },
      { name: 'Tooting (SW17)', note: 'Denser Victorian terraces, many in multiple occupation near the hospitals and the markets. Overloaded waste runs and lead pipework are common alongside limescale call-outs.' },
      { name: 'Earlsfield (SW18)', note: 'Family terraces in the Wandle valley, extended much like Clapham, with low-lying streets near the river where surface water can back up.' },
      { name: 'Putney (SW15)', note: 'A mix of riverside flats, mansion blocks and terraces climbing Putney Hill - so we see both tower-style unvented failures by the river and pressure variation on the slopes.' },
    ],
    commonProblems: [
      { title: 'Side-return and loft-extension leaks', detail: 'The extended family terraces of Clapham and Balham splice modern pipework onto Victorian soil stacks, and the joints leak. Loft bathrooms over occupied rooms are a particular source of ceiling leaks - we trace to the source rather than opening the ceiling at the damp patch.' },
      { title: 'Unvented-system failures in riverside towers', detail: 'The Battersea and Nine Elms blocks run pressurised unvented cylinders. A failed pressure-reducing valve, a lost expansion-vessel charge or a split flexi escalates fast and reaches the flats below. We isolate quickly and repair the failed component, recharging and recommissioning the system.' },
      { title: 'Ceiling leaks from loft bathrooms', detail: 'Loft conversions added bathrooms above bedrooms and living rooms across the borough. Failed seals, traps and waste joints in those bathrooms surface as stains on the ceiling below, and we repair the run properly so it does not return.' },
      { title: 'Lead pipes in Victorian family terraces', detail: 'The pre-1970s terraces still carry original lead supply runs that develop pinhole leaks with age, often under floors. We replace the lead with copper or MDPE rather than patching it.' },
      { title: 'Limescale in combi boilers and cylinders', detail: 'Thames Water\'s very hard supply scales heat exchangers in the family homes and unvented cylinders in the towers, causing kettling and lukewarm water. We descale or replace the affected part and can fit a scale-reducer.' },
    ],
    commonIssues: ['Side-return and loft-extension waste leaks', 'Unvented-system failures in Battersea towers', 'Ceiling leaks from loft bathrooms', 'Lead pipes in Victorian family terraces', 'Limescale in family-home combi boilers'],
    responseNote: `Engineers covering Wandsworth are dispatched from across south-west London. We plan around the busy crossings and the congestion around Clapham Junction, Northcote Road and the Nine Elms developments, and for the riverside towers we confirm building access and isolation points on the call so the engineer can reach a communal riser quickly.`,
    localTips: [
      'If your terrace has a loft bathroom, locate its isolation valve - an upstairs leak there shows on the ceiling below well before you trace it.',
      'In a Battersea or Nine Elms apartment, find out where your flat\'s stopcock and the communal isolation valves are before you ever need them - unvented systems escalate fast.',
      'Fit a scale-reducer on a combi - Thames Water\'s very hard supply is the main cause of boiler failure across Wandsworth.',
      'After a basement dig or side-return, ask for the drainage layout - knowing where the extended waste runs join the original stack saves time in a blockage.',
      'In low-lying Earlsfield and riverside streets, keep gullies and airbricks clear before winter storms to limit surface-water backup.',
    ],
    faqs: [
      { question: 'My Clapham terrace has a ceiling leak under the loft bathroom - can you fix it?', answer: 'Yes, it is one of our most common Wandsworth calls. Loft conversions added bathrooms over rooms below, and failed seals or waste joints there show as ceiling stains. We trace the leak to its source, isolate, and repair the run properly rather than just patching the ceiling.' },
      { question: 'A leak in my Battersea tower is affecting the flat below - what do you do?', answer: 'Riverside blocks run pressurised, unvented systems on communal risers, so an upper-floor leak escalates and reaches lower flats fast. We isolate the supply immediately - your flat\'s stop and the communal riser if needed - find the failed component, and repair and recommission the system.' },
      { question: 'How quickly can you reach Balham or Tooting?', answer: 'We aim for around 30 minutes. Engineers are dispatched from across south-west London and we plan around the congestion at Clapham Junction and the High Roads so the window holds at busy times.' },
      { question: 'Why does my Wandsworth boiler keep scaling up or losing pressure?', answer: 'Thames Water supplies the borough with very hard water, which scales the combi heat exchanger and causes kettling, lukewarm water and cycling pressure. We descale or replace the exchanger, check for the small hidden leaks that also drop pressure, and can fit a scale-reducer.' },
      { question: 'My extended family home drains slowly after a side-return - is that connected?', answer: 'Very likely. Extensions splice new waste runs onto the original soil stack and the single garden run to the sewer, and undersized or poorly fallen additions cause slow drainage and blockages. We check the whole run, clear it, and correct the fault rather than just rodding the symptom.' },
    ],
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
    overview: `Lambeth is a long, narrow borough that packs three plumbing worlds into a few miles - the protected Georgian terraces of Kennington and Oval, the dense Victorian streets and estates of Brixton, Clapham and Tulse Hill, and the wall of new riverside towers at Vauxhall and Nine Elms. A call here could be a listed-building leak detection, a council-estate riser, or a fast-escalating tower failure, and our Lambeth engineers come prepared for all three.`,
    housingNotes: `Lambeth packs three distinct housing eras into a narrow strip running down from the river. Kennington and Oval hold Georgian terraces under listed and conservation protection; Brixton, Clapham, Herne Hill and Tulse Hill are dense Victorian terrace belts; and the Vauxhall and Nine Elms riverfront has filled over the last decade with new pressurised high-rise apartment blocks. The terraces bring the familiar inner-London problems - original lead supply pipes, undersized waste runs and soil stacks shared between converted flats - while the conservation status around Kennington shapes how a repair can be carried out.

The Nine Elms towers are where escalation is fastest. Unvented cylinders, pressure-reducing valves and expansion vessels turn a slow drip into a flooded ceiling across several flats in minutes when they fail, so isolation speed is everything. We carry the isolation tools and matting these blocks demand and know the access routes for the major managed developments along the river.

Lambeth also carries a large stock of post-war council estates - around Brixton, Stockwell and Tulse Hill - with communal risers, shared waste stacks and ageing internal pipework, where one flat's fault is felt by its neighbours. Running through every one of these property types is Thames Water's very hard supply, which scales boilers and immersion heaters borough-wide and makes limescale a constant background to our heating and hot-water call-outs.`,
    neighbourhoods: [
      { name: 'Kennington & Oval (SE11)', note: 'Georgian terraces under listed and conservation protection. Lead rising mains in converted houses and minimal-disturbance repairs around the period fabric are the defining work here.' },
      { name: 'Vauxhall & Nine Elms (SW8)', note: 'New riverside high-rise blocks with pressurised, unvented systems and communal risers. Fast-escalating leaks and PRV or expansion-vessel failures are the typical emergencies.' },
      { name: 'Brixton & Brixton Hill (SW2)', note: 'Dense Victorian terraces, conversions and large estates around the market and Brixton Hill. Lead pipes, shared stacks and communal-riser faults all feature here.' },
      { name: 'Clapham (SW4)', note: 'Victorian terraces around Clapham Common and the Old Town, many extended and converted - so loft-bathroom ceiling leaks and overloaded waste runs are common.' },
      { name: 'Herne Hill (SE24)', note: 'Leafy Victorian and Edwardian terraces near Brockwell Park, much of it family housing with retrofitted bathrooms and the usual lead-pipe and limescale calls.' },
      { name: 'West Norwood & Tulse Hill (SE27, SW2)', note: 'Hillier Victorian terraces and post-war estates, where pressure varies with the slopes and estate blocks bring communal-stack work.' },
    ],
    commonProblems: [
      { title: 'PRV and unvented-system failures in Nine Elms towers', detail: 'The riverside blocks run pressurised, unvented cylinders. When a pressure-reducing valve fails or an expansion vessel loses charge, the leak escalates fast and reaches lower flats. We isolate immediately, replace the failed component and recommission the system.' },
      { title: 'Lead supply-pipe leaks in Victorian terraces', detail: 'The pre-1970s terraces of Brixton, Herne Hill and Tulse Hill still carry original lead rising mains that develop pinhole leaks with age. We replace the lead run with copper or MDPE as part of the repair.' },
      { title: 'Communal riser and stack leaks on estates', detail: 'Lambeth\'s post-war estates around Brixton, Stockwell and Tulse Hill share risers and waste stacks, so a leak or blockage in one flat reaches its neighbours. We isolate at the right point and repair or clear the shared run.' },
      { title: 'Listed and conservation constraints in Kennington', detail: 'Kennington and Oval are heavily protected. We lead with thermal and acoustic detection rather than exploratory holes and choose repair routes and materials that respect the period fabric.' },
      { title: 'Hard-water limescale across the boiler stock', detail: 'Thames Water\'s very hard supply scales combi heat exchangers, immersion heaters and unvented cylinders borough-wide, causing kettling and lukewarm water. We descale or replace the affected part and can fit a scale-reducer.' },
    ],
    commonIssues: ['PRV and unvented-system failures in Nine Elms towers', 'Lead supply pipe leaks in Brixton terraces', 'Communal riser leaks on council estates', 'Listed-building constraints in Kennington', 'Hard-water limescale across boiler stock'],
    responseNote: `Engineers covering Lambeth are dispatched from across south London. We plan around the heavy traffic along the South Lambeth Road, Brixton and the Vauxhall gyratory, and for the Nine Elms towers and the estates we confirm building access and isolation points on the call so the engineer can reach a communal riser without delay.`,
    localTips: [
      'In a Nine Elms or Vauxhall apartment, locate your flat\'s stopcock and the communal isolation valves now - unvented systems flood fast and minutes matter.',
      'On a Lambeth estate, note where the shared riser isolation is, or who to call for it - a single flat cannot always stop a communal leak alone.',
      'Fit a scale-reducer on a combi boiler - Thames Water\'s very hard supply is the main cause of boiler failure across the borough.',
      'For listed Kennington homes, keep a record of acceptable pipe and fitting materials so an emergency repair can proceed without a planning problem.',
      'In converted Victorian terraces, check whether your rising main is shared with other flats before a leak forces the question.',
    ],
    faqs: [
      { question: 'A leak in my Nine Elms flat is reaching the flat below - what do you do?', answer: 'Riverside towers run pressurised, unvented systems on communal risers, so an upper-floor leak escalates fast. We isolate the supply immediately - your flat\'s stop and the communal riser if needed - find the failed valve or fitting, and repair and recommission the system.' },
      { question: 'Do you cover listed homes in Kennington and Oval?', answer: 'Yes. Kennington and Oval are heavily protected by listing and conservation-area status. We use non-invasive thermal and acoustic detection to avoid disturbing period fabric and choose repair routes and materials appropriate to the building.' },
      { question: 'How quickly can you reach Brixton or Clapham?', answer: 'We aim for around 30 minutes. Engineers are dispatched from across south London and we plan around the Brixton and Vauxhall traffic so the advertised window holds at busy times.' },
      { question: 'There is a leak affecting several flats on my Lambeth estate - can you help?', answer: 'Yes. The post-war estates share risers and waste stacks, so a fault in one flat reaches others. We identify where the shared run is failing, isolate correctly and repair or clear it, coordinating access with the block where the riser is communal.' },
      { question: 'Why does my Lambeth boiler keep scaling up?', answer: 'Thames Water supplies the borough with very hard water, which deposits limescale in the heat exchanger and cylinder over time, causing kettling and lukewarm water. We descale or replace the affected part and can fit a scale-reducer to slow it recurring.' },
    ],
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
    overview: `Southwark stretches from the converted wharves of the Thames down through Borough, Bermondsey and the docks to the Victorian terraces of Peckham and Camberwell, with some of London's largest estates in between. Warehouse conversions hide their leaks; riverside towers escalate theirs; terraces and estates bring lead pipes and shared stacks - so a Southwark engineer has to read the building before reaching for a tool.`,
    housingNotes: `Southwark's riverside - Shad Thames, Bermondsey and Rotherhithe - is dominated by converted Victorian warehouses and newer dockside apartment blocks. The conversions hide their pipework in original brick and thick floor build-ups, so leaks are concealed and slow to surface, often tracking along a joist and appearing rooms away from the source. The modern blocks bring pressurised, unvented systems and communal stacks where an upper-floor failure cascades downward fast. On both, guess-and-cut investigation is unacceptable to leaseholders, so we lead with thermal and acoustic detection.

Inland, Peckham, Camberwell and Walworth are Victorian and Georgian terrace country, much of it carved into flats with shared soil stacks and original lead rising mains. Decades of retrofitted bathrooms have loaded waste runs the original architecture never planned for, and lead-pipe pinhole leaks under floors are a steady part of the work. Walworth in particular mixes Georgian pockets with dense later housing.

The borough also carries some of London's largest post-war council estates - the Aylesbury and Heygate legacy around Walworth and the Elephant, and the dock-side estates of Rotherhithe - where communal waste stacks and shared risers mean one blockage affects several homes at once. Thames Water's very hard supply scales boilers across every property type, so limescale-driven failures are a constant background to the call-outs we attend.`,
    neighbourhoods: [
      { name: 'Bermondsey & Shad Thames (SE1, SE16)', note: 'Converted Victorian wharves and warehouses with pipework buried in brick and thick floors. Concealed, slow-surfacing leaks that need detection rather than guesswork are the defining work here.' },
      { name: 'Borough & Elephant (SE1, SE17)', note: 'A dense mix of period buildings, new towers and large estates around the regenerating Elephant. We see everything from listed-fabric leaks to fast-escalating unvented failures in the new blocks.' },
      { name: 'Peckham (SE15)', note: 'Victorian terraces, much of it converted, with original lead rising mains and shared soil stacks. Retrofitted bathrooms overloading the waste runs are common.' },
      { name: 'Camberwell (SE5)', note: 'Georgian and Victorian terraces around the Green, plus estate housing. Lead pipes, shared stacks in conversions, and hard-water boiler scaling all feature.' },
      { name: 'Rotherhithe & Surrey Quays (SE16)', note: 'Dockside new-build apartments and estates around the old basins, with pressurised unvented systems and communal risers prone to rapid-escalation leaks.' },
      { name: 'Walworth (SE17)', note: 'Georgian pockets alongside some of London\'s largest post-war estates, where communal waste stacks and shared risers mean one blockage affects several homes at once.' },
    ],
    commonProblems: [
      { title: 'Concealed leaks in warehouse conversions', detail: 'In the Bermondsey and Shad Thames wharf conversions, pipework runs through original brick and deep floor build-ups, so a leak surfaces far from its source. We use thermal and acoustic detection to pinpoint it before any cutting, as leaseholders and managing agents require.' },
      { title: 'Stack cascades in riverside flats', detail: 'The dockside blocks at Rotherhithe and the Elephant run pressurised systems on communal stacks, so an upper-floor leak cascades through the flats below before it is isolated. We carry isolation tools and matting and reach the communal isolation point fast.' },
      { title: 'Lead supply pipes in Peckham and Camberwell terraces', detail: 'The pre-1970s terraces still carry original lead rising mains that leak as they age, often under floorboards. We replace the lead run with copper or MDPE rather than patching it.' },
      { title: 'Communal stack faults on large estates', detail: 'The big Walworth and Rotherhithe estates share waste stacks and risers, so a blockage in one flat backs up into others. We identify and clear the shared run rather than just the visible fitting.' },
      { title: 'Hard-water limescale in boilers', detail: 'Thames Water\'s very hard supply scales combi heat exchangers and cylinders across the borough, causing kettling and lukewarm water. We descale or replace the affected part and can fit a scale-reducer.' },
    ],
    commonIssues: ['Concealed leaks in Bermondsey warehouse conversions', 'Riverside flat stack cascades', 'Lead supply pipes in Peckham terraces', 'Communal stack faults on large estates', 'Hard-water limescale in boilers'],
    responseNote: `Engineers covering Southwark are dispatched from across south and central London. We plan around the congestion along Tower Bridge Road, the Old Kent Road and the Elephant gyratory, and for the wharf conversions, dockside blocks and large estates we confirm building access and isolation points on the call so the engineer arrives ready to reach the right run.`,
    localTips: [
      'In a Bermondsey wharf conversion, ask the managing agent where your flat\'s stopcock and the communal isolation points are - concealed pipework means you cannot trace a leak by eye.',
      'In a Rotherhithe or Elephant tower, know your flat\'s stop and the communal riser isolation - unvented systems cascade through the floors below fast.',
      'Fit a scale-reducer on a combi - Thames Water\'s very hard supply is the main cause of boiler failure across Southwark.',
      'On a large estate, find out who holds the shared-stack isolation - a single flat often cannot stop a communal leak alone.',
      'In older Peckham and Camberwell terraces, avoid flushing wipes or pouring fat away - the narrow original waste runs block quickly under modern use.',
    ],
    faqs: [
      { question: 'Can you find a hidden leak in a Bermondsey warehouse conversion without tearing up the floor?', answer: 'Yes - it is one of our most common Southwark calls. In the wharf conversions the pipework is buried in brick and deep floors, so we use thermal imaging and acoustic detection to pinpoint the leak before any cutting, which is what leaseholders and managing agents expect.' },
      { question: 'A leak in my Rotherhithe flat is cascading to the flats below - what do you do?', answer: 'The dockside blocks run pressurised systems on communal stacks, so an upper-floor leak reaches lower flats fast. We isolate the supply immediately - your flat\'s stop and the communal riser if needed - find the failed fitting, and repair and recommission the system.' },
      { question: 'How quickly can you reach Peckham or Camberwell?', answer: 'We aim for around 30 minutes. Engineers are dispatched from across south and central London and we plan around the Old Kent Road and Elephant traffic so the window holds at busy times.' },
      { question: 'There is a blockage affecting several homes on my Southwark estate - can you help?', answer: 'Yes. The large Walworth and Rotherhithe estates share waste stacks and risers, so a blockage in one flat backs up into others. We identify where the shared run is blocked, isolate correctly and clear the stack itself, coordinating access with the block.' },
      { question: 'Why does my Southwark boiler keep scaling up?', answer: 'Thames Water supplies the borough with very hard water, which deposits limescale in the heat exchanger and cylinder over time, causing kettling and lukewarm water. We descale or replace the affected part and can fit a scale-reducer to slow it recurring.' },
    ],
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
    overview: `Tower Hamlets is the sharpest contrast in our London coverage. Canary Wharf and the Isle of Dogs are a forest of pressurised glass towers; a few streets inland sit the Victorian terraces of Bow and Bethnal Green and the converted warehouses of Wapping; and dense social-housing towers run throughout. The towers fail in seconds and the terraces fail over decades, so our engineers carry both the isolation kit for a high-rise riser and the parts for a lead-pipe terrace.`,
    housingNotes: `Canary Wharf and the Isle of Dogs (E14) are a forest of high-rise glass towers running pressurised, unvented systems on communal risers. The failure mode here is speed: a pressure-reducing valve fault or a split flexi on the twentieth floor can reach four flats below before the riser is isolated. We keep isolation tools and absorbent matting on every van for exactly this, and our engineers know the access and concierge procedures for the major managed blocks, because reaching the right isolation point quickly is half the job.

A few streets inland the stock flips entirely. The Victorian terraces of Bow, Bethnal Green and Stepney carry original lead supply pipes, undersized waste runs and the retrofitted bathrooms of decades of conversion, while the warehouse conversions around Wapping hide their pipework in original brick and screed. Dense social-housing towers across Poplar, Limehouse and Whitechapel add communal-stack call-outs, where one flat's blockage is felt by its neighbours.

Thames Water's very hard supply scales the unvented cylinders and heat exchangers in the towers and the combis in the terraces alike, so limescale failure runs across the borough. One fault is distinctive to the high-rise stock: frozen condensate pipes on exposed tower balconies in winter, which lock boilers out floor after floor - a problem you rarely see at ground level but a regular cold-snap call here.`,
    neighbourhoods: [
      { name: 'Canary Wharf & Isle of Dogs (E14)', note: 'High-rise glass towers with pressurised, unvented systems on communal risers. Rapid-escalation leaks, PRV failures and frozen balcony condensate pipes are the defining emergencies.' },
      { name: 'Bow (E3)', note: 'Victorian terraces and social-housing blocks. Original lead supply pipes, undersized waste runs and communal stacks on the estates are the usual calls.' },
      { name: 'Bethnal Green (E2)', note: 'Dense Victorian terraces and conversions alongside post-war estates. Lead pipework, shared stacks and hard-water boiler scaling feature here.' },
      { name: 'Whitechapel & Stepney (E1)', note: 'A mix of period terraces, new towers near the hospital and large estates - so we see both high-rise unvented failures and terrace lead-pipe work.' },
      { name: 'Wapping (E1)', note: 'Converted Victorian warehouses by the river with pipework buried in brick and screed, so leaks are concealed and need detection rather than guesswork.' },
      { name: 'Limehouse & Poplar (E14)', note: 'Dockside new-build apartments and dense social-housing towers, both running communal risers and stacks prone to escalation and backups.' },
    ],
    commonProblems: [
      { title: 'Communal riser leaks in the towers', detail: 'Canary Wharf and Isle of Dogs blocks share cold-water risers feeding the whole stack. A leak high up reaches the flats below before it is isolated, so we go straight to the communal isolation point and carry matting to limit the damage while we work.' },
      { title: 'PRV and unvented-cylinder failures in high-rise flats', detail: 'The towers run pressurised unvented cylinders. A failed pressure-reducing valve or a lost expansion-vessel charge escalates fast. We isolate, replace the failed component and recommission the system to spec.' },
      { title: 'Lead supply pipes in Bow and Bethnal Green terraces', detail: 'The pre-1970s terraces still run original lead rising mains that leak with age, often under floors. We replace the lead with copper or MDPE rather than patching it.' },
      { title: 'Concealed leaks in Wapping warehouse conversions', detail: 'Pipework in the wharf conversions runs through original brick and screed, so a leak surfaces far from its source. We use thermal and acoustic detection to pinpoint it before any cutting.' },
      { title: 'Frozen condensate pipes on tower balconies', detail: 'In cold snaps the external condensate runs on exposed balconies freeze and lock boilers out, sometimes floor after floor. We thaw and re-route or re-lag the condensate so it does not recur.' },
    ],
    commonIssues: ['Communal riser leaks in Canary Wharf towers', 'PRV and unvented-cylinder failures in high-rise flats', 'Lead supply pipes in Bow and Bethnal Green terraces', 'Concealed leaks in Wapping warehouse conversions', 'Frozen condensate pipes on tower balconies'],
    responseNote: `Engineers covering Tower Hamlets are dispatched from across east and central London. For Canary Wharf and the Isle of Dogs we confirm the building's access and concierge procedure on the call so the engineer can reach the riser and isolation point without delay, and we plan around the East End's traffic and the limited crossings onto the Isle of Dogs.`,
    localTips: [
      'In a Canary Wharf or Isle of Dogs flat, learn your stopcock and the communal riser isolation now, and keep the concierge number handy - a high-rise leak escalates in minutes.',
      'Before winter, ask whether your boiler\'s condensate pipe runs out onto an exposed balcony - if so, get it lagged or re-routed to avoid a freeze-lockout.',
      'In a Wapping warehouse conversion, find out where the flat\'s stopcock and communal isolation points are - the buried pipework cannot be traced by eye.',
      'Fit a scale-reducer on a combi or unvented cylinder - Thames Water\'s very hard supply scales the system across the borough.',
      'In older Bow and Bethnal Green terraces, avoid flushing wipes or fat - the narrow original waste runs block quickly.',
    ],
    faqs: [
      { question: 'A leak high up in my Canary Wharf tower is reaching flats below - what do you do?', answer: 'The towers share pressurised cold-water risers, so an upper-floor leak escalates fast. We go straight to the communal riser isolation, stop the loss, then find and repair the failed valve or fitting and recommission the system. Knowing the building\'s access procedure lets us do this without delay.' },
      { question: 'My boiler locked out in the cold on the Isle of Dogs - is it the condensate pipe?', answer: 'Very often, yes. On exposed tower balconies the external condensate run freezes in a cold snap and locks the boiler out. We thaw it to restore the boiler, then re-route or re-lag the pipe so it does not freeze again.' },
      { question: 'How quickly can you reach Bow or Bethnal Green?', answer: 'We aim for around 30 minutes. Engineers are dispatched from across east and central London, and we plan around the East End traffic and the crossings onto the Isle of Dogs so the window holds at busy times.' },
      { question: 'Can you find a concealed leak in my Wapping warehouse flat?', answer: 'Yes. In the wharf conversions the pipework is buried in brick and screed, so leaks surface far from their source. We use thermal and acoustic detection to pinpoint it before any cutting, as leaseholders and managing agents require.' },
      { question: 'Why does my Tower Hamlets boiler keep scaling up?', answer: 'Thames Water supplies the borough with very hard water, which scales the heat exchanger or unvented cylinder over time, causing kettling and lukewarm water. We descale or replace the affected part and can fit a scale-reducer to slow it recurring.' },
    ],
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
    overview: `Greenwich sets one of London's most protected historic cores against one of its newest skylines. The World Heritage streets around the park and the period villas of Blackheath sit a short distance from the Peninsula's cluster of new apartment towers, with the Victorian terraces of Charlton and the regeneration of Woolwich filling in between. Heritage caution on one job, pressurised high-rise speed on the next - our Greenwich engineers switch between the two.`,
    housingNotes: `Greenwich town centre and the streets around the park sit within a World Heritage Site, and much of the Georgian and early-Victorian terrace stock there is listed or in a conservation area. Repairs cannot disturb the fabric without careful planning, so we lead with non-invasive leak detection and choose replacement materials to suit the period rather than cutting first and asking later. Blackheath adds substantial period villas with complex internal pipework hidden behind fine plasterwork, where the same minimal-disturbance approach applies.

The Greenwich Peninsula is the modern counterweight - a dense and still-growing cluster of new apartment blocks with unvented cylinders, pressurised systems and communal risers. When a pressure-reducing valve or expansion vessel fails on an upper floor the leak escalates quickly through the flats below, so we carry isolation tools and matting and learn the access routes for the managed blocks. Charlton and the streets toward Woolwich fill the gap with Victorian and Edwardian terraces carrying the usual lead-and-cast-iron weaknesses, while Woolwich itself mixes that older stock with large new riverside developments.

Two things touch the whole borough. The river frontage brings persistent damp that accelerates corrosion of external soil pipes and rainwater goods, so external pipework here fails sooner than equivalent inland runs. And Thames Water's very hard supply scales boilers across listed terrace and Peninsula tower alike, making limescale a constant background to the heating and hot-water work. Because Greenwich is more spread out than the inner boroughs, we quote a slightly longer response here than for central zones.`,
    neighbourhoods: [
      { name: 'Greenwich town & West Greenwich (SE10)', note: 'World Heritage streets of listed Georgian and early-Victorian terraces. Non-invasive detection and period-appropriate repairs are essential, as the fabric cannot be disturbed casually.' },
      { name: 'Blackheath (SE3)', note: 'Substantial period villas with complex internal pipework behind fine plasterwork - leak detection and careful, minimal-disturbance access are the order of the day.' },
      { name: 'Charlton (SE7)', note: 'Victorian and Edwardian terraces carrying original lead supply pipes and cast-iron soil stacks, with the river fringe accelerating external corrosion.' },
      { name: 'Woolwich (SE18)', note: 'Older terraces alongside large new riverside developments, so we see both lead-pipe terrace work and unvented-system failures in the new blocks.' },
      { name: 'Greenwich Peninsula (SE10)', note: 'A dense cluster of new apartment towers with pressurised, unvented systems and communal risers prone to rapid-escalation leaks and PRV failures.' },
      { name: 'Westcombe Park & East Greenwich (SE3, SE10)', note: 'Edwardian terraces between the park and the river, with hard-water boiler scaling and damp-accelerated external pipework the recurring issues.' },
    ],
    commonProblems: [
      { title: 'Listed and World Heritage constraints', detail: 'Greenwich town centre and West Greenwich are within a World Heritage Site and heavily listed. We cannot disturb the fabric without planning, so we lead with thermal and acoustic detection and choose repair routes and materials appropriate to the period.' },
      { title: 'Unvented-system failures in Peninsula apartments', detail: 'The Peninsula towers run pressurised, unvented cylinders. A failed PRV or expansion vessel escalates fast through the flats below. We isolate immediately, replace the failed component and recommission the system.' },
      { title: 'Lead pipes in Charlton and Woolwich terraces', detail: 'The pre-1970s terraces still carry original lead rising mains that leak with age. We replace the lead with copper or MDPE rather than patching it.' },
      { title: 'Riverside damp accelerating external corrosion', detail: 'The Thames frontage keeps external soil pipes and rainwater goods damp, so they corrode and fail sooner than inland runs. We plan external repairs expecting more than one weak point along a degraded run.' },
      { title: 'Hard-water limescale in boilers', detail: 'Thames Water\'s very hard supply scales heat exchangers and cylinders across the borough, causing kettling and lukewarm water. We descale or replace the affected part and can fit a scale-reducer.' },
    ],
    commonIssues: ['Listed-building constraints in Greenwich town centre', 'Unvented-system failures in Peninsula apartments', 'Lead pipes in Charlton and Woolwich terraces', 'Riverside damp accelerating external corrosion', 'Hard-water limescale in boilers'],
    responseNote: `Greenwich is more spread out than the inner boroughs, so we quote around 35 minutes and dispatch the closest van from south-east London. We plan around the river crossings and the traffic through Greenwich town and along the Woolwich Road, and for the Peninsula towers and managed riverside blocks we confirm building access on the call.`,
    localTips: [
      'For listed and World Heritage homes around the park, keep a note of acceptable pipe and fitting materials - it lets an emergency repair proceed without a heritage problem.',
      'In a Peninsula apartment, locate your flat\'s stopcock and the communal riser isolation - unvented systems escalate fast through the floors below.',
      'Check external soil pipes and rainwater goods each autumn - the riverside damp here corrodes them faster than inland, and a hidden split worsens over winter.',
      'Fit a scale-reducer on a combi or cylinder - Thames Water\'s very hard supply scales the system across Greenwich.',
      'Lag any external or loft pipework before winter - Charlton and the higher streets get cold enough to freeze exposed runs.',
    ],
    faqs: [
      { question: 'Do you work on listed and World Heritage homes in Greenwich town centre?', answer: 'Yes. The town centre and West Greenwich sit within a World Heritage Site and much of the stock is listed. We use non-invasive thermal and acoustic detection to avoid disturbing the fabric and choose repair routes and materials appropriate to the period.' },
      { question: 'A leak in my Greenwich Peninsula flat is reaching the flat below - what do you do?', answer: 'The Peninsula towers run pressurised, unvented systems on communal risers, so an upper-floor leak escalates fast. We isolate the supply immediately - your flat\'s stop and the communal riser if needed - find the failed component, and repair and recommission the system.' },
      { question: 'How quickly can you reach Greenwich or Blackheath?', answer: 'We aim for around 35 minutes - Greenwich is more spread out than the inner boroughs. We dispatch the closest van from south-east London and plan around the river crossings and town-centre traffic.' },
      { question: 'My external soil pipe keeps leaking near the river - why?', answer: 'The Thames frontage keeps external pipework damp, so soil pipes and rainwater goods corrode and fail sooner than inland. We expect more than one weak point along a degraded run and replace the failed sections rather than patching a single hole.' },
      { question: 'Why does my Greenwich boiler keep scaling up?', answer: 'Thames Water supplies the borough with very hard water, which scales the heat exchanger or cylinder over time, causing kettling and lukewarm water. We descale or replace the affected part and can fit a scale-reducer.' },
    ],
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
    overview: `Lewisham is built on a slope. The borough climbs from the Ravensbourne valley around Lewisham and Catford up to the heights of Forest Hill and Honor Oak, and that gradient shapes the plumbing as much as the housing does - low ground that backs up, high ground under pressure, and a spread of Victorian terraces, conservation streets and Deptford new-builds in between. It is a borough where reading the lie of the land tells you half the diagnosis.`,
    housingNotes: `Lewisham's defining feature is its topography. The borough rises steeply from the Ravensbourne valley toward Forest Hill, Honor Oak and the Blackheath edge, and that gradient shapes the work in two directions. Properties on the lower ground around Catford and Lewisham town centre sit at the bottom of long downhill drainage runs and back up first when anything blocks upstream in heavy rain. Homes on the higher slopes around Forest Hill and Honor Oak see elevated static pressure on the rising main, and occasional pressure drops when several uphill demands hit at once - so the same borough produces both backflow and pressure call-outs.

The housing is largely Victorian and Edwardian terrace. The Brockley and Crofton Park conservation areas hold particularly fine stock where repairs are constrained and we work to minimal disturbance, while Forest Hill carries substantial period villas with complex internal pipework. Deptford and Lewisham town centre add newer regeneration apartment blocks with pressurised, unvented systems and communal risers that escalate quickly when a fault develops upstairs.

Thames Water's very hard supply furs up boilers across all of it, from hillside villa to valley-floor flat. The period terraces still carry original lead supply pipes and undersized waste runs, which we replace as a routine part of leak repairs rather than patching. Because Lewisham is more spread out and hillier than the inner boroughs, we quote a slightly longer response here than for central zones.`,
    neighbourhoods: [
      { name: 'Brockley & Crofton Park (SE4)', note: 'Fine Victorian terraces in a conservation area, so repairs are planned to minimal disturbance. Lead supply pipes and shared stacks in the conversions are the usual calls.' },
      { name: 'Forest Hill & Honor Oak (SE23)', note: 'Hillside Victorian villas and terraces on high ground, where elevated static pressure and occasional pressure drops sit alongside the usual lead-pipe and limescale work.' },
      { name: 'Catford (SE6)', note: 'Low-lying valley-floor terraces and post-war estates at the bottom of long downhill drainage runs - the first to back up in heavy rain when anything blocks upstream.' },
      { name: 'Deptford (SE8)', note: 'Regeneration apartment blocks and terraces near the river, so we see both unvented-system failures in the new blocks and lead-pipe work in the older stock.' },
      { name: 'Lewisham Central (SE13)', note: 'Valley-floor terraces and new town-centre blocks where downhill drainage backup and tower-style unvented faults both appear.' },
      { name: 'Hither Green & Ladywell (SE13, SE6)', note: 'Edwardian terraces on the valley slopes with the usual lead pipework, hard-water scaling and gradient-driven drainage quirks.' },
    ],
    commonProblems: [
      { title: 'Topographic pressure variation on the hills', detail: 'On the Forest Hill and Honor Oak heights, static pressure on the rising main runs high, and several uphill demands at once can cause sudden drops. We diagnose whether weak flow is a hill-pressure issue, a valve, or a hidden leak before recommending a fix.' },
      { title: 'Downhill drainage backing up around Catford', detail: 'Valley-floor properties sit at the bottom of long downhill runs and back up first when anything blocks upstream in heavy rain. We locate the blockage, clear it, and check for the underlying defect rather than just rodding the symptom.' },
      { title: 'Brockley conservation-area constraints', detail: 'The fine terraces of Brockley and Crofton Park are in a conservation area. We lead with thermal and acoustic detection and choose repair routes and materials that respect the period stock.' },
      { title: 'Lead supply pipes in Victorian terraces', detail: 'The pre-1970s terraces across the borough still carry original lead rising mains that leak with age, often under floors. We replace the lead with copper or MDPE as part of the repair.' },
      { title: 'Unvented-system failures in Deptford new-builds', detail: 'The Deptford and town-centre regeneration blocks run pressurised, unvented systems. A failed PRV or expansion vessel escalates through the flats below, so we isolate fast and replace and recommission the failed component.' },
    ],
    commonIssues: ['Topographic pressure variation on the hills', 'Downhill drainage backing up around Catford', 'Brockley conservation-area repair constraints', 'Lead supply pipes in Victorian terraces', 'Unvented-system failures in Deptford new-builds'],
    responseNote: `Lewisham is hilly and more spread out than the inner boroughs, so we quote around 35 minutes and dispatch the closest van from south-east London. We plan around the congestion through Lewisham and Catford town centres and the climbs toward Forest Hill, and for the Deptford and town-centre blocks we confirm building access on the call.`,
    localTips: [
      'On the Forest Hill and Honor Oak heights, if your flow suddenly weakens, note when it happens - peak-demand pressure drops behave differently from a leak, and the timing helps us diagnose it.',
      'In low-lying Catford and Lewisham, keep gullies and drain covers clear before winter storms - valley-floor properties back up first when downhill runs block.',
      'For Brockley conservation-area homes, keep a note of acceptable pipe and fitting materials so an emergency repair can proceed without a planning problem.',
      'Fit a scale-reducer on a combi - Thames Water\'s very hard supply scales boilers across the borough.',
      'In a Deptford new-build, locate your flat\'s stopcock and the communal riser isolation - unvented systems escalate fast through the floors below.',
    ],
    faqs: [
      { question: 'My flat in Catford backs up whenever it rains heavily - why?', answer: 'Catford sits on low, valley-floor ground at the bottom of long downhill drainage runs, so it backs up first when anything blocks upstream in heavy rain. We locate and clear the blockage, then check for the underlying defect - a partial collapse or root ingress - so it does not keep recurring.' },
      { question: 'Water pressure on my Forest Hill street keeps changing - is that normal?', answer: 'On the higher ground around Forest Hill and Honor Oak, static pressure runs high and can drop when several uphill homes draw at once. We test at multiple points to tell hill-pressure behaviour apart from a leaking pipe or a failing valve, then fix the actual cause.' },
      { question: 'Do you work on Brockley conservation-area homes?', answer: 'Yes. The Brockley and Crofton Park terraces are in a conservation area, so we use non-invasive detection and choose repair routes and materials that respect the period fabric rather than cutting first.' },
      { question: 'How quickly can you reach Forest Hill or Deptford?', answer: 'We aim for around 35 minutes - Lewisham is hilly and spread out. We dispatch the closest van from south-east London and plan around the Lewisham and Catford traffic and the climbs to the higher streets.' },
      { question: 'Why does my Lewisham boiler keep scaling up?', answer: 'Thames Water supplies the borough with very hard water, which scales the heat exchanger over time, causing kettling and lukewarm water. We descale or replace the exchanger and can fit a scale-reducer to slow it recurring.' },
    ],
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
    overview: `Haringey divides along its hills. The leafy western heights of Crouch End and Hornsey - large Edwardian villas under the shadow of Muswell Hill and Highgate - give way down the slope to the famous Harringay Ladder terraces, and then to the dense Victorian streets, estates and tower blocks of Tottenham and Wood Green. High-ground pressure quirks, extended-villa ceiling leaks and high-rise communal stacks are three different jobs, and our Haringey engineers see all of them.`,
    housingNotes: `Haringey's western half - Crouch End, Hornsey and the streets climbing toward Muswell Hill and the Highgate edge - is high ground covered in large Edwardian villas and terraces. Many have been extended with loft conversions and rear additions that added bathrooms the original pipework never anticipated, and those loft bathrooms sitting over occupied rooms are a frequent source of ceiling leaks. The elevation brings noticeable pressure variation too: high static pressure on some streets, and weak flow on others when several homes draw at once.

Down the slope sits the Harringay "Ladder", the famous grid of parallel Victorian terraces between Green Lanes and the railway. It is dense lead-and-cast-iron stock where access for repairs is tight and the original supply runs are well past their intended life - lead-pipe pinhole leaks under floors are a steady part of the work here. Stroud Green and the Finsbury Park fringe carry the same older-terrace pattern.

East toward Tottenham and Wood Green the housing shifts again to Victorian terraces, post-war estates and ex-council high-rise blocks with communal waste stacks and shared risers, where one flat's fault is felt by its neighbours. Thames Water's very hard supply scales boilers across the whole borough, and on the exposed higher ground frozen condensate and feed pipes are a recurring winter pattern. Because Haringey is hilly and spread out, we quote a slightly longer response here than for central zones.`,
    neighbourhoods: [
      { name: 'Crouch End & Hornsey (N8)', note: 'Large Edwardian villas and terraces on high ground, heavily extended. Loft-bathroom ceiling leaks and pressure variation on the slopes are the defining calls.' },
      { name: 'Stroud Green & Finsbury Park fringe (N4)', note: 'Dense Victorian terraces, much of it converted, with original lead supply pipes and shared stacks in the conversions.' },
      { name: 'Harringay Ladder (N4, N8)', note: 'The famous grid of parallel Victorian terraces between Green Lanes and the railway - tight access and ageing lead-and-cast-iron pipework define the work here.' },
      { name: 'Tottenham (N15, N17)', note: 'Victorian terraces, post-war estates and ex-council high-rise around the High Road and the stadium, with communal-stack and riser faults alongside terrace lead-pipe calls.' },
      { name: 'Wood Green & Alexandra Palace (N22)', note: 'A mix of terraces, mansion flats and tower blocks near the shopping centre and the Palace, where communal plumbing and hard-water scaling feature.' },
      { name: 'South Tottenham & Seven Sisters (N15)', note: 'Dense Victorian terraces, much in multiple occupation, with overloaded waste runs and lead pipework the recurring issues.' },
    ],
    commonProblems: [
      { title: 'Hillside pressure variation', detail: 'On the high ground around Crouch End, Hornsey and the Muswell Hill edge, static pressure runs high and can drop when several homes draw at once. We test at multiple points to tell hill-pressure behaviour apart from a leak or a failing valve before recommending a fix.' },
      { title: 'Loft-bathroom ceiling leaks in extended villas', detail: 'Crouch End and Hornsey villas were extended with loft and rear bathrooms over occupied rooms. Failed seals and waste joints there surface as ceiling stains below - we trace to the source and repair the run properly.' },
      { title: 'Lead pipes in the Harringay Ladder terraces', detail: 'The Ladder\'s Victorian terraces still run original lead supply pipes well past their life, with tight access for repairs. We replace failed lead runs with copper or MDPE rather than patching them.' },
      { title: 'Communal stack faults in Tottenham high-rise', detail: 'Tottenham and Wood Green tower blocks and estates share waste stacks and risers, so a blockage or leak in one flat reaches its neighbours. We isolate at the right point and clear or repair the shared run.' },
      { title: 'Frozen pipes and hard-water limescale', detail: 'On the exposed higher ground, condensate and feed pipes freeze in cold snaps and lock boilers out; borough-wide, Thames Water\'s very hard supply scales heat exchangers. We thaw and re-lag freeze-prone runs and descale or replace scaled parts.' },
    ],
    commonIssues: ['Hillside pressure variation around Muswell Hill', 'Loft-bathroom ceiling leaks in Crouch End villas', 'Lead pipes in the Harringay Ladder terraces', 'Communal stack faults in Tottenham high-rise', 'Hard-water limescale in boilers'],
    responseNote: `Haringey is hilly and spread out, so we quote around 35 minutes and dispatch the closest van from north London. We plan around the busy Green Lanes, the climbs to Crouch End and Muswell Hill, and the congestion along Tottenham High Road, and for the estates and tower blocks we confirm access and isolation points on the call.`,
    localTips: [
      'In an extended Crouch End or Hornsey villa, locate the loft-bathroom isolation valve - an upstairs leak there shows on the ceiling below well before you trace it.',
      'On the high streets around Muswell Hill, if your flow suddenly weakens at peak times, note the timing - it helps us tell hill-pressure drops from a leak.',
      'Before winter, lag condensate and feed pipes on the exposed higher ground - a freeze locks the boiler out on the coldest mornings.',
      'In the Harringay Ladder terraces, avoid flushing wipes or fat - the narrow original waste runs block quickly under modern use.',
      'Fit a scale-reducer on a combi - Thames Water\'s very hard supply scales boilers across Haringey.',
    ],
    faqs: [
      { question: 'My extended Crouch End villa has a ceiling leak under the loft bathroom - can you fix it?', answer: 'Yes, it is one of our most common Crouch End calls. Loft and rear extensions added bathrooms over rooms below, and failed seals or waste joints there show as ceiling stains. We trace the leak to its source, isolate, and repair the run properly rather than just patching the ceiling.' },
      { question: 'Water pressure on my Muswell Hill-edge street keeps changing - why?', answer: 'On the high ground, static pressure runs high and can drop when several homes draw at once. We test at multiple points to tell normal hill-pressure behaviour apart from a leaking pipe or failing valve, then fix the actual cause.' },
      { question: 'My boiler locked out in the cold in Crouch End - is it the condensate pipe?', answer: 'Often, on the exposed higher ground. The external condensate run freezes in a cold snap and locks the boiler out. We thaw it to restore the boiler, then re-lag or re-route the pipe so it does not freeze again.' },
      { question: 'How quickly can you reach Tottenham or Wood Green?', answer: 'We aim for around 35 minutes - Haringey is hilly and spread out. We dispatch the closest north London van and plan around Green Lanes and the Tottenham High Road traffic.' },
      { question: 'There is a blockage affecting several flats in my Tottenham block - can you help?', answer: 'Yes. The tower blocks and estates share waste stacks and risers, so a blockage in one flat backs up into others. We identify where the shared run is blocked, isolate correctly and clear the stack itself, coordinating access with the block.' },
    ],
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
    overview: `Newham splits between the brand new and the heavily worked. Stratford, the Olympic Park and the Royal Docks have filled with new apartment towers, while the older heart of the borough - East Ham, Forest Gate and Plaistow - is dense Victorian terrace, much of it now in multiple occupation. Pressurised high-rise systems on one street and overloaded HMO waste runs on the next, all on some of the hardest water in the capital - that is the Newham mix our engineers come prepared for.`,
    housingNotes: `Stratford and the Olympic Park (E15 and E20) and the Royal Docks (E16) have filled with new apartment towers running pressurised, unvented systems on communal risers. Their failure mode is rapid escalation: a pressure-reducing valve or a split flexi high in the block reaches several flats below before the supply is isolated. We carry the isolation kit and matting these blocks need on every van and learn the access and concierge routes for the major developments, because reaching the riser fast is what limits the damage.

The older heart of the borough - East Ham, Forest Gate and Plaistow - is dense Victorian terrace, a large share of it converted into houses of multiple occupation. HMO use puts far more load on waste runs and bathrooms than the original two-up two-down layouts were built for, so we attend overflowing bathrooms, blocked kitchen drains and boilers worn out by constant demand. The original lead supply pipes and undersized waste runs of this stock are a steady source of leaks and blockages.

Newham sits on some of the hardest water in the capital - Thames Water's supply scales combi heat exchangers heavily here, so limescale failure is a constant. Manor Park, Upton Park and Canning Town fill in around the edges with more of the same terrace-and-tower mix. Because the borough is spread out toward the docks, we quote a slightly longer response here than for central zones.`,
    neighbourhoods: [
      { name: 'Stratford & Olympic Park (E15, E20)', note: 'New apartment towers with pressurised, unvented systems and communal risers - rapid-escalation leaks and PRV failures are the defining emergencies here.' },
      { name: 'East Ham (E6)', note: 'Dense Victorian terraces, much of it in multiple occupation, so overloaded waste runs, overflowing bathrooms and worn-out boilers are the staples.' },
      { name: 'Forest Gate (E7)', note: 'Victorian terraces with original lead supply pipes and undersized waste runs, heavily converted to HMOs near the stations and the park.' },
      { name: 'Plaistow & Upton Park (E13)', note: 'Terraces and post-war housing with lead pipework, shared stacks in conversions, and heavy hard-water boiler scaling.' },
      { name: 'Royal Docks & Custom House (E16)', note: 'New-build dockside towers with communal risers and unvented systems prone to escalation, alongside regeneration housing.' },
      { name: 'Manor Park & Canning Town (E12, E16)', note: 'A mix of Victorian terraces and new blocks, carrying both terrace lead-pipe work and tower-style communal-stack faults.' },
    ],
    commonProblems: [
      { title: 'HMO drainage overload in East Ham and Forest Gate', detail: 'Houses converted to multiple occupation put far more load on the original waste runs than they were built for, so we attend overflowing bathrooms and blocked kitchen drains. We clear the run and, where it is genuinely undersized, advise on upgrading it.' },
      { title: 'Stack and PRV failures in Stratford new-builds', detail: 'The Stratford and Olympic Park towers run pressurised, unvented systems. A failed pressure-reducing valve or a split flexi escalates fast and reaches the flats below. We isolate at the communal riser, replace the failed component and recommission.' },
      { title: 'Communal risers in Royal Docks towers', detail: 'The dockside blocks share cold-water risers feeding the whole stack, so an upper-floor leak cascades downward. We carry isolation tools and matting and go straight to the communal isolation point.' },
      { title: 'Lead pipes and undersized waste in terraces', detail: 'The Victorian terraces of East Ham, Forest Gate and Plaistow still carry original lead rising mains and narrow waste runs. We replace lead with copper or MDPE and clear or upgrade overloaded waste runs.' },
      { title: 'Heavy hard-water limescale in boilers', detail: 'Newham sits on some of the hardest water in the capital, which scales combi heat exchangers heavily - causing kettling, lukewarm water and cycling pressure. We descale or replace the exchanger and can fit a scale-reducer.' },
    ],
    commonIssues: ['HMO drainage overload in East Ham and Forest Gate', 'Stack and PRV failures in Stratford new-builds', 'Communal risers in Royal Docks towers', 'Lead pipes and undersized waste in terraces', 'Heavy hard-water limescale in boilers'],
    responseNote: `Newham stretches east toward the docks, so we quote around 35 minutes and dispatch the closest van from east London. We plan around the congestion along the Barking Road, the Stratford gyratory and the limited crossings into the Royal Docks, and for the new towers we confirm building access and concierge procedure on the call so the engineer can reach the riser without delay.`,
    localTips: [
      'In a Stratford or Royal Docks apartment, learn your stopcock and the communal riser isolation now, and keep the concierge number handy - high-rise leaks escalate in minutes.',
      'In an HMO or shared house, agree who knows where the stopcock is - a fast shut-off limits the damage when an overloaded waste run overflows.',
      'Fit a scale-reducer on a combi - Newham\'s very hard water scales boilers faster than almost anywhere we cover.',
      'In older East Ham and Forest Gate terraces, avoid flushing wipes or pouring fat away - the narrow original waste runs block quickly under heavy use.',
      'If your home is a converted HMO, have the waste runs checked - many were never upsized for the number of bathrooms now feeding them.',
    ],
    faqs: [
      { question: 'A leak high in my Stratford tower is reaching the flats below - what do you do?', answer: 'The new towers run pressurised, unvented systems on communal risers, so an upper-floor leak escalates fast. We go straight to the communal riser isolation, stop the loss, then find and repair the failed valve or fitting and recommission the system.' },
      { question: 'My converted house in East Ham keeps getting blocked drains - why?', answer: 'Houses converted to multiple occupation load the original waste runs far beyond what they were built for, so they block and overflow. We clear the blockage and, where the run is genuinely undersized for the number of bathrooms, advise on upgrading it so it stops recurring.' },
      { question: 'How quickly can you reach Forest Gate or the Royal Docks?', answer: 'We aim for around 35 minutes - Newham stretches east toward the docks. We dispatch the closest east London van and plan around the Barking Road and Stratford traffic and the dock crossings.' },
      { question: 'Why does my Newham boiler scale up so fast?', answer: 'Newham sits on some of the hardest water in the capital, so limescale builds in the combi heat exchanger faster than in most areas, causing kettling and lukewarm water. We descale or replace the exchanger and can fit a scale-reducer to slow it down.' },
      { question: 'There is a leak in my Royal Docks block affecting other flats - can you help?', answer: 'Yes. The dockside towers share cold-water risers, so an upper-floor leak cascades to the flats below. We isolate at the communal riser, find and repair the failed fitting, and coordinate access with the building so we reach the right point quickly.' },
    ],
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
