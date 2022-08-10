import { useEffect, useRef, useState } from "react";
const Drop = ({ children, left, right, up, down }) => {
  const [display, setDisplay] = useState(false);
  const dropRef = useRef(null);
  let style = { position: "absolute" };
  if (left) {
    style = { ...style, top: 0, right: "100%" };
  }

  if (right) {
    style = { ...style, top: 0, left: "100%" };
  }

  if (up) {
    style = { ...style, bottom: "100%", left: 0 };
  }

  if (down) {
    style = { ...style, top: "100%", left: 0 };
  }

  useEffect(() => {
    const dropRefCurrent = dropRef.current;
    function handleParentMouseDown(e) {
      if (dropRefCurrent && !dropRefCurrent.contains(e.target)) {
        setDisplay(!display);
      }
    }

    function handleOuterMouseDown(e) {
      const withinParent = dropRefCurrent.parentElement.contains(e.target)
      if (dropRefCurrent && withinParent) {
        return;
      } else {
        setDisplay(false);
      }
    }

    if (dropRefCurrent) {
      dropRefCurrent.parentElement.addEventListener(
        "mousedown",
        handleParentMouseDown
      );
      if (display) {
        document.addEventListener("mousedown", handleOuterMouseDown);
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleOuterMouseDown);
      dropRefCurrent.parentElement.removeEventListener(
        "mousedown",
        handleParentMouseDown
      );
    };
  }, [display]);

  return (
    <div style={style} ref={dropRef}>
      {display && children}
    </div>
  );
};

export default Drop;