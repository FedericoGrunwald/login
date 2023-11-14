const { jsonResponse } = require("../lib/jsonResponse");
const log = require("../lib/trace");
const router = require("express").Router();

router.get("/", async (req, res, next) => {
  log.info("user", req.user);
  res.status(200).json(jsonResponse(200, req.user))
});

module.exports = router;
