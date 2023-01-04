import type { PrismaModel } from "schemix";
import { createModel } from "schemix";
import schemixLanguagesEnum from "~backend/source/server/prisma/postgresql/enums/languages/Languages";
import schemixSubjectModel from "~backend/source/server/prisma/postgresql/models/subject/Subject";
import generatePrismaString from "~backend/source/server/prisma/utils/generatePrismaString/generatePrismaString";
const schemixSubjectTranslationsModel: PrismaModel = createModel(
  (schemixSubjectTranslationsModel: PrismaModel): void => {
    schemixSubjectTranslationsModel
      .int("id", {
        id: true,
        raw: generatePrismaString({
          rawString: `#prisma 
            @default(autoincrement())
          `,
        }),
      })
      .enum("language", schemixLanguagesEnum)
      .string("name", {
        raw: generatePrismaString({
          rawString: `#prisma 
            @database.VarChar(100)
          `,
        }),
      })
      .int("subjectId", {
        map: "subject_id",
      })
      .relation("subjectTranslation", schemixSubjectModel, {
        fields: ["subjectId"],
        references: ["id"],
      })
      .map("subject_translations");
  },
);

export default schemixSubjectTranslationsModel;
