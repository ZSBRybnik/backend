import { createModel, PrismaModel } from "schemix";
import schemixPostAndSubpageModifiersEnum from "~backend/source/server/prisma/postgresql/enums/postAndSubpageModifiers/PostAndSubpageModifiers";
import schemixContentItemsOnPostsAndSubpagesModel from "~backend/source/server/prisma/postgresql/models/contentItemsOnPostsAndSubpages/ContentItemsOnPostsAndSubpages";
import schemixPostTranslationsModel from "~backend/source/server/prisma/postgresql/models/postTranslation/PostTranslation";
import schemixUserModel from "~backend/source/server/prisma/postgresql/models/user/User";
import generatePrismaString from "~backend/source/server/prisma/utils/generatePrismaString/generatePrismaString";

const schemixPostModel: PrismaModel = createModel(
  (schemixPostModel: PrismaModel): void => {
    schemixPostModel
      .int("id", {
        id: true,
        raw: generatePrismaString({
          rawString: `#prisma 
            @default(autoincrement())
          `,
        }),
      })
      .boolean("isDisabled", { map: "is_disabled" })
      .enum("modifiers", schemixPostAndSubpageModifiersEnum, { list: true })
      .relation("postTranslations", schemixPostTranslationsModel, {
        list: true,
      })
      .string("title", {
        raw: generatePrismaString({
          rawString: `#prisma 
            @database.VarChar(255)
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
      .relation("author", schemixUserModel, {
        fields: ["authorId"],
        references: ["id"],
      })
      .int("authorId", {
        map: "author_id",
      })
      .string("brief", {
        raw: generatePrismaString({
          rawString: `#prisma 
            @database.VarChar(255)
          `,
        }),
      })
      .map("posts");
  },
);

export default schemixPostModel;
