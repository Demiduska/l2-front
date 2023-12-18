import type { NextPage } from "next";
import type { AppProps } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { wrapper } from "../redux/store";
import { ThemeProvider } from "next-themes";

import "../styles/globals.scss";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, ...rest }: AppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore(rest);
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme={"dark"}>
        {getLayout(<Component {...props.pageProps} />)}
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
