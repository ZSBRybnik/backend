import { scripts } from "~root/package.json";

export type ScriptsKeys = {
  [key in keyof typeof scripts]: keyof typeof scripts;
};

type ScriptsKeysNotTypedObject = { [key: string]: string };
type ScriptsKeysAsArray = ScriptsKeysNotTypedObject[];

const scriptsKeysAsArray: ScriptsKeysAsArray = Object.keys(scripts).map(
  (key: string): ScriptsKeysNotTypedObject => {
    return { [key]: key };
  },
);

const scriptsKeys: ScriptsKeys = Object.assign({}, ...scriptsKeysAsArray);

export default scriptsKeys;
