import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import PageCategoryModel from "../pageCategory/PageCategory";
import pageContentItemModel from "../pageContentItem/PageContentItem";

const pageModel = createModel((pageModel) => {
  pageModel
    .string("name", {
      unique: true,
      raw: generatePrismaString({
        rawString: `#prisma 
          @id @database.VarChar(255)
        `,
      }),
    })
    .relation("pages_content_items", pageContentItemModel, { list: true })
    .relation("pageCategory", PageCategoryModel, {
      list: true,
    })
    .string("title", {
      raw: generatePrismaString({
        rawString: `#prisma 
          @database.VarChar(255)
        `,
      }),
    })
    .map("pages");
});

export default pageModel;
