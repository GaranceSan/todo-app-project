import {
  Outlet,
  Link,
  useLoaderData,
  Form,
  redirect,
  useSubmit,
} from "react-router-dom";
import { BACKEND_URL } from "../common/constants";
import { AiOutlinePlus } from "react-icons/ai";

export async function action({ request }) {
  const formData = await request.formData();
  const newListName = formData.get("new-list-name");
  const url = `${BACKEND_URL}/todos/new/`;
  const requestOptions = {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({ list_name: newListName.trim() }),
  };

  const actionResponse = {
    data: null,
    errors: null,
  };

  //fetch lists from back as res
  try {
    const res = await fetch(url, requestOptions);
    if (!res.ok) {
      actionResponse.errors = ["Unable to create a new list"];
      return actionResponse;
    }

    //get data from res
    const data = await res.json();
    console.log(data);
    const redirectUrl = `/lists/${data.id}`;
    return redirect(redirectUrl);
  } catch (err) {
    console.error(err);
    actionResponse.errors = ["Unable to create a new list"];
    return actionResponse;
  }
} // end action

export async function loader() {
  const url = `${BACKEND_URL}/todos/`;
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

    //get data from res
    const data = await res.json();

    loaderResponse.data = data;
    return loaderResponse;
  } catch (err) {
    console.error(err);
    loaderResponse.errors = ["Sorry, no listes yet"];
    return loaderResponse;
  }
} // end loader

export function Root() {
  const { data: lists, errors } = useLoaderData();
  const submit = useSubmit();

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   submit(formData, { method: "post" });
  //   const input = document.getElementById("id-new-list-name");
  //   input.value = "";
  // }
  return (
    <>
      <aside id="sidebar">
        <h1>Lists </h1>
        <Form
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            submit(formData, { method: "post" });
            const newListInput = document.getElementById("id-new-list-name");
            newListInput.value = "";
          }}
        >
          <label htmlFor="id-new-list-name">New List</label>
          <input name="new-list-name" type="text" id="id-new-list-name" />
          <button type="submit">
            <AiOutlinePlus />
          </button>
        </Form>
        <div></div>
        <nav>
          {lists.length ? (
            <ul id="listoflist">
              {lists.map((list) => (
                <li key={list.id}>
                  <Link to={`lists/${list.id}`}>{list.list_name}</Link>
                </li>
              ))}
            </ul>
          ) : null}
        </nav>
      </aside>
      <main id="details">
        <Outlet />
      </main>
    </>
  );
} // end Root
