import Link from "next/link";
import { useSession, signOut } from "next-auth/client";
import classes from "./auth-navigation.module.css";

export default function AuthNav() {
  const [session, loading] = useSession(); // this session is created when we logged in

  function logoutHandler() {
    signOut(); //returns promise but we dont care cause this component automatically changes anyway as soon as active session changes
  }
  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!session && !loading && (
            <li>
              <Link href="/authentication/login">Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/authentication/profile">Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
