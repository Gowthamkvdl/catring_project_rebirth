import React from "react";
import "../layout/layout.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {  Outlet, useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import ScrollToTop from "../scrollToTop/ScrollToTop";
import BackBtn from "../backBtn/BackBtn";
import TopBanner from "../topBanner/TopBanner";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="">
      <Navbar />
      <ScrollToTop />
      <TopBanner />
      <div className="container my-custom">
        <Toaster
          position="top-center"
          toastOptions={{
            className: "",
            duration: 4000,
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
        {location.pathname !== "/" ? <BackBtn color="" /> : ""}
        <Outlet />
        <div className="mt-2"></div>
      </div>
    </div>
  );
};

export default Layout;
