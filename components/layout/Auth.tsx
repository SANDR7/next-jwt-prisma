import { User } from "@prisma/client";
import Head from "next/head";
import React, { FC, ReactNode } from "react";

interface MainProps {
  children: ReactNode;
  title?: string;
  credentials: User;
}

const AuthContainer: FC<MainProps> = (props) => {
  const { children, credentials } = props;

  const meta = {
    title: "JWT Logged",
    description: "Authentication app that combines front-end & back-end",
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

      <header>
		  <h2>Welcome, {credentials.email || "Guest"}</h2>
		  <p>You are a {credentials.role}</p>
	  </header>

      <main>{children}</main>

      <footer></footer>
    </>
  );
};

export default AuthContainer;
