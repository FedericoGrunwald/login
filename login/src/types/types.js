export const AuthResponse = {
  body: {
    user,
    accessToken,
    refreshToken,
  },
};
export const AuthResponseError = {
  body: {
    error: string,
  },
};
export const User = {
  id,
  name,
  userName,
};

export default types;
