import React, { useEffect } from "react";
import "./googleTranslate.css";

const GoogleTranslate = () => {
  useEffect(() => {
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      );
    }
  }, []);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
