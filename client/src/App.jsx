import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Todo from "./pages/Todo";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    async function getTodos() {
      try {
        const res = await fetch("/api/todos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("No autorizado");

        const todos = await res.json();
        setTodos(todos);
      } catch (err) {
        console.error("Error:", err);
        navigate("/login");
      }
    }

    getTodos();
  }, [navigate, token]);

  const createNewTodo = async (e) => {
    e.preventDefault();
    if (content.length > 3) {
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ todo: content }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const newTodo = await res.json();

      setContent("");
      setTodos([...todos, newTodo]);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <main className="container">
      <h1 className="title">Mis tareas</h1>
      <form className="form" onSubmit={createNewTodo}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escriba una tarea"
          className="form__input"
          required
        />
        <button className="form__button" type="submit">Crear</button>
        <button type="button" className="form__button logout" onClick={logout}>Salir</button>
      </form>
      <div className="todos">
        {todos.length > 0 &&
          todos.map((todo) => (
            <Todo key={todo._id} todo={todo} setTodos={setTodos} />
          ))}
      </div>
    </main>
  );
}

