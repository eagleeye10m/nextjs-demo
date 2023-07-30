import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/posts-util";
import Head from "next/head";
import { Fragment } from "react";

export default function AllPostsPage(props) {
  return (
    <Fragment>
      <Head>
        <title>My all posts</title>
        <meta
          name="description"
          content="A list of all programming tutorials and posts!"
        />
      </Head>
      <AllPosts posts={props.allPosts} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: { allPosts },
  };
}
