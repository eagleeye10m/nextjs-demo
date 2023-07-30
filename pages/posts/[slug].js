import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostFiles } from "../../lib/posts-util";
import Head from "next/head";
import { Fragment } from "react";

export default function PostDetailPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
    </Fragment>
  );
}

export function getStaticProps(context) {
  const { slug } = context.params;

  const postData = getPostData(slug);
  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFileNames = getPostFiles();
  const slugs = postFileNames.map((filename) => filename.replace(/\.md$/, "")); //cause we dont need .md extension
  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })), //this {} is not treated as a function body, but as an immediately retured object
    fallback: false,
  };
}
