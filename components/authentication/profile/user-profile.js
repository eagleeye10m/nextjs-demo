// import { getSession, useSession } from "next-auth/client";
// import { useEffect } from "react";
// import { useState } from "react";

import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import NotificationContext from "../../context/notification-context";
import { useContext } from "react";

function UserProfile() {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (!session) {
  //       window.location.href = "/authentication/login";
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, []);

  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  const notificationCtx = useContext(NotificationContext);

  return (
    <section id="sec" className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );

  async function changePasswordHandler(passwordData) {
    notificationCtx.showNotification({
      title: "Change Password",
      status: "pending",
      message: "Changing password",
    });

    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    notificationCtx.showNotification({
      title: "Password changed",
      status: "success",
      message: data.message,
    });

    if (!response.ok) {
      notificationCtx.showNotification({
        title: "Password not changed",
        status: "error",
        message: data.message,
      });
    }
  }
}

export default UserProfile;
