import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useState } from "react";
import PageContainer from "../components/layout/Main";

const Login = () => {
  const [formFields, setFormFields] = useState<any>();

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const { username, password } = formFields;
    const user = await axios.post("/api/auth/login", { username, password });

    router.push("/dashboard/user");

    console.log(user);
  };

  return (
    <PageContainer>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            required
            onChange={(e) =>
              setFormFields({ ...formFields, username: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            required
            onChange={(e) =>
              setFormFields({ ...formFields, password: e.target.value })
            }
          />
        </div>
        <div>
          <input type="submit" value="Login" />
        </div>
      </form>
    </PageContainer>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (req.cookies.NextJWT) {
    return {
      props: {},
      redirect: {
        destination: "/dashboard/user",
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
