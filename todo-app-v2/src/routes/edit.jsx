import { Form, useLoaderData } from "react-router-dom";
import { BACKEND_URL } from "../common/constants";

export async function action({ request, params }) {
  const formData = await request.formData();

  const changeTodo = formData.get("change-task");
  const todoId = Number(params.todoId);
  console.log(changeTodo);
  const url = `${BACKEND_URL}/todos/items/${params.todoId}/`;
  const requestOptions = {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({ task: changeTodo.trim(), liste: todoId }),
  };
  const actionResponse = {
    data: null,
    errors: null,
  };
  try {
    const res = await fetch(url, requestOptions);
    if (!res.ok) {
      actionResponse.errors = ["This todo cannot be changed"];
      return actionResponse;
    }
    const data2 = await res.json();
    console.log("Here");
    // const redirectUrl = `/lists/${params.listId}`;
    // return redirect(redirectUrl);
  } catch (err) {
    console.error(err);
    actionResponse.errors = ["This todo cannot be changed"];
    return actionResponse;
  }
}
// end action

export async function loader({ params }) {
  const url = `${BACKEND_URL}/todos/items/${params.todoId}`;
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

export default function EditTodo() {
  const { data: todo } = useLoaderData();

  return (
    <Form method="post" id="edit-task">
      <label>
        <span>
          <input
            type="text"
            name="change-task"
            defaultValue={todo.task}
          ></input>
        </span>
      </label>
      <p>
        <button type="submit">Save</button>
      </p>
    </Form>
  );
}
