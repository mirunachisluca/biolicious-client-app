import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { axiosInstance } from '../api/axios';
import { UserContext } from '../context/UserContext';
import styles from './css/login-page.module.scss';

function LoginPage() {
  const { login } = useContext(UserContext);
  const history = useHistory();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const emailInputHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordInputHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = (e) => {
    e.preventDefault();

    axiosInstance
      .post('/accounts/login', {
        email,
        password
      })
      .then((response) => {
        if (response.status === 200) {
          login(response.data.token);
          history.replace('/');
        }
      })
      .catch(() => {
        toast.error('Wrong email or password');
      });
  };

  return (
    <>
      <h2>Login</h2>

      <div className={`${styles.flexbox} mt-5`}>
        <Form className={styles.formFlexbox}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={emailInputHandler}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={passwordInputHandler}
            />
          </Form.Group>

          <div className={styles.alignRight}>
            <Button variant="dark" type="submit" onClick={loginHandler}>
              Login
            </Button>
          </div>

          <Button variant="link" href="/signup" className={styles.linkButton}>
            Don&apos;t have an account yet?
          </Button>
        </Form>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export { LoginPage };
