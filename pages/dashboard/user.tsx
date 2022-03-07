import AuthContainer from '@/components/layout/Auth';
import { Posts, User } from '@prisma/client';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React, { useState } from 'react';

const UserPage = ({ user, userPosts }: { user: User; userPosts: Posts[] }) => {
  const [thePosts, setThePosts] = useState(userPosts);

  const [postFields, setPostFields] = useState<{ title: string; text: string }>(
    {
      title: '',
      text: ''
    }
  );

  const submitPost = async (e: any) => {
    const { title, text } = postFields;
    e.preventDefault();

    const data = await axios.post(
      '/api/read/onlyposts',
      { title, text },
      {
        withCredentials: true
      }
    );
    const { posts } = data.data;
    setThePosts(posts);
  };

  return (
    <AuthContainer credentials={user}>
      Hi user with the name {user.username}
      <br />
      <br />
      <div>
        got to your page{' '}
        <Link passHref href={`/dashboard/${user.username}`}>
          <a>{user.username}</a>
        </Link>
      </div>
      <div style={{ background: 'lightblue' }}>
        {thePosts &&
          thePosts.map((post: Posts, idx: number) => (
            <div key={idx}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </div>
          ))}
      </div>
      <h2>Create post</h2>
      <div>
        <form onSubmit={submitPost}>
          <div>
            <input
              onChange={(e) =>
                setPostFields({ ...postFields, title: e.target.value })
              }
              type="text"
            />
          </div>
          <div>
            <textarea
              onChange={(e) =>
                setPostFields({ ...postFields, text: e.target.value })
              }
              name="text"
              id="text"
              cols={30}
              rows={10}
            ></textarea>
          </div>
          <div>
            <input type="submit" value="Create" />
          </div>
        </form>
      </div>
    </AuthContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
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

  const user = response.data as User;
  const userPosts = response.data.posts as Posts[];

  return {
    props: {
      user,
      userPosts
    }
  };
};

export default UserPage;
