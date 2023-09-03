import type { PrismaModel } from "schemix";
import { createModel } from "schemix";
import RuntimeType from "~backend/source/server/constants/runtimeType/runtimeType";
import schemixRuntimeTypeEnum from "~backend/source/server/prisma/postgresql/enums/runtimeType/RuntimeType";
import schemixContentItemsOnPostsAndSubpagesModel from "~backend/source/server/prisma/postgresql/models/contentItemsOnPostsAndSubpages/ContentItemsOnPostsAndSubpages";

const schemixContentItemModel: PrismaModel = createModel(
  (contentItemModel: PrismaModel): void => {
    contentItemModel
      .int("id", {
        id: true,
        raw: /* prisma */ `
          @default(autoincrement())
        `.trim(),
      })
      .relation(
        "contentItemsOnPostsAndSubpages",
        schemixContentItemsOnPostsAndSubpagesModel,
        {
          list: true,
        },
      )
      .enum("runtime", schemixRuntimeTypeEnum, {
        default: RuntimeType.Classic,
      })
      .string("content", {
        raw: /* prisma */ `
          @database.Text
        `.trim(),
      })
      .map("content_items");
  },
);

export default schemixContentItemModel;
