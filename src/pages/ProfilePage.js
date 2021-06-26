import React from 'react';
import { Card } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from 'react-router-dom';
import { UserDetailsContext } from '../context/UserDetailsContext';
import { EDIT_PROFILE_PAGE_ROUTE } from '../routes/pageRoutes';

import styles from './css/ProfilePage.module.scss';

function ProfilePage() {
  const { userDetails } = React.useContext(UserDetailsContext);
  const history = useHistory();

  React.useEffect(() => {
    if (localStorage.getItem('token') == null) {
      history.push('/login');
    }
  }, []);

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
                  Delivery address
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

            {userDetails.result.address === null && (
              <p>No delivery address saved</p>
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
