import React, { useRef, useState } from "react";
import "./InfoProfileCard.css";
import dummyProfile from "../../assets/dummyProfilePic.jpg";
import { Link } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { Toaster, toast } from "react-hot-toast";

const InfoProfileCard = ({ user }) => {
  const [banned, setBanned] = useState(user.isBanned);
  const [remarks, setRemarks] = useState(user.remarks || "");
  const remarksCloseBtn = useRef(null);
  const deleteCloseBtn = useRef(null);

  const handleBan = async () => {
    try {
      const banResponse = await apiRequest.put(`/user/ban`, {
        userId: user.id,
        banStatus: !banned,
        category: user.category,
      });

      if (banResponse.status === 200) {
        toast.success("User ban status updated successfully", {
          id: "ban-success",
        });
        setBanned(!banned);
      } else {
        toast.error("Failed to update user ban status", { id: "ban-error" });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the user ban status");
    }
  };

  const handleRemarks = async () => {
    try {
      const remarksResponse = await apiRequest.put(`/user/remarks`, {
        userId: user.id,
        remarks: remarks,
        category: user.category,
      });

      if (remarksResponse.status === 200) {
        toast.success("User remarks updated successfully", {
          id: "remarks-success",
        });
      } else {
        toast.error("Failed to update user remarks", { id: "remarks-error" });
      }
      remarksCloseBtn.current.click();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the user remarks");
      remarksCloseBtn.current.click();
    }
  };

const handleDelete = async () => {
  try {
    console.log(user.id, user.category);
    const deleteResponse = await apiRequest.delete(`/user/delete`, {
      data: {
        userId: user.id,
        category: user.category,
      },
    });

    if (deleteResponse.status === 200) {
      toast.success("User deleted successfully", { id: "delete-success" });
      deleteCloseBtn.current.click();
    } else {
      toast.error("Failed to delete user", { id: "delete-error" });
    }
  } catch (error) {
    console.error(error);
    deleteCloseBtn.current.click();
    toast.error("An error occurred while deleting the user", {
      id: "delete-error",
    });
  }
};

  return (
    <div className="mt-2 rounded-4 box-shadow p-3">
      <div className="d-flex flex-wrap align-items-center gap-3">
        <img
          src={user.avatar ? user.avatar : dummyProfile}
          alt="Profile"
          className="proPic"
        />
        <div className="nameAndArea d-flex flex-column">
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
        <div className="ms-auto d-flex  gap-2">
          <div className="ban d-flex gap-1">
            <input
              type="checkbox"
              onChange={handleBan}
              checked={banned}
              name=""
              className="fs-4 shadow-none form-check-input"
              id={`${user.name}`}
            />
            <label htmlFor={`${user.name}`} className="my-auto">
              Is Ban
            </label>
          </div>
          <button
            type="button"
            className="btn btn-info"
            data-bs-toggle="modal"
            data-bs-target={`#remarksModal-${user.id}`}
          >
            Remarks
          </button>
          <button
            type="button"
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target={`#deleteModal-${user.id}`}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Delete Modal */}
      <div
        className="modal fade"
        id={`deleteModal-${user.id}`}
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deleteModalLabel">
                Are you sure?
              </h1>
              <button
                type="button"
                className="btn-close shadow-none"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={deleteCloseBtn}
              ></button>
            </div>
            <div className="modal-body">
              <b>Do you want to delete this user?</b>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Remarks Modal */}
      <div
        className="modal fade"
        id={`remarksModal-${user.id}`}
        tabIndex="-1"
        aria-labelledby="remarksModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="remarksModalLabel">
                User Remarks
              </h1>
              <button
                type="button"
                className="btn-close shadow-none"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={remarksCloseBtn}
              ></button>
            </div>
            <div className="modal-body">
              <textarea
                name=""
                className="form-control shadow-none"
                id=""
                placeholder="Enter the information that you want to add..."
                cols="30"
                rows="10"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              ></textarea>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleRemarks}
                className="btn btn-primary"
              >
                Save Remarks
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoProfileCard;
