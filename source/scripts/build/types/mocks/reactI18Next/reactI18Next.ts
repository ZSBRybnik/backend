export type MockedTranslationFunction = (key: string) => string;

export type MockedUseTranslationReturn = {
  t: MockedTranslationFunction;
};

export type MockedUseTranslation = () => MockedUseTranslationReturn;

type MockedReactI18Next = {
  useTranslation: MockedUseTranslation;
};

export default MockedReactI18Next;
