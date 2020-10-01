// Copyright Twilio, inc. 2020. All Rights Reserved.
// Node module: verify-push-sample-backend',
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/verify-push-sample-backend/blob/main/LICENSE

var express = require("express");
var twilio = require("twilio");

var router = express.Router();

var utils = require("../utils");

var config = require("../config");

/* POST returns a Signed JWT to enroll with Verify Push API. */
router.post("/", twilio.webhook({ url: config.BACKEND_BASE_URL }), function(req, res, next) {
	console.log('request_body', req.body);

	res.status(200).send({
		body: req.body
	});
});

module.exports = router;
