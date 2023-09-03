import { useContext } from "react";
import NotificationContext from "../../context/notification-context";
import classes from "./authNotification.module.css";

export default function notificationData({ title, message, status }) {
  let result;

  const notificationCtx = useContext(NotificationContext);

  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }
  if (status === "error") {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;
  return (
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
