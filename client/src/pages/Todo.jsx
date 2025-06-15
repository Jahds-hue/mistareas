import React from "react";

export default function Todo({ todo, setTodos }) {
  const token = localStorage.getItem("token");

  const updateTodo = async (todoId, currentStatus) => {
    try {
      const res = await fetch(`/api/todos/${todoId}`, {
        method: "PUT",
        body: JSON.stringify({ status: currentStatus }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const updated = await res.json();

      if (updated && updated._id) {
        // Actualiza visualmente el estado en la interfaz
        setTodos((prevTodos) =>
          prevTodos.map((t) =>
            t._id === todoId ? { ...t, status: !currentStatus } : t
          )
        );
      }
    } catch (err) {
      console.error(" Error al actualizar tarea:", err);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      const res = await fetch(`/api/todos/${todoId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data?.acknowledged) {
        // Elimina visualmente la tarea sin recargar
        setTodos((prevTodos) => prevTodos.filter((t) => t._id !== todoId));
      } else {
        console.warn("⚠ No se pudo eliminar la tarea");
      }
    } catch (err) {
      console.error("❌ Error al eliminar tarea:", err);
    }
  };

  return (
    <div className="todo">
      <p>{todo.todo}</p>
      <div className="mutations">
        <button
          className="todo__status"
          onClick={() => updateTodo(todo._id, todo.status)}
        >
          {todo.status ? "☑" : "☐"}
        </button>
        <button
          className="todo__delete"
          onClick={() => deleteTodo(todo._id)}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
