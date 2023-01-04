import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import SchoolClassModel from "../schoolClass/SchoolClass";
import SubjectModel from "../subject/Subject";

const subjectsOnClasses = createModel((SubjectsOnClassesModel) => {
  SubjectsOnClassesModel.string("mongo_id", {
    map: "_id",
    id: true,
    raw: generatePrismaString({
      rawString: `#prisma 
        @default(auto()) @database.ObjectId
      `,
    }),
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
