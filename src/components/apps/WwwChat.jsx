import ToolBar from '../toolbar/ToolBar'
import MenuBar from '../menubar/MenuBar'
import MenuBarButton from '../button/MenuBarButton'
const WwwChat = () => {
  return <div className="application">
    <ToolBar>
    <MenuBar>
      <MenuBarButton value={"File"}>
        <div>hello</div>
      </MenuBarButton>
    </MenuBar>
    </ToolBar>
  <div className="window-content">
    
   <iframe
    src="https://www-chat.herokuapp.com/"
    style={{
      height: "100%",
      width: "100%",
      margin: 0,
      padding: 0,
    }}
  ></iframe>
    </div>
    </div>
}

export default WwwChat

// <MenuBarButton value={"File"}>
//   {displayFileDropdown && <FileDropdown>
//     <NewWindow />
//     <Save />
//     <SaveAs />
//     <Download />
//     <Exit />
//   </FileDropdown> }
// </MenuBarButton>


// <ToolBar>
//     <MenuBar>
//       <MenuBarButton value={"File"} />
//     </MenuBar>
//     </ToolBar>