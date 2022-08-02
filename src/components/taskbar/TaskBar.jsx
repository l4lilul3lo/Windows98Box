import startImage from "../../images/start_image.png";
import "./taskbar.css";
const TaskBar = ({ apps, toggleMinimize, setActive }) => {
  return (
    <div className="task-bar">
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
              className={`application-tab ${app.isActive ? "active-tab" : ""}`}
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
  );
};

export default TaskBar;
