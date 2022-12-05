import { CountryCode, getAllCountries } from "countries-and-timezones";
import { createEnum } from "schemix";

const countryCodes: CountryCode[] = Object.keys(
  getAllCountries(),
) as CountryCode[];

const languagesEnum = createEnum((LanguagesEnum) => {
  countryCodes.forEach((countryCode) => {
    LanguagesEnum.addValue(countryCode);
  });
});

export default languagesEnum;
