import React from 'react';

import { Tab, Tabs } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { EditAccountDetails } from '../components/user/EditAccountDetails';
import { EditAddress } from '../components/user/EditAddress';
import { UserDetailsContext } from '../context/UserDetailsContext';

import styles from './css/EditProfilePage.module.scss';

const emptyAddress = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  street: '',
  city: '',
  county: '',
  zipCode: ''
};

function EditProfilePage() {
  const { userDetails } = React.useContext(UserDetailsContext);
  const history = useHistory();

  React.useEffect(() => {
    if (localStorage.getItem('token') == null) {
      history.push('/login');
    }
  }, []);

  return (
    <>
      <br />
      <h3 className="uppercase-bembo">Edit profile</h3>
      {userDetails.status === 'FETCHED' && (
        <div className={styles.page}>
          <Tabs defaultActiveKey="account" transition={false}>
            <Tab eventKey="account" title="Account">
              <EditAccountDetails user={userDetails.result} />
            </Tab>

            <Tab eventKey="address" title="Delivery address">
              <EditAddress
                address={
                  userDetails.result.address === null
                    ? emptyAddress
                    : userDetails.result.address
                }
              />
            </Tab>

            <Tab eventKey="delete" title="Delete account" />
          </Tabs>
        </div>
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
export { EditProfilePage };
