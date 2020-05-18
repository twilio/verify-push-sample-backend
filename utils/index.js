const Twilio = require("twilio");
const config = require("../config");
var crypto = require("crypto");

function AuthyGrant(opts) {
  opts = opts || {};

  paths = ["/Services"];
  action = opts.action

  if (opts.serviceSid) {
    paths.push(opts.serviceSid);
  }

  if (opts.factorSid) {
    if (opts.identity) {
      paths.push("Entities");
      paths.push(opts.identity);
    }
    paths.push("Factors");
    if (opts.factorSid !== "*") {
      paths.push(opts.factorSid);
    }
  }

  if (opts.challengeSid) {
    paths.push("Challenges");
    if (opts.challengeSid !== "*") {
      paths.push(opts.challengeSid);
    }
  }

  let resource = paths.join("/");

  return {
    key: "api",
    toPayload: function() {
      return {
        verify_v2: [
          {
            act: [action],
            res: resource
          }
        ]
      };
    }
  };
}

function VerifyGrant(options) {
  options = options || {};
  let factor = options.factorType;
  let identity = options.identity;
  let require_biometrics = options.requireBiometrics;

  return {
    key: "verify",
    toPayload: function() {
      return {
        identity,
        factor,
        require_biometrics
      };
    }
  };
}

function generateAccessToken(options) {
  const AccessToken = Twilio.jwt.AccessToken;

  const authyGrant = new AuthyGrant({
    ...options
  });

  const verifyGrant = new VerifyGrant({
    ...options
  });

  const accessToken = new AccessToken(
    config.TWILIO_ACCOUNT_SID,
    config.TWILIO_API_KEY,
    config.TWILIO_API_SECRET
  );

  accessToken.addGrant(authyGrant);
  accessToken.addGrant(verifyGrant);

  return accessToken;
}

function generateSHA256(input) {
  return crypto
    .createHash("sha256")
    .update(input)
    .digest("hex");
}

function decodeJWTPayload(input) {
  let jwt = input.split(".");
  let buff = new Buffer(jwt[1], "base64");
  let payload = JSON.parse(buff.toString("ascii"));

  buff = new Buffer(jwt[0], "base64");
  let header = JSON.parse(buff.toString("ascii"));

  return { header, payload };
}

var utils = {
  generateAccessToken,
  generateSHA256,
  decodeJWTPayload
};

module.exports = utils;
