import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import postAndPageModifiers from "../../enums/postAndPageModifiers/PostAndPageModifiers";
import contentItemsOnPostsAndSupbages from "../contentItemsOnPostsAndSupbages/ContentItemsOnPostsAndSupbages";
import PostTranslationsModel from "../postTranslations/PostTranslations";
import UserModel from "../user/User";

const postModel = createModel((postModel) => {
  postModel
    .string("mongo_id", {
      map: "_id",
      id: true,
      raw: generatePrismaString({
        rawString: `#prisma 
          @default(auto()) @database.ObjectId
        `,
      }),
    })
    .int("id", {
      unique: true,
    })
    .boolean("isDisabled", { map: "is_disabled" })
    .enum("modifiers", postAndPageModifiers, { list: true })
    .relation("postTranslations", PostTranslationsModel, {
      list: true,
    })
    .string("title")
    .relation(
      "content_items_on_posts_and_supbages",
      contentItemsOnPostsAndSupbages,
      {
        list: true,
      },
    )
    .relation("author", UserModel, {
      fields: ["authorId"],
      references: ["id"],
    })
    .int("authorId", {
      map: "author_id",
    })
    .string("brief")
    .map("posts");
});

export default postModel;
