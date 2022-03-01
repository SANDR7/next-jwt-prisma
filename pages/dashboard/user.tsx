import { Posts, User} from "@prisma/client";
import axios from "axios";
import { GetServerSideProps } from "next";

import React from "react";
import AuthContainer from "@/components/layout/Auth";

const User = ({ user, userPosts }: { user: User; userPosts: Posts[] }) => {
  console.log(user);

  return (
    <AuthContainer credentials={user}>
      Hi user with the name {user.username}
      <div>
        {userPosts &&
          userPosts.map((post: Posts) => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </div>
          ))}
      </div>
    </AuthContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const response = await axios.get("/api/read/user", {
    withCredentials: true,
    baseURL: "http://localhost:3000",
    headers: {
      Cookie: `NextJWT=${req.cookies.NextJWT}`,
    },
  });

  if (!response.data.success || !req.cookies.NextJWT)
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };

  return {
    props: {
      user: response.data as User,
      userPosts: response.data.posts as Posts[],
    },
  };
};

export default User;
