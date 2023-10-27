const { jsonResponse } = require("../lib/jsonResponse");

const router = require("express").Router();

router.post("/", (req, res) => {
  const { userName, password } = req.body;

  if (!!!userName || !!!password) {
    return res
      .status(400)
      .json(jsonResponse(400, { error: "Fields are required" }));
  }

  //autenticar usuario
  const accessToken = "access_token"
  const refreshToken = "refresh_token"
  const user = {
    id: "1",
    name: "Fede",
    userName: "Fedde",
  }
  
  res.status(200).json(jsonResponse(200, {user, accessToken, refreshToken}))

});

module.exports = router;
