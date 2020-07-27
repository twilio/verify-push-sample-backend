var crypto = require("crypto");
var config = require("../config");

function generateSHA256(input) {
  return crypto
    .createHash("sha256")
    .update(input)
    .digest("hex");
}

function generateAccessToken(identityValue) {
  // As best practice we encourage don't use PII, to be sure we hash the identity value
  const identity = config.HASH_IDENTITY ? utils.generateSHA256(identityValue) : identityValue;
  const factorType = "push"
  const serviceSid = config.TWILIO_VERIFY_SERVICE_SID

  const authKey = config.TWILIO_ACCOUNT_SID;
  const authToken = config.TWILIO_AUTH_TOKEN;

  const client = require("twilio")(authKey, authToken);
  var opts = {factorType, identity};
  const promise = client.verify
    .services(serviceSid)
    .accessTokens.create(opts);
  return promise
    .then(function(accessToken) {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve({ 
          token: accessToken.token,
          serviceSid,
          identity,
          factorType
        }), 1000);
      });
    });
}

var utils = {
  generateSHA256,
  generateAccessToken
};

module.exports = utils;
