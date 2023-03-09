import React from "react";
import { FiTrash } from "react-icons/fi";
import { GrFormEdit } from "react-icons/gr";
import { MdDataSaverOn } from "react-icons/md";
import styles from "./TodoItem.module.css";

function TodoItem({ todoItem, toggleFn, deleteFn, editFn }) {
  const [editing, setEditing] = React.useState(false);
  const date = new Date(todoItem.created);
  console.log(editing);

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
      <div className={styles.todoBox}>
        {editing ? (
          <form onSubmit={(e) => editFn(e, setEditing)}>
            <input
              id="id_todo_id"
              name="todo_id"
              type="hidden"
              defaultValue={todoItem.id}
            />
            <input
              id="id_task"
              name="task"
              type="text"
              defaultValue={todoItem.task}
            />

            <button className={styles.button} type="submit">
              <MdDataSaverOn />
            </button>
          </form>
        ) : (
          <div>
            <span>{todoItem.task}</span>
            <button onClick={() => setEditing(true)}>
              <GrFormEdit />
            </button>
          </div>
        )}
      </div>
      <div className={styles.deleteBox}>
        <button onClick={() => deleteFn(todoItem.id)}>
          <FiTrash />
        </button>
      </div>
    </li>
  );
}

export { TodoItem };
