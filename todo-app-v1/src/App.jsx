import "./App.css";
import React from "react";

import { Form } from "./components/Form";
import { TodoItem } from "./components/TodoItem";

const KEY = "__todos__";
const BASE_URL = "http://127.0.0.1:8000/todos/";

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
  async function toggleTodo(id) {
    const newTodos = await Promise.all(
      todos.map(async (todo) => {
        if (todo.id === id) {
          try {
            const response = await fetch(`http://127.0.0.1:8000/todos/${id}/`, {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                task: todo.task,
                done: !todo.done, // change is happening here })
              }),
            });
            const changedTodo = await response.json();
            return changedTodo;
          } catch (error) {}
        } else {
          return todo;
        }
      })
    );
    console.log(newTodos);
    setTodos(newTodos);
  } //end of toggleTodo

  async function deleteTodo(id) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/todos/${id}/`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) return;
      const savedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(savedTodos);
    } catch (error) {
      console.error(error);
    }
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
        const response = await fetch(BASE_URL, {
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
        const newTaskErrors = {
          task: ["Please fill in a task"],
        };
        setTaskErrors(newTaskErrors);
      }
    }
  } // addTodo

  async function modifyTodo(e, setEditing) {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log("data", data);
    const updatedtask = data.get("task");
    console.log("updated", updatedtask);
    const id = data.get("todo_id");
    console.log("id", id);
    const newTodos = await Promise.all(
      todos.map(async (todo) => {
        if (todo.id === Number(id)) {
          try {
            const response = await fetch(`${BASE_URL}${id}/`, {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                task: updatedtask,
                id: id,
              }),
            });
            if (!response.ok) return todo;
            const changedTodo = await response.json();
            return changedTodo;
          } catch (error) {
            console.error(error);
            return todo;
          }
        } else {
          return todo;
        }
      })
    );

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
