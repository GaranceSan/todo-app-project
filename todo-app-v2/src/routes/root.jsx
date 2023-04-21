import { Outlet } from "react-router-dom";
export default function Root() {
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
          <ul>
            <li>
              <a href={`/list/1`}>Shopping</a>
            </li>
            <li>
              <a href={`/list/2`}>Cleaning actions</a>
            </li>
          </ul>
        </nav>
      </aside>
      <main id="details">
        <Outlet />
      </main>
    </>
  );
}
