import { CountryCode, getAllCountries } from "countries-and-timezones";
import type { PrismaEnum } from "schemix";
import { createEnum } from "schemix";

const countryCodes: CountryCode[] = Object.keys(
  getAllCountries(),
) as CountryCode[];

const schemixLanguagesEnum: PrismaEnum = createEnum(
  (languagesEnum: PrismaEnum): void => {
    countryCodes.forEach((countryCode: CountryCode): void => {
      languagesEnum.addValue(countryCode);
    });
  },
);

export default schemixLanguagesEnum;
