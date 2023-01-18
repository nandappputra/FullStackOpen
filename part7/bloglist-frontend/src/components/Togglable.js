import { forwardRef, useImperativeHandle, useState } from "react";
import Button from "react-bootstrap/Button";

const Togglable = forwardRef((props, refs) => {
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

  useImperativeHandle(refs, () => {
    return { changeVisibility };
  });

  return (
    <div
      style={{
        margin: "1em",
        borderRadius: "1em",
        backgroundColor: "lightgrey",
        padding: "0.5em",
      }}
    >
      {visible && <div style={{ margin: "1em" }}>{props.children}</div>}

      <Button
        variant="secondary"
        type="button"
        onClick={changeVisibility}
        id="mark-as-visible"
      >
        {buttonText}
      </Button>
    </div>
  );
});

Togglable.displayName = "Toggleable";

export default Togglable;
