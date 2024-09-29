import React, { useContext, useEffect, useState } from "react";
import "./userProfile.css";
import dummyProfilePic from "../../assets/dummyProfilePic.jpg";
import { useNavigate, useSearchParams } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import Loader from "../../components/loader/Loader";
import toast from "react-hot-toast";
import Card from "../../components/card/Card";
import DisplayStarRating from "react-star-ratings";
import { StarRating } from "star-ratings-react";

const profilePage = () => {
  const [myEventsLoading, setMyEventsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [savedEventsLoading, setSavedEventsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const userId = searchParams.get("id");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const fetchUser = await apiRequest.get(`/user/oneCater/${userId}`);
        setUser(fetchUser?.data);
      } catch (error) {
        console.error(error);
      }
    };

    const showMyEvents = async () => {
      try {
        setMyEventsLoading(true);
        const events = await apiRequest.get(`/user/oneCater/${userId}`);
        const myEvents = events.data.post;
        setEvents(myEvents);
      } catch (error) {
        console.log(error);
      } finally {
        setMyEventsLoading(false);
      }
    };

    fetchUserData();
    showMyEvents();
  }, [userId]);

  const submitRating = async () => {
    try {
      const addRating = await apiRequest.post("/user/rating", {
        profileId: userId,
        starCount: rating,
      });
      toast.success(
        "Rating submitted successfully. Please refresh to see the update.",
        { id: "rating" }
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit rating", { id: "rating" });
    }
  };

  return (
    <div className="profile ">
      <div className="row mx-1 ">
        <div className="col-12 col-md-6 px-0">
          <h2 className="subtitle-text text-uppercase">
            {user?.name ? user?.name : "USER"}'S PROFILE
          </h2>
          <div className="profile bg-light text-dark py-4 mx-1 rounded-4 box-shadow mt-4 row">
            <div className="profilePic  d-flex p-5 pb-3 pt-2 p-md-0 pb-md-0  flex-column col-12 col-md-5">
              <img
                src={user?.avatar || dummyProfilePic}
                alt=""
                className="img-fluid px-md-2 mb-2 rounded-4"
              />
              <div className="mt-1 starRating d-flex flex-column align-items-center justify-content-center">
                <DisplayStarRating
                  rating={user?.averageRating}
                  numberOfStars={5}
                  starDimension="25px"
                  starRatedColor="#FFD700"
                  starSpacing="1px"
                />
                <p className="content m-0 mt-0 mx-2">
                  Total rating :{" "}
                  <span>
                    {user?.totalRating <= 0
                      ? "0 (No rating)"
                      : user?.totalRating}
                  </span>
                </p>
                <span className=" honorScore bg-light-blue">
                  Honor Score:{" "}
                  <span className="fw-bold">{user?.honorScore}</span>
                </span>
              </div>
            </div>
            <div className="profileInfo col-12 col-md-7 ">
              <div className=" content mb-2">
                <span className="small-font">Name </span> <br />{" "}
                <span className="little-big-font fs-5">{user?.name}</span>
              </div>
              <div className=" content mb-2">
                <span className="small-font">Phone </span> <br />{" "}
                <span className="little-big-font fs-5">{user?.phone}</span>
              </div>
              <div className=" content mb-2">
                <span className="small-font">City </span> <br />{" "}
                <span className="little-big-font fs-5">{user?.city}</span>
              </div>
              <div className=" content mb-2">
                <span className="small-font">Address </span> <br />{" "}
                <span className="little-big-font fs-5">
                  {user?.address ? user?.address : "Not provided"}
                </span>
              </div>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-12">
              <button
                className="btn btn-primary w-100"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-star-half mb-1 me-1"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z" />
                </svg>
                Provide feedback
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 mb-4 mt-2 p-0 m-0 px-md-4">
          <h4 className="text-uppercase">
            {user?.name ? user?.name : "USER"}'s Events
          </h4>
          {(myEventsLoading || savedEventsLoading) && (
            <Loader message={"Loading..."} />
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
      <div
        className="modal fade"
        id="staticBackdrop"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-light text-dark">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Thank You for Providing Feedback
              </h1>
              <button
                type="button"
                className="btn-close shadow-none"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body h-100">
              <div className="d-flex justify-content-center align-items-center flex-column">
                <p>
                  Your feedback is valuable to us. Please provide your rating
                  below:
                </p>
                <StarRating
                  rating={rating}
                  maxRating={5}
                  starColor="#FFD700"
                  textColor={"white"}
                  onSetRating={setRating}
                  size={20}
                />
                <span className="me-3 text-center">{rating} stars</span>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={submitRating}
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default profilePage;
