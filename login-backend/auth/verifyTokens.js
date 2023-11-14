const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyAccessToken(token) {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    console.error("Error verificando el token de acceso:", error.message);
    throw error;
  }
  
}
function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = { verifyAccessToken, verifyRefreshToken };
