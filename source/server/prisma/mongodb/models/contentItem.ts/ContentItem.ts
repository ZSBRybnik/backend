import { createModel, PrismaModel } from "schemix";
import RuntimeTypes from "~backend/source/server/constants/runtimeType/runtimeType";
import runtimeType from "../../enums/runtimeType/RuntimeType";
import contentItemsOnPostsAndSubpages from "../contentItemsOnPostsAndSubpages/ContentItemsOnPostsAndSubpages";

const contentItemModel: PrismaModel = createModel(
  (contentItemModel: PrismaModel): void => {
    contentItemModel
      .string("mongo_id", {
        map: "_id",
        id: true,
        raw: /* prisma */ `@default(auto()) @database.ObjectId`.trim(),
      })
      .int("id", { unique: true })
      .relation(
        "contentItemsOnPostsAndSubpages",
        contentItemsOnPostsAndSubpages,
        {
          list: true,
        },
      )
      .enum("runtime", runtimeType, {
        default: RuntimeTypes.Classic,
      })
      .string("content")
      .map("content_items");
  },
);

export default contentItemModel;
