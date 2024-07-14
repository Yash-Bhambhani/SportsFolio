import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import SignUp from "./components/SignUp";
import Error from "./components/Error";
import Login from "./components/Login";
import Home from "./components/Home";
import Registration from "./components/Registration.jsx";
import HostCard from "./components/HostCard";
import Details from "./components/Details.jsx";
import Host from "./components/Host.jsx";
import ContextProvider from "./context/index.js";
import Empty from "./components/Empty.jsx";
import Player from "./components/Player.jsx";
import Team from "./components/Team.jsx";
import Captain from "./components/Captain.jsx";
import Update from "./components/Update.jsx";
import Header2 from "./components/Header2.jsx";
import { useLocation } from "react-router-dom";
import NewsComponent from "./components/News.jsx";
const App = () => {
  const location = useLocation();
  const showHeader1 =
    location.pathname === "/" ||
    location.pathname === "/signup" ||
    location.pathname === "/login";
  return (
    <div className="app">
      <ContextProvider>
        {showHeader1 ? <Header /> : <Header2 />}
        <Outlet />
      </ContextProvider>
    </div>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/landingpage",
        element: <Body />,
      },
      {
        path: "/landingpage/registration",
        element: <Registration />,
      },
      {
        path: "/landingpage/host",
        element: <Host />,
      },
      {
        path: "/landingpage/HostCard",
        element: <HostCard />,
      },
      {
        path: "/landingpage/details/:event_id",
        element: <Details />,
      },
      {
        path: "/landingpage/empty",
        element: <Empty />,
      },
      {
        path: "/:event_id/join",
        element: <Player />,
      },
      {
        path: "/join/done",
        element: <Captain />,
      },
      {
        path: "/landingpage/update",
        element: <Update />,
      },
      {
        path: "/:event_id/join/team",
        element: <Team />,
      },
      {
        path: "/landingpage/news",
        element: <NewsComponent />,
      },
    ],
    errorElement: <Error />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
