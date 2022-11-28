import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import ClassModel from "../class/Class";
import SubjectModel from "../subject/Subject";
const model = createModel((SubjectsOnClassesModel) => {
  SubjectsOnClassesModel.int("id", {
    raw: generatePrismaString({
      rawString: `#prisma 
        @id @default(autoincrement())
      `,
    }),
  })
    .map("subjects_on_classes")
    .relation("classes", ClassModel, {
      fields: ["classId"],
      references: ["id"],
    })
    .relation("subjects", SubjectModel, {
      fields: ["subjectId"],
      references: ["id"],
    })
    .int("classId", {
      map: "class_id",
    })
    .int("subjectId", {
      map: "subject_id",
    });
});

export default model;
