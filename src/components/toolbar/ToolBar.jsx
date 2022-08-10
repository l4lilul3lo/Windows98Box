import "./toolbar.css";

const ToolBar = ({children}) => {
  return <div className="tool-bar">
    <div className="horizontal-white-line"></div>
    <div className="menus">
      {children}
    </div>
  </div>
};

export default ToolBar;