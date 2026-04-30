// All UK postcode area codes (the 1-2 letter prefix of a postcode).
// Source: Royal Mail postcode area list - covers Great Britain, Northern Ireland,
// the Channel Islands and the Isle of Man.
export const UK_POSTCODE_AREAS = [
  'AB', 'AL', 'B', 'BA', 'BB', 'BD', 'BH', 'BL', 'BN', 'BR', 'BS', 'BT',
  'CA', 'CB', 'CF', 'CH', 'CM', 'CO', 'CR', 'CT', 'CV', 'CW',
  'DA', 'DD', 'DE', 'DG', 'DH', 'DL', 'DN', 'DT', 'DY',
  'E', 'EC', 'EH', 'EN', 'EX',
  'FK', 'FY',
  'G', 'GL', 'GU', 'GY',
  'HA', 'HD', 'HG', 'HP', 'HR', 'HS', 'HU', 'HX',
  'IG', 'IM', 'IP', 'IV',
  'JE',
  'KA', 'KT', 'KW', 'KY',
  'L', 'LA', 'LD', 'LE', 'LL', 'LN', 'LS', 'LU',
  'M', 'ME', 'MK', 'ML',
  'N', 'NE', 'NG', 'NN', 'NP', 'NR', 'NW',
  'OL', 'OX',
  'PA', 'PE', 'PH', 'PL', 'PO', 'PR',
  'RG', 'RH', 'RM',
  'S', 'SA', 'SE', 'SG', 'SK', 'SL', 'SM', 'SN', 'SO', 'SP', 'SR', 'SS', 'ST', 'SW', 'SY',
  'TA', 'TD', 'TF', 'TN', 'TQ', 'TR', 'TS', 'TW',
  'UB',
  'W', 'WA', 'WC', 'WD', 'WF', 'WN', 'WR', 'WS', 'WV',
  'YO',
  'ZE',
];

// Returns the leading letters of a postcode area (e.g. "SW1A" -> "SW", "M14" -> "M").
export function extractArea(outward: string): string | null {
  const m = outward.match(/^([A-Z]{1,2})/);
  return m ? m[1] : null;
}

export function isUkPostcodeArea(area: string): boolean {
  return UK_POSTCODE_AREAS.includes(area.toUpperCase());
}
