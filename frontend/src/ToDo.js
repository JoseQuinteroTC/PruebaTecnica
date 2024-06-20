import React from 'react';

function ToDo({ task, deleteTask, editTask }) {
  return (
    <li style={{ backgroundColor: task.color }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={editTask}>Completado</button>
      <button onClick={editTask}>Editar</button>
      <button onClick={deleteTask}>Eliminar</button>
    </li>
  );
}

export default ToDo;
