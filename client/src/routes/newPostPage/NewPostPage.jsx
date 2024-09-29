import React, { useState } from "react";
import "./newPostPage.css";
import apiRequest from "../../lib/apiRequest.js";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import rollingLoading from "../../assets/rollingLoading.svg";


const NewPostPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const {currentUser, updateUser} = useContext(AuthContext);

  useEffect(() => {
    console.log(currentUser)
    if (currentUser?.category === "server") {
      navigate("/");
    }
  }, []); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const eventName = formData.get("eventName").trim();
    const salary = formData.get("salary").trim();
    const city = formData.get("city").trim();
    const workingDays = formData.get("workingDays").trim();
    const startDate = formData.get("startDate").trim();
    const startTime = formData.get("startTime").trim();
    const noOfStaffs = formData.get("noOfStaff").trim();
    const address = formData.get("address").trim();
    const description = formData.get("description").trim();

    try {
      setError("");
      setIsLoading(true);


      const post = await apiRequest.post("/post", {
        eventName,
        salary: parseInt(salary, 10),
        city,
        workingDays: parseInt(workingDays, 10),
        startDate,
        startTime,
        noOfStaffsReq: parseInt(noOfStaffs, 10),
        description,
        address
      });

      navigate(`/single-page/${post.data.postId}`);
      toast.success("Your post is now live!");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="newPostPage mb-5">
      <form action="" onSubmit={handleSubmit}>
        <div className="row p-lg-3 py-3 bg-white box-shadow rounded-4 newPostPage mx-1">
          <h3 className="subtitle-text text-uppercase">Post New Event</h3>
          <div className="col-12 px-2 col-lg-7">
            <div className="mb-3 d-flex gap-3">
              <div className="name flex-fill">
                <label htmlFor="eventName" className="form-label mb-0">
                  Event Name
                </label>
                <input
                  required
                  id="eventName"
                  type="text"
                  name="eventName"
                  className="form-control shadow-none"
                />
              </div>
              <div className="input-group w-50">
                <label htmlFor="salary" className="form-label mb-0 w-100">
                  Salary
                </label>
                <span className="input-group-text">₹</span>
                <input
                  required
                  id="salary"
                  min={200}
                  type="number"
                  className="form-control shadow-none"
                  name="salary"
                />
              </div>
            </div>
            <div className="mb-3 d-flex gap-3">
              <div className="name flex-fill">
                <label htmlFor="city" className="form-label mb-0">
                  City
                </label>
                <input
                  required
                  id="city"
                  type="text"
                  name="city"
                  className="form-control shadow-none"
                  min={today}
                />
              </div>
              <div className="workingHour flex-fill">
                <label htmlFor="workingHours" className="form-label mb-0">
                  Total Working Days
                </label>
                <input
                  required
                  id="workingDays"
                  type="number"
                  className="form-control shadow-none"
                  name="workingDays"
                  min={1}
                />
              </div>
            </div>
            <div className="form-group row mb-3">
              <label for="startDate" className="col-sm-1 col-form-label">
                Date
              </label>
              <div className="col-sm-5">
                <input
                  required
                  type="date"
                  className="form-control shadow-none"
                  id="startDate"
                  name="startDate"
                  min={today}
                ></input>
              </div>
              <label for="startTime" className="col-sm-1 col-form-label">
                Time
              </label>
              <div className="col-sm-5">
                <input
                  required
                  type="time"
                  className="form-control shadow-none"
                  id="startTime"
                  name="startTime"
                ></input>
              </div>
            </div>
            <div className="mb-3 d-flex gap-3">
              <div className="noOfStaf w-50 flex-fill">
                <label htmlFor="noOfStaff" className="form-label mb-0">
                  No. of Staffs Required
                </label>
                <input
                  required
                  id="noOfStaff"
                  type="number"
                  name="noOfStaff"
                  className="form-control shadow-none"
                  min={1}
                />
              </div>
            </div>
          </div>
          <div className="col-12 px-2 col-lg-5">
            <div className="mb-3">
              <label htmlFor="eventLocation" className="form-label mb-0">
                Address (Event Location)
              </label>
              <textarea
                required
                rows={3}
                id="eventLocation"
                name="address"
                className="form-control shadow-none"
                minLength={10}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="eventDescription" className="form-label mb-0">
                Event Description (Optional)
              </label>
              <textarea
                rows={2}
                id="eventDescription"
                name="description"
                className="form-control shadow-none"
              ></textarea>
            </div>
            <p className="small-text">
              Please note: Once you've posted this, further edits won't be
              possible.
            </p>

            <button
              disabled={isLoading}
              type="submit"
              className="btn w-100 fs-4 btn-primary mt-0 my-2"
            >
              <div className="d-flex justify-content-center align-items-center">
                {isLoading && (
                  <div className="loading-indicator me-1  d-flex align-items-center">
                    <img src={rollingLoading} alt="Loading..." />
                  </div>
                )}
                <span>Post Event</span>
              </div>
            </button>

            {error && <span className="content text-dark">{error}</span>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewPostPage;
