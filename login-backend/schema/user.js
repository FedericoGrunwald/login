const Mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../auth/generateTokens");

const getUserInfo = require("../lib/getUserInfo");
const Token = require("../schema/token");

const UserSchema = new Mongoose.Schema({
  id: { type: Object },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

UserSchema.pre("save", function (next) {
  if (this.isModified("password") || this.isNew) {
    const document = this;

    bcrypt.hash(document.password, 10, (err, hash) => {
      if (err) {
        next(err);
      } else {
        document.password = hash;
        next();
      }
    });
  } else {
    next();
  }
});

UserSchema.methods.userNameExist = async function (userName) {
  const result = await Mongoose.model("User").findOne({ userName: userName });

  return !!result;
};

UserSchema.methods.comparePassword = async function (password, hash) {
  const same = await bcrypt.compare(password, hash);
  return same;
};

UserSchema.methods.createAccessToken = function () {
  return generateAccessToken(getUserInfo(this));
};
UserSchema.methods.createRefreshToken = async function (next) {
  const refreshToken = generateRefreshToken(getUserInfo(this));
  console.error("refreshToken");
  try {
    await new Token({ token: refreshToken }).save();
    console.log("Token saved");
    return refreshToken;
  } catch (error) {
    console.error(error);
  }
};

module.exports = Mongoose.model("User", UserSchema);
