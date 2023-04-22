import { Outlet, Link, useLoaderData } from "react-router-dom";
import { BACKEND_URL } from "../common/constants";

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
    console.log(data);
    loaderResponse.data = data;
    return loaderResponse;
  } catch (err) {
    console.error(err);
    loaderResponse.errors = ["Sorry, no listes yet"];
    return loaderResponse;
  }
}

export function Root() {
  const { data: lists, errors } = useLoaderData();
  console.log(lists, errors);
  return (
    <>
      <aside id="sidebar">
        <h1>Lists are here</h1>
        <form id="search-form" role="search">
          <input
            id="q"
            aria-label="Search a list"
            placeholder="Search a list"
            type="search"
            name="q"
          />
          <div id="search-spinner" aria-hidden hidden={true} />
        </form>
        <form method="post">
          <button type="submit">New</button>
        </form>
        <nav>
          {lists.length ? (
            <ul>
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
}
