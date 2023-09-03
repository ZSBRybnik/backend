import type { PrismaModel } from "schemix";
import { createModel } from "schemix";
import schemixLanguagesEnum from "~backend/source/server/prisma/postgresql/enums/languages/Languages";
import schemixPostModel from "~backend/source/server/prisma/postgresql/models/post/Post";

const schemixPostTranslationModel: PrismaModel = createModel(
  (schemixPostTranslationModel: PrismaModel): void => {
    schemixPostTranslationModel
      .int("id", {
        id: true,
        raw: /* prisma */ `
            @default(autoincrement())
          `,
      })
      .enum("language", schemixLanguagesEnum)
      .string("title")
      .string("brief")
      .int("postId", {
        map: "post_id",
      })
      .relation("postTranslation", schemixPostModel, {
        fields: ["postId"],
        references: ["id"],
      })
      .map("post_translations");
  },
);

export default schemixPostTranslationModel;
