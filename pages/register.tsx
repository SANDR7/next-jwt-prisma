import PageContainer from '@/components/layout/Main';
import { formFieldProps } from '@/types/interfaces';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { SyntheticEvent, useState } from 'react';

const Register = () => {
  const [formFields, setFormFields] = useState<formFieldProps>({
    username: '',
    password: '',
    repeatPassword: ''
  });
  const [validate, setValidate] = useState({ message: 'Try register' });

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { username, password, repeatPassword } = formFields;

    if (password !== repeatPassword) {
      console.log("Password doesn't match");
    }

    const response = await axios.post('/api/insert/user', {
      username,
      password
    });

    setValidate(response.data);
    console.log(response.data);
  };

  return (
    <PageContainer>
      {validate.message}
      <form onSubmit={handleSubmit}>
        {formFields.password !== formFields.repeatPassword && 'match niet'}
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
            name="current_password"
            minLength={6}
            required
            onChange={(e) =>
              setFormFields({ ...formFields, password: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="repeat_password">repeat password</label>
          <input
            type="password"
            name="repeat_password"
            required
            minLength={6}
            onChange={(e) =>
              setFormFields({ ...formFields, repeatPassword: e.target.value })
            }
          />
        </div>
        <div>
          <input type="submit" value="Register" />
        </div>
      </form>
      <div>
        <button onClick={() => router.push('/login')}>Inloggen</button>
      </div>
    </PageContainer>
  );
};

export default Register;
