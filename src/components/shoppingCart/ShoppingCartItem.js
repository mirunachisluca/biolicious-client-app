import React from 'react';
import { Trash, TrashFill } from 'react-bootstrap-icons';
import { ShoppingCartContext } from '../../context/ShoppingCartContext';
import {
  calculatePriceWithTwoDecimals,
  calculateTotal
} from '../../helpers/pricesCalculator';
import {
  removeItem,
  updateQuantity
} from '../../store/shoppingCart/shoppingCartActions';

import styles from './ShoppingCartItem.module.scss';

function ShoppingCartItem({ item }) {
  const [quantity, setQuantity] = React.useState(item.quantity);
  const [price, setPrice] = React.useState(item.price);
  const [isIconHovered, setIsIconHovered] = React.useState(false);

  const { dispatch } = React.useContext(ShoppingCartContext);

  function quantityInputHandler(e) {
    let inputQuantity = parseInt(e.target.value, 10);
    if (inputQuantity <= 0) {
      inputQuantity = 1;
    }
    setQuantity(inputQuantity);

    dispatch(updateQuantity(parseInt(e.target.id, 10), inputQuantity));
  }

  React.useEffect(() => {
    const newPrice = calculateTotal(item.price, quantity);
    setPrice(newPrice);
  }, [quantity, item.price]);

  function trashIconHover() {
    setIsIconHovered(true);
  }

  function trashIconNotHover() {
    setIsIconHovered(false);
  }
  return (
    <>
      <tr key={item.id}>
        <td className={`${styles.productColumn}`}>
          <img src="../../product.jpg" alt="" width="30%" />
          <p className={`${styles.productTitle}`}>{item.name}</p>
        </td>

        <td>{`${calculatePriceWithTwoDecimals(item.price)} €`}</td>

        <td>
          <input
            type="number"
            id={item.id}
            value={quantity}
            onChange={quantityInputHandler}
            className={`${styles.quantityInput}`}
          />
        </td>

        <td>{`${price} €`}</td>

        <td>
          <div onMouseEnter={trashIconHover} onMouseLeave={trashIconNotHover}>
            {isIconHovered ? (
              <TrashFill
                className={styles.deleteIcon}
                onClick={() => dispatch(removeItem(item.id))}
              />
            ) : (
              <Trash className={styles.deleteIcon} />
            )}
          </div>
        </td>
      </tr>
    </>
  );
}

export { ShoppingCartItem };
