import twilio, { Twilio } from "twilio";

const twilioClient: Twilio = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN,
);

export default twilioClient;
