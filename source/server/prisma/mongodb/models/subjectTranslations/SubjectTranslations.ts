import { createModel } from "schemix";
import languagesEnum from "../../enums/languages/Languages";
import SubjectModel from "../subject/Subject";

const model = createModel((SubjectTranslationsModel) => {
  SubjectTranslationsModel.string("mongo_id", {
    map: "_id",
    id: true,
    raw: /* prisma */ `@default(auto()) @database.ObjectId`.trim(),
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
