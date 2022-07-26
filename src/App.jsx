import React, { useState, useRef } from "react";
import { nanoid } from "nanoid";
import windowIcon from "./images/window_icon.png";
import notepadIcon from "./images/notepad_icon.png";
import startImage from "./images/start_image.png";
import ResizeDrag from "./components/ResizeDrag";

import "./App.css";

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function App() {
  const [apps, setApps] = useState({});
  const dashboardRef = useRef();

  const close = (appId) => {
    const newApps = { ...apps };
    delete newApps[appId];
    setApps(newApps);
  };

  const setActive = (appId) => {
    const newApps = { ...apps };
    const prevActiveId = Object.keys(newApps).find(
      (key) => newApps[key].isActive === true
    );
    if (prevActiveId) {
      newApps[prevActiveId].isActive = false;
    }

    if (appId) {
      newApps[appId].isActive = true;
    }
    setApps(newApps);
  };

  function toggleMinimize(appId) {
    const updatedApp = apps[appId];
    updatedApp.isMinimized = !updatedApp.isMinimized;
    setApps((prev) => ({ ...prev, [appId]: updatedApp }));
  }

  function open(name, width, height, icon) {
    const id = nanoid();
    const app = {
      id,
      name,
      icon,
      width,
      height,
      x: getRandomArbitrary(0, dashboardRef.current.clientWidth - 320),
      y: getRandomArbitrary(0, dashboardRef.current.clientHeight - 200),
      isMinimized: false,
    };
    setApps((prev) => ({ ...prev, [id]: app }));
  }

  function handleClick(event) {
    switch (event.detail) {
      case 1: {
        break;
      }
      default: {
        open("window.exe", 320, 200, windowIcon);
        break;
      }
    }
  }

  function openNotePad(event) {
    switch (event.detail) {
      case 1: {
        break;
      }
      default: {
        open("credits.txt - Notepad", 320, 200, notepadIcon);
        break;
      }
    }
  }

  return (
    <main>
      <div className="dashboard" ref={dashboardRef}>
        <div className="icons">
          <div className="icon">
            <img src={windowIcon} onClick={handleClick} />
            <span>window.exe</span>
          </div>
          <div className="icon">
            <img src={notepadIcon} onClick={openNotePad} />
            <span>credits.txt</span>
          </div>
          <div className="window" style={{width: "100px", height: "100px"}}></div>
        </div>

        {Object.values(apps).map((app, i) => (
          <ResizeDrag
            app={app}
            controls={{ toggleMinimize, close }}
            setActive={setActive}
            key={app.id}
            originalZ={i}
            dashboardRef={dashboardRef}
          />
        ))}
      </div>

      <div className="bottom-nav">
        <div className="start-menu">
          <div className="start-button">
            <img src={startImage} />
          </div>
          <div className="vertical-spacer">
            <div className="line-one"></div>
            <div className="line-two"></div>
          </div>
        </div>
        <div className="open-applications">
          {Object.values(apps).map((app) => {
            return (
              <div
                className={`application-tab ${
                  app.isActive ? "active-tab" : ""
                }`}
                id={app.id}
                key={app.id}
                onClick={() => {
                  if (app.isActive) {
                    toggleMinimize(app.id);
                  } else if (app.isMinimized) {
                    toggleMinimize(app.id);
                    setActive(app.id);
                  } else {
                    setActive(app.id);
                  }
                }}
              >
                <div className="application-icon">
                  <img src={app.icon} />
                </div>

                <div className="text">{app.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default App;