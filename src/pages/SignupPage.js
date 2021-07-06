import React from 'react';
import {
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
  Spinner
} from 'react-bootstrap';
import { InfoCircleFill } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { axiosInstance } from '../api/axios';
import styles from './css/SignupPage.module.scss';

const emailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function SignupPage() {
  const history = useHistory();

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPasswod] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');
  const [firstNameError, setFirstNameError] = React.useState('');
  const [lastNameError, setLastNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [repeatedPasswordError, setRepeatedPasswordError] = React.useState('');
  const [validInputs, setValidInputs] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const firstNameInputHandler = (e) => {
    if (e.target.value === '') {
      setFirstNameError("First name can't be empty");
    } else if (e.target.value.length <= 2) {
      setFirstNameError('First name must be at least 3 characters long');
    } else setFirstNameError('');

    setFirstName(e.target.value);
  };

  const lastNameInputHandler = (e) => {
    if (e.target.value === '') {
      setLastNameError("Last name can't be empty");
    } else if (e.target.value.length <= 2) {
      setLastNameError('Last name must be at least 3 characters long');
    } else setLastNameError('');

    setLastName(e.target.value);
  };

  const emailInputHandler = (e) => {
    if (!emailRegex.test(e.target.value)) {
      setEmailError('Please enter a valid email address');
    } else setEmailError('');

    setEmail(e.target.value);
  };

  const passwordInputHandler = (e) => {
    if (!passwordRegex.test(password)) {
      setPasswordError("Password doesn't meet the requirements");
    } else setPasswordError('');

    if (e.target.value === '') {
      setPasswordError('Please enter a valid password');
    }

    setPasswod(e.target.value);
  };

  const repeatPasswordInputHandler = (e) => {
    if (e.target.value !== password) {
      setRepeatedPasswordError("Passwords don't match");
    } else setRepeatedPasswordError('');

    if (e.target.value === '') {
      setRepeatedPasswordError('Please enter a valid password');
    }

    setRepeatPassword(e.target.value);
  };

  React.useEffect(
    function checkInputs() {
      if (
        firstName !== '' &&
        lastName !== '' &&
        email !== '' &&
        password !== '' &&
        repeatPassword !== '' &&
        firstNameError === '' &&
        lastNameError === '' &&
        emailError === '' &&
        passwordError === '' &&
        repeatedPasswordError === ''
      ) {
        setValidInputs(true);
      } else setValidInputs(false);
    },
    [
      firstName,
      lastName,
      email,
      password,
      repeatPassword,
      firstNameError,
      lastNameError,
      emailError,
      passwordError,
      repeatedPasswordError
    ]
  );

  const signupHandler = (e) => {
    e.preventDefault();

    setLoading(true);

    axiosInstance
      .post('/accounts/register', {
        firstName,
        lastName,
        email,
        password,
        confirmedPassword: repeatPassword
      })
      .then((response) => {
        if (response.status === 201) {
          history.push('/login');
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast.error(error.response.data);
          setLoading(false);
        }
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
                  onClick={(e) => {
                    if (e.target.value === '') {
                      setFirstNameError("First name can't be empty");
                    }
                  }}
                />
                <span className={styles.error}>{firstNameError}</span>
              </Form.Group>

              <Form.Group controlId="formLastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={lastNameInputHandler}
                  onClick={(e) => {
                    if (e.target.value === '') {
                      setLastNameError("Last name can't be empty");
                    }
                  }}
                />
                <span className={styles.error}>{lastNameError}</span>
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={emailInputHandler}
                  onClick={(e) => {
                    if (e.target.value === '') {
                      setEmailError('Please enter a valid email address');
                    }
                  }}
                />
                <span className={styles.error}>{emailError}</span>
              </Form.Group>
            </div>

            <div className={styles.accountInfoDiv}>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>

                <OverlayTrigger
                  key="info"
                  placement="right"
                  overlay={
                    <Tooltip id="tooltip-password">
                      Password must be at least 8 characters long and contain at
                      least 1 uppercase letter, 1 lowercase letter, 1 special
                      character and 1 number.
                    </Tooltip>
                  }
                >
                  <InfoCircleFill className="ml-2" />
                </OverlayTrigger>

                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={passwordInputHandler}
                  onClick={(e) => {
                    if (e.target.value === '') {
                      setPasswordError('Please enter a valid password');
                    }
                  }}
                />
                <span className={styles.error}>{passwordError}</span>
              </Form.Group>

              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Repeat password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Repeat password"
                  value={repeatPassword}
                  onChange={repeatPasswordInputHandler}
                  onClick={(e) => {
                    if (e.target.value === '') {
                      setRepeatedPasswordError('Please enter a valid password');
                    }
                  }}
                />
                <span className={styles.error}>{repeatedPasswordError}</span>
              </Form.Group>
            </div>
          </div>

          {loading && <Spinner className="m-auto" animation="border" />}

          <div className={styles.alignRight}>
            <Button
              variant="dark"
              type="submit"
              onClick={signupHandler}
              disabled={!validInputs}
            >
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

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
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

export { SignupPage };
