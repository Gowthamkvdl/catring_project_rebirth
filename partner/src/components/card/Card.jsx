import rollingLoading from "../../assets/rollingLoading.svg";
import React, { useState } from "react";
import "./card.css";
import dummyProfilePic from "../../assets/dummyProfilePic.jpg";
import { Link, useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import ProgressBar from "../progressBar/Progressbar";
import DisplayStarRating from "react-star-ratings";

const Card = ({ item, intrested }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const date = item?.startDate;
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString("en-GB");

  const handleNavigation = (postId) => {
    setLoading(true);
    navigate(`/single-page/${postId}`, {
      state: { from: location.pathname },
    });
  };

  return (
    <div
      className={`card box-shadow w-md-75 w-100  rounded-4 mt-3  d-flex justify-content-between`}
    >
      <div
        className="link"
        onClick={() => handleNavigation(item?.postId)}
        style={{ cursor: "pointer" }}
      >
        {item?.cater && (
          <div className="userInfo bg-primary text-light rounded-top-4 px-3 pt-2 pb-1 mb-2 fs-5 d-flex align-items-center gap-2">
            <img
              src={item?.cater.avatar ? item?.cater.avatar : dummyProfilePic}
              className="cardProPic mb-1"
              alt=""
            />
            <span className="text-uppercase body-text mt-1">
              {item?.cater.name ? item?.cater.name : "Name"}
              <div className="">
                {item?.cater && (
                  <div className="d-flex align-items-center">
                    <div className="rating">
                      <DisplayStarRating
                        rating={item?.cater.averageRating}
                        numberOfStars={5}
                        starDimension="20px"
                        starRatedColor="#FFD700"
                        starSpacing="0px"
                      />
                    </div>
                    <span className="fs-6">
                      (
                      {item?.cater.totalRating < 1
                        ? "New"
                        : item?.cater.totalRating}
                      )
                    </span>
                  </div>
                )}
              </div>
            </span>

            {loading && (
              <div className="loading-indicator">
                <img src={rollingLoading} alt="Loading..."></img>
              </div>
            )}
            <span className="bg-white fw-bold text-dark fs-3 rounded-3 px-2 ms-auto">
              ₹{item?.salary ? item?.salary : "Salary"}
            </span>
          </div>
        )}
        <div className="m-3 ">
          <div className="eventName">
            <div className="location">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-geo-alt-fill "
                viewBox="0 0 16 16"
              >
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
              </svg>
              <span className="text-uppercase">
                {item?.city ? item?.city : "City"}
              </span>
            </div>
            <h4 className="d-flex justify-content-between p-0 m-0">
              <span className="event-name text-dark">
                {item?.eventName ? item?.eventName : "Event Name"}
                <span className="fs-6">
                  {" "}
                  ({formattedDate ? formattedDate : "Date"})
                </span>
              </span>
            </h4>
          </div>

          <div className="eventDesc text-dark">
            <span className="fw-medium">Address</span>:{" "}
            {item?.address ? item?.address : "Address"}
          </div>
          <hr className="my-2" />
          <div className="content text-dark fs-6">
            <span className="fw-medium">Number of staffs required</span>:{" "}
            {item?.noOfStaffsReq ? item?.noOfStaffsReq : "No of Staffs"}
            <br />
            {/* <div className="float-end">
              status: {item?.noOfStaffsSatisfied} /{" "}
              {item?.noOfStaffsReq ? item?.noOfStaffsReq : "No of Staffs"}
            </div>
            <ProgressBar
              width={(item?.noOfStaffsSatisfied / item?.noOfStaffsReq) * 100}
            /> */}
          </div>
          <div className="extras text-dark">
            <div className=" mb-3 float-end">
              <span className="post-time">
                {item?.createdAt ? format(item?.createdAt) : "Date"}
              </span>
            </div>
          </div>

          {intrested && (
            <div className="body-text text-center opacity-90 mt-2">
              {" "}
              <span className="text-bg-success rounded-3 px-2 py-1">
                {item.interestCount}
              </span>{" "}
              peoples intrested in this post
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
