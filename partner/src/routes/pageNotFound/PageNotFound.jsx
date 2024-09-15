import React from 'react'
import "./pageNotFound.css"
import error404 from "../../assets/404-error.svg"
import {Link} from "react-router-dom"

const pageNotFound = () => {
  return (
    <div>
      <div className="mx-auto text-center my-5 ">
        <img src={error404} alt="" className="img-fluid img404 px-md-5 mx-md-5 w-md-50" />
        <h1 className="fs-1">Page not found (404)</h1>
        <h5 className="text-primary">Oops! It seems like the page you are looking for does not exist.</h5>
        <Link to={"/"} className="btn btn-primary my-2">Back to Home</Link>
      </div>
    </div>
  );
}

export default pageNotFound