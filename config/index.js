require("dotenv").config();

module.exports = {
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_VERIFY_SERVICE_SID: process.env.TWILIO_VERIFY_SERVICE_SID,
  HASH_IDENTITY: (process.env.HASH_IDENTITY || "true") === "true",
  BACKEND_BASE_URL: process.env.BACKEND_BASE_URL
};
