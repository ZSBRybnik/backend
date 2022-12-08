import { createModel } from "schemix";
import ClassModel from "../class/Class";
import subjectModel from "../subject/Subject";

const model = createModel((SubjectsOnClassesModel) => {
  SubjectsOnClassesModel.id({
    fields: ["classId", "subjectId"],
  })
    .map("subjects_on_classes")
    .relation("classes", ClassModel, {
      fields: ["classId"],
      references: ["id"],
    })
    .relation("subjects", subjectModel, {
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
