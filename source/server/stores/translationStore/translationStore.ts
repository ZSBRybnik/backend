import { hookstate } from "@hookstate/core";
import initializeTranslations from "../../utils/initializeTranslation/initializeTranslation";

const translationStore = hookstate(await initializeTranslations());

export default translationStore;
