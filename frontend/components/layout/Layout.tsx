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
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <body id={id}>
        <Header />
        {children}
      </body>
    </div>
  );
};

export default Layout;
