import { AlertProps } from "../types/AlertProps";

export function Alert(alertProps: AlertProps): JSX.Element {
  return (
    <div>
      {alertProps.alert === "" ? (
        <></>
      ) : (
        <p style={{ color: "red" }}>{alertProps.alert}</p>
      )}
    </div>
  );
}
