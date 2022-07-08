type GetTargetVersionArguments = {
  targetToModern: boolean;
};

const getTargetVersion = ({ targetToModern }: GetTargetVersionArguments) => {
  return targetToModern
    ? "last 2 Chrome versions, last 2 Firefox versions, not Firefox < 60, not Chrome < 60"
    : "> 0.25%, not dead";
};

export default getTargetVersion;
