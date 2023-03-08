import "./App.css";
import React from "react";

import { Form } from "./components/Form";
import { TodoItem } from "./components/TodoItem";

function App() {
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    async function getTodos() {
      const todosData = await Promise.resolve([
        {
          id: 1,
          task: "acheter du pain",
          done: true,
          created: Date.now(),
        },
        {
          id: 2,
          task: "faire de la soupe",
          done: false,
          created: Date.now(),
        },
        {
          id: 3,
          task: " couper les arbres",
          done: false,
          created: Date.now(),
        },
      ]);
      setTodos(todosData);
    }
    getTodos();
  }, []);

  //functions:
  function toggleTodo(id) {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        const changedTodo = {
          id: todo.id,
          task: todo.task,
          done: !todo.done, // change is happening here
          created: todo.created,
        };
        return changedTodo;
      }
      return todo;
    });
    setTodos(newTodos);
  } //end of toggleTodo

  function deleteTodo(id) {
    const deletedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(deletedTodos);
  }

  function addTodo(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const newTodo = {
      id: todos.length + 1,
      task: data.get("task"),
      done: false,
      created: Date.now(),
    };
    const addTodos = [...todos, newTodo];
    setTodos(addTodos);
    e.target.task.value = "";
  }

  //JSX
  return (
    <>
      <div>
        <h1>TO DO LIST APP</h1>
      </div>
      <Form handleSubmit={addTodo} />
      <ul>
        {todos.length
          ? todos
              .sort((a, b) => b.created - a.created)
              .map((todo) => {
                return (
                  <TodoItem
                    key={todo.id}
                    todoItem={todo}
                    toggleFn={toggleTodo}
                    deleteFn={deleteTodo}
                  />
                );
              })
          : null}
      </ul>
    </>
  );
}

export default App;

//components

// create a new component called todo.item
// function TodoItem({ todoItem, toggleFn, deleteFn }) {
//   return (
//     <li key={todoItem.id}>
//       <button onClick={() => toggleFn(todoItem.id)}>
//         {todoItem.done ? "done" : "X"}
//       </button>
//       <span>{todoItem.created}</span>
//       {todoItem.task}

//       <button onClick={() => deleteFn(todoItem.id)}>
//         <FiTrash />
//       </button>
//     </li>
//   );
// }
