import { BACKEND_URL } from "../common/constants";
import { useLoaderData, Form } from "react-router-dom";

export async function action({ request, params }) {
  const formData = await request.formData();
  const newTodoName = formData.get("new-todo-name");
  const listId = Number(params.listId);
  console.log(newTodoName);
  const url = `${BACKEND_URL}/todos/item/new/`;
  const requestOptions = {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({ task: newTodoName.trim(), liste: listId }),
  };
  const actionResponse = {
    data: null,
    errors: null,
  };
  try {
    const res = await fetch(url, requestOptions);
    if (!res.ok) {
      actionResponse.errors = ["Unable to create a new todo"];
      return actionResponse;
    }
    const data1 = await res.json();
    console.log(data1);
    // const redirectUrl = `/items/${data1.id}`;
    // return redirect(redirectUrl);
    actionResponse.data = data1;
    return actionResponse;
  } catch (err) {
    console.error(err);
    actionResponse.errors = ["Unable to create a new todo"];
    return actionResponse;
  }
} // end action

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
  console.log(list);
  return (
    <div>
      <h1>{list.list_name}</h1>
      <Form method="post">
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
              <Form
                method="post"
                action="destroy"
                onSubmit={(event) => {
                  if (
                    !confirm("Please confirm you want to delete this record.")
                  ) {
                    event.preventDefault();
                  }
                }}
              >
                <button type="submit">Delete</button>
              </Form>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
