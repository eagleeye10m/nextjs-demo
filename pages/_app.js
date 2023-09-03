import "../styles/globals.css";
import Layout from "../components/layout/layout";
import Head from "next/head";
import { Provider } from "next-auth/client";
import { NotificationContextProvider } from "../components/context/notification-context";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <NotificationContextProvider>
        <Layout>
          <Head>
            <meta
              name="viewport"
              content="width=device-width , initial-scale=1"
            />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </NotificationContextProvider>
    </Provider>
  );
}

export default MyApp;
