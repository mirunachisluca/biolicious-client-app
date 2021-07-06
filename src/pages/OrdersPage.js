import React from 'react';
import { useHistory } from 'react-router-dom';
import { Accordion, Card, Spinner, Table } from 'react-bootstrap';
import ImageFadeIn from 'react-image-fade-in';

import { axiosInstance } from '../api/axios';
import { API_ORDERS_ROUTE } from '../routes/apiRoutes';
import { UserContext } from '../context/UserContext';

import styles from './css/OrdersPage.module.scss';
import { calculatePriceWithTwoDecimals } from '../helpers/pricesCalculator';

function OrdersPage() {
  const [orders, setOrders] = React.useState({ status: 'IDLE', result: null });
  const { user } = React.useContext(UserContext);
  const history = useHistory();

  React.useEffect(() => {
    if (localStorage.getItem('token') == null) {
      history.push('/login');
    }
  }, []);

  React.useEffect(
    function fetchOrders() {
      if (user) {
        setOrders({ status: 'LOADING', data: null });
        axiosInstance
          .get(API_ORDERS_ROUTE)
          .then((response) => {
            if (response.status === 200) {
              setOrders({ status: 'FETCHED', result: response.data });
            }
          })
          .catch((error) => console.log(error));
      }
    },
    [user]
  );

  return (
    <>
      <br />
      <h3 className="uppercase-bembo">Orders</h3>
      <br />
      <br />

      <div className={styles.pageContent}>
        {orders.status === 'LOADING' && <Spinner animation="border" />}

        <ul className="no-list-style">
          {orders.status === 'FETCHED' &&
            orders.result.map((order) => (
              <li key={`list-item-${order.id}`}>
                <Accordion key={`accordion-${order.id}`}>
                  <Card>
                    <Accordion.Toggle
                      as={Card.Header}
                      eventKey={order.id}
                      className={`${styles.alignLeft} ${styles.orderHeader}`}
                    >
                      {`Order #182430${order.id}`}
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey={order.id}>
                      <Card.Body>
                        <p className="text-left">
                          {`Order date: ${order.orderDate.substring(0, 10)}`}
                        </p>

                        <p className="text-left">
                          {`Delivered to: ${order.shippingAddress.firstName} ${order.shippingAddress.lastName}, ${order.shippingAddress.phoneNumber}`}
                        </p>

                        <p className="text-left">
                          {`Delivery address: ${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.county}, ${order.shippingAddress.zipCode}`}
                        </p>

                        <p className="text-left">{`Delivery method:  ${order.deliveryMethod} ${order.deliveryPrice} €`}</p>

                        <p className="text-left font-weight-bold">
                          {`Total: ${calculatePriceWithTwoDecimals(
                            order.total
                          )} €`}
                        </p>

                        <Table
                          className={`${styles.table} shadow`}
                          key={`table-${order.id}`}
                        >
                          <thead>
                            <tr key={`thead-tr-${order.id}`}>
                              <th className={`${styles.alignLeft}`}>
                                Products
                              </th>
                              <th>Price</th>
                              <th>Quantity</th>
                            </tr>
                          </thead>

                          <tbody>
                            {order.orderItems.map((item) => (
                              <tr key={`tbody-tr-${item.id}`}>
                                <td className={styles.productColumn}>
                                  <ImageFadeIn
                                    src={item.pictureUrl}
                                    width="20%"
                                  />
                                  <p className={styles.productTitle}>
                                    {item.name}
                                  </p>
                                </td>

                                <td>
                                  {`${calculatePriceWithTwoDecimals(
                                    item.price -
                                      (item.discount * item.price) / 100
                                  )} €`}
                                </td>
                                <td>{item.quantity}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export { OrdersPage };
