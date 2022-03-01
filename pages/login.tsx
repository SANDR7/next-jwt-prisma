import PageContainer from '@/components/layout/Main';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { SyntheticEvent, useState } from 'react';

const Login = () => {
  const [formFields, setFormFields] = useState<any>();

  const [checked, setChecked] = React.useState(false);
  const [validateMsg, setValidateMsg] = useState({ message: 'Try logging in' });

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const { username, password } = formFields;
    const user = await axios.post('/api/auth/login', { username, password });

    if (user.data.success) return router.push('/dashboard/user');

    setValidateMsg(user.data);
    console.log(user);
  };

  return (
    <PageContainer>
      <form onSubmit={handleSubmit}>
        {validateMsg.message}
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
            type={checked ? 'text' : 'password'}
            name="password"
            required
            onChange={(e) =>
              setFormFields({ ...formFields, password: e.target.value })
            }
          />
        </div>
        <div>
          <input
            type="checkbox"
            defaultChecked={checked}
            onChange={() => setChecked(!checked)}
            name="showPass"
            id="showPass"
          />
          Show password
        </div>
        <div>
          <input type="submit" value="Login" />
        </div>
      </form>
      <button onClick={() => router.push('/register')}>Registeer</button>
    </PageContainer>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (req.cookies.NextJWT) {
    return {
      props: {},
      redirect: {
        destination: '/dashboard/user'
      }
    };
  } else {
    return {
      props: {}
    };
  }
};
