import React, { useContext, useEffect } from "react";
import "./homePage.css";
import homeImg from "../../assets/lifting.svg";
import Input from "../../components/input/input";
import ArrowBtn from "../../components/arrowBtn/arrowBtn";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


const HomePage = () => {
  const navigate = useNavigate();
  const {currentUser} = useContext(AuthContext)
  const handleClick = (e) => {
    e.preventDefault(e.target);
    navigate("new-post");
  };


  return (
    <div className="row homepage pt-5 pt-md-0">
      <div className="col-12 col-md-7 my-sm-auto mt-5">
        <div className="hero-section mt-lg-0 mt-3 flex-column d-flex justify-content-center align-item-center">
          <div className="hero-text mb-3">
            <span className="title-text">
              Effortless Connections for Exceptional Events.
            </span>
          </div>
          <p className="fs-5 d-none subtitle-text d-lg-block">
            Our platform not only connects catering contractors with skilled
            server staff but also creates abundant job opportunities for
            servers.
          </p>
          <div className="row mx-1 mx-md-0 gap-4 mt-2">
            {currentUser?.category === "server" && (
              <div className="col-12 box-shadow border rounded-4 p-3">
                <h3 className="mb-2">For Server Staff:</h3>
                <div className="body-text mb-2">
                  Our platform allows you to connect with top contractors
                </div>
                <Input />
              </div>
            )}
            {currentUser?.category === "cater" && (
              <div className="col-12 box-shadow border rounded-4 p-3">
                <h3 className="">For Contractors:</h3>
                <div className="body-text mb-2">
                  Our platform connects you with experienced servers and staff
                  who are ready to work.
                </div>
                <ArrowBtn text="Post Event" handleClick={handleClick} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="col-12 col-md-5 d-flex justify-content-center align-items-center">
        <img src={homeImg} alt="Lifting" className="img-fluid" />
      </div>
    </div>
  );
};

export default HomePage;
