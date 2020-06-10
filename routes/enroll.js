var express = require("express");

var router = express.Router();

var utils = require("../utils");

var config = require("../config");

/* POST returns a Signed JWT to enroll with Verify Push API. */
router.post("/", function(req, res, next) {
  // As best practice we encourage don't use PII, to be sure we hash the identity value
  const identityValue = req.body.identity;
  const identity = config.HASH_IDENTITY ? utils.generateSHA256(identityValue) : identityValue;
  const factorType = "push"
  const serviceSid = config.TWILIO_VERIFY_SERVICE_SID

  const authKey = config.TWILIO_ACCOUNT_SID;
  const authToken = config.TWILIO_AUTH_TOKEN;

  const client = require("twilio")(authKey, authToken);
  var opts = {factorType};
  const promise = client.verify
    .services(serviceSid)
    .entities(identity)
    .accessTokens.create(opts);
  promise
    .then(accessToken => {
      res.status(200).send({ 
        token: accessToken.token, 
        serviceSid, 
        identity,
        factorType
       });
    
    })
    .catch(err => {
      console.log(err);
      res.setHeader('Content-Type', 'application/json');
      res.status(err.status).send(JSON.stringify(err, ["status", "message", "moreInfo", "code"]));
    });
});

module.exports = router;
