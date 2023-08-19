import Link from "next/link";
import Classes from "./main-navigation.module.css";
import Logo from "./logo";

export default function MainNavigation() {
  return (
    <header className={Classes.header}>
      <Link href="/">
        <a>
          {/*Link will not render a anchor tag by default and it will only render plain text so we need to add an anchor tag*/}
          <Logo />
        </a>
      </Link>
      {/* we want logo to be clickable to go back to the starting page so we wrap it with Link*/}
      <nav>
        <ul>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>

          <li>
            <Link href="/authentication">Authentication</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
