// src/App.js
import React, { useState } from 'react';
import ToDo from './ToDo';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
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
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nueva tarea"
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
