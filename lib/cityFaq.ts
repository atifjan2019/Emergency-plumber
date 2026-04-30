import type { City } from '@/data/cities';
import { GAS_SAFE_NUMBER } from './constants';

export const buildCityFaq = (city: City, gasSafeNumber: string = GAS_SAFE_NUMBER) => [
  {
    question: `How quickly can you reach me in ${city.name}?`,
    answer: `Our average response time across ${city.name} is ${city.responseTime} from call to arrival. We have engineers on call 24 hours a day, every day of the year, including bank holidays.`,
  },
  {
    question: `Which postcodes in ${city.name} do you cover?`,
    answer: `We cover all major ${city.name} postcodes including ${city.postcodes.slice(0, 6).join(', ')} and surrounding areas. Call us with your postcode if you are unsure - we cover further than the listed prefixes in most cases.`,
  },
  {
    question: `What does an emergency call-out cost in ${city.name}?`,
    answer: `Our ${city.name} call-out fee is ${city.callOutFee} which covers attendance and the first hour of labour on site. Our hourly rate beyond the first hour is ${city.hourlyRate}. We charge the same rate at any hour of the day or night, including weekends.`,
  },
  {
    question: `Do you charge extra at night or on weekends in ${city.name}?`,
    answer: `No. Same call-out fee, same hourly rate, every hour of every day. We do not surcharge for emergency response.`,
  },
  {
    question: `Are your ${city.name} engineers Gas Safe registered?`,
    answer: `Yes. Every engineer attending gas-related work in ${city.name} is Gas Safe registered with current ACS qualifications. Our company Gas Safe registration is ${gasSafeNumber}.`,
  },
  {
    question: `My water in ${city.name} is supplied by ${city.waterBoard} - does that affect my plumbing?`,
    answer: `${city.waterBoard} supplies ${city.name} with ${city.waterHardness} water, which has implications for boiler limescale, immersion heater life and copper pipe behaviour. Our local engineers know the regional water profile and plan repairs accordingly.`,
  },
  {
    question: `Can you handle plumbing in older ${city.name} property types?`,
    answer: `Yes. Our ${city.name} engineers regularly attend ${city.commonIssues[0].toLowerCase()} calls and have the appropriate tooling and parts on the van for the local property stock. We carry experience-specific kit calibrated to the area's housing types.`,
  },
  {
    question: `Will you provide a written report I can send to my insurer in ${city.name}?`,
    answer: `Yes. Itemised written reports with photos are provided as standard on all leak and damage call-outs in ${city.name}, accepted by all major UK home insurers.`,
  },
];
