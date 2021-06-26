import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { axiosInstance } from '../api/axios';
import styles from './css/SignupPage.module.scss';

function SignupPage() {
  const history = useHistory();

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPasswod] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');

  const firstNameInputHandler = (e) => {
    setFirstName(e.target.value);
  };

  const lastNameInputHandler = (e) => {
    setLastName(e.target.value);
  };

  const emailInputHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordInputHandler = (e) => {
    setPasswod(e.target.value);
  };

  const repeatPasswordInputHandler = (e) => {
    setRepeatPassword(e.target.value);
  };

  const signupHandler = (e) => {
    e.preventDefault();

    axiosInstance
      .post('/accounts/register', {
        firstName,
        lastName,
        email,
        password,
        confirmedPassword: repeatPassword
      })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          history.push('/login');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <br />
      <h3 className="uppercase-bembo">Create your account now</h3>

      <div className={`${styles.flexbox} mt-5`}>
        <Form className={styles.flexboxColumn}>
          <div className={styles.infoDiv}>
            <div className={styles.userInfoDiv}>
              <Form.Group controlId="formFirstName">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={firstNameInputHandler}
                />
              </Form.Group>

              <Form.Group controlId="formLastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={lastNameInputHandler}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={emailInputHandler}
                />
              </Form.Group>
            </div>

            <div className={styles.accountInfoDiv}>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={passwordInputHandler}
                />
              </Form.Group>

              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Repeat password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Repeat password"
                  value={repeatPassword}
                  onChange={repeatPasswordInputHandler}
                />
              </Form.Group>
            </div>
          </div>

          <div className={styles.alignRight}>
            <Button variant="dark" type="submit" onClick={signupHandler}>
              Register
            </Button>
          </div>

          <div>
            <Button variant="link" href="/login" className={styles.linkButton}>
              Already have an account?
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export { SignupPage };
