import { createModel } from "schemix";
import SchoolClassModel from "../schoolClass/SchoolClass";
import SubjectModel from "../subject/Subject";

const subjectsOnClasses = createModel((SubjectsOnClassesModel) => {
  SubjectsOnClassesModel.string("mongo_id", {
    map: "_id",
    id: true,
    raw: /* prisma */ `@default(auto()) @database.ObjectId`.trim(),
  })
    .map("subjects_on_classes")
    .relation("subjects", SubjectModel, {
      fields: ["subjectId"],
      references: ["id"],
    })
    .relation("schoolClasses", SchoolClassModel, {
      fields: ["schoolClasssId"],
      references: ["id"],
    })
    .int("subjectId", { map: "subject_id" })
    .int("schoolClasssId", {
      map: "school_classs_id",
    });
});

export default subjectsOnClasses;
