export type Review = {
  id: string;
  name: string;
  city: string;
  rating: number;
  date: string;
  service: string;
  text: string;
};

export const reviews: Review[] = [
  { id: 'r1', name: 'Sarah M.', city: 'london', rating: 5, date: '2026-04-12', service: 'Burst Pipe', text: 'Pipe burst at 11pm in my Camden flat. They were here within 25 minutes, isolated the supply and had it repaired before 1am. Calm, clean, professional.' },
  { id: 'r2', name: 'James P.', city: 'london', rating: 5, date: '2026-03-28', service: 'Boiler Repair', text: 'Worcester boiler died on a Sunday morning. Engineer arrived in under 40 minutes, diagnosed a failed PCB, fitted from van stock. No weekend surcharge as promised.' },
  { id: 'r3', name: 'Priya K.', city: 'london', rating: 5, date: '2026-04-02', service: 'Leak Detection', text: 'Hidden leak under our kitchen floor that two other firms could not find. Thermal imaging located it in twenty minutes. Saved us from ripping up the whole floor.' },
  { id: 'r4', name: 'David T.', city: 'london', rating: 5, date: '2026-02-15', service: 'Blocked Drain', text: 'External drain backing up. Cleared with jetting and CCTV survey identified root ingress. Honest about the longer-term solution. Reasonable price.' },
  { id: 'r5', name: 'Anna B.', city: 'london', rating: 5, date: '2026-03-08', service: 'No Hot Water', text: 'Combi giving hot water then cold then hot. Diagnosed as a failing diverter valve, replaced same visit. Friendly and explained everything.' },
  { id: 'r6', name: 'Mark R.', city: 'london', rating: 5, date: '2026-04-19', service: 'Burst Pipe', text: 'Lead supply pipe sprung a leak in the cellar. Repaired the immediate failure and gave honest advice about replacing the lead run properly later. No upsell pressure.' },

  { id: 'r7', name: 'Emma L.', city: 'manchester', rating: 5, date: '2026-04-05', service: 'Burst Pipe', text: 'Frozen pipe burst over a freezing weekend in Chorlton. They got to me in 20 minutes despite the weather. Saved my floors.' },
  { id: 'r8', name: 'Ahmed H.', city: 'manchester', rating: 5, date: '2026-03-22', service: 'Blocked Toilet', text: 'Toilet blocked the morning of a family event. Quick, clean and discreet. You would never have known they had been there.' },
  { id: 'r9', name: 'Rachel S.', city: 'manchester', rating: 5, date: '2026-02-08', service: 'Boiler Repair', text: 'Vaillant boiler with low pressure issue. Engineer found a slow leak on a radiator valve and fixed it. Honest about the cause - no inventing problems.' },
  { id: 'r10', name: 'Tom W.', city: 'manchester', rating: 5, date: '2026-04-15', service: 'Heating Repair', text: 'Cold radiators all over the house. Powerflush did the job. Difference is night and day.' },
  { id: 'r11', name: 'Lisa C.', city: 'manchester', rating: 5, date: '2026-03-30', service: 'No Hot Water', text: 'No hot water on a Saturday. They came out within 30 mins, replaced the immersion element, hot water back same visit.' },

  { id: 'r12', name: 'Robert J.', city: 'birmingham', rating: 5, date: '2026-04-10', service: 'Boiler Repair', text: 'Old back boiler finally gave up. They quoted honestly for replacement and fitted a new combi within 36 hours. Brilliant work.' },
  { id: 'r13', name: 'Sunita P.', city: 'birmingham', rating: 5, date: '2026-03-18', service: 'Blocked Drain', text: 'Drain backing up onto the patio. Cleared with jetting and identified collapsed clay pipe. Good explanation of options.' },
  { id: 'r14', name: 'Chris D.', city: 'birmingham', rating: 5, date: '2026-04-22', service: 'Burst Pipe', text: 'Galvanised rising main split in the loft. Replaced with copper. Clean job, fair price.' },
  { id: 'r15', name: 'Maria F.', city: 'birmingham', rating: 5, date: '2026-02-28', service: 'Leak Detection', text: 'Mystery damp patch. Acoustic detection found a tiny pinhole leak in pipework under the floor. Saved us a fortune in trial and error.' },
  { id: 'r16', name: 'Paul K.', city: 'birmingham', rating: 4, date: '2026-03-14', service: 'Heating Repair', text: 'Pump replacement and system flush. Job took longer than expected but fair price and good work.' },

  { id: 'r17', name: 'Fiona M.', city: 'glasgow', rating: 5, date: '2026-04-08', service: 'Burst Pipe', text: 'Tenement loft pipe burst at 2am, water everywhere. They were there within half an hour and stopped it before more flats were affected.' },
  { id: 'r18', name: 'Alistair G.', city: 'glasgow', rating: 5, date: '2026-03-25', service: 'Boiler Repair', text: 'Boiler frozen condensate pipe. Quick fix and they reinsulated the pipe properly so it does not happen again.' },
  { id: 'r19', name: 'Catherine R.', city: 'glasgow', rating: 5, date: '2026-04-19', service: 'Blocked Drain', text: 'Communal drain blockage in our close. Coordinated with neighbours and cleared everything. First-rate service.' },
  { id: 'r20', name: 'Ian D.', city: 'glasgow', rating: 5, date: '2026-02-12', service: '24/7 Plumber', text: 'Heating died on Christmas Eve. Genuine 24/7 service - they came out and fixed it. Lifesavers.' },

  { id: 'r21', name: 'Gemma S.', city: 'leeds', rating: 5, date: '2026-04-14', service: 'Blocked Toilet', text: 'Stubborn toilet blockage in our Headingley terrace. Cleared in 30 minutes. Polite and clean.' },
  { id: 'r22', name: 'Adam B.', city: 'leeds', rating: 5, date: '2026-03-20', service: 'Burst Pipe', text: 'Burst pipe in a back-to-back terrace - terrible access. They worked it out and fixed it without making a mess of the property.' },
  { id: 'r23', name: 'Holly T.', city: 'leeds', rating: 5, date: '2026-04-26', service: 'No Hot Water', text: 'Diverter valve replacement on a Sunday. No surcharge. Hot water back within an hour.' },
  { id: 'r24', name: 'Nigel C.', city: 'leeds', rating: 5, date: '2026-03-05', service: 'Heating Repair', text: 'Pump replacement after years of intermittent issues. System runs better than it has in a decade.' },

  { id: 'r25', name: 'Sophie L.', city: 'liverpool', rating: 5, date: '2026-04-11', service: 'Boiler Repair', text: 'Worcester combi PCB failure. Diagnosed quickly, replaced same visit. Engineer explained everything.' },
  { id: 'r26', name: 'Daniel O.', city: 'liverpool', rating: 5, date: '2026-03-28', service: 'Burst Pipe', text: 'Lead supply pipe burst in our Anfield terrace. Made-safe overnight and full lead replacement done the next day.' },
  { id: 'r27', name: 'Niamh F.', city: 'liverpool', rating: 5, date: '2026-04-21', service: 'Leak Detection', text: 'Found a leak under our underfloor heating in minutes using thermal imaging. Top-class equipment and skill.' },
  { id: 'r28', name: 'Gareth W.', city: 'liverpool', rating: 5, date: '2026-02-22', service: 'Blocked Drain', text: 'Patio drain backing up - cleared and showed me the CCTV footage of the problem. Fair quote for the longer-term repair.' },

  { id: 'r29', name: 'Charlotte H.', city: 'bristol', rating: 5, date: '2026-04-13', service: 'Burst Pipe', text: 'Burst pipe in a Clifton listed building - they understood the constraints and worked carefully. Excellent.' },
  { id: 'r30', name: 'Oliver M.', city: 'bristol', rating: 5, date: '2026-03-19', service: 'Heating Repair', text: 'Cold radiators after a powerflush from another firm. They diagnosed an actual sludged-pump issue and fixed properly.' },
  { id: 'r31', name: 'Hannah G.', city: 'bristol', rating: 5, date: '2026-04-25', service: 'Boiler Repair', text: 'Vaillant fault diagnosed in fifteen minutes. Parts on the van. Hot water and heating back on the same call.' },
  { id: 'r32', name: 'Joel R.', city: 'bristol', rating: 5, date: '2026-03-09', service: 'No Hot Water', text: 'Lukewarm water only - turned out to be a scaled heat exchanger. Descaled rather than upselling a new boiler. Honest.' },

  { id: 'r33', name: 'Emily S.', city: 'sheffield', rating: 5, date: '2026-04-16', service: 'Burst Pipe', text: 'External pipe burst on the upper Crookes house. Cold weather emergency - they were quick and effective.' },
  { id: 'r34', name: 'Andrew P.', city: 'sheffield', rating: 5, date: '2026-03-24', service: 'Blocked Drain', text: 'Hilly garden drain backing up - they found the collapse using CCTV. Honest about the work needed.' },
  { id: 'r35', name: 'Beth N.', city: 'sheffield', rating: 5, date: '2026-04-29', service: 'Boiler Repair', text: 'Ideal boiler PCB replacement on a Sunday. No surcharge as advertised.' },
  { id: 'r36', name: 'Liam D.', city: 'sheffield', rating: 5, date: '2026-02-18', service: 'No Hot Water', text: 'Immersion heater out. New element fitted on the visit, hot water restored quickly.' },

  { id: 'r37', name: 'Jennifer M.', city: 'edinburgh', rating: 5, date: '2026-04-09', service: 'Burst Pipe', text: 'Tenement burst pipe in a freezing snap. Got to us fast and worked respectfully in a listed building.' },
  { id: 'r38', name: 'Hamish W.', city: 'edinburgh', rating: 5, date: '2026-03-21', service: 'Boiler Repair', text: 'Vaillant low-pressure issue. Found a tiny radiator valve leak. Sorted within the hour.' },
  { id: 'r39', name: 'Iona M.', city: 'edinburgh', rating: 5, date: '2026-04-23', service: 'Blocked Drain', text: 'Communal stair stack blockage. They coordinated with all flats and cleared it cleanly.' },
  { id: 'r40', name: 'Ross K.', city: 'edinburgh', rating: 5, date: '2026-02-25', service: 'Leak Detection', text: 'Hidden leak in a New Town flat - thermal imaging found it without disturbing the listed plasterwork.' },

  { id: 'r41', name: 'Karen B.', city: 'newcastle', rating: 5, date: '2026-04-18', service: 'Burst Pipe', text: 'Tyneside flat - leak from upstairs into our ceiling. They sorted it across both flats within the hour.' },
  { id: 'r42', name: 'Stephen R.', city: 'newcastle', rating: 5, date: '2026-03-13', service: 'Boiler Repair', text: 'Baxi boiler fault on a cold morning. Quick diagnosis, fan replaced from van stock.' },
  { id: 'r43', name: 'Gillian H.', city: 'newcastle', rating: 5, date: '2026-04-27', service: 'No Hot Water', text: 'Cylinder thermostat failure. New stat fitted and hot water back inside an hour.' },
  { id: 'r44', name: 'Peter L.', city: 'newcastle', rating: 5, date: '2026-02-20', service: 'Heating Repair', text: 'Powerflush after years of cold radiators. System works like new.' },

  { id: 'r45', name: 'Rebecca J.', city: 'nottingham', rating: 5, date: '2026-04-17', service: 'Burst Pipe', text: 'Frozen pipe split in the loft of our Sherwood semi. Replaced and properly insulated.' },
  { id: 'r46', name: 'Mohammed I.', city: 'nottingham', rating: 5, date: '2026-03-26', service: 'Boiler Repair', text: 'Glow-worm boiler diverter valve replacement. Hot water back same visit. Fair price.' },
  { id: 'r47', name: 'Charlotte W.', city: 'nottingham', rating: 5, date: '2026-04-30', service: 'Blocked Toilet', text: 'Stubborn blockage in a tenanted Lenton property. Cleared and explained how to avoid recurrence.' },
  { id: 'r48', name: 'Greg O.', city: 'nottingham', rating: 5, date: '2026-02-14', service: 'Leak Detection', text: 'Underfloor heating leak - found in fifteen minutes with thermal imaging. Brilliant.' },

  { id: 'r49', name: 'Megan T.', city: 'cardiff', rating: 5, date: '2026-04-20', service: 'Burst Pipe', text: 'Rear extension pipe leak in our Cathays terrace. Fixed and explained why it had failed.' },
  { id: 'r50', name: 'Rhys P.', city: 'cardiff', rating: 5, date: '2026-03-29', service: 'Boiler Repair', text: 'Worcester combi pressure problem. Expansion vessel replaced and the system runs steady now.' },
  { id: 'r51', name: 'Bethan E.', city: 'cardiff', rating: 5, date: '2026-04-24', service: 'No Hot Water', text: 'Immersion failure in our Heath house. Replaced fast and friendly.' },
  { id: 'r52', name: 'Daniel L.', city: 'cardiff', rating: 5, date: '2026-02-26', service: 'Blocked Drain', text: 'External drain backing up. Cleared with jetting and surveyed for collapse. Honest, no upsell.' },
];

export const getReviewsByCity = (citySlug: string, limit = 8): Review[] =>
  reviews.filter((r) => r.city === citySlug).slice(0, limit);

export const getFeaturedReviews = (limit = 6): Review[] =>
  reviews.filter((_, i) => i % 8 === 0).slice(0, limit);
