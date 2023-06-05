import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Explore from "./pages/Explore/Explore";
import SignIn from "./pages/SignIn/SignIn";
import NavBar from "./Components/NavBar";
import Error from "./pages/Error";

const Layout = () => {
  return (
    <div className="md:w-8/12 mx-auto">
      <NavBar />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signout",
        element: <SignIn />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
