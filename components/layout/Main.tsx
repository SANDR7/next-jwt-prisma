import Head from "next/head";
import React, { FC, ReactNode } from "react";

interface MainProps {
  children: ReactNode;
  title?: string;
}

const PageContainer: FC<MainProps> = (props) => {
  const { children, ...customMeta } = props;

  const meta = {
    title: "JWT Prisma",
    description: "Authentication app that combines front-end & back-end",
    ...customMeta,
  };
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />

        <meta content={meta.description} name="description" />

        <meta property="og:site_name" content="Sander van Ast" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />

        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
      </Head>

      <header></header>

      <main>{children}</main>

      <footer></footer>
    </>
  );
};

export default PageContainer;
