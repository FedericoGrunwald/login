import { useAuth } from "../auth/AuthProvider.jsx";
import DefaultLayout from "../layout/DefaultLayout.jsx";
import { useState } from "react";
import {API_URL} from "../auth/constants.js"
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("")

  const auth = useAuth();
  const goTo = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          userName,
          password,
        }),
      });

      if (response.ok) {
        const json = (await response.json())
        console.log(json);
        console.log("User created seccessfully");
        setErrorResponse("")
        setUserName("");
        setPassword("");
        setName("");
        goTo("/");
      } else {
        const json = (await response.json())
        setErrorResponse(json.body.error);
      }
    } catch (error) {
      console.log(error)
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
          className="w-72 h-full flex flex-col border-2 border-blue-700 rounded-lg bg-blue-500"
        >
          <h1 className="flex justify-center bg-red-600 rounded-lg font-bold">{errorResponse}</h1>
          <h1 className="flex justify-center font-bold bg-white rounded-lg">
            Signup
          </h1>

          <label className="font-bold text-white"> Name</label>
          <input
            className="font-bold text-white border-2 border-white rounded-lg bg-blue-700"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label className="font-bold text-white">User Name</label>
          <input
            className="font-bold text-white border-2 border-white rounded-lg bg-blue-700"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <label className="font-bold text-white">Password</label>
          <input
            className="font-bold text-white border-2 border-white rounded-lg bg-blue-700"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="flex justify-center font-bold text-white border-2 border-white rounded-lg bg-blue-700">
            Create User
          </button>
        </form>
      </DefaultLayout>
    </>
  );
}
export default Signup;
