import React, { useContext, useState } from "react";
import "./profileUpdatePage.css";
import dummyProfilePic from "../../assets/dummyProfilePic.jpg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest.js";
import UploadWidget from "../../components/upload/Upload";
import { toast } from "react-hot-toast";

const profileUpdatePage = () => {
  const navigate = useNavigate();
  const { currentUser, updateUser } = useContext(AuthContext);
  const [isLodaing, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState(currentUser?.avatar);

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const city = formData.get("city");
    const name = formData.get("name");
    const address = formData.get("address");


    try {
      setIsLoading(true);
      const response = await apiRequest.put(`/user/${currentUser?.id}`, {
        city,
        address,
        name,
        avatar,
      });
      updateUser({...response.data.updatedUser, category: response.data.category});
      navigate("/profile");
      toast.success("Profile Updated Successfully!", {
        id: "profile update",
      });
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };


  const handleDelete = async () => {
    try {
      await apiRequest.delete("/user/" + currentUser?.id);
      await apiRequest.post("/auth/logout");
      localStorage.removeItem("user");
      updateUser(null);
      navigate("/");
      // Reload the page after navigating
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="updateProfile bg-white ">
        <div className="row">
          <div className="col-12 col-md-7">
            <h2 className="title-text text-uppercase">
              EDIT PROFILE
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                className={`btn btn-danger float-end`}
              >
                Delete Account
              </button>
            </h2>
            <div className="profile bg-light text-dark mx-2 mx-md-0 py-4 rounded-4 box-shadow mt-4 row">
              <div className="profilePic  d-flex pb-3  pt-2 p-md-0 pb-md-0  flex-column col-12 col-md-4">
                <img
                  src={avatar || dummyProfilePic}
                  alt=""
                  className="img-fluid mb-2 px-md-2 rounded-4"
                />
                <UploadWidget
                  uwConfig={{
                    cloudName: "gowthamk",
                    uploadPreset: "catring",
                    multiple: false,
                    maxImageFileSze: 2621440,
                    sources: ["local", "camera"],
                    clientAllowedFormats: ["image"],
                    folder: "avatar",
                  }}
                  setAvatar={setAvatar}
                />
              </div>
              <div className="profileInfo col-12 col-md-8">
                <form action="" onSubmit={handleSave}>
                  <div className=" content mb-2">
                    Name
                    <input
                      type="text"
                      className="form-control form-control-sm fs-5 shadow-none"
                      defaultValue={currentUser?.name}
                      name="name"
                    />
                  </div>
                  <div className=" content mb-2">
                    City
                    <input
                      type="text"
                      className="form-control form-control-sm fs-5 shadow-none"
                      defaultValue={currentUser?.city}
                      name="city"
                    />
                  </div>
                  <div className=" content mb-3">
                    Address
                    <textarea
                      name="address"
                      className="form-control form-control-sm fs-5 shadow-none"
                    >
                      {currentUser?.address}
                    </textarea>
                  </div>
                  <button
                    disabled={isLodaing}
                    type="submit"
                    className="btn btn-primary float-end"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-5 mb-5"></div>
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
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
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
              Do you want to delete your Account
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
                type="button"
                onClick={handleDelete}
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Delete Accounnt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default profileUpdatePage;
