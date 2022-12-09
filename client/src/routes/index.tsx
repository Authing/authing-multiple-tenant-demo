import { RouteObject } from "react-router-dom";
import { Layout } from "../components/Layout";
import Login from "../pages/Login";

export default [
  {
    path: "/",
    id: "root",
    element: <Layout />,
    children: [
      {
        path: "/login",
        id: "login",
        element: <Login />,
        loader: () => ({ header: false }),
      },
    ],
  },
] as RouteObject[];
