import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';

import { API_PAYMENTS_ROUTE } from '../routes/apiRoutes';
import { axiosInstance } from '../api/axios';
import styles from './css/PaymentPage.module.scss';
import { ShoppingCartContext } from '../context/ShoppingCartContext';
import { ORDER_PLACED } from '../routes/pageRoutes';

const iframeStyles = {
  base: {
    color: '#495057',
    fontSize: '16px',
    iconColor: 'grey',
    '::placeholder': {
      color: '#87bbfd'
    }
  },
  invalid: {
    iconColor: '#c73232',
    color: '#c73232'
  },
  complete: {
    iconColor: '#2ba72b'
  }
};

const cardElementOpts = {
  iconStyle: 'solid',
  style: iframeStyles,
  hidePostalCode: true
};

function PaymentPage() {
  const stripe = useStripe();
  const elements = useElements();

  const location = useLocation();
  const history = useHistory();

  const { deleteShoppingCart } = React.useContext(ShoppingCartContext);

  const [isProcessing, setProcessingTo] = React.useState(false);

  const createPayment = (e) => {
    e.preventDefault();

    const cardElement = elements.getElement(CardElement);

    const billingDetails = {
      name: e.target.name.value,
      email: e.target.email.value,
      address: {
        city: e.target.city.value,
        line1: e.target.address.value,
        state: e.target.county.value,
        postal_code: e.target.zip.value
      }
    };

    setProcessingTo(true);

    axiosInstance
      .post(`${API_PAYMENTS_ROUTE}/${localStorage.getItem('cartId')}`, {})
      .then(async (response) => {
        console.log(response);

        const paymentMethodRequest = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: billingDetails
        });

        const confirmedCardPayment = await stripe.confirmCardPayment(
          response.data.clientSecret,
          { payment_method: paymentMethodRequest.paymentMethod.id }
        );

        deleteShoppingCart();
        history.push(ORDER_PLACED);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={`${styles.mainDiv} shadow`}>
      <form onSubmit={createPayment}>
        <h6 className="uppercase-bembo">Billing address</h6>
        <br />
        <input name="name" placeholder="Name" className={styles.input} />
        <input name="email" placeholder="Email" className={styles.input} />
        <input name="address" placeholder="Address" className={styles.input} />
        <input name="city" placeholder="City" className={styles.input} />
        <input name="county" placeholder="County" className={styles.input} />
        <input name="zip" placeholder="Zip Code" className={styles.input} />

        <CardElement options={cardElementOpts} className={styles.input} />

        <br />

        <Button
          type="submit"
          disabled={isProcessing || !stripe}
          variant="outline-black"
          className="uppercase-bembo"
        >
          {isProcessing ? 'Processing...' : `Pay ${location.state.price} €`}
        </Button>
      </form>
    </div>
  );
}

export { PaymentPage };
