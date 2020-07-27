var express = require("express");

var router = express.Router();

var utils = require("../utils");

/* POST returns an access token to create a factor with Verify Push API. */
router.post("/", function(req, res, next) {
  let promise = utils.generateAccessToken(req.body.identity);
  promise
    .then(accessToken => {
      res.status(200).send(accessToken);
    })
    .catch(err => {
      console.log(err);
      res.setHeader('Content-Type', 'application/json');
      res.status(err.status).send(JSON.stringify(err, ["status", "message", "moreInfo", "code"]));
    });
});

module.exports = router;
