import React, { useState } from 'react'
import jobHuntSvg from "../../assets/jobImg.svg"
import InputField from "../../components/inputField/InputField"
import { Link } from 'react-router-dom'


const LoginPage = () => {
    const [loading, setLoading] = useState(false)
    const handleSubmit = () => {

    }

  return (
    <div>
      <div className="row box-shadow bg-white text-dark rounded-4 mx-1 mb-lg-0 mb-5">
        <div className="col-12 col-lg-6  p-0 p-md-5">
          <img src={jobHuntSvg} alt="" />
        </div>
        <div className="col-12 col-lg-6 p-4 pt-0 my-auto p-md-5 form">
          <h1 className="title-bg-white">Login</h1>
          <form action="" onSubmit={handleSubmit}>
            <InputField
              label={"Phone"}
              inputType={"text"}
              inputName={"username"}
            />
            <span className="small-text">
              You will receive an OTP on this number.
            </span>
            <Link className="float-end mt-2" to={"/register"}>
              Don't have an account?
            </Link>
            <div className="mt-2 opacity-95"></div>
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
}

export default LoginPage