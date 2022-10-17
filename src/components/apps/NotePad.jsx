import { useState, useRef } from 'react';
import ToolBar from '../toolbar/ToolBar'
import MenuBar from '../menubar/MenuBar'
import MenuBarButton from '../button/MenuBarButton'
import TitleBar from '../titlebar/TitleBar'
import { getNote } from '../../notes/notesApi.mjs'
import Drop from '../dropdowns/Drop'
import DropItem from '../dropdowns/DropItem'
const NotePad = ({ app }) => {
  const [textContent, setTextContent] = useState(getNote(app.fileName));
  
  const textAreaRef = useRef()
  

  // if textContent is falsey
  // list titlebar as Untitled

  // window
  // titlebar 
  // toolbar
  // content
  return <div className="window-box">

    {/* <TitleBar
        app={app}
        controls={controls}
        toggleMaximized={toggleMaximized}
        maximized={maximized}
      /> */}
  <div className="application">
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
              <DropItem><div onClick={() => { 
    console.log('clicked');
    textAreaRef.current.focus();
    textAreaRef.current.dispatchEvent(new KeyboardEvent('keydown', {'key': 'z', 'ctrlKey': true}))
                                            }}>Undo</div></DropItem>
              <DropItem>Redo</DropItem>
            </div>
          </Drop>
        </MenuBarButton>
      </MenuBar>
    </ToolBar>
    <div className="window-content">
      <textarea ref={textAreaRef} value={textContent} onChange={(e) => setTextContent(e.target.value)} style={{ height: "100%", width: "100%", resize: "none", fontFamily: 'arial' }}></textarea>
    </div>
  </div>
  </div>
}

export default NotePad