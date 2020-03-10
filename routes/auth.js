var express = require("express");

var router = express.Router();

var utils = require("../utils");

/* POST returns a Signed JWT to authenticate with Verify Push API. */
router.post("/", function(req, res, next) {
  // As best practice we encourage don't use PII, to be sure we hash the identity value
  const identity = utils.generateSHA256(req.body.identity);

  let accessToken = utils.generateAccessToken({
    identity,
    factorType: "push",
    requireBiometrics: req.body.require_biometrics === "true",
    createFactors: true
  });

  res.append("Access-Control-Allow-Origin", "*");
  res.append("Access-Control-Allow-Methods", "GET,OPTIONS");

  res.status(200).json({ token: accessToken.toJwt() });
});

module.exports = router;
