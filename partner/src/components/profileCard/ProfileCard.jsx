import React, { useEffect, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import dummyProfile from "../../assets/dummyProfilePic.jpg";
import "./profileCard.css";
import CallButton from "../../components/contactButtons/CallButton";
import { toast } from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";

const ProfileCard = ({ serverId, status, postId }) => {
  const [user, setUser] = useState(null); // Initialize state to hold user data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [interestedStatus, setInterestedStatus] = useState(status); // State for interest status

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await apiRequest.get(`/user/oneServer/${serverId}`);
        setUser(response.data); // Update the user state with the fetched data
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.log(error);
        setLoading(false); // Ensure loading is false even in case of error
      }
    };
    getUser();
  }, [serverId]);
 
  if (loading) {
    return <div>Loading profiles</div>; // Render a loading message while fetching data
  }

  if (!user) {
    return <div>User not found</div>; // Handle the case where no user data is available
  }

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setInterestedStatus(newStatus);

    try {
      // Example API call to update interest status on the server
      await apiRequest.put(`partner/intrestedStatus`, {
        status: newStatus,
        serverId: serverId,
        postId:  postId
      });
      console.log("Status updated successfully");
      toast.success("Status updated successfully",{
        id:"status-updated",
      });
    } catch (error) {
      console.error("Error updating status", error);
      toast.success("Error updating status", {
        id: "error-status-update",
      });
    }
  };

  return (
    <div className="mt-2 rounded-4 box-shadow p-3">
      <div className="d-flex align-items-center gap-3">
        <img
          src={user.avatar ? user.avatar : dummyProfile}
          alt=""
          className="proPic"
        />
        <div className="nameAndArea d-flex flex-column ">
          <Link to={`/user-profile?id=${user.id}`} className="link">
            <h3 className="m-0">{user.name}</h3>
            <div className="phone">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-telephone-fill me-1 mb-1"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                />
              </svg>
              {user.phone}
            </div>
          </Link>
        </div>
        <div className="ms-auto d-flex ">
          <select
            name="interestedStatus"
            value={interestedStatus}
            onChange={handleStatusChange}
            className="form-select me-1 shadow-none"
          >
            <option value="notContactedyet">Null</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
          <CallButton phoneNumber={user.phone} />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
