import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import "./backbtn.css";

const BackBtn = ({ color = 'black', link, opacity }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === "/list") {
    navigate("/");
    }else{
      navigate(link ? link : -1);
    }
  };

  const btnColor = color === 'black' ? 'black' : 'var(--text)';

  return (
    <button
      onClick={handleClick}
      className={`backBtn btn btn-link mt-2 opacity-${opacity} fit-content p-0 m-0 shadow-none`}
      style={{ color: btnColor }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        className="bi bi-arrow-left float-start mb-2"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
          style={{ fill: btnColor }}
        />
      </svg>
    </button>
  );
};

export default BackBtn