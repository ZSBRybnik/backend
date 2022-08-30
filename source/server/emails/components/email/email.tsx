import { useHookstate } from "@hookstate/core";
import { FunctionComponent, PropsWithChildren } from "react";
import { I18nextProvider } from "react-i18next";
import translationStore from "~backend/source/server/stores/translationStore/translationStore";
import GlobalStyles from "../globalStyles/globalStyles";
import Header from "../header/header";

type EmailProperties = PropsWithChildren;

const Email: FunctionComponent<EmailProperties> = ({
  children,
}: EmailProperties): JSX.Element => {
  const translation = useHookstate(translationStore);
  return (
    <I18nextProvider i18n={translation.get()}>
      <GlobalStyles />
      <Header />
      {children}
    </I18nextProvider>
  );
};

export default Email;
