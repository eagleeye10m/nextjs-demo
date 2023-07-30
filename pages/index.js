import { Fragment } from "react";
import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-Posts";
import { getFeaturedPosts } from "../lib/posts-util";
import Head from "next/head";

export default function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Welcome to my blog</title>
        <meta
          name="description"
          content="I post about programming and web development"
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts}></FeaturedPosts>
    </Fragment>
  );

  //1) Hero section:present ourselves
  //2)Featured Posts
}

export async function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
}
