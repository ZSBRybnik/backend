import type { PrismaEnum } from "schemix";
import { createEnum } from "schemix";
import RuntimeType from "~backend/source/server/constants/runtimeType/runtimeType";

const runtimeTypes: Set<RuntimeType> = new Set([
  RuntimeType.Classic,
  RuntimeType.Legacy,
]);

const schemixRuntimeTypeEnum: PrismaEnum = createEnum(
  (runtimeTypeEnum: PrismaEnum): void => {
    runtimeTypes.forEach((runtime: RuntimeType): void => {
      runtimeTypeEnum.addValue(runtime);
    });
  },
);

export default schemixRuntimeTypeEnum;
