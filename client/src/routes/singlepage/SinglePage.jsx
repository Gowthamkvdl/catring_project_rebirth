import React, { useContext, useState, useEffect } from "react";
import "./singlePage.css";
import dummyProfile from "../../assets/dummyProfilePic.jpg";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest.js";
import { toast } from "react-hot-toast";
import Progressbar from "../../components/progressBar/Progressbar";
import shareIcon from "../../assets/share.svg";
import WhatsappButton from "../../components/contactButtons/WhatsappButton";
import CallButton from "../../components/contactButtons/CallButton";

const SinglePage = () => {
  const post = useLoaderData();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(post.isSaved);
  const [postStatus, setPostStatus] = useState(post.disabled);
  const { currentUser } = useContext(AuthContext);
  const [deleting, setDeleting] = useState(false);
  const [disabling, setDisabling] = useState(false);

  useEffect(() => {
    if (postStatus && post.userId !== currentUser?.userId) {
      navigate("/profile");
      toast("That post is not available", { id: "postStatus" });
    }
  }, [postStatus, post.userId, currentUser?.userId, navigate]);

  const handleSave = async () => {
    setSaved((prev) => !prev);
    if (!currentUser) {
      navigate("/login");
    }
    try {
      await apiRequest.post("user/save", { postId: post.postId });
    } catch (error) {
      console.log(error);
      setSaved((prev) => !prev);
    } finally {
      toast.success(saved ? "Unsaved" : "Saved", {
        id: "save event",
      });
    }
  };

  const handleDisablePost = async () => {
    setDisabling(true);
    setPostStatus((prev) => !prev);
    console.log(post.postId);
    try {
      await apiRequest.put("post/status/" + post.postId);
    } catch (error) {
      console.log(error);
      setPostStatus((prev) => !prev);
      toast.error("Something went wrong!", {
        id: "Error disabling post!",
      });
    } finally {
      toast.success(postStatus ? "Post Enabled " : "Post Disabled", {
        id: "postStatus",
      });
      setDisabling(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await apiRequest.delete(`post/${post.postId}`);
      navigate(-1);
      toast.success("Your Post Deleted Successfully!");
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };
  console.log(post);

  const handleShare = () => {
    // Get the current page URL
    const url = window.location.href;

    // Copy the URL to the clipboard
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log("URL copied to clipboard successfully!");
        // Optionally, you can show a success message to the user
        toast.success("Post link copied to clipboard!", {
          id: "copied",
        });
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
        // Optionally, you can show an error message to the user
        toast.error("Failed to copy post link.", {
          id: "copy error",
        });
      });
  };

  return (
    <div className="singlePage ">
      <div className="d-flex gap-1 justify-content-end mb-2 mx-1">
        <button
          className="btn btn-primary d-flex justify-content-center align-items-center"
          onClick={handleShare}
          title="Share post"
        >
          <img src={shareIcon} alt="" />
        </button>
        <button
          disabled={disabling}
          type="button"
          onClick={handleDisablePost}
          className={`btn btn-secondary  ${
            currentUser && post.caterId === currentUser.id ? "" : "d-none"
          }`}
        >
          {postStatus ? "Enable Post" : "Disable Post"}
        </button>
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          className={`btn btn-danger ${
            currentUser && post.caterId === currentUser.id ? "" : "d-none"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
          </svg>
        </button>
      </div>
      <div className="row text-dark box-shadow py-3 p-md-3 mx-1 rounded-4 bg-light">
        <div className="col-md-7 col-12 h-auto">
          <div className="row">
            <div className="col-12 ">
              <div className="fit-content">
                <Link
                  className="link"
                  to={"/user-profile/?id=" + post?.cater?.id}
                >
                  <div className="user text-dark d-flex align-items-center">
                    <img
                      src={
                        post.cater?.avatar ? post.cater?.avatar : dummyProfile
                      }
                      className="navProPic"
                      alt=""
                    />
                    <span className="name mx-2 body-text text-uppercase">
                      {post?.cater?.name}
                    </span>
                  </div>
                </Link>
              </div>
              <h4 className="mt-1 fs-1 row">
                <div className="col-9 my-auto">{post?.eventName}</div>
                <div className="col-3">
                  <div className="float-end fw-bold p-2 bg-text text-dark rounded">
                    ₹{post?.salary}
                  </div>
                </div>
              </h4>
              <hr />
              <div className="location mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  fill="currentColor"
                  className="bi mb-1 bi-geo-alt-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                </svg>
                <span className="text-dark body-text fw-medium">
                  {post?.city}
                </span>
              </div>
            </div>
          </div>
          <div className="address mb-3 body-text">
            <span className="fw-medium">Address</span>: {post?.address}
          </div>

          <div className="extra d-flex body-text mt-2 bg-text flex-column rounded-3 py-1">
            <div className="fs-3 p-2 fw-semibold">Details</div>
            <div className="workingHrs body-text  p-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                class="bi mb-1 me-1 bi-calendar-event"
                viewBox="0 0 16 16"
              >
                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
              </svg>
              Date: <span className="">{post?.startDate} </span>
            </div>
            <div className="workingHrs  body-text  p-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                class="bi bi-clock mb-1 me-1"
                viewBox="0 0 16 16"
              >
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
              </svg>
              Time: <span className="">{post?.startTime} </span>
            </div>
            <div className="workingHrs body-text  p-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                class="bi bi-calendar-check mb-1 me-1"
                viewBox="0 0 16 16"
              >
                <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
              </svg>{" "}
              Total working days: <span className="">{post?.workingDays}</span>
            </div>
          </div>
          <hr />
          <div className="eventDesc  fs-6 mt-2">
            <span className="body-text fw-medium">Description:</span>
            <p className="p-0 body-text">{post?.description}</p>
          </div>
          <div className="bar row d-flex align-items-center">
            <div className="col-md-9 col-12">
              <span className=" fw-medium  body-text">
                Number of Staff Required
              </span>
              : <span className=" body-text">{post?.noOfStaffsReq}</span>
              <div className="mb-0 mt-2 float-end">
                Status of Recruitment:{" "}
                <span className="fw-medium">
                  {post?.noOfStaffsSatisfied}/{post?.noOfStaffsReq}
                </span>
              </div>
              <Progressbar
                width={(post?.noOfStaffsSatisfied / post?.noOfStaffsReq) * 100}
              />
            </div>
            <div className="col-md-3 col-12 mt-1">
              <div className="join-btn">
                <button className="btn btn-primary w-100 mb-1">
                  I'm Interested
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5 col-12 h-auto ">
          <hr />
          <div className="single-page-contact">
            <h2 className="fs-3 subtitle-text ">Contact</h2>
            <p className="m-0 fs-normal body-text">
              <span className="fw-medium ">Phone:</span> {post?.cater?.phone}{" "}
            </p>
            <div className="d-flex mt-1 gap-2 mb-2 w-100">
              <WhatsappButton
                phoneNumber={post?.cater?.phone}
                message={"Hi, I am interested in your job. Please contact me."}
              />{" "}
              <CallButton phoneNumber={post?.cater?.phone} />{" "}
            </div>
          </div>
          <div className="btns d-flex  mt-2">
            <div className="save rounded-2 w-100">
              <button className="btn w-100 btn-primary" onClick={handleSave}>
                {saved ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="white"
                    className="bi bi-bookmark-fill me-1"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="white "
                    className="bi bi-bookmark me-1"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                  </svg>
                )}
                {saved ? "Event Saved" : "Save Event"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade "
        id="staticBackdrop"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-light text-dark">
            <div className="modal-header">
              <h1 className="modal-title body-text" id="staticBackdropLabel">
                Are you sure?
              </h1>
              <button
                type="button"
                className="btn-close shadow-none"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body h-100">
              Do you want to delete this post??
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={deleting}
                type="button"
                onClick={handleDelete}
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Delete Post?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
