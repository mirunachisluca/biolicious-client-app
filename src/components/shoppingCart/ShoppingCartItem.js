import React from 'react';
import { X } from 'react-bootstrap-icons';

import styles from './ShoppingCartItem.module.scss';

function ShoppingCartItem({ item }) {
  const [quantity, setQuantity] = React.useState(item.quantity);
  const initialPrice = item.price;
  const [price, setPrice] = React.useState(item.price);

  function quantityInputHandler(e) {
    const inputQuantity = parseInt(e.target.value, 10);
    if (inputQuantity <= 0) setQuantity(1);
    else setQuantity(inputQuantity);

    // if (inputQuantity.isNaN()) setQuantity(1);
  }

  React.useEffect(() => {
    const newPrice = (Math.round(quantity * initialPrice * 100) / 100).toFixed(
      2
    );
    setPrice(newPrice);
  }, [quantity, initialPrice]);

  return (
    <>
      <tr key={item.id}>
        <td className={`${styles.productColumn}`}>
          <img src="../../product.jpg" alt="" width="30%" />
          <p className={`${styles.productTitle}`}>{item.name}</p>
        </td>

        <td>
          <input
            type="number"
            value={quantity}
            onChange={quantityInputHandler}
            className={`${styles.quantityInput}`}
          />
        </td>
        <td>{price}</td>
        <td>
          <X />
        </td>
      </tr>
    </>
  );
}

export { ShoppingCartItem };
