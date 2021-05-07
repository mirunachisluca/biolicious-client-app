import React from 'react';
import { Card } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';
import { axiosInstance } from '../api/axios';
import { UserContext } from '../context/UserContext';
import { GET_USER_DETAILS_ROUTE } from '../routes/apiRoutes';
import { EDIT_PROFILE_PAGE_ROUTE } from '../routes/pageRoutes';

import styles from './css/ProfilePage.module.scss';

function ProfilePage() {
  const [userDetails, setUserDetails] = React.useState({
    status: 'IDLE',
    result: null
  });

  const { user } = React.useContext(UserContext);

  React.useEffect(
    function fetchUserDetails() {
      if (user) {
        axiosInstance
          .get(GET_USER_DETAILS_ROUTE)
          .then((response) => {
            if (response.status === 200) {
              console.log(response.data);
              setUserDetails({ status: 'FETCHED', result: response.data });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    [user]
  );

  return (
    <>
      {userDetails.status === 'FETCHED' && (
        <>
          <div className={styles.grid}>
            <Card className="shadow">
              <Card.Title className={`${styles.title}  uppercase-bembo`}>
                Account Details
              </Card.Title>

              <PersonCircle size="25%" className={styles.icon} />

              <Card.Body className={styles.bodyGrid}>
                <div
                  className={`${styles.alignLeft}  ${styles.detailsHeadings}`}
                >
                  <p>First Name:</p>
                  <p>Last Name:</p>
                  <p>Email:</p>
                  <p>Phone number:</p>
                </div>

                <div className={`${styles.alignLeft} ${styles.detailsValues}`}>
                  <p>{userDetails.result.firstName}</p>
                  <p>{userDetails.result.lastName}</p>
                  <p>{userDetails.result.email}</p>
                  <p>{userDetails.result.phoneNumber}</p>
                </div>
              </Card.Body>
            </Card>

            {userDetails.result.address && (
              <Card className={`shadow ${styles.addressCard}`}>
                <Card.Title className={`${styles.title}  uppercase-bembo`}>
                  Address
                </Card.Title>

                <Card.Body className={styles.bodyGrid}>
                  <div
                    className={`${styles.alignLeft}  ${styles.detailsHeadings}`}
                  >
                    <p>First Name:</p>
                    <p>Last Name:</p>
                    <p>County:</p>
                    <p>City:</p>
                    <p>Street:</p>
                    <p>Zip Code:</p>
                    <p>Phone number:</p>
                  </div>

                  <div
                    className={`${styles.alignLeft} ${styles.detailsValues}`}
                  >
                    <p>{userDetails.result.address.firstName}</p>
                    <p>{userDetails.result.address.lastName}</p>
                    <p>{userDetails.result.address.county}</p>
                    <p>{userDetails.result.address.city}</p>
                    <p>{userDetails.result.address.street}</p>
                    <p>{userDetails.result.address.zipCode}</p>
                    <p>{userDetails.result.address.phoneNumber}</p>
                  </div>
                </Card.Body>
              </Card>
            )}
          </div>

          <LinkContainer to={EDIT_PROFILE_PAGE_ROUTE}>
            <a href=".">Edit</a>
          </LinkContainer>
        </>
      )}
    </>
  );
}
export { ProfilePage };
