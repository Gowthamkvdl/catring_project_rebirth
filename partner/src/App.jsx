import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Intrested from "./routes/intrested/Intrested";
import Layout from "./components/layout/Layout";
import CatersProfiles from "./routes/profiles/CatersProfiles";
import Posts from "./routes/posts/Posts";
import {
  catersProfilesPageLoader,
  intrestedPageLoader,
  listPageLoader,
  serversProfilesPageLoader,
} from "./lib/loader.js";
import { singlePageLoader } from "./lib/loader.js";
import SinglePage from "./routes/singlepage/SinglePage";
import UserProfile from "./routes/userProfilePage/UserProfile";
import ServersProfiles from "./routes/profiles/ServersProfiles";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Intrested />,
          loader: intrestedPageLoader,
        },
        {
          path: "/posts",
          element: <Posts />,
          loader: listPageLoader,
        },
        {
          path: "/single-page/:id",
          element: <SinglePage />,
          loader: singlePageLoader,
        },
        {
          path: "/caters-profiles",
          element: <CatersProfiles />,
          loader: catersProfilesPageLoader,
        },
        {
          path: "/servers-profiles",
          element: <ServersProfiles />,
          loader: serversProfilesPageLoader,
        },
        {
          path: "/user-profile/",
          element: <UserProfile />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
