import React, { useRef, useEffect } from "react";
import "./progressbar.css";

const Progressbar = ({ width }) => {
  const bar = useRef(null);

  useEffect(() => {
    if (bar.current) {
      bar.current.style.width = `${width}%`;
    }
  }, [width]);

  return (
    <div>
      <div className="progressbar my-2">
        <div className="barBg d-flex align-items-center">
          <div className="bar" ref={bar}></div>
        </div>
      </div>
    </div>
  );
};

export default Progressbar;
