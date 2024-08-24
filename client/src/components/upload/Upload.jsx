import { createContext, useEffect, useState } from "react";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function UploadWidget({ uwConfig, setAvatar }) {
  const [loaded, setLoaded] = useState(false);
  const [widget, setWidget] = useState(null);

  useEffect(() => {
    const uwScript = document.getElementById("uw");
    if (!uwScript) {
      const script = document.createElement("script");
      script.setAttribute("async", "");
      script.setAttribute("id", "uw");
      script.src = "https://upload-widget.cloudinary.com/global/all.js";
      script.addEventListener("load", () => {
        console.log("Cloudinary script loaded");
        setLoaded(true);
      });
      script.addEventListener("error", () => {
        console.error("Failed to load Cloudinary script");
      });
      document.body.appendChild(script);
    } else {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (loaded && !widget) {
      const pollForCloudinary = () => {
        if (window.cloudinary) {
          console.log("Cloudinary object found on window");
          const myWidget = window.cloudinary.createUploadWidget(
            uwConfig,
            (error, result) => {
              if (!error && result && result.event === "success") {
                console.log("Done! Here is the image info: ", result.info);
                setAvatar(result.info.secure_url);
              }
            }
          );
          setWidget(myWidget);
        } else {
          console.log("Cloudinary object not found, retrying...");
          setTimeout(pollForCloudinary, 100); // Retry after 100ms
        }
      };

      pollForCloudinary();
    }
  }, [loaded, widget, uwConfig, setAvatar]);

  const handleClick = () => {
    if (widget) {
      widget.open(); // Open the widget when the button is clicked
    } else {
      console.error("Widget not initialized");
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget"
        className="btn btn-primary mx-auto"
        onClick={handleClick}
        disabled={!loaded} // Disable the button until the script is loaded
      >
        Upload profile image 
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default UploadWidget;
export { CloudinaryScriptContext };
