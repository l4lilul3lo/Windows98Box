import React, { useState, useEffect } from 'react';
import Tab from '../tab/Tab';
import windowsLogo from '../../images/windows_logo.png';
import "./taskbar.css";
const TaskBar = ({ apps, toggleMinimize, setActive, dashboardRef, rightClicked, setRightClicked, controls }) => {
  const [isActive, setIsActive] = useState(false);



  return (
    <div className="task-bar">
      <div className="start-menu">
        <div className={`start-button ${isActive ? 'active' : 'inactive'}`} onClick={() => setIsActive(!isActive)}>
          <img src={windowsLogo} />
          <span>Start</span>
          {isActive && <div className="dropup">
            <div className="dropup-content">
              <div className="start-menu-sidebar">
                <span className="fat-letters">Windows</span>
                <span className="skinny-98">98</span>
                <span className="fat-letters">Replit Edition</span>
              </div>
              <div className="start-menu-content">
                <div>this</div>
                <div>that</div>
              </div>
            </div>
          </div>

          }
        </div>
        <div className="vertical-spacer">
          <div className="line-one"></div>
          <div className="line-two"></div>
        </div>
      </div>
      <div className="open-applications">
        {Object.values(apps).map((app) => {
          return (
            <Tab key={app.id} app={app} toggleMinimize={toggleMinimize} setActive={setActive} dashboardRef={dashboardRef} setRightClicked={setRightClicked} rightClicked={rightClicked} controls={controls} />
          );
        })}
      </div>
    </div>
  );
};

export default TaskBar;
