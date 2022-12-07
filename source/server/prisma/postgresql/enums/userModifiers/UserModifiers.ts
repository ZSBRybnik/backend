import { createEnum } from "schemix";

const modifiers: Set<string> = new Set([
  "BannedCommenting",
  "BannedReactingOnFeed",
]);

const userModifiers = createEnum((UserModifiers) => {
  modifiers.forEach((modifier) => {
    UserModifiers.addValue(modifier);
  });
});

export default userModifiers;
