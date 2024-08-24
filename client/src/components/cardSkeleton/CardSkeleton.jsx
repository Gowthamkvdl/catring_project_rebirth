import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DisplayStarRating from "react-star-ratings"
import ProgressBar from "../progressBar/Progressbar";

const CardSkeleton = ({NoOfCards}) => {
  return Array(NoOfCards)
    .fill(0)
    .map((item, index) => (
      <div key={index} >
        <div
          className={`card box-shadow w-md-75 w-100 bg-light rounded-4 mt-3 p-3 d-flex justify-content-between`}
        >
          <div className="link">
            <div className="userInfo mb-2 fs-5 d-flex align-items-center gap-2">
              <Skeleton circle={true} width={40} height={40} />
              <span className="text-uppercase fs-6">
                <Skeleton width={100} />
              </span>
            </div>

            <div className="eventName">
              <h4 className="d-flex justify-content-between p-0 m-0">
                <span className="event-name text-dark">
                  <Skeleton width={240} height={15} />
                </span>
                <span className="float-end ">
                  <Skeleton width={80} height={25} />
                </span>
              </h4>
              <div className="location pb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#ebebeb"
                  className="bi bi-geo-alt-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                </svg>
                <span className="text-uppercase ms-1">
                  <Skeleton width={70} height={15} />
                </span>
              </div>
            </div>
            <div className="eventDesc text-dark">
              <Skeleton width={300} height={15} />
            </div>
            <div className="content text-dark fs-6  m-0 ">
              <Skeleton width={240} height={15} />
              <br />
              <Skeleton width={50} className="float-end" height={15} />
              <Skeleton width={340} height={10} />
            </div>
            <div className="extras text-dark">
              <div className="">
                <div className="d-flex align-items-center">
                  <div className="rating">
                    <DisplayStarRating
                      rating={0}
                      numberOfStars={5}
                      starDimension="20px"
                      starRatedColor="#ebebeb"
                      starSpacing="0px"
                    />
                  </div>
                </div>
              </div>

              <div className="mx-2 float-end">
                <span className="post-time">
                  <Skeleton width={30} height={10} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
};

export default CardSkeleton;
