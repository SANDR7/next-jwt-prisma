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

  const handler = (input: string) => {
    return (e: any) => setFormFields({ ...formFields, [input]: e.target.value });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const { username, password } = formFields;
    const user = await axios.post('/api/auth/login', { username, password });

    if (user.data.success) return router.push('/dashboard/user');

    setValidateMsg(user.data);
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
            onChange={handler('username')}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type={checked ? 'text' : 'password'}
            name="password"
            required
            onChange={handler('password')
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
