import { FunctionComponent, PropsWithChildren } from "react";
import { I18nextProvider } from "react-i18next";
import GlobalStyles from "../globalStyles/globalStyles";
import Header from "../header/header";

type EmailProperties = PropsWithChildren;

const Email: FunctionComponent<EmailProperties> = ({
  children,
}: EmailProperties): JSX.Element => {
  return (
    <I18nextProvider i18n={{} as any}>
      <GlobalStyles />
      <Header />
      {children}
    </I18nextProvider>
  );
};

export default Email;
