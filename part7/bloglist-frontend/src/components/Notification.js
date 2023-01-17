import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification.message);

  return <div>{notification}</div>;
};

export default Notification;
