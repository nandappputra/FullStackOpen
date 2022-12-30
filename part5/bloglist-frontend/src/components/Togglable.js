import { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisibility] = useState(false);
  const [buttonText, setButtonText] = useState(props.showButton);

  const changeVisibility = () => {
    if (visible) {
      setButtonText(props.showButton);
    } else {
      setButtonText(props.hideButton);
    }
    setVisibility(!visible);
  };

  return (
    <div>
      {visible && props.children}
      <button type="button" onClick={changeVisibility}>
        {buttonText}
      </button>
    </div>
  );
};

export default Togglable;
