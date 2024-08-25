import React from 'react'
import "./aboutPage.css"
import story from "../../assets/story.svg"


const AboutPage = () => {
  return (
    <div>
      <div className="wrapper">
        <h1 className="title">About</h1>
        <div className="container ">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-6">
              <img src={story} className="img-fluid " alt="" />
            </div>
            <div className="col-12 col-md-6 px-0">
              <div className=" fs-3 subtitle-text ">
                The Challenges We Address
              </div>
              <div className="mt-2">
                <h1 className="title-text mb-3 px-0">Our Story</h1>
                <p className="body-text">
                  At CATRING, we effortlessly bridge the gap between catering
                  contractors and skilled server staff. Whether you're a server
                  seeking exciting job opportunities or a contractor looking for
                  top talent, our platform streamlines the process. Connect,
                  interact, and find the perfect match with ease, transforming
                  your catering experience and securing the ideal gig or staff.
                </p>
              </div>
            </div>
            <hr className="text-center mx-auto" />
          </div>
          <div className="row">
            <div className=" fs-3 mt-3 px-0 mb-3">
              What problem we are solving?
            </div>
            <div className="col-12 col-lg-5 mx-auto px-0">
              <div className="">
                <h3 className="title-text fs-1 mb-1">For Server Staff</h3>
                <p className=" body-text">
                  Finding it hard to discover exciting job opportunities in the
                  catering industry? Our platform allows you to connect with top
                  contractors, showcase your skills, and find work that fits
                  your schedule. Streamline your job search and secure the
                  perfect gig with ease.
                </p>
              </div>
            </div>
            <div className="col-12 col-lg-5 mx-auto px-0">
              <div className="">
                <h3 className="title-text fs-1 mb-1">For Contractors</h3>
                <p className=" body-text">
                  Struggling to find reliable and skilled staff for your
                  catering events? Our platform connects you with experienced
                  servers and staff who are ready to work. Easily hire the
                  perfect team to ensure your events run smoothly. Simplify your
                  hiring process and focus on delivering exceptional service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage