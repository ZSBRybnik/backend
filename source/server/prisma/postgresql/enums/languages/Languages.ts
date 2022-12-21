import { CountryCode, getAllCountries } from "countries-and-timezones";
import { createEnum, PrismaEnum } from "schemix";

const countryCodes: CountryCode[] = Object.keys(
  getAllCountries(),
) as CountryCode[];

const languages: PrismaEnum = createEnum((languagesEnum: PrismaEnum): void => {
  countryCodes.forEach((countryCode: CountryCode): void => {
    languagesEnum.addValue(countryCode);
  });
});

export default languages;
