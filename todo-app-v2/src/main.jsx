import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Root,
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import "./index.css";
import {
  List,
  loader as listLoader,
  action as listAction,
} from "./routes/list";
import EditTodo, { action as editAction } from "./routes/edit";
// import { action as destroyTodoAction } from "./routes/destroyTodo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    action: rootAction,
    children: [
      // {
      //   path: "/todo/:listId/:todoId/destroy/",
      //   action: destroyTodoAction,
      // },
      {
        path: "lists/:listId",
        element: <List />,
        loader: listLoader,
        action: listAction,
      },
      {
        path: "lists/:listId/edit",
        element: <EditTodo />,
        loader: listLoader,
        action: editAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
