import React from 'react';
const Window = ({ app, controls, toggleMaximized, maximized, children}) => {

   const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {...props});
    }
    return child;
  });
  return (
    <div className="window">
      {children}
    </div>
  );
};

export default Window;
