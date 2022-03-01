import { User } from '@prisma/client';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { FC, ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
  title?: string;
  credentials: User;
}

const AuthContainer: FC<MainProps> = (props) => {
  const { children, credentials } = props;

  const router = useRouter();

  const meta = {
    title: 'JWT Logged',
    description: 'Authentication app that combines front-end & back-end'
  };

  const logout = async () => {
    const user = await axios.get('/api/auth/logout');

    router.push('/login');

    console.log(user);
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

      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h2>Welcome, {credentials.username || 'Guest'}</h2>
          <p>You are a {credentials.role}</p>
        </div>

        <div>
          <button onClick={() => logout()}>Log out</button>
        </div>
      </header>

      <main>{children}</main>

      <footer></footer>
    </>
  );
};

export default AuthContainer;
