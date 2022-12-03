import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import SubjectModel from "../subject/Subject";

const model = createModel((SubjectTranslationsModel) => {
  SubjectTranslationsModel.int("id", {
    id: true,
    raw: generatePrismaString({
      rawString: `#prisma 
        @default(autoincrement())
      `,
    }),
  })
    .string("language")
    .string("title")
    .int("subjectId", {
      map: "subject_id",
    })
    .relation("subjectTranslation", SubjectModel, {
      fields: ["subjectId"],
      references: ["id"],
    })
    .map("subject_translations");
});

export default model;
