/* eslint-disable max-params */
import { lookup } from "geoip-lite";
import weatherInstance from "openweather-apis";
import createHandler from "../../../utils/createHandler/createHandler";
import {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "../../../utils/createHandler/createHandler.types";

const { handler: getWeather }: CreateHandlerOutput = createHandler({
  rawHandler: async ({
    request: {
      query: { ip },
    },
    response,
    next,
  }: RawHandlerArguments): Promise<void> => {
    if (ip && !Array.isArray(ip)) {
      const userLocation = lookup("89.64.48.110");
      weatherInstance.setCity(userLocation?.city);
      console.log(userLocation?.city);
      weatherInstance.setAPPID(process.env.OPENWEATHER_API_KEY);
      weatherInstance.getDescription((weather: string) => {
        response.send(weather);
        return next();
      });
    }
    response.sendStatus(400);
    return next();
  },
});

export default getWeather;
