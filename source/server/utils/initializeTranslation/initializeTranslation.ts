import translation, {
  i18n as TranslationType,
  InitOptions,
  ThirdPartyModule,
} from "i18next";
import chainedBackend from "i18next-chained-backend";

type SetupTranslationArguments = {
  modules: ThirdPartyModule[];
  translation: TranslationType;
  options: InitOptions;
};

const setupTranslation = async ({
  modules,
  translation,
  options,
}: SetupTranslationArguments) => {
  modules.forEach((module) => {
    translation = translation.use(module);
  });
  await translation.init(options);
  return translation;
};

const initializeTranslations = async () => {
  return await setupTranslation({
    translation,
    options: {
      load: "languageOnly",
      fallbackLng: "en",
      interpolation: { escapeValue: false },
    },
    modules: [chainedBackend as unknown as ThirdPartyModule],
  });
};

export default initializeTranslations;
