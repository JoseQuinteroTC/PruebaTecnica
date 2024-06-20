import React, { useState } from 'react';
import ToDo from './ToDo';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', color: '#ffffff' });

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.title.trim() !== '' && newTask.description.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask({ title: '', description: '', color: '#ffffff' });
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

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
        <button type="submit">Añadir</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <ToDo key={index} task={task} deleteTask={() => deleteTask(index)} />
        ))}
      </ul>
    </div>
  );
}

export default App;
