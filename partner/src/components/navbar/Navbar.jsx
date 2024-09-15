import React, { useContext, useEffect, useRef, useState } from "react";
import "./navbar.css";
import { Toaster } from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import toast from "react-hot-toast";
import dummyProfilePic from "../../assets/dummyProfilePic.jpg";
import rollingLoading from "../../assets/rollingLoading.svg";
import ScrollToTop from "../scrollToTop/ScrollToTop";
import lock from "../../assets/lock.svg";

const Navbar = () => {
  const location = useLocation();
  const { currentUser, updateUser } = useContext(AuthContext);
  const offcanvasRef = useRef(null); // Create a ref for the offcanvas element
  const closeButtonRef = useRef(null); // Create a ref for the close button
  const btn = useRef(null);
  const inputRef = useRef(null);
  const [ID, setID] = useState("");
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (btn.current && !localStorage.getItem("partnerID")) {
      inputRef.current.value = "";
      btn.current.click();
    }
  }, []);

  useEffect(() => {
    if (btn.current && !localStorage.getItem("partnerID")) {
      inputRef.current.value = "";
      btn.current.click();
    }
  }, [localStorage.getItem("partnerID")]);

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  const handleNavLinkClick = () => {
    // Programmatically click the close button when a link is clicked
    if (closeButtonRef.current) {
      closeButtonRef.current.click();
    }
  };

  const handleIDChange = (event) => {
    setID(event.target.value);
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      setChecking(true);

      const response = await apiRequest.post("/partner/verifyId", {
        id: ID,
      });

      toast.success("ID verified successfully", {
        id: "ID-verified",
      });

      if (response.data) {
        // Set user data including category in localStorage
        localStorage.setItem(
          "partnerID",
          JSON.stringify({
            ...response.data.id,
          })
        );
      }

      if (btn.current) {
        inputRef.current.value = "";
        btn.current.click();
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error(
        error?.response?.data?.message ||
          "An error occurred during ID verification",
        {
          id: "ID-verification-error",
        }
      );
    } finally {
      setChecking(false);
    }
  };

  return (
    <div>
      <nav
        className={`navbar pb-1  navbar-expand d-flex align-items-center justify-content-center box-shadow bg-adaptive`}
      >
        <ScrollToTop />
        <div className="">
          {/* <a className="navbar-brand d-sm-block d-none fs-3" href="/">
            CATERING BOYS
          </a> */}
          <button
            className={`navbar-toggler shadow-none bg-light`}
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`offcanvas w-75 offcanvas-start`}
            tabIndex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
            ref={offcanvasRef} // Attach the ref to the offcanvas element
          >
            <div className="offcanvas-header">
              <button
                type="button"
                className="btn-close custom-dark-btn shadow-none"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                ref={closeButtonRef} // Attach the ref to the close button
              ></button>
            </div>
            <div
              className={`offcanvas-body m-0 p-0 d-flex justify-content-center align-items-center`}
            >
              <ul className="navbar-nav align-items-center w-100 gap-sm-3 justify-content-around  pt-3 pt-sm-0 justify-content-sm-end flex-grow-1">
                <li className={`px-3 px-2 d-sm-block d-none`}>
                  <div className={`text-adaptive fs-2`}>
                    Catring Boys Partner
                  </div>
                </li>
                <Link to="/" onClick={handleNavLinkClick}>
                  <li className={`nav-item px-3 `}>
                    <div
                      className={`d-block d-sm-none phone-nav-item d-flex justify-content-center align-items-center flex-column ${isActive(
                        "/"
                      )}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28.5"
                        height="28.5"
                        fill="currentColor"
                        class="bi bi-balloon-heart mx-auto mb-1"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="m8 2.42-.717-.737c-1.13-1.161-3.243-.777-4.01.72-.35.685-.451 1.707.236 3.062C4.16 6.753 5.52 8.32 8 10.042c2.479-1.723 3.839-3.29 4.491-4.577.687-1.355.587-2.377.236-3.061-.767-1.498-2.88-1.882-4.01-.721zm-.49 8.5c-10.78-7.44-3-13.155.359-10.063q.068.062.132.129.065-.067.132-.129c3.36-3.092 11.137 2.624.357 10.063l.235.468a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3 3 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.235-.468ZM6.013 2.06c-.649-.18-1.483.083-1.85.798-.131.258-.245.689-.08 1.335.063.244.414.198.487-.043.21-.697.627-1.447 1.359-1.692.217-.073.304-.337.084-.398"
                        />
                      </svg>
                      <p className="text-center small-text mb-1">Intrested</p>
                    </div>
                    <div
                      className={`nav-link body-text d-none d-sm-block ${isActive(
                        "/"
                      )}`}
                    >
                      Intrested
                    </div>
                  </li>
                </Link>
                <Link to="/posts" onClick={handleNavLinkClick}>
                  <li className={`nav-item px-3 px-2`}>
                    <div
                      className={`d-block d-sm-none phone-nav-item d-flex justify-content-center align-items-center flex-column d-flex flex-column ${isActive(
                        "/posts"
                      )}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28.5"
                        height="28.5"
                        fill="currentColor"
                        class="bi bi-file-post-fill mx-auto mb-1 "
                        viewBox="0 0 16 16"
                      >
                        <path d="M4 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5z" />
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1" />
                      </svg>
                      <p className="text-center small-text mb-1">Posts</p>
                    </div>
                    <div
                      className={`nav-link text-decoration-none d-none d-sm-block body-text ${isActive(
                        "/posts"
                      )}`}
                    >
                      Posts
                    </div>
                  </li>
                </Link>
                <Link to="/caters-profiles" onClick={handleNavLinkClick}>
                  <li className={`nav-item px-3 `}>
                    <div
                      className={`d-block d-sm-none phone-nav-item d-flex justify-content-center align-items-center flex-column ${isActive(
                        "/caters-profiles"
                      )}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28.5"
                        height="28.5"
                        fill="currentColor"
                        className="bi bi-info-circle mx-auto mb-1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
                      </svg>
                      <p className="text-center small-text mb-1">Caters</p>
                    </div>
                    <div
                      className={`nav-link text-decoration-none d-none d-sm-block body-text ${isActive(
                        "/caters-profiles"
                      )}`}
                    >
                      Caters
                    </div>
                  </li>
                </Link>
                <Link to="/servers-profiles" onClick={handleNavLinkClick}>
                  <li className={`nav-item px-3 `}>
                    <div
                      className={`d-block d-sm-none phone-nav-item d-flex justify-content-center align-items-center flex-column ${isActive(
                        "/servers-profiles"
                      )}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28.5"
                        height="28.5"
                        fill="currentColor"
                        class="bi bi-people-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                      </svg>
                      <p className="text-center small-text mb-1">Servers</p>
                    </div>
                    <div
                      className={`nav-link text-decoration-none d-none d-sm-block body-text ${isActive(
                        "/servers-profiles"
                      )}`}
                    >
                      Servers
                    </div>
                  </li>
                </Link>
                <div className="d-flex d-none flex-column flex-md-row align-items-center">
                  <li className="nav-item mx-3">
                    <div className="nav-link body-text">
                      <button
                        ref={btn}
                        type="button"
                        className="btn btn-primary shadow-none"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        id="staticBackdrop"
                      >
                        Login / Register
                      </button>
                    </div>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {!currentUser && (
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          data-bs-target="#staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
        >
          <Toaster
            position="top-center"
            toastOptions={{
              className: "",
              duration: 4000,
              success: {
                duration: 2000,
                theme: {
                  primary: "green",
                  secondary: "black",
                },
              },
            }}
          />
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body p-3 h-100 box-shadow">
                <div className={`d-flex mb-4 mt-2 `}>
                  <div className="img my-auto">
                    <img
                      src={lock}
                      className="login-img me-3"
                      alt="login img"
                    />
                  </div>
                  <div className="texts my-auto">
                    <div className="fs-2">Login With ID</div>
                    <div className="fs-6">You Call, Servers Answer!</div>
                  </div>
                </div>
                <form action="" className=" ">
                  <div>
                    <div className="row">
                      <div className="col-12 mb-2">
                        <div className="">
                          <div className="textInputWrapper mt-1 mb-1">
                            <input
                              placeholder="Enter employee ID"
                              type="text"
                              className="textInput text-dark fs-5 bg-white"
                              defaultValue={ID}
                              onChange={handleIDChange}
                              ref={inputRef}
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <button
                          className={`btn btn-primary w-100 `}
                          onClick={handleVerify}
                        >
                          <div className="d-flex justify-content-center align-items-center">
                            {checking && (
                              <div className="loading-indicator me-1 d-flex align-items-center">
                                <img src={rollingLoading} alt="Loading..." />
                              </div>
                            )}
                            <span>
                              {checking ? "Verifying..." : "Verify ID"}
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
