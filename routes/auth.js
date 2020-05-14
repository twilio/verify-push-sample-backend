var express = require("express");

var router = express.Router();

var utils = require("../utils");

/* POST returns a Signed JWT to authenticate with Verify Push API. */
router.post("/", function(req, res, next) {
  let accessToken = utils.generateAccessToken({
    ...req.body
  });

  res.append("Access-Control-Allow-Origin", "*");
  res.append("Access-Control-Allow-Methods", "GET,OPTIONS");

  res.status(200).json({ 
    token: accessToken.toJwt()
   });
});

module.exports = router;
