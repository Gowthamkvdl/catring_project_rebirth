import React from "react";
import errorImg from "../../assets/error.svg";


const ErrorComponent = () => {
  return (
    <div className="mx-auto text-center my-5">
      <img src={errorImg} alt="" className="img-fluid mx-5 w-50" />
      <h1>Oops! Something went wrong!</h1>
      <h5 className="text-primary">We are trying to fix that.</h5>
    </div>
  );
};
export default ErrorComponent;
