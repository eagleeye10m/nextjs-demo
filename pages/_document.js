import document, { Html, Head, Main, NextScript } from "next/document";

export default class Documment extends document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id="notifications"></div>
        </body>
      </Html>
    );
  }
}
