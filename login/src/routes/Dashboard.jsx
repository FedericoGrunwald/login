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
        setTitle("");
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
        const errorData = await response.json();
        console.error("Error fetching todos:", errorData);
      }
    } catch (error) {
      console.error("Unexpected error fetching todos:", error);
    }
  }
  async function handleComplete(todoId) {
    try {
      const response = await fetch(`${API_URL}/todos/${todoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
        body: JSON.stringify({ completed: true }),
      });

      if (response.ok) {
        const updatedTodos = todos.map((todo) =>
          todo._id === todoId ? { ...todo, completed: true } : todo
        );
        setTodos(updatedTodos);
      } else {
      }
    } catch (error) {
      // Manejo de errores
    }
  }

  async function handleDelete(todoId) {
    try {
      const response = await fetch(`${API_URL}/todos/${todoId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
      });

      if (response.ok) {
        const updatedTodos = todos.filter((todo) => todo._id !== todoId);
        setTodos(updatedTodos);
      } else {
        // Manejar errores si es necesario
      }
    } catch (error) {
      // Manejar errores si es necesario
    }
  }

  async function handleDeleteCompleted() {
    try {
      const completedTodos = todos.filter((todo) => todo.completed);
      if (completedTodos.length === 0) {
        // No hay tareas completadas para eliminar
        return;
      }
      const todoIds = completedTodos.map((todo) => todo._id);
      const response = await fetch(`${API_URL}/todos`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
        body: JSON.stringify({ todoIds }),
      });

      if (response.ok) {
        const updatedTodos = todos.filter((todo) => !todo.completed);
        setTodos(updatedTodos);
      } else {
        // Manejar errores si es necesario
      }
    } catch (error) {
      // Manejar errores si es necesario
    }
  }

  return (
    <PortalLayout>
      <h1 className="font-bold m-4 text-white border-2 border-teal-500 bg-teal-400 rounded-lg">Dashboard de {auth.getUser()?.name || ""}</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="font-bold m-4 text-black border-2 border-teal-500 bg-white rounded-lg"
          type="text"
          placeholder="New Tasks..."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </form>
      {todos.map((todo) => (
        <div key={todo._id}>
          <span className="font-bold m-4 text-white border-2 border-green-500 bg-green-400 rounded-lg"
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          > {todo.title}
          </span>
          {!todo.completed && (
            <>
              <button className="font-bold m-4 text-white border-2 border-blue-500 bg-blue-600 rounded-lg" 
                onClick={() => handleComplete(todo._id)}> Completed
              </button>
              <button  className="font-bold m-4 text-white border-2 border-red-600 bg-red-700 rounded-lg" onClick={() => handleDelete(todo._id)}> Delete</button>
            </>
          )}
        </div>
      ))}
      <button className="font-bold m-4 text-white border-2 border-red-600 bg-red-700 rounded-lg" onClick={handleDeleteCompleted}>
        {" "}
        Delete Completed Tasks
      </button>
    </PortalLayout>
  );
}
export default Dashboard;
