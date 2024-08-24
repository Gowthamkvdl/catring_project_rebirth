import React from "react";
import "./theme.css";

const Theme = () => {

  const setDarkMode = () => {
    document.querySelector("body").setAttribute('data-theme', 'dark')
    localStorage.setItem('selectedTheme', 'dark')
  }
  const setLightMode = () => {
    document.querySelector("body").setAttribute('data-theme', 'light')
    localStorage.setItem('selectedTheme', 'light')
  }

  const selectedTheme = localStorage.getItem(`selectedTheme`)

  if(selectedTheme === 'dark'){
    setDarkMode();
  }

  const toogleTheme = e =>{
    if(e.target.checked){
      setDarkMode();
    }else{
      setLightMode();
    }
  }

  return (
    <div>
      <label className="ui-switch mt-1">
        <input type="checkbox" onChange={toogleTheme} defaultChecked={selectedTheme==="dark"}  ></input>
        <div className="slider">
          <div className="circle"></div>
        </div>
      </label>
    </div>
  );
};

export default Theme;
