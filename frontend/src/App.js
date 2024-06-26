import React, { useState } from 'react';
import ToDo from './ToDo';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', color: '#ffffff', completed: false });
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [filter, setFilter] = useState('all'); // Estado para el filtro

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.title.trim() !== '' && newTask.description.trim() !== '') {
      if (editingTaskIndex !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[editingTaskIndex] = newTask;
        setTasks(updatedTasks);
        setEditingTaskIndex(null);
      } else {
        setTasks([...tasks, newTask]);
      }
      setNewTask({ title: '', description: '', color: '#ffffff', completed: false });
    }
  };

  const deleteTask = (index) => {
    if (editingTaskIndex === index) {
      setEditingTaskIndex(null);
      setNewTask({ title: '', description: '', color: '#ffffff', completed: false });
    }
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    setNewTask(tasks[index]);
    setEditingTaskIndex(index);
  };

  const toggleCompleted = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
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
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          placeholder="Descripción de la tarea"
        />
        <input
          type="color"
          value={newTask.color}
          onChange={(e) => setNewTask({ ...newTask, color: e.target.value })}
        />
        <button type="submit">{editingTaskIndex !== null ? 'Actualizar' : 'Añadir'}</button>
      </form>

      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>Todas</button>
        <button onClick={() => setFilter('pending')}>Pendientes</button>
        <button onClick={() => setFilter('completed')}>Completadas</button>
      </div>

      <ul>
        {filteredTasks.map((task, index) => (
          <ToDo
            key={index}
            task={task}
            editTask={() => editTask(index)}
            deleteTask={() => deleteTask(index)}
            toggleCompleted={() => toggleCompleted(index)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
