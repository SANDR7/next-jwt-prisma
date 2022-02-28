import { User } from "@prisma/client";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import React from "react";
import AuthContainer from "@/components/layout/Auth";

const User = ({ user }: { user: any }) => {
  console.log(user);

  return (
    <AuthContainer credentials={user}>
      Hi user with the name {user.username}


      <div>
        {user.posts && user.posts.map((post: any) => (
          <div key={post.id}>{post.title}</div>
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
      user: response.data,
    },
  };
};

export default User;
