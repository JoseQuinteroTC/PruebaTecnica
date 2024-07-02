// src/ToDo.js
import React from 'react';

function ToDo({ task, deleteTask, editTask, toggleCompleted }) {
  return (
    <li style={{ backgroundColor: task.color, textDecoration: task.completed ? 'line-through' : 'none' }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={editTask}>Editar</button>
      <button onClick={deleteTask}>Eliminar</button>
      <button onClick={toggleCompleted}>
        {task.completed ? 'Desmarcar' : 'Completada'}
      </button>
    </li>
  );
}

export default ToDo;

