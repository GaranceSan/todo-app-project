import { BACKEND_URL } from "../common/constants";
import { useLoaderData, Form } from "react-router-dom";

export async function action({ request, params }) {
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
        return actionResponse;
      }
      actionResponse.data = ["Deleted"];
      return actionResponse;
    } catch (err) {
      console.error(err);
      actionResponse.errors = ["Unable to delete"];
      return actionResponse;
    }
  } else if (submissionType === "update") {
    // update code here
  } else {
    console.error("SHould not be here, there is an error in list page");
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

  const listId = list.id;
  return (
    <div>
      <h1>{list.list_name}</h1>
      <Form method="post">
        <input type="hidden" name="todo-type" value="new" />
        <label htmlFor="id-new-todo">New Todo</label>
        <input name="new-todo-name" type="text" id="id-new-tod" />
        <button type="submit">Create New Todo</button>
      </Form>

      {list.todos.length ? (
        <ul>
          {list.todos.map((todo) => (
            <li key={todo.id}>
              {todo.done ? <span>0 </span> : <span>X</span>}
              <span>{todo.created}</span>
              <span>{todo.task}</span>

              <Form method="post" action="edit">
                <button type="submit">Edit</button>
              </Form>
              <Form method="post">
                <input type="hidden" name="todo-type" value="delete" />
                <input type="hidden" name="todo-id" value={todo.id} />
                <button type="submit">Delete</button>
              </Form>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
