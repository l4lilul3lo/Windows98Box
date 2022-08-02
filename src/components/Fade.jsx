import { Transition } from "react-transition-group";
import Window from "./Window";

const duration = 200;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
  width: "100%",
  height: "100%",
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const Fade = ({ app, controls, toggleMaximized, maximized }) => {
  return (
    <Transition in={true} appear={true} timeout={duration}>
      {(state) => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          <Window
            app={app}
            controls={controls}
            toggleMaximized={toggleMaximized}
            maximized={maximized}
          />
        </div>
      )}
    </Transition>
  );
};

export default Fade;
