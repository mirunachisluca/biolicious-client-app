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
import { USER_ADDRESS_ROUTE } from '../../routes/apiRoutes';

import styles from './EditAddress.module.scss';

function EditAddress({ address }) {
  const [street, setStreet] = React.useState(address.street);
  const [city, setCity] = React.useState(address.city);
  const [county, setCounty] = React.useState(address.county);
  const [zipCode, setZipCode] = React.useState(address.zipCode);
  const [firstName, setFirstName] = React.useState(address.firstName);
  const [lastName, setLastName] = React.useState(address.lastName);
  const [phoneNumber, setPhoneNumber] = React.useState(address.phoneNumber);

  const { fetchUserDetails } = React.useContext(UserDetailsContext);

  function saveAddress(e) {
    e.preventDefault();
    axiosInstance
      .put(USER_ADDRESS_ROUTE, {
        firstName,
        lastName,
        phoneNumber,
        street,
        city,
        county,
        zipCode
      })
      .then((response) => {
        if (response.status === 200) {
          toast.dark('Address updated successfully');
          fetchUserDetails();
        }
      })
      .catch(() => toast.error('Something went wrong, please try again later'));
  }

  return (
    <>
      <br />
      <Form onSubmit={saveAddress} className={styles.scrollableForm}>
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
            <FormLabel>Phone Number</FormLabel>
            <FormControl
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Street</FormLabel>
            <FormControl
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>City</FormLabel>
            <FormControl
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>County</FormLabel>
            <FormControl
              type="text"
              value={county}
              onChange={(e) => setCounty(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>ZIP Code</FormLabel>
            <FormControl
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
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

export { EditAddress };
