import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { axiosInstance } from '../api/axios';
import { UserContext } from '../context/UserContext';
import { GET_USER_DETAILS_ROUTE } from '../routes/apiRoutes';

import styles from './css/EditProfilePage.module.scss';

function EditProfilePage() {
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
      <h3 className="uppercase-bembo">PROFILE PAGE</h3>
      {userDetails.status === 'FETCHED' && (
        <div className={styles.page}>
          <Tabs defaultActiveKey="account" transition={false}>
            <Tab eventKey="account" title="Account">
              <p>Details</p>
            </Tab>

            <Tab eventKey="address" title="Address">
              <p>Address</p>
            </Tab>

            <Tab eventKey="delete" title="Delete account">
              <p>???</p>
            </Tab>
          </Tabs>
        </div>
      )}
    </>
  );
}
export { EditProfilePage };
