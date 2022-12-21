import type { PrismaEnum } from "schemix";
import { createEnum } from "schemix";
import PostAndSubpageModifiers from "~backend/source/server/constants/postAndSubpageModifiers/postAndSubpageModifiers";

const modifiers: Set<PostAndSubpageModifiers> = new Set([
  PostAndSubpageModifiers.Archive,
  PostAndSubpageModifiers.Live,
]);

const schemixPostAndSubpageModifiersEnum: PrismaEnum = createEnum(
  (postAndSubpageModifiersEnum: PrismaEnum): void => {
    modifiers.forEach((modifier: PostAndSubpageModifiers): void => {
      postAndSubpageModifiersEnum.addValue(modifier);
    });
  },
);

export default schemixPostAndSubpageModifiersEnum;
