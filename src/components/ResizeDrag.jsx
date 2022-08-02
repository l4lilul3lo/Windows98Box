import React, { useState, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import { motion } from "framer-motion";
import Fade from "./Fade";
import Window from "./Window";

function formatWidth(width) {
  if (typeof width === "number") {
    return `${width}px`;
  }
  return width;
}

const TitleBar = ({ app }) => {
  return (
    <div className="title-bar" style={{ width: "100%" }}>
      <div className="title-bar-text" style={{ width: "100%" }}>
        {app.name}
      </div>
    </div>
  );
};

const MaxAnimation = ({
  getRndDimensions,
  setMaxAnimation,
  updateRndDimensions,
  app,
}) => {
  const { y: top, x: left, width } = getRndDimensions();
  const formattedWidth = formatWidth(width);
  const from = { top, left, width: formattedWidth };
  const to = { top: 0, left: 0, width: "100%" };
  return (
    <motion.div
      initial={from}
      animate={to}
      onAnimationComplete={() => {
        updateRndDimensions({ x: 0, y: 0, width: "100%", height: "100%" });
        setMaxAnimation(false);
      }}
      transition={{ duration: 0.3 }}
      style={{ position: "absolute", zIndex: 9999 }}
    >
      <TitleBar app={app} />
    </motion.div>
  );
};

const RestoreMaxAnimation = ({
  beforeMax,
  setRestoreMaxAnimation,
  updateRndDimensions,
  app,
}) => {
  const { x, y, width, height } = beforeMax.current;
  const from = { top: 0, left: 0, width: "100%" };
  const to = { top: y, left: x, width };
  return (
    <motion.div
      initial={from}
      animate={to}
      onAnimationComplete={() => {
        updateRndDimensions({ x, y, width, height });
        setRestoreMaxAnimation(false);
      }}
      transition={{ duration: 0.3 }}
      style={{ position: "absolute", zIndex: 9999 }}
    >
      <TitleBar app={app} />
    </motion.div>
  );
};

const MinAnimation = ({
  getRndDimensions,
  updateRndDimensions,
  setMinAnimation,
  tabDimensions,
  setRndDisplay,
  setActive,
  app,
}) => {
  const { y: top, x: left, width } = getRndDimensions();
  const formattedWidth = formatWidth(width);
  const from = { top, left, width: formattedWidth };
  const to = {
    top: tabDimensions.y,
    left: tabDimensions.x,
    width: tabDimensions.width,
    height: tabDimensions.height,
  };
  return (
    <motion.div
      initial={from}
      animate={to}
      onAnimationComplete={() => {
        updateRndDimensions({
          x: tabDimensions.x,
          y: tabDimensions.y,
          width: tabDimensions.width,
          height: tabDimensions.height,
        });
        setRndDisplay("none");
        setActive("");
        setMinAnimation(false);
      }}
      transition={{ duration: 0.3 }}
      style={{ position: "absolute", zIndex: 9999 }}
    >
      <TitleBar app={app} />
    </motion.div>
  );
};

const RestoreMinAnimation = ({
  beforeMin,
  updateRndDimensions,
  setRestoreMinAnimation,
  tabDimensions,
  setRndDisplay,
  app,
}) => {
  const { x, y, width, height } = beforeMin.current;
  const from = {
    top: tabDimensions.y,
    left: tabDimensions.x,
    width: tabDimensions.width,
    height: tabDimensions.height,
  };
  const to = { top: y, left: x, width };
  return (
    <motion.div
      initial={from}
      animate={to}
      onAnimationComplete={() => {
        updateRndDimensions({ x, y, width, height });
        setRndDisplay("block");
        setRestoreMinAnimation(false);
      }}
      transition={{ duration: 0.3 }}
      style={{ position: "absolute", zIndex: 9999 }}
    >
      <TitleBar app={app} />
    </motion.div>
  );
};

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

  const tabElement = document.getElementById(`${app.id}`);
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
          // width: "300px",
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
        <Fade
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
