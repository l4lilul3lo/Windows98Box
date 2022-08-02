import './menubar.css'
const MenuBar = ({children}) => {
  return <div className="menu-bar">
    <div className="brick"></div>
    <div className="menu-bar-buttons">
      {children}
    </div>
  </div>
}

export default MenuBar
