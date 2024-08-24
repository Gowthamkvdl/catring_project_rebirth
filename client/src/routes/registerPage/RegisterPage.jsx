import React from "react";
import "./registerPage.css";
import jobHuntSvg from "../../assets/jobImg.svg";
import InputField from "../../components/inputField/InputField";
import { Link } from "react-router-dom";
import { useState } from "react";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {};

  return (
    <div>
      <div className="row box-shadow bg-white text-dark rounded-4 mx-1 mb-lg-5 mb-5">
        <div className="col-12 col-lg-6  p-0 p-md-5 d-flex justify-content-center align-items-center">
          <img src={jobHuntSvg} alt="" />
        </div>
        <div className="col-12 col-lg-6 p-4 pt-0 p-md-5 form">
          <h1 className="title-bg-white">Register</h1>
          <form action="" onSubmit={handleSubmit}>
            <InputField
              label={"Name"}
              inputType={"text"}
              inputName={"username"}
              minLength={3}
              maxLength={15}
              pattern={"^\\s*[a-zA-Z0-9_]+\\s*$"}
              title={
                "Username should be 3-15 characters long and can only contain letters, numbers, and underscores. No spaces or special symbols are allowed."
              }
            />
            <InputField
              label={"Age"}
              inputType={"number"}
              inputName={"age"}
              min={18}
            />
            <InputField label={"City"} inputType={"text"} inputName={"city"} />
            <InputField
              label={"Phone"}
              inputType={"text"}
              inputName={"phone"}
              minLength={10}
              maxLength={10}
            />
            <span className="small-text">
              You will receive an OTP on this number.
            </span>
            <div className="role d-flex mt-2">
              <label class="radio-button  text-dark">
                <input type="radio" name="role" value="server"></input>
                <span class="radio"></span>I want a job
              </label>

              <label class="radio-button text-dark">
                <input type="radio" name="role" value="cater"></input>
                <span class="radio "></span>I want to hire
              </label>
            </div>
            <Link className="float-end mt-2" to={"/login"}>
              Already have an account?
            </Link>
            <button
              disabled={loading}
              className="btn btn-primary w-100 my-4 fs-5"
            >
              Send OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
