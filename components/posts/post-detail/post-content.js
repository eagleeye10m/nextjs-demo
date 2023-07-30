import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import ReactMarkdown from "react-markdown";

import Image from "next/image";
import { PrismLight } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";

PrismLight.registerLanguage("js", js);
PrismLight.registerLanguage("css", css);

export default function PostContent(props) {
  const { post } = props;
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenederers = {
    //its a method to override dafault behavior of markdown
    // img(data) {
    //   return (
    //     <Image
    //       src={`/images/posts/${post.slug}/${data.src}`}
    //       alt={data.alt}
    //       width={600}
    //       height={300}
    //     />
    //   );
    // }, //react markdown will call this method if it finds a image

    p(data) {
      const { node } = data;
      if (node.children[0].tagName === "img") {
        const image = node.children[0];
        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={data.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p>{data.children}</p>;
    },

    code(data) {
      const { children } = data;

      return <PrismLight style={atomDark} language="js" children={children} />;
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenederers}>
        {post.content}
      </ReactMarkdown>
    </article>
  );
}
