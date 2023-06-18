import { useState } from "react";

const NavigationBar = ({ handleThemeToggle, isDarkTheme, className, expanded }) => {
    
  
    return (
      <div className={`navigation-bar ${className}`}>
      
        {expanded && (
          <ul className="navigation-options">
            <li>Profile</li>
            <li>General Settings</li>
          </ul>
        )}
        <div className="theme-toggle">
          <span>Toggle Theme</span>
          <label className="switch">
            <input type="checkbox" onChange={handleThemeToggle} checked={isDarkTheme} />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    );
  };



  export default NavigationBar;
  