import './button.css'
const MenuBarButton = ({ value, children }) => {
  const first = value.substring(0, 1)
  const rest = value.substring(1, value.length)
  return <div className="button">
    <span>
      <span className="first-letter">{first}</span>{rest}
    </span>
    
  </div>
}

export default MenuBarButton

// <div className="dropdown">
//       {children}
//     </div>