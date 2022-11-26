type GeneratePrismaStringArguments = {
  rawString: string;
};

const generatePrismaString = ({ rawString }: GeneratePrismaStringArguments) => {
  return rawString.replace("#prisma", "").trim();
};

export default generatePrismaString;
