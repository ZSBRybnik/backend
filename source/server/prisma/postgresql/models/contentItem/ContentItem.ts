import type { PrismaModel } from "schemix";
import { createModel } from "schemix";
import RuntimeType from "~backend/source/server/constants/runtimeType/runtimeType";
import schemixRuntimeTypeEnum from "~backend/source/server/prisma/postgresql/enums/runtimeType/RuntimeType";
import schemixContentItemsOnPostsAndSubpagesModel from "~backend/source/server/prisma/postgresql/models/contentItemsOnPostsAndSubpages/ContentItemsOnPostsAndSubpages";
import generatePrismaString from "~backend/source/server/prisma/utils/generatePrismaString/generatePrismaString";

const schemixContentItemModel: PrismaModel = createModel(
  (contentItemModel: PrismaModel): void => {
    contentItemModel
      .int("id", {
        id: true,
        raw: generatePrismaString({
          rawString: `#prisma
            @default(autoincrement())
          `,
        }),
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
        raw: generatePrismaString({
          rawString: `#prisma
            @database.Text
          `,
        }),
      })
      .map("content_items");
  },
);

export default schemixContentItemModel;
