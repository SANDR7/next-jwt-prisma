import PageContainer from '@/components/layout/Main';
import { Posts } from '@prisma/client';
import axios from 'axios';
import type { GetServerSideProps, NextPage } from 'next';

const Home: NextPage<{ posts: Posts[] }> = ({ posts }) => {
  console.log(posts);

  return (
    <PageContainer>
      {posts &&
        posts.map((post: Posts) => {
          return (
            <div
              key={post.title}
              style={{ background: 'lightgreen', margin: 10 }}
            >
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <p>~ {post.User.username}</p>
            </div>
          );
        })}
    </PageContainer>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await axios.get('http://localhost:3000/api/read/posts');

  console.log(response.data);

  return {
    props: {
      posts: response.data
    }
  };
};
