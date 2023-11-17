const { generateAccessToken } = require("../auth/generateTokens");
const getTokenFromHeader = require("../auth/getTokenFromHeader");
const { verifyRefreshToken } = require("../auth/verifyTokens");
const { jsonResponse } = require("../lib/jsonResponse");
const Token = require("../schema/token");
const log = require("../lib/trace");

const router = require("express").Router();

router.post("/", async (req, res) => {
  // log.info("POST /api/refresh-token");
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    console.log("No se proporcionó token de actualización");
    return res
      .status(401)
      .json({ error: "Token de actualización no proporcionado" });
  }

  try {
    if (!refreshToken) {
      throw new Error("Unauthorized");
    }

    const found = await Token.findOne({ token: refreshToken });

    if (!found) {
      return res.status(403).json({ error: "Token de actualización inválido" });
    }

    const payload = verifyRefreshToken(found.token);

    if (payload) {
      const accessToken = generateAccessToken(getUserInfo(payload.user));
      return res.status(200).json(jsonResponse(200, { accessToken }));
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    console.error("Error in refreshToken:", error);
    res.status(401).send(jsonResponse(401, { error: "Unauthorized" }));
  }
});

module.exports = router;
