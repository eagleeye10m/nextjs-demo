import classes from "./contact-form.module.css";
import { useRef, useState, useEffect } from "react";
import Notification from "../UI/notification";

async function sendContactData(contactDetails) {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
}

export default function ContactForm() {
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const textInputRef = useRef();
  const formReset = useRef();

  const [requestStatus, setRequestStatus] = useState(); //'pending', success', 'error'
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer); // runs everytime useeffect runs
      //if we send multible requests at once(click send message multible times) and we dont cleartime out,the success message will be shown n times
    }
  }, [requestStatus]);

  async function sendMessageHandler(event) {
    const emailInput = emailInputRef.current.value;
    const nameInput = nameInputRef.current.value;
    const textInput = textInputRef.current.value;

    event.preventDefault();

    setRequestStatus("pending");

    try {
      await sendContactData({
        email: emailInput,
        name: nameInput,
        message: textInput,
      });
      setRequestStatus("success");
      formReset.current.reset();
    } catch (error) {
      setRequestError(error.message); //to use it in if requestStatus===error
      setRequestStatus("error");
    }
  }

  let notificationData;
  if (requestStatus === "pending") {
    notificationData = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way",
    };
  }

  if (requestStatus === "success") {
    notificationData = {
      status: "success",
      title: "Success!",
      message: "Message sent successfully",
    };
  }

  if (requestStatus === "error") {
    notificationData = {
      status: "error",
      title: "Error!",
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form
        action=""
        className={classes.form}
        onSubmit={sendMessageHandler}
        ref={formReset}
      >
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" ref={emailInputRef} required />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" ref={nameInputRef} required />
          </div>
        </div>

        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea name="" id="message" rows="5" ref={textInputRef}></textarea>
        </div>

        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notificationData && (
        <Notification
          status={notificationData.status}
          title={notificationData.title}
          message={notificationData.message}
        />
      )}
    </section>
  );
}
