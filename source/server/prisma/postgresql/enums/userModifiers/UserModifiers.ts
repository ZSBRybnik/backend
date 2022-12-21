import { createEnum, PrismaEnum } from "schemix";
import UserModifiers from "~backend/source/server/constants/userModifiers/userModifiers";

const modifiers: Set<UserModifiers> = new Set([
  UserModifiers.BannedCommenting,
  UserModifiers.BannedReactingOnFeed,
]);

const userModifiers: PrismaEnum = createEnum(
  (userModifiersEnum: PrismaEnum): void => {
    modifiers.forEach((modifier: UserModifiers): void => {
      userModifiersEnum.addValue(modifier);
    });
  },
);

export default userModifiers;
