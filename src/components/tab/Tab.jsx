import React, { useState, useEffect, useRef } from "react"
import './tab.css'
import MenuBarButton from "../button/MenuBarButton";
const Tab = ({ app, toggleMinimize, setActive, dashboardRef, setRightClicked, rightClicked, controls }) => {
  const [displayMenu, setDisplayMenu] = useState(false)
  const tabRef = useRef()
  const menuRef = useRef()

  function handleClose()  {
    controls.close(app.id)
    setRightClicked(null)
  }

  function handleRecover() {
    
  }

  function handleContextMenu(e) {
    e.preventDefault();
    setRightClicked(app.id)
  }
  
  useEffect(() => {
    tabRef.current.addEventListener('contextmenu', handleContextMenu)
  }, [rightClicked])
  
  return <div className={`application-tab ${app.isActive ? "active-tab" : ""}`}
      key={app.id}
      ref={tabRef}
           id={`tab-${app.id}`}
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
      
      <div className={`tab-menu ${rightClicked === app.id ? '' : 'hidden'}`} ref={menuRef} onClick={(e) => e.stopPropagation()}>
        <span className="tab-menu-option" onClick={handleClose}><span className="first-letter">C</span>lose</span>
        <span className="tab-menu-option"><span className="first-letter">R</span>ecover</span>
          </div>
    </div>
    
 
};

export default Tab