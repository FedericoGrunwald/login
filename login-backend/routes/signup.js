const { jsonResponse } = require("../lib/jsonResponse");

const router = require("express").Router();

router.post("/", (req, res) => {
  const { userName, name, password } = req.body;

  if (!!!userName || !!!name || !!!password) {
    return res
      .status(400)
      .json(jsonResponse(400, { error: "Fields are required" }));
  }

  //crear usuario
  res.status(200).json(jsonResponse(200, {message: "User created seccesfully"}))

  res.send("signup");
});

module.exports = router;
