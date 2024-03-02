import { FORMATTED_COUNTRIES } from "@/lib/formattedCountries";

const useCountries = () => {
  const getAllCountries = () => FORMATTED_COUNTRIES;

  const getCountry = (value: string) =>
    getAllCountries().find((item) => item.value === value);

  return {
    getAllCountries,
    getCountry,
  };
};
export default useCountries;
