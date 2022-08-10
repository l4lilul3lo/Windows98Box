import React, { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import {initializeNotes, getNoteNamesArr} from './notes/notesApi.mjs'
import windowIcon from "./images/window_icon.png";
import notepadIcon from "./images/notepad_icon.png";
import notepadFileIcon from './images/notepad_file_icon.png';
import ResizeDrag from "./components/ResizeDrag";
import TaskBar from "./components/taskbar/TaskBar";
import githubIcon from './images/github_icon.png'
import wwwChatIcon from './images/www-chat_icon.png';
import "./App.css";

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getNotes() {
  return JSON.parse(localStorage.getItem('notes'));
}

function createNote(name, content) {
  const notes = JSON.parse(localStorage.getItem('notes'));
  notes[name] = content;
  localStorage.setItem('notes', JSON.stringify(notes));
}

function deleteNote(name) {
  const notes = JSON.parse(localStorage.getItem('notes'));
  delete notes[name];
  localStorage.setItem('notes', JSON.stringify(notes));
}

function App() {
  const [apps, setApps] = useState({});
  const dashboardRef = useRef();
const [rightClicked, setRightClicked] = useState(null);
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

  function open(name, fileName, width, height, icon) {
    const id = nanoid();
    const app = {
      id,
      name,
      fileName,
      icon,
      width,
      height,
      x: getRandomArbitrary(0, dashboardRef.current.clientWidth - width),
      y: getRandomArbitrary(0, dashboardRef.current.clientHeight - height),
      isMinimized: false,
    };
    setApps((prev) => ({ ...prev, [id]: app }));
  }

  function w(n) {
    const dashboardWidth = dashboardRef.current.clientWidth;
    return dashboardWidth <= n ? dashboardWidth : n
  }

  function h(n) {
    const dashboardHeight = dashboardRef.current.clientHeight;
    return dashboardHeight <= n ? dashboardHeight : n
  }

  function openWwwChat(event) {
    switch (event.detail) {
      case 1: {
        break;
      }
      default: {
        open("www-chat", false, w(400), h(400), wwwChatIcon);
        break;
      }
    }
  }

  function openNotePad(event) {
    const fileName = event.target.id ? event.target.id : event.target.parentElement.id
    switch (event.detail) {
      case 1: {
        break;
      }
      default: {
        open("Notepad", fileName, w(320), h(200), notepadFileIcon);
        break;
      }
    }
  }

  useEffect(() => {
    initializeNotes()
  }, [])
 


  return (
    <main onClick={() => setRightClicked(null)}>
      <div className="dashboard" ref={dashboardRef} >
        <div className="icons">
          <div className="icon">
            <img src={wwwChatIcon} onClick={openWwwChat} />
            <span>www-chat</span>
          </div>
          {getNoteNamesArr().map(noteName => {
      return <div className="icon" key={noteName} id={noteName} onClick={openNotePad}>
            <img src={notepadFileIcon}  />
            <span>{noteName}</span>
          </div>
          })}
          
          <div className="icon" id="notepad.exe">
            <img src={notepadIcon} />
            <span>Notepad</span>
          </div>
          <div className="github icon">
            <a href="https://github.com/l4lilul3lo" target="_blank"><img src={githubIcon} /></a>
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
        dashboardRef={dashboardRef}
        toggleMinimize={toggleMinimize}
        setActive={setActive}
        rightClicked={rightClicked}
        setRightClicked={setRightClicked}
        controls={{close}}
      />
    </main>
  );
}

export default App;
