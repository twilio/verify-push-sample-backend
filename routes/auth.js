var express = require("express");

var router = express.Router();

var utils = require("../utils");

var config = require("../config");

/* POST returns a Signed JWT to authenticate with Verify Push API. */
router.post("/", function(req, res, next) {
  // As best practice we encourage don't use PII, to be sure we hash the identity value
  const identityValue = req.body.identity;
  const identity = config.HASH_IDENTITY ? utils.generateSHA256(identityValue) : identityValue;

  let accessToken = utils.generateAccessToken({
    ...req.body,
    identity
  });

  res.append("Access-Control-Allow-Origin", "*");
  res.append("Access-Control-Allow-Methods", "GET,OPTIONS");

  res.status(200).json({ 
    token: accessToken.toJwt()
   });
});

module.exports = router;
