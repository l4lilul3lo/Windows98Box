import ToolBar from '../toolbar/ToolBar'
import MenuBar from '../menubar/MenuBar'
import MenuBarButton from '../button/MenuBarButton'
import Drop from '../dropdowns/Drop'
import DropItem from '../dropdowns/DropItem'
const WwwChat = ({ app }) => {
  return <div className="application">
    {/* <ToolBar>
      <MenuBar>
        <MenuBarButton value={"File"}>
          <Drop down>
            <DropItem>1</DropItem>
            <div>2</div>
            <div>3</div>
          </Drop>
        </MenuBarButton> 
      </MenuBar>
    </ToolBar> */}
    <div className="window-content">

      <iframe
        src="https://www-chat.herokuapp.com/"
        id={app.id}
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