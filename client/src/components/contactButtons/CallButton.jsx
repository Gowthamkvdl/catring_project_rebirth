import React from 'react'

const CallButton = ({phoneNumber}) => {
  const openPhoneApp = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <button
      className="btn btn-sm btn-primary mb-1 "
      onClick={() => openPhoneApp(phoneNumber)}
    >
      <ion-icon
        name="call"
        style={{ marginTop: "3px", fontSize: "18px" }}
      ></ion-icon>
    </button>
  );
}

export default CallButton