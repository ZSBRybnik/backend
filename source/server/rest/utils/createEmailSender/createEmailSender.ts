import { createTransport } from "nodemailer";

export type CreateEmailSenderArguments = {
  username: string;
  password: string;
};

const createEmailSender = () => {
  return createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    //service: "gmail",
    //auth: { user: username, type: "OAuth2" },
    auth: {
      user: "aracely.davis26@ethereal.email",
      pass: "gaRGE8KbMPTHbdBcXF",
    },
    secure: false,
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
