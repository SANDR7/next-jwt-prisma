import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Error from 'next/error';
import AuthContainer from '@/components/layout/Auth';
import { User } from '@prisma/client';

const UserInfo = ({ data }: { data: User }) => {
  const router = useRouter();
  const name = router.query;

  if (name.user !== data.username)
    return <Error statusCode={404} title="User not found" />;

  return (
    <AuthContainer credentials={data}>
      {data.role} - {data.username}
    </AuthContainer>
  );
};

export default UserInfo;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query
}) => {
  if (!req.cookies?.NextJWT)
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    };
  const response = await axios.get('/api/read/user', {
    withCredentials: true,
    baseURL: process.env.BASE_URL,
    headers: {
      Cookie: `NextJWT=${req.cookies.NextJWT}`
    }
  });

  return {
    props: {
      data: response.data
    }
  };
};
