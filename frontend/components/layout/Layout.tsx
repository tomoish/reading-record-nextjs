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
      <div id={id} className="bg-book-image bg-cover bg-center bg-no-repeat bg-fixed bg-white h-screen">
        <Header />
        {children}
      </div>
    </>
  );
};

export default Layout;
