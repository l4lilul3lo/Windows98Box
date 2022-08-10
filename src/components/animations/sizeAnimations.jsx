import { motion } from "framer-motion";

function formatWidth(width) {
  if (typeof width === "number") {
    return `${width}px`;
  }
  return width;
}

const DummyTitleBar = ({ app }) => {
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
      <DummyTitleBar app={app} />
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
      <DummyTitleBar app={app} />
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
      <DummyTitleBar app={app} />
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
      <DummyTitleBar app={app} />
    </motion.div>
  );
};

export {MaxAnimation, RestoreMaxAnimation, MinAnimation, RestoreMinAnimation}