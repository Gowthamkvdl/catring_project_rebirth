import rollingLoading from "../../assets/rollingLoading.svg";
import React, { useState } from "react";
import "./card.css";
import dummyProfilePic from "../../assets/dummyProfilePic.jpg";
import { Link, useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import ProgressBar from "../progressBar/Progressbar";
import DisplayStarRating from "react-star-ratings";

const Card = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const date = item?.startDate;
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString("en-GB");

  const handleNavigation = (postId) => {
    setLoading(true);
    navigate(`/single-page/${postId}`);
    setLoading(false);
  };

  return (
    <div
      className={`card box-shadow w-md-75 w-100   bg-light rounded-4 mt-3 p-3 d-flex justify-content-between`}
    >
      <div
        className="link"
        onClick={() => handleNavigation(item?.postId)}
        style={{ cursor: "pointer" }}
      >
        {item?.cater && (
          <div className="userInfo mb-2 fs-5 d-flex align-items-center gap-2">
            <img
              src={item?.cater.avatar ? item?.cater.avatar : dummyProfilePic}
              className="cardProPic"
              alt=""
            />
            <span className="text-uppercase fs-6">
              {item?.cater.name ? item?.cater.name : "Name"}
            </span>
            {loading && (
              <div className="loading-indicator float-end mb-1">
                <img src={rollingLoading}></img>
              </div>
            )}
          </div>
        )}
        <div className="eventName">
          <h4 className="d-flex justify-content-between p-0 m-0">
            <span className="event-name text-dark">
              {item?.eventName ? item?.eventName : "Event Name"}
              <span className="fs-6">
                {" "}
                ({formattedDate ? formattedDate : "Date"})
              </span>
            </span>
            <span className="float-end"> 
              ₹{item?.salary ? item?.salary : "Salary"}
            </span>
          </h4>
          <div className="location pb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-geo-alt-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
            </svg>
            <span className="text-uppercase ms-1">
              {item?.city ? item?.city : "City"}
            </span>
          </div>
        </div>

        {/* <div className="eventDesc text-dark">
          {item?.description ? item?.description : "Description"}
        </div> */}
        <div className="eventDesc text-dark">
          <b> Address </b> : {item?.address ? item?.address : "Address"}
        </div>
        <div className="content text-dark fs-6 mt-1 m-0 mb-2">
          <b className="">Number of staffs required</b> :{" "}
          {item?.noOfStaffsReq ? item?.noOfStaffsReq : "No of Staffs"}
          <br />
          <div className="float-end">
            status : {item?.noOfStaffsSatisfied} /{" "}
            {item?.noOfStaffsReq ? item?.noOfStaffsReq : "No of Staffs"}
          </div>
          <ProgressBar
            width={(item?.noOfStaffsSatisfied / item?.noOfStaffsReq) * 100}
          />

        </div>
        <div className="extras text-dark">
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
                <span className="fs-6 mb-2">
                  (
                  {item?.cater.totalRating < 1
                    ? "New"
                    : item?.cater.totalRating}
                  )
                </span>
              </div>
            )}
          </div>

          <div className="mx-2 float-end">
            <span className="post-time">
              {item?.createdAt ? format(item?.createdAt) : "Date"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
