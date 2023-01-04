type GeneratePrismaStringArguments = {
  rawString: string;
};

const generatePrismaString = ({
  rawString,
}: GeneratePrismaStringArguments): string => {
  return rawString.replace("#prisma", "").trim();
};

export default generatePrismaString;
