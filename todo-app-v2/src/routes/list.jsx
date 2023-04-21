import { Form } from "react-router-dom";

export default function List() {
  const list = {
    title: "title",
    todos: "todos",
  };

  return (
    <>
      <div id="liste">
        <h1>{list.title}</h1>
      </div>
      <div id="todos">
        <ul>
          <li>{list.todos}</li>
        </ul>
      </div>
    </>
  );
}
