import { random, times } from "lodash";

type GenerateRandomPasswordArguments = {
  passwordLength?: number;
};

const generateRandomPassword = (argument?: GenerateRandomPasswordArguments) => {
  const { passwordLength = 10 } = argument ?? { passwordLength: 10 };
  return times(passwordLength, (): string => random(35).toString(36)).join("");
};

export default generateRandomPassword;
