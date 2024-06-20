// src/ToDo.js
import React from "react";

function ToDo({ task, deleteTask }) {
  return (
    <li>
      {task}
      <div>
        <button onClick={deleteTask}>Eliminar</button>
        <button onClick={deleteTask}>Editar</button>
        <button onClick={deleteTask}>Completado</button>
      </div>
    </li>
  );
}

export default ToDo;
