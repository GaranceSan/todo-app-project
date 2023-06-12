import { Form, useLoaderData, redirect } from "react-router-dom";
import { BACKEND_URL } from "../common/constants";

export async function action({ request, params }) {
  const backendUrl = `${BACKEND_URL}/todos/items/${params.todoId}/`;
  const requestOptions = {
    method: "DELETE",
    headers: {
      "content-Type": "application/json",
    },
  };
  try {
    const res = await fetch(backendUrl, requestOptions);
    if (!res.ok) {
      // actionResponse.errors = ["Unable to delete"];
      return redirect(`/lists/${params.listId}`);
    }
    // const data = await res.json();

    // const redirectUrl = `/todos/items/${data.id}`;
    return redirect(`/lists/${params.listId}`);
  } catch (err) {
    console.error(err);
    // actionResponse.errors = ["Unable to delete"];
    return redirect(`/lists/${params.listId}`);
  }
  // return redirect(`/lists/${params.listId}`);
}
