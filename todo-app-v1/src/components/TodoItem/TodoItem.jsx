import React from "react";
import { FiTrash } from "react-icons/fi";

function TodoItem({ todoItem, toggleFn, deleteFn }) {
  return (
    <li key={todoItem.id}>
      <button onClick={() => toggleFn(todoItem.id)}>
        {todoItem.done ? "done" : "X"}
      </button>
      <span>{todoItem.created}</span>
      {todoItem.task}

      <button onClick={() => deleteFn(todoItem.id)}>
        <FiTrash />
      </button>
    </li>
  );
}

export { TodoItem };
