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

  const hashedIdentity = utils.generateSHA256(identity);

  const authKey = config.TWILIO_ACCOUNT_SID;
  const authToken = config.TWILIO_AUTH_TOKEN;

  const client = require("twilio")(authKey, authToken);

  const detailsJSONString = JSON.stringify({
    message,
    fields
  });

  const promise = client.authy
    .services(config.TWILIO_VERIFY_SERVICE_SID)
    .entities(hashedIdentity)
    .factors(factor_sid)
    .challenges.create({
      details: detailsJSONString
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

/* POST Create challenge. */
router.post("/:sid", function(req, res, next) {
  const { sid, factorSid, identity } = req.body;

  const authKey = config.TWILIO_ACCOUNT_SID;
  const authToken = config.TWILIO_AUTH_TOKEN;

  const client = require("twilio")(authKey, authToken);

  const promise = client.authy
    .services(config.TWILIO_VERIFY_SERVICE_SID)
    .entities(identity)
    .factors(factorSid)
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
