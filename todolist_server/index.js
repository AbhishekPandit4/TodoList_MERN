const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./Model/TodolistModel");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/todo-list", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Add a new task
app.post("/tasks", async (req, res) => {
  const { taskName } = req.body;

  try {
    const newTask = new Task({ taskName });
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Edit a task
app.put("/tasks/:id", async (req, res) => {
  const { taskName, isDone } = req.body;

  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send("Task not found");

    task.taskName = taskName !== undefined ? taskName : task.taskName;
    task.isDone = isDone !== undefined ? isDone : task.isDone;

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Delete a task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).send("Task not found");
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).send("Server error");
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});