import LoginForm from "../../components/authentication/login/login-form";
import { Fragment, useEffect } from "react";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return (
      <Fragment>
        <p>Loading...</p>
        <style jsx global>{`
          body {
            background-color: white;
          }
        `}</style>
        ;
      </Fragment>
    );
  }

  return (
    <Fragment>
      <style jsx global>{`
        body {
          background-color: white;
        }
      `}</style>
      <LoginForm />
    </Fragment>
  );
}
