import { createEnum } from "schemix";

export enum RuntimeTypes {
  Classic = "classic",
  Legacy = "legacy",
}

const runtimeTypes: Set<RuntimeTypes> = new Set([
  RuntimeTypes.Classic,
  RuntimeTypes.Legacy,
]);

const runtimeType = createEnum((runtimeTypeEnum) => {
  runtimeTypes.forEach((runtime) => {
    runtimeTypeEnum.addValue(runtime);
  });
});

export default runtimeType;
