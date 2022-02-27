import React, { SyntheticEvent, useEffect, useState } from "react";
import PageContainer from "../components/layout/Main";
import { formFieldProps } from "../types/interfaces";
import axios from "axios";

const Register = () => {
  const [formFields, setFormFields] = useState<formFieldProps>({
    username: "",
    password: "",
    repeatPassword: "",
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { username, password, repeatPassword } = formFields;

    if (password !== repeatPassword) {
      console.log("Password doesn't match");
    }

    const response = await axios.post("/api/user/post", { username, password });
    console.log(response.data);
  };

  return (
    <PageContainer>
      <form onSubmit={handleSubmit}>
        {formFields.password !== formFields.repeatPassword && "match niet"}
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
          <label htmlFor="repeat_password">repeat password</label>
          <input
            type="password"
            name="repeat_password"
            required
            onChange={(e) =>
              setFormFields({ ...formFields, repeatPassword: e.target.value })
            }
          />
        </div>
        <div>
          <input type="submit" value="Register" />
        </div>
      </form>
    </PageContainer>
  );
};

export default Register;
