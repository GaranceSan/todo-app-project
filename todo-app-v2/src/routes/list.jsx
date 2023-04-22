import { BACKEND_URL } from "../common/constants";
import { useLoaderData } from "react-router-dom";

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

      {list.todos.length ? (
        <ul>
          {list.todos.map((todo) => (
            <li key={todo.id}>
              {todo.done ? <span>0 </span> : <span>X</span>}
              <span>{todo.created}</span>
              <span>{todo.task}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
