const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user")

const router = require("express").Router();

router.post("/", async (req, res) => {
  const { userName, name, password } = req.body;

  if (!!!userName || !!!name || !!!password) {
    return res
      .status(409)
      .json(jsonResponse(409, { error: "Fields are required" }));
  }

  //crear usuario
  // const user = new User({userName, name, password})
  try {
  const user = new User()
    const exists = await user.userNameExist(userName)

    if(exists){
      return res.status(409).json(jsonResponse(409, {error: "User Name already exists"}))
    }else{
      const newUser = new User({userName, name, password})
      newUser.save()
      res.status(200).json(jsonResponse(200, {message: "User created seccesfully"}))

    // res.send("signup");
    }
    
  } catch(error){
    res.status(500).json(jsonResponse(500, {
      error: "Error Creating User"
    }))
  }
  
});

module.exports = router;
