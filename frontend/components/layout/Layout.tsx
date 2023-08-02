import React from "react";
import Head from "next/head";

import Header from "./Header";

const Layout = ({
  children,
  title = "Reading Record",
  id,
}: {
  children: React.ReactNode;
  title: string;
  id: string;
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div id={id}>
        <Header />
        {children}
      </div>
    </>
  );
};

export default Layout;
