import { BACKEND_URL } from "../common/constants";
import React from "react";
import { useLoaderData, Form, useSubmit } from "react-router-dom";
import styles from "./list.module.css";
import {
  AiOutlinePlus,
  AiOutlineBorder,
  AiOutlineCheckSquare,
} from "react-icons/ai";

export async function action({ request, params }) {
  console.log(request.method);
  const formData = await request.formData();
  const submissionType = formData.get("todo-type");
  const listId = Number(params.listId);
  const actionResponse = {
    data: null,
    errors: null,
  };

  if (submissionType === "new") {
    const newTodoName = formData.get("new-todo-name");
    const url = `${BACKEND_URL}/todos/item/new/`;
    const requestOptions = {
      method: "POST",

      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ task: newTodoName.trim(), liste: listId }),
    };

    try {
      const res = await fetch(url, requestOptions);
      if (!res.ok) {
        actionResponse.errors = ["Unable to create a new todo"];
        return actionResponse;
      }
      const data1 = await res.json();
      actionResponse.data = data1;
      return actionResponse;
    } catch (err) {
      console.error(err);
      actionResponse.errors = ["Unable to create a new todo"];
      return actionResponse;
    } // end new todo code
  } else if (submissionType === "delete") {
    const todoId = formData.get("todo-id");
    const backendUrl = `${BACKEND_URL}/todos/items/${todoId}/`;
    const requestOptions = {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
      },
    };
    try {
      const res = await fetch(backendUrl, requestOptions);
      if (!res.ok) {
        actionResponse.errors = ["Unable to delete"];
        return actionResponse.data;
      }
      actionResponse.data = ["Deleted"];
      return actionResponse;
    } catch (err) {
      console.error(err);
      actionResponse.errors = ["Unable to delete"];
      return actionResponse;
    }
  } else if (submissionType === "update") {
    const todoId = formData.get("todo-id");
    const newTodoContent = formData.get("new-todo-content");
    const backendUrl = `${BACKEND_URL}/todos/items/${todoId}/`;
    const requestOptions = {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ task: newTodoContent.trim(), liste: listId }),
    };
    try {
      const res = await fetch(backendUrl, requestOptions);
      console.log(res);
      if (!res.ok) {
        actionResponse.errors = ["Unable to change the todo"];
        return actionResponse;
      }
      const data2 = await res.json();
      actionResponse.data = data2;
      return actionResponse;
    } catch {
      console.error(err);
      actionResponse.errors = ["Unable to change the todo"];
      return actionResponse;
    }
  } else if (submissionType === "toggle-done") {
    const todoId = formData.get("todo-id");
    const todoContent = formData.get("todo-content");
    const todoDone = formData.get("todo-done") === "true" ? true : false;
    const backendUrl = `${BACKEND_URL}/todos/items/${todoId}/`;
    const requestOptions = {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        task: todoContent,
        done: !todoDone,
        liste: listId,
      }),
    };
    try {
      const res = await fetch(backendUrl, requestOptions);
      console.log(res);
      if (!res.ok) {
        actionResponse.errors = ["Unable to toggle the todo"];
        return actionResponse;
      }
      const data = await res.json();
      actionResponse.data = data;
      return actionResponse;
    } catch {
      console.error(err);
      actionResponse.errors = ["Unable to toggle the todo"];
      return actionResponse;
    }
  } else {
    console.error("Should not be here, there is an error in list page");
    return null;
  }
}
// end action

export async function loader({ params }) {
  const url = `${BACKEND_URL}/todos/${params.listId}`;
  console.log(url);
  const loaderResponse = {
    data: null,
    errors: null,
  };
  //fetch lists from back as res
  try {
    const res = await fetch(url);
    if (!res.ok) {
      loaderResponse.errors = ["Sorry, no listes yet"];
      return loaderResponse;
    }
    const data = await res.json();
    loaderResponse.data = data;
    return loaderResponse;
  } catch (error) {}
}

export function List() {
  const { data: list, errors } = useLoaderData();
  const submit = useSubmit();
  const listId = list.id;

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    submit(formData, { method: "post" });
    const input = document.getElementById("id-new-todo");
    input.value = "";
  }

  return (
    <div>
      <h1 className={styles.h1}>{list.list_name}</h1>
      <Form method="post" onSubmit={handleSubmit}>
        <input type="hidden" name="todo-type" value="new" />
        <label htmlFor="id-new-todo">New Todo</label>

        <input name="new-todo-name" type="text" id="id-new-todo" />
        <button type="submit">
          <AiOutlinePlus />
        </button>
      </Form>

      {list.todos.length ? (
        <ul className={styles.ul}>
          {list.todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function TodoItem({ todo }) {
  const [showEdit, setShowEdit] = React.useState(false);
  const [done, setDone] = React.useState(todo.done);
  console.log(done, "done value");
  console.log(todo.done, "todo back");

  return (
    <li key={todo.id} className={styles.li}>
      <Form method="post">
        <input type="hidden" name="todo-type" value="toggle-done" />
        <input type="hidden" name="todo-id" value={todo.id} />
        <input type="hidden" name="todo-done" value={todo.done} />
        <input type="hidden" name="todo-content" value={todo.task} />
        <button type="submit" onClick={() => setDone(!done)}>
          {done ? <AiOutlineCheckSquare /> : <AiOutlineBorder />}
        </button>
      </Form>

      {/* {todo.done ? <span>X</span> : <span>0</span>} */}
      <span>{todo.created}</span>
      <span>{todo.task}</span>
      <button onClick={() => setShowEdit(true)}>Edit</button>
      {showEdit ? (
        <Form
          method="post"
          onSubmit={(event) => {
            setShowEdit(false);
          }}
        >
          <input type="hidden" name="todo-type" value="update" />
          <input type="hidden" name="todo-id" value={todo.id} />
          <input
            name="new-todo-content"
            type="text"
            id="id-new-tod"
            defaultValue={todo.task}
          />
          <button type="submit">Submit Edit</button>
        </Form>
      ) : null}

      <Form method="post">
        <input type="hidden" name="todo-type" value="delete" />
        <input type="hidden" name="todo-id" value={todo.id} />
        <button type="submit">Delete</button>
      </Form>
    </li>
  );
}
