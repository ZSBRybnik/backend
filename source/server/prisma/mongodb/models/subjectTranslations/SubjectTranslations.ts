import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import languagesEnum from "../../enums/languages/Languages";
import SubjectModel from "../subject/Subject";

const model = createModel((SubjectTranslationsModel) => {
  SubjectTranslationsModel.string("mongo_id", {
    map: "_id",
    id: true,
    raw: generatePrismaString({
      rawString: `#prisma 
        @default(auto()) @database.ObjectId
      `,
    }),
  })
    .int("id", { unique: true })
    .enum("language", languagesEnum)
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
