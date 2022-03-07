import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Error from 'next/error'

const UserInfo = ({data}: {data: any}) => {

	const router = useRouter();
	const name = router.query;
	
	if(name.user !== data.username) return <Error statusCode={404} title="User not found"/>

  return <div>{data?.role} - {data.username}</div>;
};

export default UserInfo;

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
  if (!req.cookies?.NextJWT)
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    };
  const response = await axios.get('/api/read/user', {
    withCredentials: true,
    baseURL: 'http://localhost:3000',
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
