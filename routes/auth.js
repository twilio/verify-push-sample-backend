var express = require('express');
var router = express.Router();

var generateAccessToken = require('../jwt');

/* POST returns a Signed JWT to authenticate with Verify Push API. */
router.get('/', function(req, res, next) {
	console.log(generateAccessToken);
	let accessToken = generateAccessToken({
		resource: req.body.resource
	});

	res.append("Access-Control-Allow-Origin", "*");
	res.append("Access-Control-Allow-Methods", "GET,OPTIONS");

  res.status(200).json({ token: accessToken.toJwt() })

});

module.exports = router;
