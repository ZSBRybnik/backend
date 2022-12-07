import { createEnum } from "schemix";

const modifiers: Set<string> = new Set(["Archive", "Live"]);

const postAndPageModifiers = createEnum((PostAndPageModifiersEnum) => {
  modifiers.forEach((modifier) => {
    PostAndPageModifiersEnum.addValue(modifier);
  });
});

export default postAndPageModifiers;
