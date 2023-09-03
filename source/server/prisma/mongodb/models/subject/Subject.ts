import { createModel } from "schemix";
import SubjectsOnClassesModel from "../subjectOnClass/SubjectOnClass";
import SubjectTranslationsModel from "../subjectTranslations/SubjectTranslations";

const subjectModel = createModel((SubjectModel) => {
  SubjectModel.string("mongo_id", {
    map: "_id",
    id: true,
    raw: /* prisma */ `@default(auto()) @database.ObjectId`,
  })
    .int("id", { unique: true })
    .relation("subjectTranslations", SubjectTranslationsModel, { list: true })
    .relation("classes", SubjectsOnClassesModel, { list: true })
    .string("name")
    .map("subjects");
});

export default subjectModel;
