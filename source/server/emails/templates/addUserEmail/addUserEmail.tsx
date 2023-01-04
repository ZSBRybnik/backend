import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import Email from "../../components/email/email";

type AddUserEmailProperties = {
  password: string;
  qrCode: string;
  login: string;
};

const AddUserEmail: FunctionComponent<AddUserEmailProperties> = ({
  password,
  login,
  qrCode,
}) => {
  const { t } = useTranslation("adUserEmail");
  return (
    <Email>
      <h2>{t("header")}</h2>
      <div>
        {t("data", {
          login,
          password,
        })}
      </div>
      <img src={qrCode} width="200px" height="200px" />
    </Email>
  );
};

export default AddUserEmail;
