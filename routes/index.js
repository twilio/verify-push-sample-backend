var express = require("express");
var qrcode = require("qrcode");

var router = express.Router();

var utils = require("../utils");

var config = require("../config");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Verify Push Factor Sample Backend" });
});

/* GET enroll page. */
router.get("/enroll", function(req, res, next) {
  res.render("enroll", { title: "Enroll Verify Push Factor" });
});

/* POST enroll page. */
router.post("/enroll", function(req, res, next) {
  const { identity, require_biometrics } = req.body;

  if (!identity) {
    next(new Error("Identity param is required"));
  }

  const hashedIdentity = config.HASH_IDENTITY ? utils.generateSHA256(identity) : identity;
  const factorType = "push"
  let accessToken = utils.generateAccessToken({
    identity: hashedIdentity,
    factorType,
    requireBiometrics: require_biometrics === "on",
    createFactors: true
  });

  const jwt = accessToken.toJwt();
  const uri = `authy://${factorType}?token=${jwt}&serviceSid=${config.TWILIO_VERIFY_SERVICE_SID}&identity=${identity}`

  qrcode.toDataURL(uri, function(err, url) {
    if (err) {
      next(err);
    }

    res.render("enroll", {
      title: "Enroll Verify Push Factor",
      qr: url,
      uri,
      jwt: utils.decodeJWTPayload(jwt)
    });
  });
});

module.exports = router;
