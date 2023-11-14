import { useContext, createContext, useState, useEffect } from "react";
// import { AuthResponse } from "../types/types";
import { API_URL } from "./constants";

const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => {},
  saveUser: (userData) => {},
  getRefreshToken: () => {},
  getUser: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    checkAuth();
  }, []);

  async function requestNewAccessToken(refreshToken) {
    try {
      const response = await fetch(`${API_URL}/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const json = await response.json();
        if (json.error) {
          throw new Error(json.error);
        }
        return json.body.accessToken;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error("Error during requestNewAccessToken:", error.message);
      throw new Error("Error al solicitar un nuevo token de acceso");
    }
  }

  async function getUserInfo(accessToken) {
    try {
      const response = await fetch(`${API_URL}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        if (json.error) {
          throw new Error(json.error);
        }
        return json.body;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      throw new Error(error);
      return null;
    }
  }

  async function checkAuth() {
    if (accessToken) {
      // usuario autenticado
      const userInfo = await getUserInfo(accessToken);
      if (userInfo) {
        saveSessionInfo(userInfo, accessToken, getRefreshToken());
        setIsLoading(false);
        return;
      }
    } else {
      // usuario no autenticado
      const token = getRefreshToken();
      if (token) {
        try {
          const newAccessToken = await requestNewAccessToken(token);
          if (newAccessToken) {
            const userInfo = await getUserInfo(newAccessToken);
            if (userInfo) {
              saveSessionInfo(userInfo, newAccessToken, token);
              setIsLoading(false);
              return;
            }
          }
        } catch (error) {
          console.error("Error during checkAuth:", error.message);
        }
      }
    }
    setIsLoading(false);
  }

  function signOut() {
    setIsAuthenticated(false);
    setAccessToken("");
    setRefreshToken("");
    setUser(undefined);
    localStorage.removeItem("token");
  }

  function saveUser(userData) { 
    saveSessionInfo(
      userData.body.accessToken,
      userData.body.refreshToken
    );
    setUser(userData.body.user)
    setIsAuthenticated(true);
}

  function saveSessionInfo(accessToken, refreshToken) {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    localStorage.setItem("token", JSON.stringify({ refreshToken }));
  }

  function getAccessToken() {
    return accessToken;
  }
  function getRefreshToken() {
    if (!!refreshToken) {
      return refreshToken;
    }
    const tokenData = localStorage.getItem("token");
    if (tokenData) {
      const { refreshToken : storedRefreshToken } = JSON.parse(
        tokenData || "{}"
      );
      return storedRefreshToken;
    }
    return null;
  }

  function getUser() {
    return user;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        getAccessToken,
        saveUser,
        getRefreshToken,
        getUser,
        signOut,
      }}
    >
      {isLoading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
