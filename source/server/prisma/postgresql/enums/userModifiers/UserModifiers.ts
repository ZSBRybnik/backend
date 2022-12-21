import type { PrismaEnum } from "schemix";
import { createEnum } from "schemix";
import UserModifiers from "~backend/source/server/constants/userModifiers/userModifiers";

const modifiers: Set<UserModifiers> = new Set([
  UserModifiers.BannedCommenting,
  UserModifiers.BannedReactingOnFeed,
]);

const schemixUserModifiersEnum: PrismaEnum = createEnum(
  (userModifiersEnum: PrismaEnum): void => {
    modifiers.forEach((modifier: UserModifiers): void => {
      userModifiersEnum.addValue(modifier);
    });
  },
);

export default schemixUserModifiersEnum;
