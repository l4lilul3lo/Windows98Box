import TitleBar from "./titlebar/TitleBar";
import ToolBar from "./toolbar/ToolBar";
import WwwChat from './apps/WwwChat'
const Window = ({ app, controls, toggleMaximized, maximized }) => {
  return (
    <div className="window-box">
      <TitleBar
        app={app}
        controls={controls}
        toggleMaximized={toggleMaximized}
        maximized={maximized}
      />
      <div className="window-content">
        {app.name === "www-chat" && <WwwChat />}
        {app.name === "credits.txt - Notepad" && (
          <div className="credits">
            <span>inspiration</span>
            <br />
            <a href="https://98.js.org/" target="_blank">
              https://98.js.org/
            </a>
            <br />
            <br />
            <span>credits</span>
            <br />
            <a href="https://jdan.github.io/98.css/" target="_blank">
              https://jdan.github.io/98.css/
            </a>
            <br />
            <a href="https://win98icons.alexmeub.com/" target="_blank">
              https://win98icons.alexmeub.com/
            </a>
            <br />
            <a
              href="https://www.figma.com/community/file/769712367097929855"
              target="_blank"
            >
              Windows 98 Design System - Figma
            </a>
            <br />
            <a target="_blank" href="https://www.framer.com/motion/">
              https://www.framer.com/motion/
            </a>
            <br />
            <a target="_blank" href="https://github.com/bokuweb/react-rnd">
              https://github.com/bokuweb/react-rnd
            </a>
            <br />
            <a
              target="_blank"
              href="https://reactcommunity.org/react-transition-group/"
            >
              https://reactcommunity.org/react-transition-group/
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Window;
