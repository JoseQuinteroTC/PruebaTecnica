import React, { useState, useEffect } from "react";
import ToDo from "./ToDo";
import "./App.css";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    color: "#ffffff",
    completed: false,
  });
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [filter, setFilter] = useState("all"); // Estado para el filtro

  useEffect(() => {
    // Realiza una petición GET para obtener todas las tareas
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener las tareas:", error);
      });
  }, []);

  const editTask = (task) => {
    setNewTask({
      title: task.title,
      description: task.description,
      color: task.color,
      completed: task.completed,
    });
    setEditingTaskIndex(task._id); // Guardar el ID de la tarea que se está editando
  };

  // Llamar a la función de editar cuando se envíe el formulario
  const addTask = (e) => {
    e.preventDefault();
    if (newTask.title.trim() !== "" && newTask.description.trim() !== "") {
      if (editingTaskIndex !== null) {
        // Editar tarea existente
        axios
          .put(`http://localhost:5000/tasks/${editingTaskIndex}`, newTask)
          .then((response) => {
            const updatedTasks = tasks.map((task) =>
              task._id === editingTaskIndex ? response.data : task
            );
            setTasks(updatedTasks);
            setNewTask({
              title: "",
              description: "",
              color: "#ffffff",
              completed: false,
            });
            setEditingTaskIndex(null); // Restablecer el estado de edición
          })
          .catch((error) => {
            console.error("Hubo un error al actualizar la tarea:", error);
          });
      } else {
        // Crear nueva tarea
        axios
          .post("http://localhost:5000/tasks", newTask)
          .then((response) => {
            setTasks([...tasks, response.data]);
            setNewTask({
              title: "",
              description: "",
              color: "#ffffff",
              completed: false,
            });
          })
          .catch((error) => {
            console.error("Hubo un error al crear la tarea:", error);
          });
      }
    }
  };

  const deleteTask = (taskId) => {
    axios
      .delete(`http://localhost:5000/tasks/${taskId}`)
      .then((response) => {
        // Filtra la tarea eliminada del estado actual
        const updatedTasks = tasks.filter((task) => task._id !== taskId);
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar la tarea:", error);
      });
  };

  const toggleCompleted = (taskId) => {
    axios.patch(`http://localhost:5000/tasks/${taskId}/toggle-completed`)
      .then(response => {
        const updatedTasks = tasks.map(task =>
          task._id === taskId ? response.data : task
        );
        setTasks(updatedTasks);
      })
      .catch(error => {
        console.error('Hubo un error al marcar la tarea como completada/pendiente:', error);
      });
  };
  

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="App">
      <h1>To-Do List</h1>
      
      <form onSubmit={addTask}>
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Título de la tarea"
        />
        <textarea
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          placeholder="Descripción de la tarea"
        />
        <input
          type="color"
          value={newTask.color}
          onChange={(e) => setNewTask({ ...newTask, color: e.target.value })}
        />
        <button type="submit">
          {editingTaskIndex !== null ? "Guardar" : "Añadir"}
        </button>
      </form>

      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>Todas</button>
        <button onClick={() => setFilter("pending")}>Pendientes</button>
        <button onClick={() => setFilter("completed")}>Completadas</button>
      </div>

      <ul>
        {filteredTasks.map((task, index) => (
          <ToDo
            key={task._id}
            task={task}
            editTask={() => editTask(task)}
            deleteTask={() => deleteTask(task._id)}
            toggleCompleted={() => toggleCompleted(task._id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
