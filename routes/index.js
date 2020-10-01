// Copyright Twilio, inc. 2020. All Rights Reserved.
// Node module: verify-push-sample-backend',
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/verify-push-sample-backend/blob/main/LICENSE

var express = require("express");
var qrcode = require("qrcode");

var router = express.Router();

var utils = require("../utils");

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

  let promise = utils.generateAccessToken(identity);
  promise
    .then(accessToken => {
      const uri = `authy://${accessToken.factorType}?token=${accessToken.token}&serviceSid=${accessToken.serviceSid}&identity=${accessToken.identity}`
      qrcode.toDataURL(uri, function(err, url) {
        if (err) {
          next(err);
        }
        res.render("enrollment", {
          title: "Enrollment for Verify Push Factor",
          qr: url,
          uri
        });
      });
    })
    .catch(err => {
      console.log(err);
      next(err)
    });
});

module.exports = router;
