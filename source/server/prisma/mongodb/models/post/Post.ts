import { createModel } from "schemix";
import postAndSubpageModifiers from "../../enums/postAndSubpageModifiers/PostAndSubpageModifiers";
import contentItemsOnPostsAndSubpages from "../contentItemsOnPostsAndSubpages/ContentItemsOnPostsAndSubpages";
import PostTranslationsModel from "../postTranslations/PostTranslations";
import UserModel from "../user/User";

const postModel = createModel((postModel) => {
  postModel
    .string("mongo_id", {
      map: "_id",
      id: true,
      raw: /* prisma */ `@default(auto()) @database.ObjectId`,
    })
    .int("id", {
      unique: true,
    })
    .boolean("isDisabled", { map: "is_disabled" })
    .enum("modifiers", postAndSubpageModifiers, { list: true })
    .relation("postTranslations", PostTranslationsModel, {
      list: true,
    })
    .string("title")
    .relation(
      "contentItemsOnPostsAndSubpages",
      contentItemsOnPostsAndSubpages,
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
