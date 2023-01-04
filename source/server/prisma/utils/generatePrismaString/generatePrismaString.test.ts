import generatePrismaString from "./generatePrismaString";

const varCharAnnotation: string = "@database.VarChar(255)";

describe("generatePrismaString", (): void => {
  test("removes #prisma from the beginning of a string", (): void => {
    const rawString: string = `#prisma ${varCharAnnotation}`;
    const result: string = generatePrismaString({ rawString });
    expect(result).toEqual(varCharAnnotation);
  });
  test("trims whitespace from the resulting string", (): void => {
    const rawString: string = `#prisma  ${varCharAnnotation}  `;
    const result: string = generatePrismaString({ rawString });
    expect(result).toEqual(varCharAnnotation);
  });
  test("returns the original string if it does not start with #prisma", (): void => {
    const result: string = generatePrismaString({
      rawString: varCharAnnotation,
    });
    expect(result).toEqual(varCharAnnotation);
  });
});
