import React from "react";

function TaskList({ tasks }) {
  return (
    <>
      <h2>Liste :</h2>
      <ul>
        {tasks
          ? tasks.map((taskItem) => {
              return (
                <li key={taskItem.id}>
                  <span>{taskItem.done ? "done" : "X"}</span>
                  <span>{taskItem.created}</span>
                  {taskItem.task}
                </li>
              );
            })
          : null}
      </ul>
    </>
  );
}

export { TaskList };
