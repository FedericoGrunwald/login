const log = require("../lib/trace");
const { jsonResponse } = require("../lib/jsonResponse");
const getTokenFromHeader = require("./getTokenFromHeader");
const { verifyAccessToken } = require("./verifyTokens");

function authenticate(req, res, next) {
  let token = null;
  // log.info("headers", req.headers);
  try {
    token = getTokenFromHeader(req.headers);
  } catch (error) {
    log.error(error.message);
    if (error.message === "Token not provided") {
      return res.status(401).json({ error: "Token no proporcionado" });
    }
    if (error.message === "Token format invalid") {
      return res.status(401).json({ error: "Token mal formado" });
    }
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = { ...decoded.user };
    // log.info("Token verificado correctamente");
    next();
  } catch (err) {
    console.error("6 Token inválido", token, err);
    return res.status(401).json({ error: "Token inválido" });
  }
}
module.exports = authenticate;
