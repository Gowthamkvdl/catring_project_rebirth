import React from "react";

const WhatsappButton = ({ phoneNumber, message }) => {
  const openWhatsApp = (phoneNumber, message) => {
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <button
      className="btn btn-sm btn-success mb-1 "
      onClick={() => openWhatsApp(phoneNumber, message)}
    >
      <ion-icon name="logo-whatsapp" style={{ marginTop: "3px" , fontSize: "18px" }}></ion-icon>
    </button>
  );
};

export default WhatsappButton;
