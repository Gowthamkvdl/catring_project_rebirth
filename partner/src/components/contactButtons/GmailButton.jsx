import React from "react";

const GmailButton = ({ email, subject, body }) => {
  const openGmail = (email, subject, body) => {
    const url = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      className="btn btn-sm btn-danger mb-1"
      onClick={() => openGmail(email, subject, body)}
    >
      <ion-icon
        name="mail"
        style={{ fontSize: "18px", marginTop: "3px" }}
      ></ion-icon>
    </button>
  );
};

export default GmailButton;
