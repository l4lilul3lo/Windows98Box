import React, { useState, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import {MaxAnimation, RestoreMaxAnimation, MinAnimation, RestoreMinAnimation} from './animations/sizeAnimations'
import FadeAnimation from './animations/FadeAnimation'

const resizeHandleStyles = {
  bottom: {
    cursor: "ns-resize",
  },
  top: {
    cursor: "ns-resize",
  },
  left: {
    cursor: "ew-resize",
  },
  right: {
    cursor: "ew-resize",
  },
};

const ResizeDrag = ({ app, controls, originalZ, setActive }) => {
  const [rndDisplay, setRndDisplay] = useState("block");
  const [maximized, setMaximized] = useState(false);
  const [maxAnimation, setMaxAnimation] = useState(false);
  const [restoreMaxAnimation, setRestoreMaxAnimation] = useState(false);
  const [minAnimation, setMinAnimation] = useState(false);
  const [restoreMinAnimation, setRestoreMinAnimation] = useState(false);

  const rndRef = useRef();
  const beforeMin = useRef(null);
  const beforeMax = useRef(null);
  const renders = useRef(null);
  renders.current += 1;

  const tabElement = document.getElementById(`tab-${app.id}`);
  const tabDimensions = tabElement ? tabElement.getBoundingClientRect() : "";

  useEffect(() => {
    setActive(app.id);
  }, []);

  useEffect(() => {
    if (renders.current > 1) {
      if (maximized) {
        beforeMax.current = getRndDimensions();
        setMaxAnimation(true);
      } else {
        setRestoreMaxAnimation(true);
      }
    }
  }, [maximized]);

  useEffect(() => {
    if (renders.current > 1) {
      if (app.isMinimized) {
        beforeMin.current = getRndDimensions();
        setMinAnimation(true);
      } else {
        setRestoreMinAnimation(true);
      }
    }
  }, [app.isMinimized]);

  function updateRndDimensions(dimensions) {
    const { x, y, width, height } = dimensions;
    rndRef.current.updatePosition({ x, y });
    rndRef.current.updateSize({ width, height });
  }

  function getRndDimensions() {
    if (rndRef.current) {
      const resizablePos = rndRef.current.resizable.state;
      const draggablePos = rndRef.current.draggable.state;
      const { width, height } = resizablePos;
      const { x, y } = draggablePos;
      return { x, y, width, height };
    }
  }

  function toggleMaximized() {
    setMaximized(!maximized);
  }

  return (
    <>
      <Rnd
        default={{
          x: app.x,
          y: app.y,
          width: app.width,
          height: app.height,
          position: "absolute",
        }}
        ref={rndRef}
        tabIndex="0"
        style={{
          zIndex: app.isActive ? 9998 : originalZ,
          display: rndDisplay,
          position: "absolute",
        }}
        minWidth={"100px"}
        minHeight={"30px"}
        bounds="parent"
        onMouseDown={() => {
          setActive(app.id);
        }}
        onResizeStart={() => {
          setActive(app.id);
        }}
        onDragStart={() => {
          setActive(app.id);
        }}
        resizeHandleStyles={resizeHandleStyles}
        dragHandleClassName="app-info"
      >
        <FadeAnimation
          app={app}
          controls={controls}
          toggleMaximized={toggleMaximized}
          maximized={maximized}
        />
      </Rnd>

      {maxAnimation && (
        <MaxAnimation
          setMaxAnimation={setMaxAnimation}
          getRndDimensions={getRndDimensions}
          updateRndDimensions={updateRndDimensions}
          app={app}
        />
      )}
      {restoreMaxAnimation && (
        <RestoreMaxAnimation
          setRestoreMaxAnimation={setRestoreMaxAnimation}
          beforeMax={beforeMax}
          getRndDimensions={getRndDimensions}
          updateRndDimensions={updateRndDimensions}
          app={app}
        />
      )}
      {minAnimation && (
        <MinAnimation
          getRndDimensions={getRndDimensions}
          updateRndDimensions={updateRndDimensions}
          setMinAnimation={setMinAnimation}
          tabDimensions={tabDimensions}
          setRndDisplay={setRndDisplay}
          setActive={setActive}
          app={app}
        />
      )}
      {restoreMinAnimation && (
        <RestoreMinAnimation
          beforeMin={beforeMin}
          updateRndDimensions={updateRndDimensions}
          setRestoreMinAnimation={setRestoreMinAnimation}
          tabDimensions={tabDimensions}
          setRndDisplay={setRndDisplay}
          app={app}
        />
      )}
    </>
  );
};

export default ResizeDrag;
