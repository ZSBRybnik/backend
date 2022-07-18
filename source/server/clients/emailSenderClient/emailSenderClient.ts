import { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import createEmailSender from "../../rest/utils/createEmailSender/createEmailSender";

const emailSenderClient: Transporter<SMTPTransport.SentMessageInfo> =
  createEmailSender({
    username: process.env.EMAIL || "",
    password: process.env.EMAIL_PASSWORD || "",
  });

export default emailSenderClient;
