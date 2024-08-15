// src/ToDo.js
import React from 'react';

function ToDo({ task, editTask, deleteTask, toggleCompleted }) {
  return (
    <li className={`todo-item ${task.completed ? 'completed' : ''}`} style={{ backgroundColor: task.color }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={() => editTask(task)}>Editar</button>
      <button onClick={() => deleteTask(task._id)}>Eliminar</button>
      <button onClick={() => toggleCompleted(task._id)}>
  {task.completed ? 'Completada' : 'Pendiente'}
</button>

    </li>
  );
}

export default ToDo;

