import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

function Todos() {
  const [todos, setTodos] = useState([]); // List of todos
  const [newTodo, setNewTodo] = useState({ title: "", description: "" }); // Add form
  const [editTodo, setEditTodo] = useState({ id: null, title: "", description: "" }); // Edit form

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:5000/api/todos", {
      headers: { Authorization: localStorage.getItem("token") },
    });
    setTodos(res.data);
  };

  const addTodo = async () => {
    await axios.post("http://localhost:5000/api/todos", newTodo, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    setNewTodo({ title: "", description: "" });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    fetchTodos();
  };

  const startEdit = (todo) => {
    setEditTodo({ id: todo._id, title: todo.title, description: todo.description });
  };

  const saveEdit = async () => {
    await axios.put(
      `http://localhost:5000/api/todos/${editTodo.id}`,
      { title: editTodo.title, description: editTodo.description },
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    setEditTodo({ id: null, title: "", description: "" });
    fetchTodos();
  };

  const toggleStatus = async (todo) => {
    await axios.put(
      `http://localhost:5000/api/todos/${todo._id}`,
      { status: todo.status === "pending" ? "completed" : "pending" },
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Todos</h2>

      <div className="card p-3 shadow-sm mb-4">
        <input
          className="form-control mb-2"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
        />
        <button className="btn btn-primary w-100" onClick={addTodo}>
          Add Todo
        </button>
      </div>

      <ul className="list-group">
        {todos.map((todo) => (
          <li key={todo._id} className="list-group-item d-flex justify-content-between align-items-center">
            
            {editTodo.id === todo._id ? (
              <div className="w-100">
                <input
                  className="form-control mb-2"
                  value={editTodo.title}
                  onChange={(e) => setEditTodo({ ...editTodo, title: e.target.value })}
                />
                <input
                  className="form-control mb-2"
                  value={editTodo.description}
                  onChange={(e) => setEditTodo({ ...editTodo, description: e.target.value })}
                />
                <button className="btn btn-success me-2" onClick={saveEdit}>
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditTodo({ id: null, title: "", description: "" })}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span>
                  <b>{todo.title}</b> - {todo.description} -{" "}
                  <span className={`badge ${todo.status === "pending" ? "bg-warning text-dark" : "bg-success"}`}>
                    {todo.status}
                  </span>
                </span>

                <div>
                  <button className="btn btn-sm btn-info me-2" onClick={() => startEdit(todo)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger me-2" onClick={() => deleteTodo(todo._id)}>
                    Delete
                  </button>
                  <button className="btn btn-sm btn-outline-primary" onClick={() => toggleStatus(todo)}>
                    {todo.status === "pending" ? "Todo Completed" : "Todo Pending"}
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;


