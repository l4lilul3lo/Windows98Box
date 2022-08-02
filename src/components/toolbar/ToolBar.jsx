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
//  return (
//     <div className="tool-bar">
//       <div className="white-line"></div>
//       <div className="menus">
        
//         <div className="menu-one">
//           <div className="brick"></div>
//           <div className="dropdowns">
//           <Button value={file} />
//             </div>
          
//         </div>
//       </div>
//     </div>);