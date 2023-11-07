import { useAuth } from "../auth/AuthProvider";
import { useEffect, useState } from "react";
import { API_URL } from "../auth/constants";
import PortalLayout from "../layout/PortalLayout";

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const auth = useAuth();

  useEffect(() => {
    loadTodos();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    crearteTodo();
  }
  async function crearteTodo() {
    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
        body: JSON.stringify({
          title,
        }),
      });
      if (response.ok) {
        const json = await response.json();
        setTodos([json, ...todos]);
      } else {
        //error
      }
    } catch (error) {}
  }

  async function loadTodos() {
    try {
      const response = await fetch(`${API_URL}/todos`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        setTodos(json);
      } else {
        //mostrar error
      }

      const data = await response.json();
      setTodos(data);
    } catch (error) {}
  }

  return (
    <PortalLayout>
      <h1>Dashboard de {auth.getUser()?.name || ""}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nuevo Todo..."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </form>
      {todos.map((todo) => (
        <div key={todo._id}>{todo.title}</div>
      ))}
    </PortalLayout>
  );
}
export default Dashboard;
