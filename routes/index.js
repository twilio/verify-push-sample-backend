var express = require("express");
var qrcode = require("qrcode");

var router = express.Router();

var utils = require("../utils");

var config = require("../config");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Verify Push Factor Sample Backend" });
});

/* GET enrollment page. */
router.get("/enrollment", function(req, res, next) {
  res.render("enrollment", { title: "Enrollment for Verify Push Factor" });
});

/* POST enrollment page. */
router.post("/enrollment", function(req, res, next) {
  const { identity, require_biometrics } = req.body;

  if (!identity) {
    next(new Error("Identity param is required"));
  }

  const hashedIdentity = config.HASH_IDENTITY ? utils.generateSHA256(identity) : identity;
  const factorType = "push"
  const serviceSid = config.TWILIO_VERIFY_SERVICE_SID
  let accessToken = utils.generateAccessToken({
    serviceSid,
    identity: hashedIdentity,
    factorType,
    requireBiometrics: require_biometrics === "on",
    action: "create",
    factorSid: "*"
  });

  const jwt = accessToken.toJwt();
  const uri = `authy://${factorType}?token=${jwt}&serviceSid=${serviceSid}&identity=${identity}`

  qrcode.toDataURL(uri, function(err, url) {
    if (err) {
      next(err);
    }

    res.render("enrollment", {
      title: "Enrollment for Verify Push Factor",
      qr: url,
      uri,
      jwt: utils.decodeJWTPayload(jwt)
    });
  });
});

module.exports = router;
