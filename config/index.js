require("dotenv").config();

module.exports = {
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_API_KEY: process.env.TWILIO_API_KEY,
  TWILIO_API_SECRET: process.env.TWILIO_API_SECRET,
  TWILIO_VERIFY_SERVICE_SID: process.env.TWILIO_VERIFY_SERVICE_SID
};
