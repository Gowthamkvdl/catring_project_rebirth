import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProgressBar from "../progressBar/Progressbar";
import DisplayStarRating from "react-star-ratings";
import "./card.css";

const CardSkeleton = ({ NoOfCards }) => {
  return Array(NoOfCards)
    .fill(0)
    .map((item, index) => (
      <div
        key={index}
        className={`card box-shadow w-md-75 w-100 rounded-4 mt-3 d-flex justify-content-between`}
      >
        <div className="link" style={{ cursor: "pointer" }}>
          <div className="userInfo bg-primary text-light rounded-top-4 px-3 pt-2 pb-1 mb-2 fs-5 d-flex align-items-center gap-2">
            <Skeleton circle={true} width={40} height={40} />
            <span className="text-uppercase body-text mt-1">
              <Skeleton width={100} />
              <div className="d-flex align-items-center mt-1">
                <DisplayStarRating
                  rating={0}
                  numberOfStars={5}
                  starDimension="20px"
                  starRatedColor="#FFD700"
                  starSpacing="0px"
                />
                <span className="fs-6 mb-2 ms-1">
                  <Skeleton width={20} />
                </span>
              </div>
            </span>
            <div className="loading-indicator ms-auto">
              <Skeleton width={100} height={30} />
            </div>
          </div>

          <div className="m-3">
            <div className="eventName">
              <div className="location d-flex align-items-center">
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
                  <Skeleton width={70} />
                </span>
              </div>
              <h4 className="d-flex justify-content-between p-0 m-0">
                <span className="event-name text-dark">
                  <Skeleton width={180} />
                  <span className="fs-6 ms-1">
                    <Skeleton width={60} />
                  </span>
                </span>
              </h4>
            </div>

            <div className="eventDesc text-dark">
              <Skeleton width={250} height={20} />
            </div>
            <hr className="my-2" />
            <div className="content text-dark fs-6">
              <Skeleton width={200} />
              <br />
              <div className="float-end">
                <Skeleton width={120} />
              </div>
              <ProgressBar width={0} /> {/* Skeleton Progress Bar */}
            </div>
            <div className="extras text-dark">
              <div className="mb-3 float-end">
                <Skeleton width={60} />
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
};

export default CardSkeleton;
