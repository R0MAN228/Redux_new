import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import Notes from "./pages/Notes";
import Note from "./pages/Note";
import AddNote from "./pages/AddNote";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import RequireAuth from "./components/RequireAuth";
import EditNote from "./pages/EditNote";
import { NotFound } from "./pages/NotFound";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "notes",
        children: [
          {
            index: true,
            element: <Notes />,
          },
          {
            path: "add",
            element: <AddNote />,
          },
          {
            path: ":id",
            children: [
              {
                path: "edit",
                element: <EditNote />,
              },
              {
                index: true,
                element: <Note />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
