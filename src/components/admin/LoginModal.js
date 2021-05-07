import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import styles from './LoginModal.module.scss';

function LoginModal({ show, loginHandler, errorMessage }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <Modal
        show={show}
        animation={false}
        backdrop="static"
        // backdropClassName={styles.modalBackdrop}
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Form className={styles.loginForm}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={emailHandler}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={passwordHandler}
              />
            </Form.Group>

            <p className="text-danger">{errorMessage}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button
              type="submit"
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                loginHandler(email, password);
              }}
            >
              Login
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export { LoginModal };
