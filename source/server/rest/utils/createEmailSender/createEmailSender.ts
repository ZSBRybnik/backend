import { createTransport } from "nodemailer";

type CreateEmailSenderArguments = {
  username: string;
  password: string;
};

const createEmailSender = ({ username }: CreateEmailSenderArguments) => {
  return createTransport({
    service: "gmail",
    auth: { user: username, type: "OAuth2" },
    secure: true,
  });
  /* transporter.set("oauth2_provision_cb", (user, renew, callback) => {
    const accessToken = userTokens[user];
    if (accessToken) {
      return callback(null, accessToken);
    } else {
      return callback(new Error("Unknown user"));
   / }
  });*/
};
export default createEmailSender;
