import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutPage from "./routes/aboutPage/AboutPage";
import Layout from "./components/layout/Layout";
import ContactPage from "./routes/contactPage/ContactPage";
import LoginPage from "./routes/loginPage/LoginPage";
import RegisterPage from "./routes/registerPage/RegisterPage";
import ListPage from "./routes/listPage/ListPage";
import NewPostPage from "./routes/newPostPage/NewPostPage";
import SinglePage from "./routes/singlepage/SinglePage";
import ProfilePage from "./routes/profilePage/profilePage";
import UserProfile from "./routes/userProfilePage/UserProfile";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import PageNotFound from "./routes/pageNotFound/PageNotFound";
import { listPageLoader, singlePageLoader } from "./lib/loader";
import HomePage from "./routes/homePage/Homepage"; 

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      // errorElement: <PageNotFound />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/about",
          element: <AboutPage />,
        },
        {
          path: "/contact",
          element: <ContactPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path: "/new-post",
          element: <NewPostPage />,
        },
        {
          path: "single-page/:id",
          element: <SinglePage />,
          loader: singlePageLoader,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/update-profile",
          element: <ProfileUpdatePage />,
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
