// Copyright Twilio, inc. 2020. All Rights Reserved.
// Node module: verify-push-sample-backend',
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/verify-push-sample-backend/blob/main/LICENSE

var express = require("express");

var router = express.Router();

var config = require("../config");
var utils = require("../utils");

/* GET Challenge page. */
router.get("/", function(req, res, next) {
  res.render("challenges", { title: "Challenge Verify Push Factor" });
});

/* POST Create challenge. */
router.post("/", function(req, res, next) {
  const { identity, factor_sid, message, fields } = req.body;

  const hashedIdentity = config.HASH_IDENTITY ? utils.generateSHA256(identity) : identity;

  const authKey = config.TWILIO_ACCOUNT_SID;
  const authToken = config.TWILIO_AUTH_TOKEN;

  const client = require("twilio")(authKey, authToken);

  const promise = client.verify
    .services(config.TWILIO_VERIFY_SERVICE_SID)
    .entities(hashedIdentity)
    .challenges.create({
      factorSid: factor_sid,
      'details.message': message,
      'details.fields': fields
    });

  promise
    .then(challenge => {
      res.status(200).send(JSON.stringify(challenge));
    })
    .catch(err => {
      console.log(err);
      next(err.toJson());
    });
});

/* POST Get challenge. */
router.post("/:sid", function(req, res, next) {
  const { sid, factorSid, identity } = req.body;

  const authKey = config.TWILIO_ACCOUNT_SID;
  const authToken = config.TWILIO_AUTH_TOKEN;

  const client = require("twilio")(authKey, authToken);

  const promise = client.verify
    .services(config.TWILIO_VERIFY_SERVICE_SID)
    .entities(identity)
    .challenges(sid)
    .fetch();

  promise
    .then(challenge => {
      res.status(200).send(JSON.stringify(challenge));
    })
    .catch(err => {
      console.log(err);
      next(err.toJson());
    });
});

module.exports = router;
