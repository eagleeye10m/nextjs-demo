import { Fragment } from "react";
import MainNavigation from "./main-navigation";
import { useRouter } from "next/router";
import AuthNav from "./auth-navigation";

export default function Layout(props) {
  const router = useRouter();

  return (
    <Fragment>
      {router.pathname.includes("/authentication") ? (
        <AuthNav />
      ) : (
        <MainNavigation />
      )}
      <main>{props.children}</main>
    </Fragment>
  );
}
