import classes from "./hero.module.css";
import Image from "next/image";

export default function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/Ali.png"
          alt="An Image showing Ali"
          width={300}
          height={300}
        />
      </div>
      <h1>Hey,I'm Ali</h1>
      <p>This is my personal blog-built up with react and next js</p>
    </section>
  );
}
