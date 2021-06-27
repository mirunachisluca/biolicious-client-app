import React from 'react';

import { Form, FormControl, FormLabel, Button, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { axiosInstance } from '../api/axios';
import { DeliveryMethodsContext } from '../context/DeliveryMethodsContext';
import { ShoppingCartContext } from '../context/ShoppingCartContext';
import { UserDetailsContext } from '../context/UserDetailsContext';
import { calculatePriceWithTwoDecimals } from '../helpers/pricesCalculator';
import { API_ORDERS_ROUTE } from '../routes/apiRoutes';
import { ORDER_PLACED, PAYMENT_PAGE } from '../routes/pageRoutes';
import {
  setAddress,
  setCityName,
  setCountyName,
  setDeliveryMethodId,
  setDeliveryPrice,
  setEmail,
  setFirstName,
  setLastName,
  setPaymentMethod,
  setPhoneNumber,
  setStreetName,
  setZipCode
} from '../store/user/checkoutActions';
import { checkoutReducer, initialState } from '../store/user/checkoutReducer';

import styles from './css/CheckoutPage.module.scss';

function CheckoutPage() {
  const { userDetails } = React.useContext(UserDetailsContext);
  const { deliveryMethods } = React.useContext(DeliveryMethodsContext);
  const {
    status,
    calculateTotal,
    fetchShoppingCart,
    deliveryMethodId,
    setCartDeliveryMethodId,
    deleteShoppingCart
  } = React.useContext(ShoppingCartContext);

  const [state, dispatch] = React.useReducer(checkoutReducer, initialState);

  const [total, setTotal] = React.useState(0);

  const history = useHistory();

  React.useEffect(() => fetchShoppingCart(localStorage.getItem('cartId')), []);

  React.useEffect(
    function updateAddressInputs() {
      if (
        userDetails.status === 'FETCHED' &&
        userDetails != null &&
        userDetails.result.address != null
      ) {
        dispatch(setAddress(userDetails.result.address));
        dispatch(setEmail(userDetails.result.email));
      }
    },
    [userDetails]
  );

  React.useEffect(
    function updateDeliveryMethod() {
      if (
        deliveryMethodId !== 0 &&
        !Number.isNaN(deliveryMethodId) &&
        deliveryMethods.status === 'FETCHED'
      ) {
        const method = deliveryMethods.result.find(
          (x) => x.id === deliveryMethodId
        );

        dispatch(setDeliveryMethodId(deliveryMethodId));
        dispatch(setDeliveryPrice(parseFloat(method.price)));
      }
    },
    [deliveryMethodId, deliveryMethods.status, deliveryMethods.result]
  );

  React.useEffect(
    function setCartPrice() {
      if (status === 'FETCHED') {
        setTotal(calculatePriceWithTwoDecimals(calculateTotal()));
      }
    },
    [status]
  );

  const placeOrder = () => {
    const order = {
      shoppingCartId: localStorage.getItem('cartId'),
      deliveryMethodId: state.deliveryMethodId,
      shippingAddress: state.address,
      emailAddress: state.email
    };

    axiosInstance
      .post(API_ORDERS_ROUTE, order)
      .then((response) => {})
      .catch((error) => console.log(error));
  };

  const placeOrderHandler = () => {
    if (state.paymentMethod === 'card') {
      history.push({
        pathname: PAYMENT_PAGE,
        state: {
          price: calculatePriceWithTwoDecimals(
            parseFloat(total) + parseFloat(state.deliveryPrice)
          )
        }
      });
    } else {
      placeOrder();
      deleteShoppingCart();
      history.push(ORDER_PLACED);
    }
  };

  return (
    <>
      {/* <h3 className="uppercase-bembo">Checkout</h3> */}

      <div className={styles.grid}>
        <div>
          <h6 className="uppercase-bembo">delivery address</h6>

          <br />
          <br />

          {(userDetails.status === 'IDLE' ||
            userDetails.status === 'FETCHED') && (
            <Form className={styles.alignLeft}>
              <div className={styles.grid2Cols}>
                <div className={styles.marginRight}>
                  <FormLabel>First Name</FormLabel>
                  <FormControl
                    type="text"
                    value={state.address.firstName}
                    onChange={(e) => dispatch(setFirstName(e.target.value))}
                  />
                </div>

                <div className={styles.marginLeft}>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl
                    type="text"
                    value={state.address.lastName}
                    onChange={(e) => dispatch(setLastName(e.target.value))}
                  />
                </div>
              </div>

              <div className={styles.grid2Cols}>
                <div className={styles.marginRight}>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl
                    type="text"
                    value={state.address.phoneNumber}
                    onChange={(e) => dispatch(setPhoneNumber(e.target.value))}
                  />
                </div>

                {userDetails.status === 'IDLE' && (
                  <div className={styles.marginLeft}>
                    <FormLabel>Email address</FormLabel>
                    <FormControl
                      type="text"
                      value={state.email}
                      onChange={(e) => dispatch(setEmail(e.target.value))}
                    />
                  </div>
                )}
              </div>

              <div className={styles.grid2Cols}>
                <div className={styles.marginRight}>
                  <FormLabel>City</FormLabel>
                  <FormControl
                    type="text"
                    value={state.address.city}
                    onChange={(e) => dispatch(setCityName(e.target.value))}
                  />
                </div>

                <div className={styles.marginLeft}>
                  <FormLabel>County</FormLabel>
                  <FormControl
                    type="text"
                    value={state.address.county}
                    onChange={(e) => dispatch(setCountyName(e.target.value))}
                  />
                </div>
              </div>

              <div className={styles.streetDiv}>
                <div className={styles.marginRight}>
                  <FormLabel>Street</FormLabel>
                  <FormControl
                    type="text"
                    value={state.address.street}
                    onChange={(e) => dispatch(setStreetName(e.target.value))}
                  />
                </div>

                <div className={styles.marginLeft}>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl
                    type="text"
                    value={state.address.zipCode}
                    onChange={(e) => dispatch(setZipCode(e.target.value))}
                  />
                </div>
              </div>
            </Form>
          )}

          {userDetails.status === 'LOADING' && <Spinner animation="border" />}
        </div>

        <div>
          <h6 className="uppercase-bembo">delivery method</h6>

          <br />
          <br />

          <div className={`${styles.gridColumnMargin}`}>
            <ul className="no-list-style">
              {deliveryMethods.status === 'FETCHED' &&
                deliveryMethods.result.map((method) => (
                  <Button
                    key={method.id}
                    variant="outline-black"
                    className={
                      state.deliveryMethodId === method.id
                        ? `${styles.deliveryMethodItem} ${styles.selected}`
                        : styles.deliveryMethodItem
                    }
                    onClick={() => {
                      dispatch(setDeliveryMethodId(method.id));
                      setCartDeliveryMethodId(method.id);
                      dispatch(setDeliveryPrice(parseFloat(method.price)));
                    }}
                  >
                    <div className={styles.alignLeft}>
                      <span>{method.name}</span>
                      <br />
                      <span>{method.deliveryTime}</span>
                    </div>

                    <span>{`${method.price} €`}</span>
                  </Button>
                ))}
            </ul>

            {deliveryMethods.status === 'LOADING' && (
              <Spinner animation="border" />
            )}
          </div>
        </div>

        <div>
          <h6 className="uppercase-bembo">payment method</h6>
          <br />
          <br />

          <div className={`${styles.gridColumnMargin}`}>
            <Button
              variant="outline-black"
              className={
                state.paymentMethod === 'cash'
                  ? `${styles.paymentButton} ${styles.selected}`
                  : styles.paymentButton
              }
              onClick={() => dispatch(setPaymentMethod('cash'))}
            >
              Cash on delivery
            </Button>

            <Button
              variant="outline-black"
              className={
                state.paymentMethod === 'card'
                  ? `${styles.paymentButton} ${styles.selected}`
                  : styles.paymentButton
              }
              onClick={() => dispatch(setPaymentMethod('card'))}
            >
              Credit card
            </Button>
          </div>

          <div className={styles.placeOrderDiv}>
            {status === 'PENDING' ||
              (status === 'LOADING' && <Spinner animation="border" />)}
            {status === 'FETCHED' && (
              <>
                <h5 className="uppercase-bembo">
                  {`Total:  ${calculatePriceWithTwoDecimals(
                    parseFloat(total) + parseFloat(state.deliveryPrice)
                  )} €`}
                </h5>

                <Button
                  variant="outline-black"
                  onClick={placeOrderHandler}
                  className={`${styles.placeOrderButton} uppercase-bembo`}
                >
                  {state.paymentMethod === 'cash'
                    ? 'Place order'
                    : 'Place order &  go to payment'}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export { CheckoutPage };
