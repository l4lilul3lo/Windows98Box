import "./titlebar.css";
import "98.css";
const TitleBar = ({ app, controls, toggleMaximized, maximized }) => {
  function handleMinimize() {
    controls.toggleMinimize(app.id);
  }

  function handleMaximize() {
    toggleMaximized();
  }

  function handleClose() {
    controls.close(app.id);
  }

  return (
    <div className={`title-bar ${app.isActive ? "" : "inactive"}`}>
      <div className="app-info">
        <div className="app-icon">
          <img src={app.icon} />
        </div>
        <span>{app.name}</span>
      </div>
      <div className="title-bar-controls">
        <button
          className="minimize-btn"
          aria-label="Minimize"
          tabIndex="0"
          onClick={handleMinimize}
        ></button>
        <button
          className="maximize-btn"
          aria-label={`${maximized ? "Restore" : "Maximize"}`}
          tabIndex="0"
          onClick={handleMaximize}
        ></button>
        <button className="close-btn" aria-label="Close" tabIndex="0" onClick={handleClose}></button>
      </div>
    </div>
  );
};

export default TitleBar;
