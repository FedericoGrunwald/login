function getUserInfo(user) {
  return {
    userName: user.userName,
    name: user.name,
    id: user.id || user._id,
  };
}
module.exports = getUserInfo;
