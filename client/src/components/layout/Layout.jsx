import React from "react";
import "../layout/layout.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import ScrollToTop from "../scrollToTop/ScrollToTop";
import BackBtn from "../backBtn/BackBtn"
import TopBanner from "../topBanner/TopBanner";

const Layout = () => {
  const location = useLocation();
  
  return (
    <div className="">
      <Navbar />
      <ScrollToTop />
      <TopBanner />
      <div className="container my-custom">
        { location.pathname !== "/" ? <BackBtn color="" /> : ""}
        <Outlet />
        <div className="mt-2"></div> 
      </div>
      {/* <footer className="footer">
        <ul className="social-icon p-0">
          <li className="social-icon__item">   
            <a className="social-icon__link" href="#">
              <ion-icon name="logo-facebook"></ion-icon>
            </a>
          </li>
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <ion-icon name="logo-twitter"></ion-icon>
            </a>
          </li>
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
          </li>
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <ion-icon name="logo-instagram"></ion-icon>
            </a>
          </li>
        </ul>
        <ul className="menu p-0">
          <li className="menu__item">
            <Link className="menu__link" to={"/"}>
              Home
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to={"/about"}>
              About
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to={"/"}>
              Services
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to={"/"}>
              Team
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to={"/contact"}>
              Contact
            </Link>
          </li>
        </ul>
        <p className=" text-center">
          &copy;2024 Catring Boys | All Rights Reserved
        </p>
        <p className=" attribution text-center">
          <a className="text-light" href="https://storyset.com/">
            Illustrations by Storyset
          </a>
          <a
            href="https://www.flaticon.com/free-icons/location"
            title="location icons"
          >
            Location icons created by Freepik - Flaticon
          </a>
        </p>
      </footer> */}
    </div>
  );
};

export default Layout;
