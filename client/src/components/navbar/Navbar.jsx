import React, { useContext, useEffect, useRef, useState } from "react";
import "./navbar.css";
import { Toaster } from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Theme from "../theme/Theme";
import apiRequest from "../../lib/apiRequest";
import toast from "react-hot-toast";
import dummyProfilePic from "../../assets/dummyProfilePic.jpg";
import ScrollToTop from "../scrollToTop/ScrollToTop";
import lock from "../../assets/lock.svg";
import trust from "../../assets/trust.svg";
import home from "../../assets/home.svg";
import search from "../../assets/search.svg";

const Navbar = () => {
  const location = useLocation();
  const { currentUser, updateUser } = useContext(AuthContext);
  const offcanvasRef = useRef(null); // Create a ref for the offcanvas element
  const closeButtonRef = useRef(null); // Create a ref for the close button
  const btn = useRef(null);
  const inputRef = useRef(null);
  const otpRef = useRef(null);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newUser, setNewUser] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [checking, setChecking] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (btn.current && !localStorage.getItem("user")) {
      setSent(false);
      inputRef.current.value = "";
      otpRef.current.value = "";
      btn.current.click();
    }
    if (btn.current && !newUser) {
      btn.current.click();
    }
  }, [newUser, localStorage.getItem("user")]); // This effect runs when `newUser` changes

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  const handleNavLinkClick = () => {
    // Programmatically click the close button when a link is clicked
    if (closeButtonRef.current) {
      closeButtonRef.current.click();
    }
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    // 1. Empty Phone Number
    if (!phone) {
      return toast.error("Phone number cannot be empty", {
        id: "empty-phone",
      });
    }

    // Remove +91 if present
    let formattedPhone = phone.startsWith("+91") ? phone.slice(3) : phone;

    // 2. Incorrect Length (after removing +91)
    if (formattedPhone.length !== 10) {
      return toast.error("Invalid Phone Number: Must be exactly 10 digits", {
        id: "invalid-length",
      });
    }

    // 3. Non-Numeric Characters
    const phoneNumberRegex = /^[0-9]+$/;
    if (!formattedPhone.match(phoneNumberRegex)) {
      return toast.error("Phone number must contain only digits", {
        id: "invalid-characters",
      });
    }

    // 5. All Same Digits
    if (/^(\d)\1+$/.test(formattedPhone)) {
      return toast.error("Invalid Phone Number: Cannot be all the same digit", {
        id: "same-digits",
      });
    }

    try {
      setSending(true);
      const response = await apiRequest.post("/otp/sendotp", {
        phoneNumber: formattedPhone,
      });
      console.log(response);
      toast.success("OTP sent successfully", {
        id: "otp-sent",
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
      setSent(true);
    } finally {
      setSending(false);
    }
  };


  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    // Declare formattedPhone properly
    const formattedPhone = phone.startsWith("+91") ? phone.slice(3) : phone;

    try {
      setChecking(true);

      const response = await apiRequest.post("/otp/verifyotp", {
        phoneNumber: formattedPhone,
        otp: otp,
      });

      // Check the response structure
      console.log("Response data:", response.data);

      toast.success("OTP verified successfully", {
        id: "otp-verified",
      });

      const newUser = response.data.newUser;

      if (response.data.user) {
        // Set user data including category in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...response.data.user,
            category: response.data.category,
          })
        );

        // Update user context
        updateUser({
          ...response.data.user,
          category: response.data.category,
        });
      }

      setNewUser(newUser);

      // Check if the button exists and newUser is false
      if (btn.current && !newUser) {
        btn.current.click();
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error(
        error?.response?.data?.message ||
          "An error occurred during OTP verification",
        {
          id: "otp-verification-error",
        }
      );
    } finally {
      setChecking(false);
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const age = formData.get("age").toString();
    const name = formData.get("name").toString();
    const city = formData.get("city").toString();
    const role = formData.get("role").toString();

    try {
      setCreating(true);
      const response = await apiRequest.post("/auth/register", {
        phone: phone,
        age: age,
        city: city,
        name: name,
        role: role,
      });
      toast.success("Account created", {
        id: "account created",
      });
      if (response.data.user) {
        // Set user data including category in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...response.data.user,
            category: response.data.category,
          })
        );

        // Update user context
        updateUser({
          ...response.data.user,
          category: response.data.category,
        });
      }
      if (btn.current && newUser) {
        btn.current.click();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <nav
        className={`navbar pb-0  navbar-expand d-flex align-items-center justify-content-center box-shadow bg-adaptive`}
      >
        <Toaster
          position="top-center"
          toastOptions={{
            className: "",
            duration: 4000,
            success: {
              duration: 2500,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
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
                  <div className={`text-adaptive fs-2`}>Catring Boys</div>
                </li>
                <Link to="/" onClick={handleNavLinkClick}>
                  <li className={`nav-item px-3 px-2`}>
                    <div
                      className={`d-block d-sm-none phone-nav-item d-flex justify-content-center align-items-center flex-column d-flex flex-column ${isActive(
                        "/"
                      )}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28.5"
                        height="28.5"
                        fill="currentColor"
                        className="bi bi-house mx-auto mb-1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                      </svg>
                      <p className="text-center small-text mb-1">Home</p>
                    </div>
                    <div
                      className={`nav-link text-decoration-none d-none d-sm-block body-text ${isActive(
                        "/"
                      )}`}
                    >
                      Home
                    </div>
                  </li>
                </Link>
                <Link to="/about" onClick={handleNavLinkClick}>
                  <li className={`nav-item px-3 `}>
                    <div
                      className={`d-block d-sm-none phone-nav-item d-flex justify-content-center align-items-center flex-column ${isActive(
                        "/about"
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
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                      </svg>
                      <p className="text-center small-text mb-1">About</p>
                    </div>
                    <div
                      className={`nav-link text-decoration-none d-none d-sm-block body-text ${isActive(
                        "/about"
                      )}`}
                    >
                      About
                    </div>
                  </li>
                </Link>

                {currentUser?.category === "server" && (
                  <Link
                    to="/list?location=&date=&maxWorkingDays=&minSalary=&limit="
                    onClick={handleNavLinkClick}
                  >
                    <li className={`nav-item px-3 `}>
                      <div
                        className={`d-block d-sm-none phone-nav-item d-flex justify-content-center align-items-center flex-column ${isActive(
                          "/list"
                        )}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28.5"
                          height="28.5"
                          fill="currentColor"
                          className="bi bi-search mx-auto mb-1"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                        <p className="text-center small-text mb-1">Jobs</p>
                      </div>
                      <div
                        className={`nav-link text-decoration-none d-none d-sm-block body-text ${isActive(
                          "/list"
                        )}`}
                      >
                        Find jobs
                      </div>
                    </li>
                  </Link>
                )}
                {currentUser?.category === "cater" && (
                  <Link to="/new-post" onClick={handleNavLinkClick}>
                    <li className={`nav-item px-3 `}>
                      <div
                        className={`d-block d-sm-none phone-nav-item d-flex justify-content-center align-items-center flex-column ${isActive(
                          "/new-post"
                        )}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28.5"
                          height="28.5"
                          fill="currentColor"
                          className="bi bi-plus-circle mx-auto mb-1"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>
                        <p className="text-center small-text mb-1">Post</p>
                      </div>
                      <div
                        className={`nav-link text-decoration-none d-none d-sm-block body-text ${isActive(
                          "/new-post"
                        )}`}
                      >
                        New post
                      </div>
                    </li>
                  </Link>
                )}
                <Link to="/contact" onClick={handleNavLinkClick}>
                  <li className={`nav-item px-3 `}>
                    <div
                      className={`d-block d-sm-none phone-nav-item d-flex justify-content-center align-items-center flex-column ${isActive(
                        "/contact"
                      )}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28.5"
                        height="28.5"
                        fill="currentColor"
                        className="bi bi-envelope mx-auto mb-1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                      </svg>
                      <p className="text-center small-text mb-1">Contact</p>
                    </div>
                    <div
                      className={`nav-link body-text d-none d-sm-block ${isActive(
                        "/contact"
                      )}`}
                    >
                      Contact
                    </div>
                  </li>
                </Link>
                <Link to="/profile" onClick={handleNavLinkClick}>
                  <li className={`nav-item px-3 d-block  d-sm-none`}>
                    <div
                      className={`d-block d-sm-none phone-nav-item d-flex justify-content-center align-items-center flex-column ${isActive(
                        "/profile"
                      )}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28.5"
                        height="28.5"
                        fill="currentColor"
                        className="bi bi-person mx-auto mb-1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                      </svg>
                      <p className="text-center small-text mb-1">Profile</p>
                    </div>
                    <div
                      className={`nav-link body-text d-none d-sm-block ${isActive(
                        "/profile"
                      )}`}
                    >
                      Profile
                    </div>
                  </li>
                </Link>
                {/* <li className="m-2 d-none d-sm-block">
                  <Theme />
                </li> */}
                {currentUser ? (
                  <Link to="/profile">
                    <div
                      title="Profile "
                      className="ms-3  d-none d-sm-block nav-item userInfo d-flex align-items-center gap-2"
                    >
                      <img
                        src={
                          currentUser.avatar
                            ? currentUser.avatar
                            : dummyProfilePic
                        }
                        className="navProPic me-2 mb-1"
                        alt=""
                      />
                      <span className="fs-5 text-uppercase">
                        {currentUser.name}
                      </span>
                    </div>
                  </Link>
                ) : (
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
                )}
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
                <div
                  className={`d-flex align-items-stretch ${
                    newUser ? "d-none" : "d-block"
                  }`}
                >
                  <div className="img">
                    <img
                      src={lock}
                      className="login-img me-3"
                      alt="login img"
                    />
                  </div>
                  <div className="texts">
                    <div className="fs-2">Login With OTP</div>
                    <div className="fs-6 mb-5">
                      Opportunities Call, You Answer!
                    </div>
                  </div>
                </div>
                <form action="" onSubmit={handleCreateAccount} className=" ">
                  <div className={`${newUser ? "d-none" : "d-block"}`}>
                    <div className="row">
                      <div className="col-7">
                        <div className="d-flex ">
                          <div className="textInputWrapper mt-1">
                            <input
                              placeholder="Enter phone number"
                              type="text"
                              className="textInput text-dark fs-5"
                              defaultValue={phone}
                              onChange={handlePhoneChange}
                              ref={inputRef}
                            ></input>
                          </div>
                        </div>
                      </div>

                      <div className="col-5">
                        <button
                          disabled={sending}
                          className={`btn btn-primary w-100 ${
                            sent ? "mb-0" : "mb-4"
                          } `}
                          onClick={handleSendOtp}
                        >
                          {sending
                            ? "Sending..."
                            : sent
                            ? "Resend"
                            : "Send OTP"}
                        </button>
                      </div>
                      {/* <span
                        className={`small-text ${
                          sent ? "pb-0" : "pb-4"
                        } mt-1 opacity-40`}
                      >
                        You will receive an OTP on this number.
                      </span> */}
                    </div>
                    <div className={`${sent ? "d-block" : "d-none"}`}>
                      <div className="textInputWrapper">
                        <input
                          placeholder="Enter OTP"
                          type="text"
                          className="textInput text-dark fs-5 mt-4"
                          defaultValue={otp}
                          onChange={handleOtpChange}
                          ref={otpRef}
                        ></input>
                      </div>
                      <button
                        disabled={checking}
                        className="btn btn-primary w-100 mt-3"
                        onClick={handleVerifyOtp}
                      >
                        {checking ? "Verifying..." : "Verify OTP"}
                      </button>
                    </div>
                  </div>
                  <div className={` ${newUser ? "d-block" : "d-none"}`}>
                    <div className="d-flex align-items-stretch">
                      <div className="img">
                        <img
                          src={trust}
                          className="trust-img me-3"
                          alt="trust img"
                        />
                      </div>
                      <div className={`texts`}>
                        <div className="fs-3 ">Enter your details</div>
                        <div className="fs-6 mb-3">
                          Trust Us with Your Future - Your Job, Our Promise!
                        </div>
                      </div>
                    </div>
                    <div className="textInputWrapper">
                      <input
                        placeholder="Name"
                        name="name"
                        type="text"
                        className="textInput text-dark fs-5 mt-3"
                      ></input>
                    </div>
                    <div className="textInputWrapper">
                      <input
                        name="age"
                        placeholder="Age"
                        type="number"
                        className="textInput text-dark fs-5 mt-4"
                      ></input>
                    </div>
                    <div className="textInputWrapper">
                      <input
                        name="city"
                        placeholder="City"
                        type="text"
                        className="textInput text-dark fs-5 mt-4"
                      ></input>
                    </div>
                    <div className="role d-flex gap-2 mt-2">
                      <label className="radio-button  text-dark">
                        <input type="radio" name="role" value="server"></input>
                        <span className="radio"></span>I want a job
                      </label>

                      <label className="radio-button text-dark">
                        <input type="radio" name="role" value="cater"></input>
                        <span className="radio "></span>I want to hire
                      </label>
                    </div>
                    <button
                      disabled={creating}
                      className="btn btn-primary w-100 mt-4"
                      type="submit"
                    >
                      {creating ? "Creating..." : "Create Account"}
                    </button>
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
