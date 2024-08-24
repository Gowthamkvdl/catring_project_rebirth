import React from 'react'
import "./loader.css"

const Loader = ({message="Loading...", textColor = "light"}) => {
  return (
    <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
      <div class="three-body">
        <div class="three-body__dot"></div>
        <div class="three-body__dot"></div>
        <div class="three-body__dot"></div>
      </div>
      <div className="loading-text text-center mt-2 fs-6">{message}</div>
    </div>
  );
}

export default Loader