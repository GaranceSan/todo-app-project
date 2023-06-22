import {
  Outlet,
  Link,
  useLoaderData,
  Form,
  redirect,
  useSubmit,
} from "react-router-dom";
import React from "react";
import { BACKEND_URL } from "../common/constants";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import Hamburger from "hamburger-react";

export async function action({ request }) {
  const formData = await request.formData();
  const listType = formData.get("list-type");
  if (listType === "delete-list") {
    const listId = formData.get("list-id");
    const url = `${BACKEND_URL}/todos/${listId}/`;
    const requestOptions = {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
    return null;
  }

  if (listType === "new-list") {
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
      const redirectUrl = `/lists/${data.id}`;
      return redirect(redirectUrl);
    } catch (err) {
      console.error(err);
      actionResponse.errors = ["Unable to create a new list"];
      return actionResponse;
    }
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
  const [menuOpen, setMenuOpen] = React.useState(false);
  const submit = useSubmit();

  return (
    <>
      <header id="header">
        <h1>Welcome to Garance's todo app</h1>
      </header>
      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <h2>Lists </h2>
        <button
          className="open-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Hamburger />
        </button>

        <Form
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            console.log(formData);
            submit(formData, { method: "post" });
            const newListInput = document.getElementById("id-new-list-name");
            newListInput.value = "";
          }}
        >
          <label htmlFor="id-new-list-name">New List</label>
          <div className="inputList">
            <input type="hidden" name="list-type" value="new-list" />
            <input name="new-list-name" type="text" id="id-new-list-name" />
            <button type="submit">
              <AiOutlinePlus />
            </button>
          </div>
        </Form>

        <nav>
          {lists.length ? (
            <ul id="listoflist">
              {lists.map((list) => (
                <li key={list.id}>
                  <Link to={`lists/${list.id}`}>{list.list_name}</Link>
                  <Form method="post">
                    <input type="hidden" name="list-type" value="delete-list" />
                    <input type="hidden" name="list-id" value={list.id} />
                    <button type="submit">
                      <AiOutlineDelete />
                    </button>
                  </Form>
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
