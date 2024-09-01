import React from "react";
import "../layout/layout.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import ScrollToTop from "../scrollToTop/ScrollToTop";
import BackBtn from "../backBtn/BackBtn";
import TopBanner from "../topBanner/TopBanner";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="">
      <Navbar />
      <ScrollToTop />
      <TopBanner />
      <div className="container my-custom">
        {location.pathname !== "/" ? <BackBtn color="" /> : ""}
        <Outlet />
        <div className="mt-2"></div>
      </div>
    </div>
  );
};

export default Layout;
