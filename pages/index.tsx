import PageContainer from '@/components/layout/Main';
import prisma from '@/lib/prisma';
import { Posts, User } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';

interface PostWithUser extends Posts {
  User: User;
}

const Home: NextPage<{ posts: PostWithUser[] }> = ({ posts }) => {
  return (
    <PageContainer>
      {posts ? (
        posts?.map((post: PostWithUser) => {
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
        })
      ) : (
        <div>
          <h2>No posts found</h2>
        </div>
      )}
    </PageContainer>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const allPosts = await prisma.posts.findMany({
    select: {
      title: true,
      description: true,
      User: {
        select: {
          username: true,
          email: true
        }
      }
    }
  });

  return {
    props: {
      posts: allPosts
    }
  };
};
