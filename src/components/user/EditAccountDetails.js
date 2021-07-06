import React from 'react';
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../api/axios';
import { UserDetailsContext } from '../../context/UserDetailsContext';
import { API_ACCOUNTS_ROUTE } from '../../routes/apiRoutes';

import styles from './EditAccountDetails.module.scss';

const emailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const phoneRegex = /^[0-9]*$/;

function EditAccountDetails({ user }) {
  const [firstName, setFirstName] = React.useState(user.firstName);
  const [lastName, setLastName] = React.useState(user.lastName);
  const [email, setEmail] = React.useState(user.email);
  const [phoneNumber, setPhoneNumber] = React.useState(user.phoneNumber);

  const [firstNameError, setFirstNameError] = React.useState('');
  const [lastNameError, setLastNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [phoneNumberError, setPhoneNumberError] = React.useState('');
  const [validInputs, setValidInputs] = React.useState(false);

  const { fetchUserDetails } = React.useContext(UserDetailsContext);

  function editUserDetails(e) {
    e.preventDefault();
    axiosInstance
      .put(API_ACCOUNTS_ROUTE, { firstName, lastName, email, phoneNumber })
      .then((response) => {
        if (response.status === 200) {
          toast.dark('Details successfully updated');
          fetchUserDetails();
        }
      })
      .catch(() => toast.error('Something went wrong, please try again later'));
  }

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

  const phoneNumberInputHandler = (e) => {
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneNumberError('Please enter a valid phone number');
    } else setPhoneNumberError('');

    if (e.target.value === '') {
      setPhoneNumberError('Please enter a valid phone number');
    }

    setPhoneNumber(e.target.value);
  };

  React.useEffect(
    function checkInputs() {
      if (
        firstName !== '' &&
        lastName !== '' &&
        email !== '' &&
        phoneNumber !== '' &&
        firstNameError === '' &&
        lastNameError === '' &&
        emailError === '' &&
        phoneNumberError === ''
      ) {
        setValidInputs(true);
      } else setValidInputs(false);
    },
    [
      firstName,
      lastName,
      email,
      phoneNumber,
      firstNameError,
      lastNameError,
      emailError,
      phoneNumberError
    ]
  );

  return (
    <>
      <br />
      <Form onSubmit={editUserDetails}>
        <div className={styles.formLayout}>
          <FormGroup>
            <FormLabel>First Name</FormLabel>
            <FormControl
              type="text"
              value={firstName}
              onChange={firstNameInputHandler}
            />
            <span className="error">{firstNameError}</span>
          </FormGroup>

          <FormGroup>
            <FormLabel>Last Name</FormLabel>
            <FormControl
              type="text"
              value={lastName}
              onChange={lastNameInputHandler}
            />
            <span className="error">{lastNameError}</span>
          </FormGroup>

          <FormGroup>
            <FormLabel>Email</FormLabel>
            <FormControl
              type="text"
              value={email}
              onChange={emailInputHandler}
            />
            <span className="error">{emailError}</span>
          </FormGroup>

          <FormGroup>
            <FormLabel>Phone Number</FormLabel>
            <FormControl
              type="text"
              value={phoneNumber}
              onChange={phoneNumberInputHandler}
            />
            <span className="error">{phoneNumberError}</span>
          </FormGroup>

          <Button
            type="submit"
            variant="black"
            disabled={!validInputs}
            className={styles.submitButton}
          >
            Save
          </Button>
        </div>
      </Form>
    </>
  );
}

export { EditAccountDetails };
