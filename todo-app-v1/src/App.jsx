import "./App.css";
import React from "react";

import { Form } from "./components/Form";
import { TodoItem } from "./components/TodoItem";

const KEY = "__todos__";

// function getTodos() {
//   const savedTodos = localStorage.getItem(KEY);
//   console.log("todos", savedTodos);
//   return savedTodos ? JSON.parse(savedTodos) : [];
// }

function App() {
  const [todos, setTodos] = React.useState([]);
  const [taskErrors, setTaskErrors] = React.useState({
    task: [],
  });

  React.useEffect(() => {
    async function getTodos() {
      try {
        const response = await fetch("http://127.0.0.1:8000/todos/");
        const data = await response.json();
        //not dealing with error yet to that point
        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    }
    getTodos();
  }, []);

  // React.useEffect(() => {
  //   localStorage.setItem(KEY, JSON.stringify(todos));
  // }, [todos]);

  // console.log(todos);

  // }, []);

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
        // fetch wiyh put
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

  async function addTodo(e) {
    e.preventDefault();
    const form = e.target;
    const inputs = form.elements; // HTMLFormControlsCollection
    const taskInput = inputs[0];
    console.log(taskInput.validity); //check ValidityState
    console.log(taskInput.validity.valid); //check ValidityState.valid

    const data = new FormData(form);
    const task = data.get("task");
    if (taskInput.validity.valid) {
      // create fetch request to backend (POST) with {"task": task}
      // get response
      // get response.json() and asign to newTodo
      try {
        const response = await fetch("http://127.0.0.1:8000/todos/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task: task }),
        });
        const newTodo = await response.json();
        const addTodos = [...todos, newTodo];
        setTodos(addTodos);
        e.target.task.value = "";
      } catch (error) {}
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
