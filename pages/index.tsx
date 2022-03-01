import PageContainer from '@/components/layout/Main';
import { Posts, User } from '@prisma/client';
import axios from 'axios';
import type { GetServerSideProps, NextPage } from 'next';

interface PostWithUser extends Posts {
  User: User;
}

const Home: NextPage<{ posts: PostWithUser[] }> = ({ posts }) => {
  return (
    <PageContainer>
      {posts &&
        posts.map((post: PostWithUser) => {
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
