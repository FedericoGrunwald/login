import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider.jsx";
import DefaultLayout from "../layout/DefaultLayout.jsx";
import { useState } from "react";
import { API_URL } from "../auth/constants.js";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const [errorShown, setErrorShown] = useState(false);
  const auth = useAuth();
  const goTo = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      });

      if (response.ok) {
        console.log("Login seccessful");
        setErrorResponse("");
        const json = await response.json();
        if (json.body.accessToken && json.body.refreshToken) {
          auth.saveUser(json);
          goTo("/dashboard");
        }
      } else {
        console.log("Something went wrong");
        setErrorResponse("Fields are required!!");
        setErrorShown(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <>
      <DefaultLayout>
        <form
          onSubmit={handleSubmit}
          className="w-72 h-full flex flex-col border-2 border-teal-500 rounded-lg bg-teal-400 text-teal-400"
        >
          {errorShown && (
            <h1 className="flex justify-center  border-red-600 bg-red-700 rounded-lg font-bold">
              {errorResponse}
            </h1>
          )}

          <h1 className="flex justify-center font-bold bg-white rounded-lg">
            Login
          </h1>
          <label className="font-bold text-white">User Name</label>
          <input
            className="font-bold text-white border-2 border-white rounded-lg bg-teal-400"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <label className="font-bold text-white">Password</label>
          <input
            className="font-bold text-white border-2 border-white rounded-lg bg-teal-400"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="flex justify-center font-bold text-white border-2 border-white rounded-lg bg-teal-400 hover:bg-white hover:border-teal-300 hover:text-teal-400">
            Login
          </button>
        </form>
      </DefaultLayout>
    </>
  );
}
export default Login;
