import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { ShoppingCartContext } from '../../context/ShoppingCartContext';
import { calculateTotal } from '../../helpers/pricesCalculator';
import { addItemToCart } from '../../store/shoppingCart/shoppingCartActions';

import styles from './ItemSummaryCard.module.scss';

function ItemSummaryCard({ item }) {
  const [quantity, setQuantity] = React.useState(1);
  //   const [price, setPrice] = React.useState();

  const { dispatch } = React.useContext(ShoppingCartContext);

  function quantityInputHandler(e) {
    let inputQuantity = parseInt(e.target.value, 10);
    if (inputQuantity <= 0) {
      inputQuantity = 1;
    }
    setQuantity(inputQuantity);
  }

  //   React.useEffect(() => {
  //     const newPrice = calculateTotal(item.price, quantity);
  //     setPrice(newPrice);
  //   }, [quantity, item.price]);

  return (
    <>
      <Card className={`${styles.card} shadow`}>
        <img src="../../../product.jpg" width="100%" alt="product" />

        <div className={styles.grid}>
          <div className={styles.productDetails}>
            <p className={styles.itemTitle}>
              {`${item.productName}  ${item.productWeight}`}
            </p>

            <input
              type="number"
              id={item.id}
              value={quantity}
              onChange={quantityInputHandler}
              className={`${styles.quantityInput}`}
            />
          </div>

          <Card.Body className={styles.body}>
            <p className={styles.price}>{`${item.productPrice}€`}</p>
            <Button
              variant="outline-black"
              className={styles.uppercase}
              onClick={() => {
                dispatch(
                  addItemToCart({
                    id: item.productId,
                    name: item.productName,
                    price: item.productPrice,
                    quantity,
                    pictureUrl: item.pictureUrl,
                    brand: item.productBrand,
                    category: item.productCategory
                  })
                );
              }}
            >
              Add
            </Button>
          </Card.Body>
        </div>
      </Card>
    </>
  );
}

export { ItemSummaryCard };
