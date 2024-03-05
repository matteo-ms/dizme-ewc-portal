const flags = [
  { country: 'Sweden', imageUrl: '/flags/sweden.png', countryCode: 'SE' },
  { country: 'Italy', imageUrl: '/flags/italy.png', countryCode: 'IT' },
  { country: 'Netherlands', imageUrl: '/flags/netherlands.png', countryCode: 'NL' },
  { country: 'Czech Republic', imageUrl: '/flags/czech-republic.png', countryCode: 'CZ' },
  { country: 'France', imageUrl: '/flags/france.png', countryCode: 'FR' },
  { country: 'Greece', imageUrl: '/flags/greece.png', countryCode: 'GR' },
  { country: 'Finland', imageUrl: '/flags/finland.png', countryCode: 'FI' },
  { country: 'Romania', imageUrl: '/flags/romania.png', countryCode: 'RO' }
];

// utils to get the alpha-2 country code from the country name
const getCountryCode = (country: string) => {
  const countryData = flags.find((flag) => flag.country === country);
  return countryData?.countryCode;
};

// utils to get country name from the aplpha-2 country code
const getCountryName = (countryCode: string) => {
  const countryData = flags.find((flag) => flag.countryCode === countryCode);
  return countryData?.country;
};

// get imageUrl from the country code
const getCountryImageUrl = (countryCode: string) => {
  const countryData = flags.find((flag) => flag.countryCode === countryCode);
  return countryData?.imageUrl;
};

export { flags, getCountryName, getCountryCode, getCountryImageUrl };