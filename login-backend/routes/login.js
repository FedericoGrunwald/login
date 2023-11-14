const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user");
const getUserInfo = require("../lib/getUserInfo") 
const router = require("express").Router();

router.post("/", async (req, res) => {
  const { userName, password } = req.body;

  if (!!!userName || !!!password) {
    return res
      .status(400)
      .json(jsonResponse(400, { error: "Fields are required" }));
  }

  const user = await User.findOne({ userName: userName });

  if (user) {
    const correctPassword = await user.comparePassword(password, user.password);

    if (correctPassword) {
      //autenticar usuario
      const accessToken = await user.createAccessToken();
      const refreshToken = await user.createRefreshToken();
      
      console.log({ accessToken, refreshToken });

      res
        .status(200)
        .json(
          jsonResponse(200, {
            user: getUserInfo(user),
            accessToken,
            refreshToken,
          })
        );
    } else {
      res.status(401).json(
        jsonResponse(401, {
          error: "User or password incorrect",
        })
      );
    }
  } else {
    res.status(401).json(
      jsonResponse(401, {
        error: "User not found",
      })
    );
  }
});

module.exports = router;
