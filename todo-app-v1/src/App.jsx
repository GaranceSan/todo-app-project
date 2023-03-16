import "./App.css";
import React from "react";

import { Form } from "./components/Form";
import { TodoItem } from "./components/TodoItem";

function App() {
  const [todos, setTodos] = React.useState([]);
  const [taskErrors, setTaskErrors] = React.useState({
    task: [],
  });

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

  function handleTaskFocus() {
    setTaskErrors({ task: [] });
  }

  function addTodo(e) {
    e.preventDefault();
    const form = e.target;
    const inputs = form.elements; // HTMLFormControlsCollection
    const taskInput = inputs[0];
    console.log(taskInput.validity); //check ValidityState
    console.log(taskInput.validity.valid); //check ValidityState.valid

    const data = new FormData(form);
    const task = data.get("task");
    if (taskInput.validity.valid) {
      const newTodo = {
        id: todos.length + 1,
        task,
        done: false,
        created: Date.now(),
      };
      const addTodos = [...todos, newTodo];
      setTodos(addTodos);
      e.target.task.value = "";
    } else {
      //has errors
      //check what kind of validity error on Validity State
      if (taskInput.validity.valueMissing) {
        console.log("here");
        const newTaskErrors = {
          task: ["Please fill in a task"],
        };
        setTaskErrors(newTaskErrors);
      }
    }
  } // addTodo

  function modifyTodo(e, setEditing) {
    e.preventDefault();
    const data = new FormData(e.target);
    const updatedtask = data.get("task");
    const id = data.get("todo_id");
    const newTodos = todos.map((todo) => {
      if (todo.id === Number(id)) {
        const changedTodo = {
          id: todo.id,
          task: updatedtask,
          done: todo.done,
          created: todo.created,
        };
        return changedTodo;
      }
      return todo;
    });
    setTodos(newTodos);
    setEditing(false);
  }

  //JSX
  return (
    <>
      <div class="app-wrapper">
        <div>
          <h1>TO DO LIST APP</h1>
        </div>
        <Form
          handleSubmit={addTodo}
          formErrors={taskErrors}
          taskFocus={handleTaskFocus}
        />
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
                      editFn={modifyTodo}
                    />
                  );
                })
            : null}
        </ul>
      </div>
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
