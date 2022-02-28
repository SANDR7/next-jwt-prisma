import axios from "axios";
import { GetServerSideProps } from "next";
import React from "react";

const User = ({ user }: { user: any }) => {
  console.log(user);

  return (
    <div>
      Hi user with the name {user.user.username}
      {/* <div>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div> */}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const res = await axios.get("/api/read/user", {
    withCredentials: true,
    baseURL: "http://localhost:3000",
    headers: {
      Cookie: `NextJWT=${req.cookies.NextJWT}`,
    },
  });

  return {
    props: {
      user: res.data,
    },
  };
};

export default User;
