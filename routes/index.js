var express = require("express");
var qrcode = require("qrcode");

var router = express.Router();

var utils = require("../utils");

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

  const hashedIdentity = utils.generateSHA256(identity);

  let accessToken = utils.generateAccessToken({
    identity: hashedIdentity,
    factorType: "push",
    requireBiometrics: require_biometrics === "on",
    createFactors: true
  });

  const jwt = accessToken.toJwt();

  qrcode.toDataURL(`authy://push?token=${jwt}`, function(err, url) {
    if (err) {
      next(err);
    }

    res.render("enroll", {
      title: "Enroll Verify Push Factor",
      qr: url,
      jwt: utils.decodeJWTPayload(jwt)
    });
  });
});

module.exports = router;
