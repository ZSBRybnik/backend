import { createModel, PrismaModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import runtimeType, { RuntimeTypes } from "../../enums/runtimeType/RuntimeType";
import contentItemsOnPostsAndSupbages from "../contentItemsOnPostsAndSupbages/ContentItemsOnPostsAndSupbages";

const contentItemModel: PrismaModel = createModel(
  (contentItemModel: PrismaModel): void => {
    contentItemModel
      .string("mongo_id", {
        map: "_id",
        id: true,
        raw: generatePrismaString({
          rawString: `#prisma 
            @default(auto()) @database.ObjectId
          `,
        }),
      })
      .int("id", { unique: true })
      .relation(
        "content_items_on_posts_and_supbages",
        contentItemsOnPostsAndSupbages,
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
