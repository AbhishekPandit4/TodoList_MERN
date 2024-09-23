import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Delete from "./assets/delete.webp";
import Edit from "./assets/edit.png";


function App() {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    // Fetch tasks from the server when the component mounts
    axios
      .get("http://localhost:3000/tasks")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.log("Error fetching tasks:", error));
  }, []);

  const handleAddTodo = () => {
    if (editId) {
      axios
        .put(`http://localhost:3000/tasks/${editId}`, { taskName })
        .then((response) => {
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo._id === editId ? response.data : todo
            )
          );
          setEditId(null);
        })
        .catch((error) => console.log("Error updating task:", error));
    } else {
      axios
        .post("http://localhost:3000/tasks", { taskName })
        .then((response) => {
          setTodos((prevTodos) => [...prevTodos, response.data]);
        })
        .catch((error) => console.log("Error adding task:", error));
    }
    setTaskName("");
  };

  const handleEditTodo = (todo) => {
    setTaskName(todo.taskName);
    setEditId(todo._id);
  };

  const handleDeleteTodo = (id) => {
    axios
      .delete(`http://localhost:3000/tasks/${id}`)
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      })
      .catch((error) => console.log("Error deleting task:", error));
  };

  const handleToggleTodo = (id) => {
    const taskToUpdate = todos.find((todo) => todo._id === id);
    axios
      .put(`http://localhost:3000/tasks/${id}`, {
        isDone: !taskToUpdate.isDone,
      })
      .then((response) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo._id === id ? response.data : todo))
        );
      })
      .catch((error) => console.log("Error toggling task:", error));
  };

  return (
    <div className="container">
      <div>
        <div className="todo-container">
          <h1>Todo List</h1>
        </div>
        <div className="todo-input-container">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter a task"
            style={{ borderRadius: 10 }}
          />
          &nbsp;
          <button
            onClick={handleAddTodo}
            style={{ width: 100, borderRadius: 10 }}
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>
      </div>
      <br />
      <div className="todo-text-container">
        <ul style={{ listStyle: "none" }}>
          {todos.map((todo) => (
            <li
              key={todo._id}
              style={{ padding: 10 }}
              className={todo.isDone ? "completed" : ""}
            >
              <input
                type="checkbox"
                checked={todo.isDone}
                onChange={() => handleToggleTodo(todo._id)}
              />
              {todo.taskName}&nbsp;
              {/* <button
                onClick={() => handleEditTodo(todo)}
                style={{
                  width: 100,
                  borderRadius: 10,
                  backgroundColor: "yellow",
                }}
              >
                Edit
              </button> */}
              <img
                src={Edit}
                onClick={() => handleEditTodo(todo)}
                style={{ height: 30 }}
              />
              &nbsp;
              {/* <button
                onClick={() => handleDeleteTodo(todo._id)}
                style={{ width: 100, borderRadius: 10 }}
              >
                Delete
              </button> */}
              <img
                src={Delete}
                onClick={() => handleDeleteTodo(todo._id)}
                style={{ borderRadius: "50%", height: 30 }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
