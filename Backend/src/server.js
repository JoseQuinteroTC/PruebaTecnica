const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
  color: String,
});

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/todoApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the To-Do List API");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const Task = mongoose.model("Task", taskSchema);

// Get All task
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Create a task

app.post("/tasks", async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
});

// Get a Single task
app.get("/tasks/:id", async (req, res) => {
  const findTask = await Task.findById(req.params.id);
  res.json(findTask);
});

// Update a task
app.put("/tasks/:id", async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true,});
  res.json(updatedTask);
});

// Delete a task
app.delete("/tasks/:id",async (req, res) => {
    const updatedTask = await Task.findByIdAndDelete(req.params.id, req.body);
    res.json(updatedTask);
});

app.patch("/tasks/:id/toggle-completed", async (req, res) => {
  try {
    // Encuentra la tarea por su ID y cambia su estado `completed` al opuesto
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    task.completed = !task.completed; // Cambia el estado de `completed`
    const updatedTask = await task.save(); // Guarda la tarea actualizada

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la tarea' });
  }
});

