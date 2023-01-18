import { useSelector } from "react-redux";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const Notification = () => {
  const notification = useSelector((state) => state.notification.message);

  return (
    <ToastContainer position="top-end">
      {notification && (
        <Toast>
          <Toast.Header>
            <strong className="me-auto">Info</strong>
          </Toast.Header>
          <Toast.Body>{notification}</Toast.Body>
        </Toast>
      )}
    </ToastContainer>
  );
};

export default Notification;
