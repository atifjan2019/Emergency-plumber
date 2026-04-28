export type City = {
  slug: string;
  name: string;
  region: string;
  population: number;
  postcodes: string[];
  responseTime: string;
  callOutFee: string;
  hourlyRate: string;
  housingNotes: string;
  commonIssues: string[];
  landmarks: string[];
  geo: { lat: number; lng: number };
  futureAreas: string[];
  waterBoard: string;
  waterHardness: 'soft' | 'moderately soft' | 'moderate' | 'hard' | 'very hard';
};

export const cities: City[] = [
  {
    slug: 'london',
    name: 'London',
    region: 'Greater London',
    population: 8982000,
    postcodes: ['EC', 'WC', 'N', 'NW', 'E', 'SE', 'SW', 'W', 'BR', 'CR', 'DA', 'EN', 'HA', 'IG', 'KT', 'RM', 'SM', 'TW', 'UB', 'WD'],
    responseTime: '30 minutes',
    callOutFee: '£89',
    hourlyRate: '£95',
    housingNotes: `London's plumbing landscape is one of the most varied in Europe, and that complexity is why emergency call-outs in the capital demand engineers who have seen everything. The city's housing stock spans Georgian townhouses in Bloomsbury and Marylebone, vast tracts of Victorian terraces across Hackney, Camden and Wandsworth, post-war council estates, 1980s riverside developments, and the dense cluster of high-rise glass towers that have risen across Vauxhall, Nine Elms and the City Fringe over the last decade. Each comes with its own plumbing fingerprint and its own failure modes.

The single biggest factor we plan around is water hardness. Thames Water supplies most of the capital with some of the hardest water in the country, often above 300 parts per million calcium carbonate. That hardness destroys boilers, scales up combi heat exchangers, narrows pipework, and wrecks immersion elements long before they should fail. A staggering proportion of our London call-outs are downstream of limescale damage rather than mechanical failure. Older Victorian properties also still carry stretches of lead supply pipe, which we replace whenever we have the property open for other works.

The capital's listed buildings present their own urgency. Many of the period properties in Kensington, Chelsea, Marylebone and Islington have Grade II listings or sit inside conservation areas, which constrains how repairs can be carried out and why we keep records of which materials are acceptable in which boroughs. High-rise flats bring the opposite problem - pressurised systems, communal risers, and a single leak that can damage four flats below within minutes. We carry isolation tools and absorbent matting on every London van, and our engineers know the access procedures for most of the major estates and managed blocks across Zones 1 to 3.`,
    commonIssues: ['Limescale-blocked combi boilers', 'Lead supply pipe corrosion', 'Frozen condensate pipes in winter', 'Communal riser leaks in flats', 'Listed building drainage faults'],
    landmarks: ['City of London', 'Camden', 'Hackney', 'Greenwich', 'Wandsworth', 'Kensington & Chelsea'],
    geo: { lat: 51.5074, lng: -0.1278 },
    futureAreas: ['camden', 'hackney', 'islington', 'wandsworth', 'lambeth', 'southwark', 'tower-hamlets', 'greenwich', 'lewisham', 'haringey', 'newham', 'ealing'],
    waterBoard: 'Thames Water',
    waterHardness: 'very hard',
  },
  {
    slug: 'manchester',
    name: 'Manchester',
    region: 'North West England',
    population: 553000,
    postcodes: ['M1', 'M2', 'M3', 'M4', 'M5', 'M8', 'M11', 'M12', 'M13', 'M14', 'M15', 'M16', 'M19', 'M20', 'M21', 'M22'],
    responseTime: '25 minutes',
    callOutFee: '£75',
    hourlyRate: '£85',
    housingNotes: `Manchester's housing stock tells the story of the industrial revolution in plumbing terms. The vast belts of red-brick Victorian terraces that ring the city centre - through Longsight, Levenshulme, Chorlton, Whalley Range and Rusholme - were built fast, built cheap, and were never engineered for the way modern households use water. Two-up two-down terraces designed for one cold tap and an outside privy now run mixer showers, dishwashers, washing machines and combi boilers, and the original cast iron and lead infrastructure underneath simply cannot keep up.

A significant proportion of our emergency call-outs in Manchester are still tied to lead supply pipework, particularly in M14, M19 and M20 where the Victorian terrace stock is densest. Lead corrosion produces pinhole leaks that often appear under floorboards or behind plaster long before any visible damage shows, and we replace lead rising mains as a routine part of leak repairs. Cold-water tanks in the loft are still common in older Manchester properties, and frozen tank-fed systems are a major source of winter call-outs whenever overnight temperatures drop below freezing for more than two consecutive nights.

The student rental market - heaviest in Fallowfield, Withington, Victoria Park and the M14 corridor - drives a different pattern. Houses of multiple occupation see far heavier appliance use than the original layouts allow for, and we frequently attend overflowing bathrooms, blocked kitchen drains from poor disposal habits, and boilers that have been ignored through landlord turnover. The newer apartment blocks around Deansgate, Castlefield, Ancoats and New Islington bring the modern equivalent: pressurised systems, unvented cylinders, and communal stack issues where one flat's blockage backs up into another. Manchester's hard water from United Utilities also accelerates limescale failure across all of these property types.`,
    commonIssues: ['Lead pipe corrosion in Victorian terraces', 'Frozen pipes during cold snaps', 'HMO drainage blockages', 'Limescale on heat exchangers', 'Communal stack faults in city-centre flats'],
    landmarks: ['City Centre', 'Salford Quays', 'Trafford', 'Didsbury', 'Chorlton'],
    geo: { lat: 53.4808, lng: -2.2426 },
    futureAreas: ['didsbury', 'chorlton', 'salford', 'fallowfield', 'withington', 'hulme', 'levenshulme', 'rusholme'],
    waterBoard: 'United Utilities',
    waterHardness: 'moderate',
  },
  {
    slug: 'birmingham',
    name: 'Birmingham',
    region: 'West Midlands',
    population: 1141000,
    postcodes: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'B13', 'B14', 'B15', 'B16', 'B17', 'B18', 'B19', 'B20', 'B21', 'B23', 'B24', 'B25'],
    responseTime: '30 minutes',
    callOutFee: '£75',
    hourlyRate: '£85',
    housingNotes: `Birmingham's housing stock is dominated by inter-war and pre-war suburban builds, and that age profile shapes nearly every plumbing emergency we attend. The 1930s semi-detached belt that stretches through Hall Green, Acocks Green, Erdington, Kings Heath, Yardley and Bournville accounts for a huge share of our domestic work, and these properties share a common set of weak points - galvanised steel rising mains nearing end of life, original copper pipework that is now thin-walled and prone to pinholes, and back-boiler heating systems that owners are still trying to nurse along long after manufacturers stopped producing parts.

The Jewellery Quarter, Digbeth and the canal-side conversions present a different challenge. Many of these former industrial buildings have been converted to apartments with retrofitted plumbing that follows the path of least resistance through original brickwork, and when something fails it is often hidden behind feature walls or below screeded floors. We carry thermal imaging and acoustic leak detection as standard for these properties because guess-and-cut investigation is rarely acceptable to the leaseholders.

Severn Trent water in Birmingham is moderately hard, which means limescale is a steady contributor to combi boiler failure across the city, particularly in the harder boreholes that supply the eastern suburbs. The terraced belt in Sparkhill, Sparkbrook, Small Heath and Aston brings the same Victorian-era issues that affect any northern industrial city - lead supply pipes, undersized waste runs, and original gully traps that fail under modern wash-load volumes. Birmingham also has a substantial high-rise stock, both council-built tower blocks and the newer city-centre developments around the Mailbox, Arena Central and Snow Hill, where pressurised plumbing systems create rapid escalation when something goes wrong on an upper floor.`,
    commonIssues: ['Galvanised pipe failure in 1930s semis', 'Back-boiler obsolescence', 'Limescale in combi boilers', 'Hidden leaks in canal-side conversions', 'Lead pipework in inner-city terraces'],
    landmarks: ['Jewellery Quarter', 'Digbeth', 'Bournville', 'Edgbaston', 'Sutton Coldfield'],
    geo: { lat: 52.4862, lng: -1.8904 },
    futureAreas: ['edgbaston', 'sutton-coldfield', 'erdington', 'kings-heath', 'harborne', 'moseley', 'hall-green', 'acocks-green'],
    waterBoard: 'Severn Trent',
    waterHardness: 'moderate',
  },
  {
    slug: 'glasgow',
    name: 'Glasgow',
    region: 'Scotland',
    population: 635000,
    postcodes: ['G1', 'G2', 'G3', 'G4', 'G5', 'G11', 'G12', 'G13', 'G14', 'G15', 'G20', 'G21', 'G22', 'G31', 'G32', 'G33', 'G34', 'G40', 'G41', 'G42', 'G43', 'G44', 'G45', 'G46', 'G51', 'G52'],
    responseTime: '30 minutes',
    callOutFee: '£75',
    hourlyRate: '£80',
    housingNotes: `Glasgow's tenement housing is iconic and, from a plumbing perspective, deeply distinctive. The city has the densest pre-war tenement stock in the UK, with sandstone closes lining the West End, Southside, Dennistoun and Partick. These four-storey buildings were built between 1860 and 1910 with shared close stairs, communal back courts, and a vertical plumbing arrangement where four to eight flats share a single waste stack and a common cold-water rising main. When a stack blocks or a riser fails on the second floor, every flat above and below feels it, and we are routinely called by stair residents who have never met each other but are coordinating via the close noticeboard.

The combination of Glasgow's age, climate and shared infrastructure makes burst pipe season particularly brutal. The freeze-thaw cycle of Scottish winters - often dropping to minus eight or lower for short stretches - finds every weak point in lead supply pipes and uninsulated tank arrangements in tenement lofts. Communal lofts above tenements are a recurring failure point because no individual flat owns them, insulation has often degraded, and the cold tank that feeds the whole stair can freeze and split in a single overnight cold snap.

Scottish Water supplies Glasgow with notably soft water sourced from Loch Katrine, which is good news for boilers but accelerates corrosion in older galvanised and copper pipework. We see fewer limescale failures here than in any English city we cover and proportionally more pinhole leaks from internal pipe corrosion. The newer build stock around Finnieston, the Clyde waterfront and the East End regeneration zones brings modern unvented systems and the usual issues that come with them - PRV failure, expansion vessel charge loss, and the rapid pressure escalation that turns a small leak into a flooded ceiling within minutes.`,
    commonIssues: ['Burst pipes in tenement lofts', 'Communal stack blockages', 'Lead pipe failure', 'Soft-water copper corrosion', 'Frozen condensate runs in winter'],
    landmarks: ['West End', 'Southside', 'Dennistoun', 'Partick', 'Finnieston'],
    geo: { lat: 55.8642, lng: -4.2518 },
    futureAreas: ['west-end', 'southside', 'dennistoun', 'partick', 'shawlands', 'govan', 'merchant-city', 'finnieston'],
    waterBoard: 'Scottish Water',
    waterHardness: 'soft',
  },
  {
    slug: 'leeds',
    name: 'Leeds',
    region: 'Yorkshire',
    population: 793000,
    postcodes: ['LS1', 'LS2', 'LS3', 'LS4', 'LS5', 'LS6', 'LS7', 'LS8', 'LS9', 'LS10', 'LS11', 'LS12', 'LS13', 'LS14', 'LS15', 'LS16', 'LS17', 'LS18', 'LS19', 'LS20'],
    responseTime: '25 minutes',
    callOutFee: '£75',
    hourlyRate: '£80',
    housingNotes: `Leeds has a housing profile that is unusual even by northern English standards because of the persistence of back-to-back terraces in areas like Harehills, Beeston and parts of Holbeck. Back-to-backs share both side walls and a rear wall with neighbouring properties, leaving only the front elevation for services to enter and exit. That single point of entry concentrates the rising main, gas supply, soil pipe and waste runs in a tight space, and when something fails inside that wall cavity it is rarely a quick fix. We attend back-to-back call-outs with the expectation that access will be the hardest part of the job.

The student rental belt running through Headingley, Hyde Park, Burley and Woodhouse is the second defining feature of plumbing demand in Leeds. The student population concentration in LS6 and LS4 generates a predictable seasonal pattern - we see a surge in toilet blockages, kitchen sink overflows and dishwasher leaks in October as new tenancies start, a winter peak in burst pipes when properties are left unheated over Christmas, and a clean-out spike in June as tenancies end. Many of these properties have been retrofitted multiple times by different landlords, with predictable consequences for pipework integrity.

Leeds' wider housing stock includes the inter-war semi belt around Roundhay, Moortown, Cookridge and Adel, and the newer estates in Pudsey and Bramhope, all of which sit on Yorkshire Water supply that is moderately soft to moderate in hardness. Limescale is less of an issue than in Birmingham or London, but the soft-water mains do contribute to copper pipework pitting in older properties. The riverside developments along the Aire valley and the city-centre conversions around Holbeck Urban Village and Granary Wharf bring the modern flat-block plumbing problems we see across all major UK cities, with shared risers and unvented cylinders.`,
    commonIssues: ['Back-to-back access constraints', 'Student-let toilet blockages', 'Frozen pipes in vacated lets', 'Copper pinhole leaks', 'High-rise stack failures'],
    landmarks: ['City Centre', 'Headingley', 'Roundhay', 'Holbeck', 'Chapel Allerton'],
    geo: { lat: 53.8008, lng: -1.5491 },
    futureAreas: ['headingley', 'roundhay', 'chapel-allerton', 'horsforth', 'pudsey', 'morley', 'beeston', 'hyde-park'],
    waterBoard: 'Yorkshire Water',
    waterHardness: 'moderately soft',
  },
  {
    slug: 'liverpool',
    name: 'Liverpool',
    region: 'Merseyside',
    population: 498000,
    postcodes: ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10', 'L11', 'L12', 'L13', 'L14', 'L15', 'L16', 'L17', 'L18', 'L19', 'L20', 'L21', 'L22', 'L23'],
    responseTime: '25 minutes',
    callOutFee: '£75',
    hourlyRate: '£80',
    housingNotes: `Liverpool has one of the most architecturally varied housing stocks in the country, ranging from the Georgian grandeur of the Canning Conservation Area to the dense Victorian terrace belts of Anfield, Walton and Kensington, post-war council estates in Croxteth and Norris Green, and the rapid wave of dock-area regeneration around the Baltic Triangle, Liverpool Waters and the converted warehouse blocks behind the Albert Dock. Plumbing demands across this range are wildly different, and our local engineers carry tooling sets calibrated to the property type rather than a one-size-fits-all kit.

The Georgian terrace belt around Hope Street, Rodney Street and Falkner Square is a particular speciality. These properties retain original soil stacks, internal lead supply runs, and chimney-flue boiler routes that are often shared between adjoining houses. Listed status across most of L8 and parts of L1 means repairs cannot disturb fabric without considered intervention, so we plan investigations carefully and use minimally invasive leak detection wherever possible.

The Victorian terraces north and east of the city centre - through Everton, Anfield, Tuebrook and Old Swan - share the same lead-and-cast-iron infrastructure problems that affect Manchester's terrace belt, with the additional factor that Liverpool's coastal climate brings persistent damp into older properties and accelerates external corrosion of soil and rainwater goods. United Utilities supplies the city with moderately soft water, which limits limescale buildup but contributes to internal pipe pitting in copper systems over time. The dock-area conversions are the modern counterweight, with high-spec unvented cylinders, underfloor heating manifolds and the rapid escalation pattern that comes with apartment-block plumbing failures - one upper-floor leak can trigger a cascade through three or four flats below before isolation is achieved.`,
    commonIssues: ['Georgian listed-building access', 'Lead supply pipe leaks', 'External soil pipe corrosion', 'Apartment-block leak cascades', 'Coastal damp accelerating fixture failure'],
    landmarks: ['City Centre', 'Albert Dock', 'Anfield', 'Wavertree', 'Aigburth'],
    geo: { lat: 53.4084, lng: -2.9916 },
    futureAreas: ['anfield', 'wavertree', 'aigburth', 'allerton', 'walton', 'crosby', 'bootle', 'kirkdale'],
    waterBoard: 'United Utilities',
    waterHardness: 'moderately soft',
  },
  {
    slug: 'bristol',
    name: 'Bristol',
    region: 'South West England',
    population: 467000,
    postcodes: ['BS1', 'BS2', 'BS3', 'BS4', 'BS5', 'BS6', 'BS7', 'BS8', 'BS9', 'BS10', 'BS11', 'BS13', 'BS14', 'BS15', 'BS16'],
    responseTime: '25 minutes',
    callOutFee: '£79',
    hourlyRate: '£85',
    housingNotes: `Bristol's housing splits cleanly into three eras, and each era has its own plumbing personality. The Georgian and early Victorian crescents and terraces that define Clifton, Hotwells, Redland and Cotham represent some of the most architecturally significant residential property in England, much of it Grade II listed. These houses have multiple internal stories, original lead supply pipework that has been partially replaced over the decades, and complex ventilation arrangements where soil stacks were retrofitted internally rather than added externally to preserve facades. Emergency work in this stock requires planning - we cannot simply cut into ceilings without considering listed-building consent implications and the original plaster cornicing above us.

The Victorian terrace belt that fills Bedminster, Easton, St Werburghs, Montpelier and Bishopston is the everyday workhorse housing of the city. These properties are mostly two-storey stone-and-brick terraces with rear extensions that were added across multiple decades, and the plumbing reflects that history - original soil pipes meeting 1970s extension waste runs meeting 2000s loft-conversion bathroom pipework, all sharing a single back garden run to the main sewer. We see drainage issues here more than in any other city we cover.

Bristol Water supplies the city from the Mendip Hills, which delivers moderately hard water - softer than London or Birmingham but harder than Glasgow or Liverpool. Limescale appears in older boilers and immersion heaters but is not the dominant failure mode. The newer build stock across Harbourside, Wapping Wharf and the southern suburb expansion zones brings modern unvented system failures, and the eastern fringe estates from Hengrove out to Hartcliffe carry the same post-war and 1970s council-build plumbing patterns we see in similar zones across the country.`,
    commonIssues: ['Georgian listed-building leaks', 'Multi-extension drainage faults', 'Loft-conversion pipework failures', 'Moderate-hardness boiler scaling', 'Victorian rear-extension waste runs'],
    landmarks: ['Clifton', 'Harbourside', 'Bedminster', 'Bishopston', 'Bristol Old City'],
    geo: { lat: 51.4545, lng: -2.5879 },
    futureAreas: ['clifton', 'bedminster', 'bishopston', 'redland', 'easton', 'southville', 'horfield', 'fishponds'],
    waterBoard: 'Bristol Water',
    waterHardness: 'moderate',
  },
  {
    slug: 'sheffield',
    name: 'Sheffield',
    region: 'Yorkshire',
    population: 584000,
    postcodes: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'S11', 'S12', 'S13', 'S14', 'S17', 'S20'],
    responseTime: '30 minutes',
    callOutFee: '£75',
    hourlyRate: '£80',
    housingNotes: `Sheffield's plumbing emergencies are shaped by something no other major UK city has to the same degree - topography. The city is built across seven hills with elevation differences of more than 350 metres between the riverside and the Peak District fringe, and that gradient has direct consequences for drainage, water pressure and the way leaks behave once they start. Properties on the lower south-eastern flanks around Attercliffe, Darnall and Tinsley sit at the bottom of long downhill runs, and a blockage anywhere upstream in the stormwater or foul system can back up here within hours of heavy rain. Properties on the upper western reaches in Crosspool, Ranmoor, Lodge Moor and Dore experience the opposite - high static pressure on the rising main, occasional pressure drops when several uphill demands hit simultaneously, and elevated wind exposure that worsens the impact of cold weather.

Sheffield's stone-built terraces are the visual signature of the city, particularly the dense clusters in Walkley, Crookes, Heeley and Nether Edge. Stone-built properties present plumbing challenges that brick-built terraces do not - drilling for new pipework is harder, the stone retains cold for longer in winter so external pipework freezes earlier, and many of these terraces have stone-flagged ground floors with limited access to under-floor pipework. The student belt around Broomhill, Crookes and Endcliffe brings the same HMO plumbing pattern we see in Leeds and Manchester.

Yorkshire Water supplies Sheffield with moderately soft water from Peak District reservoirs, which is mineral-light and broadly kind to boilers but encourages internal copper pitting over decades. The post-war council estates across Stannington, Parson Cross and Manor carry the standard 1950s and 1960s plumbing layouts that are now reaching end-of-life across multiple components simultaneously - galvanised rising mains, original immersion cylinders, and back-boilers that no longer have replacement parts available.`,
    commonIssues: ['Topographic drainage backflow', 'Stone-built access difficulty', 'High-pressure burst risk on hilltop properties', 'Soft-water copper pitting', 'Frozen external runs in winter'],
    landmarks: ['City Centre', 'Crookes', 'Hillsborough', 'Nether Edge', 'Ecclesall'],
    geo: { lat: 53.3811, lng: -1.4701 },
    futureAreas: ['crookes', 'hillsborough', 'nether-edge', 'ecclesall', 'walkley', 'broomhill', 'heeley', 'meadowhall'],
    waterBoard: 'Yorkshire Water',
    waterHardness: 'moderately soft',
  },
  {
    slug: 'edinburgh',
    name: 'Edinburgh',
    region: 'Scotland',
    population: 530000,
    postcodes: ['EH1', 'EH2', 'EH3', 'EH4', 'EH5', 'EH6', 'EH7', 'EH8', 'EH9', 'EH10', 'EH11', 'EH12', 'EH13', 'EH14', 'EH15', 'EH16', 'EH17'],
    responseTime: '30 minutes',
    callOutFee: '£79',
    hourlyRate: '£85',
    housingNotes: `Edinburgh's housing stock is one of the most heavily protected and architecturally constrained in the UK, and that constraint runs deep into how plumbing emergencies have to be handled here. The New Town - Georgian terraces and crescents through EH2 and EH3 - is a UNESCO World Heritage site. The Old Town tenements around the Royal Mile are similarly listed. Even the Victorian and Edwardian tenements that fill Marchmont, Bruntsfield, Tollcross and Stockbridge carry conservation area protection. Almost no work in central Edinburgh is unconstrained, and we plan emergency interventions to respect both the urgency of the leak and the long-term integrity of the building fabric.

Edinburgh's tenement living is shared, vertical, and old. As in Glasgow, four to twelve flats share a single common stair, communal close, communal cold tank loft space and a vertical waste stack that runs the full height of the building. Unlike Glasgow, Edinburgh's tenement stock includes a higher proportion of pre-1900 construction and original sandstone facades that cannot be drilled or chased without conservation consideration. Burst pipes in tenement lofts during winter cold snaps are the most disruptive call-outs we attend - a single split feed pipe in a communal loft can flood the entire stair within an hour.

Scottish Water supplies Edinburgh with very soft water sourced from upland reservoirs. This is excellent news for boilers - we see far less limescale damage here than in any English city - but the soft, slightly acidic water is aggressive towards copper pipework over time and we see disproportionately high rates of internal copper pitting in pre-1980s installations. The newer build stock around Leith, Granton and the western fringe expansion at South Gyle, Wester Hailes and Edinburgh Park brings modern unvented cylinder systems with their predictable failure modes - PRV faults, expansion vessel charge loss, and rapid leak escalation in pressurised plumbing.`,
    commonIssues: ['Tenement loft burst pipes', 'Listed-building repair constraints', 'Communal stack blockages', 'Soft-water copper pitting', 'Conservation area access planning'],
    landmarks: ['New Town', 'Old Town', 'Leith', 'Stockbridge', 'Marchmont'],
    geo: { lat: 55.9533, lng: -3.1883 },
    futureAreas: ['new-town', 'leith', 'stockbridge', 'marchmont', 'morningside', 'bruntsfield', 'portobello', 'corstorphine'],
    waterBoard: 'Scottish Water',
    waterHardness: 'soft',
  },
  {
    slug: 'newcastle',
    name: 'Newcastle',
    region: 'North East England',
    population: 300000,
    postcodes: ['NE1', 'NE2', 'NE3', 'NE4', 'NE5', 'NE6', 'NE7', 'NE8', 'NE12', 'NE13', 'NE15'],
    responseTime: '25 minutes',
    callOutFee: '£75',
    hourlyRate: '£80',
    housingNotes: `Newcastle's housing has a feature you find nowhere else in the UK at this scale - the Tyneside flat. These two-storey buildings look like terraces from the street but are actually two self-contained flats, one above the other, each with its own front door. Walk through Heaton, Jesmond, Sandyford, Walker or Byker and you will find street after street of Tyneside flats, and they carry plumbing arrangements that need careful handling. The upper flat's waste runs and rising main pass through the lower flat's ceiling space, isolation valves are often shared, and a leak originating upstairs almost always presents downstairs first. We attend Tyneside flat call-outs with the expectation that the source and the symptom are in different properties, and isolating supply often requires coordination between two households.

The wider Victorian terrace belt across the city - through Shieldfield, Spital Tongues, Arthurs Hill and the Westgate Road corridor - shares the standard Victorian-era plumbing weaknesses of lead supply pipes, original soil stacks, and undersized waste runs. The student rental concentration in Jesmond and Heaton drives the same seasonal patterns we see in Leeds and Manchester. Coastal weather along the Tyne adds an additional accelerator - external pipework sees higher salt exposure than equivalent inland properties, and exterior copper and steel components corrode faster.

Northumbrian Water supplies the city with moderately soft water from Kielder Reservoir, which is gentle on boilers but contributes over decades to internal copper pitting in older installations. The newer apartment developments along the Quayside, in Ouseburn and out at Newcastle Great Park bring modern unvented system failures and shared-stack issues. The 1970s tower stock in Cruddas Park, Walker and Byker carries the standard high-rise communal plumbing concerns where individual flat isolation depends on the integrity of building-wide systems.`,
    commonIssues: ['Tyneside flat cross-property leaks', 'Coastal corrosion of external pipework', 'Student-let blockages', 'Lead supply pipe failure', 'Quayside flat stack issues'],
    landmarks: ['City Centre', 'Quayside', 'Jesmond', 'Heaton', 'Gosforth'],
    geo: { lat: 54.9783, lng: -1.6178 },
    futureAreas: ['jesmond', 'heaton', 'gosforth', 'ouseburn', 'byker', 'fenham', 'sandyford', 'walker'],
    waterBoard: 'Northumbrian Water',
    waterHardness: 'moderately soft',
  },
  {
    slug: 'nottingham',
    name: 'Nottingham',
    region: 'East Midlands',
    population: 332000,
    postcodes: ['NG1', 'NG2', 'NG3', 'NG4', 'NG5', 'NG6', 'NG7', 'NG8', 'NG9', 'NG11'],
    responseTime: '25 minutes',
    callOutFee: '£75',
    hourlyRate: '£80',
    housingNotes: `Nottingham's housing stock is anchored by red-brick Victorian and Edwardian terraces that stretch across Sneinton, Forest Fields, Hyson Green, Radford and Lenton, and these properties share the now-familiar plumbing weaknesses of the late nineteenth century build era - lead supply pipes nearing end of life, original cast iron soil stacks, and waste runs sized for one bathroom rather than the two or three that modern occupiers expect. We see a steady stream of leak-detection and lead-replacement work in NG7 and NG3 in particular, where the terrace density is highest and where retrofitted bathrooms have introduced runs that the original architecture was never planned for.

Nottingham is a major university city with two large campuses, and the student rental belts around Lenton, Dunkirk, the University Boulevard corridor and parts of Beeston drive the same HMO-pattern call-outs we see in other student cities - October blockage spikes, winter burst-pipe peaks in vacated properties, and a steady stream of poorly maintained landlord-managed boilers reaching catastrophic failure rather than scheduled replacement. The student-let stock in Nottingham is also notably old, with many HMOs sitting in Victorian terrace properties that have been retrofitted multiple times.

The wider housing stock includes the inter-war semi belt across Wollaton, Beeston, Bramcote and West Bridgford, the post-war council estates in Bilborough and Clifton, and the more modern apartment developments around the Lace Market and Hockley regeneration zones. Severn Trent supplies Nottingham with moderately hard water sourced primarily from the River Derwent, and limescale-driven boiler failure is a consistent background cause of call-outs across the city, less severe than in London or Birmingham but heavier than the Yorkshire and northern soft-water cities. The Victoria Embankment and Castle area also includes a pocket of Georgian and early Victorian property with the listed-building constraints that come with that era.`,
    commonIssues: ['Lead pipe failure in inner terraces', 'Student HMO blockages', 'Limescale on combi boilers', 'Retrofitted bathroom waste failures', 'Frozen pipes in vacated lets'],
    landmarks: ['City Centre', 'Lace Market', 'West Bridgford', 'Beeston', 'Wollaton'],
    geo: { lat: 52.9548, lng: -1.1581 },
    futureAreas: ['west-bridgford', 'beeston', 'wollaton', 'sherwood', 'mapperley', 'lenton', 'sneinton', 'arnold'],
    waterBoard: 'Severn Trent',
    waterHardness: 'moderate',
  },
  {
    slug: 'cardiff',
    name: 'Cardiff',
    region: 'Wales',
    population: 366000,
    postcodes: ['CF10', 'CF11', 'CF14', 'CF15', 'CF23', 'CF24', 'CF3', 'CF5'],
    responseTime: '30 minutes',
    callOutFee: '£75',
    hourlyRate: '£80',
    housingNotes: `Cardiff's defining residential type is the Edwardian bay-fronted terrace, and that stock dominates the inner suburbs of Cathays, Roath, Canton, Splott and Grangetown. These properties were built in the early 1900s on a relatively generous footprint compared to typical Victorian terraces, with bay windows, slightly larger front rooms and rear gardens that made them easier to extend in subsequent decades. From a plumbing perspective they share the era-typical issues - lead supply pipework, original soil stacks, and undersized waste runs - but the rear extensions that have been added across the past century have produced layered drainage arrangements where multiple decades of pipework converge in a single garden run to the main sewer.

The student rental concentration in Cathays - around Cardiff University's main campus and the surrounding terrace belt - generates the seasonal HMO call-out pattern that any university city sees, with October surges in toilet blockages and overflow incidents and a winter peak in burst pipes when properties are left unheated over the Christmas break. The wider housing stock includes the inter-war semi belt across Llanishen, Heath, Whitchurch and Rhiwbina, the substantial Cardiff Bay regeneration zone with its mix of new-build apartments and converted dock buildings, and the post-war estates in Ely, Llanrumney and St Mellons.

Welsh Water supplies the city with soft water sourced from the Brecon Beacons reservoirs, which means limescale is rarely the headline failure mode. We see proportionally more internal copper corrosion and pinhole leak presentation than we see scale-blocked heat exchangers. Cardiff's coastal location adds atmospheric humidity that accelerates external corrosion of soil stacks, rainwater goods and any exposed external pipework, and we plan exterior leak investigations with the expectation that visible corrosion is rarely the only point of failure on a run of degraded pipe.`,
    commonIssues: ['Edwardian extension drainage layering', 'Cathays HMO blockages', 'Soft-water copper pitting', 'External pipework corrosion from coastal humidity', 'Bay Area apartment stack issues'],
    landmarks: ['City Centre', 'Cardiff Bay', 'Cathays', 'Roath', 'Canton'],
    geo: { lat: 51.4816, lng: -3.1791 },
    futureAreas: ['cathays', 'roath', 'canton', 'cardiff-bay', 'pontcanna', 'heath', 'whitchurch', 'splott'],
    waterBoard: 'Welsh Water',
    waterHardness: 'soft',
  },
];

export const getCityBySlug = (slug: string): City | undefined =>
  cities.find((c) => c.slug === slug);

export const getCitySlugs = (): string[] => cities.map((c) => c.slug);
