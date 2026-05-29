import type { Area } from '@/data/areas';
import type { City } from '@/data/cities';
import { GAS_SAFE_NUMBER } from './constants';

/**
 * Area-specific FAQ. Deliberately worded differently from buildCityFaq so the
 * FAQPage schema on an area page is not a duplicate of its parent city page.
 */
export const buildAreaFaq = (
  area: Area,
  city: City,
  gasSafeNumber: string = GAS_SAFE_NUMBER,
) => [
  {
    question: `How fast can you get a plumber to ${area.name}?`,
    answer: `We aim to reach ${area.name} in around ${area.responseTime} from your call, day or night. Engineers covering ${city.name} are dispatched from the closest available van, with cover 24 hours a day, every day of the year including bank holidays.`,
  },
  {
    question: `Which ${area.name} postcodes do you cover?`,
    answer: `We cover ${area.name} and the surrounding ${area.landmarks.slice(0, 3).join(', ')} streets, including ${area.postcodes.join(', ')}. If your postcode is not listed, call us - we almost always cover further than the prefixes shown.`,
  },
  {
    question: `Is the call-out price in ${area.name} the same as the rest of ${city.name}?`,
    answer: `Yes. Our ${area.name} call-out fee is ${city.callOutFee}, covering attendance and the first hour on site, with an hourly rate of ${city.hourlyRate} after that. It is the same rate across the whole of ${city.name}, with no surcharge for nights, weekends or bank holidays.`,
  },
  {
    question: `What plumbing problems are most common in ${area.name}?`,
    answer: `The call-outs we see most in ${area.name} are ${area.commonIssues.slice(0, 3).map((i) => i.toLowerCase()).join(', ')}. Our engineers know the local property stock and carry the parts and detection kit these jobs typically need.`,
  },
  {
    question: `Does the ${city.waterBoard} supply affect plumbing in ${area.name}?`,
    answer: `${city.waterBoard} supplies ${area.name} with ${city.waterHardness} water. That has a direct bearing on boiler limescale, immersion-heater life and how copper pipework behaves, and we factor the local water profile into every boiler and pipe repair we carry out here.`,
  },
  {
    question: `Are your ${area.name} engineers Gas Safe registered?`,
    answer: `Yes. Every engineer attending gas work in ${area.name} is Gas Safe registered with current ACS qualifications. Our company Gas Safe registration number is ${gasSafeNumber}.`,
  },
  {
    question: `Do you cover the older property types found in ${area.name}?`,
    answer: `Yes. ${area.name}'s housing is a regular part of our work and our engineers attend ${area.commonIssues[0].toLowerCase()} calls here with the right tooling and parts on the van for the local stock.`,
  },
];
