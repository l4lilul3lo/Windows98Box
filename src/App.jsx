import React, { useState, useRef } from "react";
import { nanoid } from "nanoid";
import windowIcon from "./images/window_icon.png";
import notepadIcon from "./images/notepad_icon.png";
import ResizeDrag from "./components/ResizeDrag";
import TaskBar from "./components/taskbar/TaskBar";
import githubIcon from './images/github_icon.png'
import wwwChatIcon from './images/www-chat_icon.png';
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
      x: getRandomArbitrary(0, dashboardRef.current.clientWidth - width),
      y: getRandomArbitrary(0, dashboardRef.current.clientHeight - height),
      isMinimized: false,
    };
    setApps((prev) => ({ ...prev, [id]: app }));
  }

  function openWwwChat(event) {
    switch (event.detail) {
      case 1: {
        break;
      }
      default: {
        open("www-chat", 500, 400, wwwChatIcon);
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
            <img src={wwwChatIcon} onClick={openWwwChat} />
            <span>www-chat</span>
          </div>
          <div className="icon">
            <img src={notepadIcon} onClick={openNotePad} />
            <span>credits.txt</span>
          </div>
          <div className="github icon">
            <a href="https://github.com/l4lilul3lo" target="_blank"><img src={githubIcon} onClick={openNotePad} /></a>
            <span>github</span>
          </div>
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

      <TaskBar
        apps={apps}
        toggleMinimize={toggleMinimize}
        setActive={setActive}
      />
    </main>
  );
}

export default App;
