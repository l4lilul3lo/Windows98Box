import { useState } from 'react';
import ToolBar from '../toolbar/ToolBar'
import MenuBar from '../menubar/MenuBar'
import MenuBarButton from '../button/MenuBarButton'
import { getNote } from '../../notes/notesApi.mjs'
import Drop from '../dropdowns/Drop'
import DropItem from '../dropdowns/DropItem'
const NotePad = ({ app }) => {
  const [textContent, setTextContent] = useState(getNote(app.fileName))
  const [displayFileDropdown, setDisplayFileDropdown] = useState(false)

  function toggleFileDropdown() {
    setDisplayFileDropdown(!displayFileDropdown)
  }
  
  return <div className="application">
    <ToolBar>
      <MenuBar>
        <MenuBarButton value={"File"}>
          <Drop down>
            <div className="drop-content">
              <DropItem>New</DropItem>
              <DropItem>Open</DropItem>
              <DropItem>Save</DropItem>
              <DropItem>Save As</DropItem>
            </div>
          </Drop>
        </MenuBarButton>
        <MenuBarButton value={"Edit"}>
          <Drop down>
            <div className="drop-content">
              <DropItem>Undo</DropItem>
              <DropItem>Redo</DropItem>
            </div>
          </Drop>
        </MenuBarButton>
      </MenuBar>
    </ToolBar>
    <div className="window-content">
      <textarea value={textContent} onChange={(e) => setTextContent(e.target.value)} style={{ height: "100%", width: "100%", resize: "none", fontFamily: 'arial' }}></textarea>
    </div>
  </div>
  // notepad can pull from local storage based on notepad name.
  // when you open a new notepad it's blank.

  // here there is the option to start typing or open a file on the users system.

  // There is file open and file save
  // This means window titlebar is window specific.

  // we need a generic toolbar
}

export default NotePad