import React, { useContext, useEffect, useState } from "react";
import "./profilePage.css";
import rollingLoading from "../../assets/rollingLoading.svg";
import dummyProfilePic from "../../assets/dummyProfilePic.jpg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import toast from "react-hot-toast";
import DisplayStarRating from "react-star-ratings";
import CardSkeleton from "../../components/cardSkeleton/CardSkeleton";

const profilePage = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [events, setEvents] = useState(null);
  const [myEventsLoading, setMyEventsLoading] = useState(false);
  const [savedEventsLoading, setSavedEventsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleEdit = () => {
    navigate("/update-profile");
  };

  const showMyEvents = async () => {
    try {
      setMyEventsLoading(true);
      const events = await apiRequest.get(
        "/user/profilePosts/" + currentUser?.UserId
      );
      const myEvents = events.data.userPosts;
      setEvents(myEvents);
    } catch (error) {
      console.log(error);
    } finally {
      setMyEventsLoading(false);
    }
  };

  const showSavedPosts = async () => {
    try {
      setSavedEventsLoading(true);
      const events = await apiRequest.get(
        "/user/profilePosts/" + currentUser?.UserId
      );
      const savedEvents = events.data.savedPost;
      setEvents(savedEvents.filter((post) => post.disabled === false));
    } catch (error) {
      console.log(error);
    } finally {
      setSavedEventsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await apiRequest.post("/auth/logout");
      console.log("Removing user from localStorage");
      localStorage.removeItem("user");
      updateUser(null);
      navigate("/");
      toast.success("Logout Successful", {
        id: "logout successful",
      });
      // // Reload the page after navigating
      // navigate(0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToast = () => {
    toast.success("hello");
  };

  return (
    <div className="profile bg-white">
      <div className="row ">
        <div className="col-12 col-lg-7">
          <h2 className="title-text text-uppercase">
            USER PROFILE
            <button
              className=" ms-2 float-end btn btn-primary"
              onClick={handleEdit}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
            </button>
            <button className="btn btn-danger float-end" onClick={handleLogout}>
              <div className="d-flex justify-content-center align-items-center">
                {loading && (
                  <div className="loading-indicator me-1  d-flex align-items-center">
                    <img src={rollingLoading} alt="Loading..." />
                  </div>
                )}
                <span>Logout</span>
              </div>
            </button>
            {/* <button className="float-end btn btn-danger" onClick={handleToast}>
              toast
            </button> */}
          </h2>
          <div className="profile bg-light text-dark mx-1 mx-md-0 py-4 rounded-4 box-shadow mt-4 row">
            <div className="profilePic  d-flex pb-3  pt-2 p-md-0 pb-md-0  flex-column col-12 col-md-4">
              <img
                src={currentUser?.avatar || dummyProfilePic}
                alt=""
                className="img-fluid mb-2 px-md-2 rounded-4"
              />
              <div className="mt-1 starRating d-flex flex-column align-items-center justify-content-center">
                <DisplayStarRating
                  rating={currentUser?.averageRating}
                  numberOfStars={5}
                  starDimension="25px"
                  starRatedColor="#FFD700"
                  starSpacing="1px"
                />
                <p className="content m-0 mt-0 mx-2">
                  Total rating :{" "}
                  <span>
                    {currentUser?.totalRating <= 0
                      ? "0 (No rating)"
                      : currentUser?.totalRating}
                  </span>
                </p>
                <span className=" honorScore bg-light-blue">
                  Honor Score:{" "}
                  <span className="fw-bold">{currentUser?.honorScore}</span>
                </span>
              </div>
            </div>
            <div className="profileInfo col-12 col-md-8 ">
              <div className=" content mb-2">
                <span className="small-font">Name </span> <br />{" "}
                <span className="little-big-font fs-5">
                  {currentUser?.name}
                </span>
              </div>
              <div className=" content mb-2">
                <span className="small-font">Phone </span> <br />{" "}
                <span className="little-big-font fs-5">
                  {currentUser?.phone}
                </span>
              </div>
              <div className=" content mb-2">
                <span className="small-font">City </span> <br />{" "}
                <span className="little-big-font fs-5">
                  {currentUser?.city}
                </span>
              </div>
              <div className=" content mb-2">
                <span className="small-font">Address </span> <br />{" "}
                <span className="little-big-font fs-5">
                  {currentUser?.address ? currentUser?.address : "Not provided"}
                </span>
              </div>
            </div>
          </div>
          <div className="row my-3">
            {currentUser?.category === "cater" && (
              <div className="col-12">
                <button
                  className="btn btn-primary w-100 "
                  disabled={myEventsLoading}
                  onClick={showMyEvents}
                >
                  My Events
                </button>
              </div>
            )}
            {currentUser?.category === "server" && (
              <div className="col-12">
                <button
                  className="btn btn-primary w-100"
                  disabled={savedEventsLoading}
                  onClick={showSavedPosts}
                >
                  Saved Events
                </button>
              </div>
            )}
            <div className="col-12">
              {(myEventsLoading || savedEventsLoading) && (
                <CardSkeleton NoOfCards={1} />
              )}
              {!(myEventsLoading || savedEventsLoading) &&
              events &&
              events.length > 0 ? (
                events
                  .slice()
                  .reverse()
                  .map((post) => <Card item={post} key={post.postId} />)
              ) : (
                <div className="text-center mt-4">
                  {!(myEventsLoading || savedEventsLoading) && events && (
                    <h4>No events found</h4>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default profilePage;
