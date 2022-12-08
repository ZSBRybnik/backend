import { createModel, PrismaModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import runtimeType, { RuntimeTypes } from "../../enums/runtimeType/RuntimeType";
import contentItemsOnPostsAndSupbages from "../contentItemsOnPostsAndSubpages/ContentItemsOnPostsAndSubpages";

const contentItemModel: PrismaModel = createModel(
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
        "content_items_on_posts_and_supbages",
        contentItemsOnPostsAndSupbages,
        {
          list: true,
        },
      )
      .enum("runtime", runtimeType, {
        default: RuntimeTypes.Classic,
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

export default contentItemModel;
