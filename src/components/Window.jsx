const Window = ({ app, controls, toggleMaximized, maximized }) => {
 function handleMinimize() {
    controls.toggleMinimize(app.id);
  }

  function handleMaximize() {
    toggleMaximized()
  }

  function handleClose() {
    controls.close(app.id);
  }

  return (
    <div className="window" style={{background: "blue"}}>
      <div className={`title-bar ${app.isActive ? "" : "inactive"}`}>
        <img src={app.icon} style={{width: "13px"}}/>
        <div
          className="title-bar-text"
          style={{ width: "100%", marginLeft: "3px", marginRight: 0 }}
        >
          {app.name}
        </div>
        <div className="title-bar-controls">
          <button
            aria-label="Minimize"
            className="Minimize"
            tabIndex="0"
            onClick={handleMinimize}
          ></button>
          <button
            aria-label={`${maximized ? "Restore" : "Maximize"}`}
            tabIndex="0"
            onClick={handleMaximize}
          ></button>
          <button
            aria-label="Close"
            tabIndex="0"
            onClick={handleClose}
          ></button>
        </div>
      </div>
      <div className="window-body" style={{background: "white", height: "100%"}}>
        {app.name === 'window.exe' && <p>There's so much room for activities!</p>}
        {app.name === 'credits.txt - Notepad' && <div className="credits">
          <span>inspiration</span><br />
        <a href="https://98.js.org/" target="_blank">https://98.js.org/</a><br /><br />
          <span>credits</span><br />
          <a href="https://jdan.github.io/98.css/" target="_blank">https://jdan.github.io/98.css/</a><br />
          <a href="https://win98icons.alexmeub.com/" target="_blank">https://win98icons.alexmeub.com/</a><br />
          <a href="https://www.figma.com/community/file/769712367097929855" target="_blank">Windows 98 Design System - Figma</a><br />
          <a target="_blank" href="https://www.framer.com/motion/">https://www.framer.com/motion/</a><br />
          <a target="_blank" href="https://github.com/bokuweb/react-rnd">https://github.com/bokuweb/react-rnd</a><br />
          <a target="_blank" href="https://reactcommunity.org/react-transition-group/">https://reactcommunity.org/react-transition-group/</a><br />
        </div>}
      </div>
    </div>
  );
};

export default Window;

