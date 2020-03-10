const Twilio = require('twilio');
const config = require('../config');

function AuthyGrant(options) {
  options = options || {};
  let serviceSid = options.serviceSid;
  let identity = options.identity;
	let resource = options.resource;

  return {
    key: 'api',
    toPayload: function() {
      return {
        authy_v1: [
          {
            "act":[
              "read",
              "create"
            ],
            "res":resource
          }
        ]
      };
    }
  }
}

function generateAccessToken(options) {
  const AccessToken = Twilio.jwt.AccessToken;

  const authyGrant = new AuthyGrant({
		...options,
    serviceSid: config.TWILIO_VERIFY_SERVICE_SID,
  });

  const accessToken = new AccessToken(
    config.TWILIO_ACCOUNT_SID,
    config.TWILIO_API_KEY,
    config.TWILIO_API_SECRET,
  );

  accessToken.addGrant(authyGrant);

	return accessToken;
}

module.exports = generateAccessToken;
