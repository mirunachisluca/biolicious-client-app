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

function EditAccountDetails({ user }) {
  const [firstName, setFirstName] = React.useState(user.firstName);
  const [lastName, setLastName] = React.useState(user.lastName);
  const [email, setEmail] = React.useState(user.email);
  const [phoneNumber, setPhoneNumber] = React.useState(user.phoneNumber);

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
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Last Name</FormLabel>
            <FormControl
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Email</FormLabel>
            <FormControl
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Phone Number</FormLabel>
            <FormControl
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </FormGroup>

          <Button type="submit" variant="black" className={styles.submitButton}>
            Save
          </Button>
        </div>
      </Form>
    </>
  );
}

export { EditAccountDetails };
