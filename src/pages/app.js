// src/pages/_app.js

import "@/styles/globals.css";
import Layout from "@/layouts/Layout"; // Ensure casing matches the file name

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
