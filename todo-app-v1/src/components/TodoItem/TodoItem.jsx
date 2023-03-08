import React from "react";
import { FiTrash } from "react-icons/fi";
import styles from "./TodoItem.module.css";

function TodoItem({ todoItem, toggleFn, deleteFn }) {
  const date = new Date(todoItem.created);

  return (
    <li className={styles.listItem} key={todoItem.id}>
      <div className={styles.doneBox}>
        <button onClick={() => toggleFn(todoItem.id)}>
          {todoItem.done ? "done" : "X"}
        </button>
      </div>
      <div className={styles.dateBox}>
        {date.toDateString() + "," + date.getHours() + ":" + date.getMinutes()}
      </div>
      <div className={styles.todoBox}>{todoItem.task}</div>
      <div className={styles.deleteBox}>
        <button onClick={() => deleteFn(todoItem.id)}>
          <FiTrash />
        </button>
      </div>
    </li>
  );
}

export { TodoItem };
