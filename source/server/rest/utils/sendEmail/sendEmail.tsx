import { NextFunction } from "express";
import { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { renderEmail } from "react-html-email";
import Response from "../../types/response/response";

type SendEmailArguments = {
  instance: Transporter<SMTPTransport.SentMessageInfo>;
  to: string;
  subject: string;
  html: JSX.Element;
  response: Response;
  next: NextFunction;
};

const sendEmail = async ({
  response,
  next,
  instance,
  subject,
  to,
  html,
}: SendEmailArguments): Promise<void> => {
  try {
    await instance.sendMail({
      from: "zsbrybnik@gmail.com",
      to,
      subject,
      html: renderEmail(html),
    });
  } catch {
    response.sendStatus(500);
    return next();
  }
};
export default sendEmail;
