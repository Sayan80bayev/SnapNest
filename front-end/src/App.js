import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return <RouterProvider router={routes} />;
}
