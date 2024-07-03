// pages/index.js

import Head from "next/head";
import Link from "next/link";
import Layout from "@/layouts/Layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Welcome to my Next.js app" />
      </Head>

      <h1>Welcome to Next.js!</h1>
      <p>This is the homepage of my Next.js application.</p>
      <Link href="/about">Go to About Page</Link>
    </Layout>
  );
}
