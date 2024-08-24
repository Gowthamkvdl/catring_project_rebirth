import React from 'react'
import noData from "../../assets/noData.svg"

const NoData = ({text, heading}) => {
  return (
    <div>
      <div className="mx-auto text-center my-5">
        <img src={noData} alt="" className="img-fluid mx-5 w-50" />
        <h1>{heading}</h1>
        <h5 className="text-primary">{text}</h5>
      </div>
    </div>
  );
}

export default NoData