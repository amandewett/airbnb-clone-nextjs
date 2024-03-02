import countries from "world-countries";

export const FORMATTED_COUNTRIES = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latLng: country.latlng,
  region: country.region,
}));
