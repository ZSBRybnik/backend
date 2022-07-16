import { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import createEmailSender from "../../rest/utils/createEmailSender/createEmailSender";

const emailSenderClient: Transporter<SMTPTransport.SentMessageInfo> =
  createEmailSender({
    username: "aracely.davis26@ethereal.email",
    password: "gaRGE8KbMPTHbdBcXF",
  });

export default emailSenderClient;
