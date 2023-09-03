import { useState, useRef } from "react";
import classes from "./login-form.module.css";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import { useContext } from "react";
import NotificationContext from "../../context/notification-context";

async function createUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const notificationCtx = useContext(NotificationContext); // use this context Api to pass our notification data

  //useEffect(() => {}, [reqObj]); for my approch for showing notifications

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    notificationCtx.showNotification({
      title: "Signing Up",
      status: "pending",
      message: "Creating new user",
    });

    // notiData = notificationData("pending", "Creating new user");
    // setReqObj(notiData);   //my first approach for sending notifications

    const emailInput = emailInputRef.current.value;
    const passwordInput = passwordInputRef.current.value;

    if (isLogin) {
      notificationCtx.showNotification({
        title: "Logging In",
        status: "pending",
        message: "Logging In",
      });
      const result = await signIn("credentials", {
        redirect: false,
        email: emailInput,
        password: passwordInput,
      }); //if something fails in backend,it will redirect to the error page //the result will always be resolved eventhough it encounteres an error

      if (!result.error) {
        notificationCtx.showNotification({
          title: "Logged In",
          status: "success",
          message: "Successfully logged in",
        });
        router.replace("/authentication/profile");
      } else if (result.error) {
        notificationCtx.showNotification({
          title: "Error logging in",
          status: "error",
          message: result.error,
        });
      }

      //with switch case
      /*  switch (result.error) {
        case null:
          notificationCtx.showNotification({
            title: "Logged In",
            status: "success",
            message: "Successfully logged in",
          });
          router.replace("/authentication/profile");
          break;
        case result.error:
          notificationCtx.showNotification({
            title: "Error logging in",
            status: "error",
            message: "Cannot log you in",
          });
          break;
      } */
      // notificationCtx.showNotification({
      //   title: "Logged In",
      //   status: "success",
      //   message: "Successfully logged in",
      // });
    } else {
      try {
        const { message } = await createUser(emailInput, passwordInput);
        console.log(message);
        // notiData = notificationData("success", newUserMsg);
        // setReqObj(notiData);
        //other approach:
        notificationCtx.showNotification({
          title: "Signed Up",
          message: message,
          status: "success",
        });
        console.log(notificationCtx);
      } catch (error) {
        notificationCtx.showNotification({
          title: "SignUp Error",
          message: error.message,
          status: "error",
        });
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}
