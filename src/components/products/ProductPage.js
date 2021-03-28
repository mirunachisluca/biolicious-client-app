import React from 'react';
import { Figure, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { axiosInstance } from '../../api/axios';
import { ShoppingCartContext } from '../../context/ShoppingCartContext';
import { getStock } from '../../helpers/getStock';
import { addItemToCart } from '../../store/shoppingCart/shoppingCartActions';
import styles from './ProductPage.module.scss';

function ProductPage() {
  const { name } = useParams();
  const { dispatch } = React.useContext(ShoppingCartContext);

  const [product, setProduct] = React.useState({
    result: null,
    status: 'IDLE'
  });

  const [quantity, setQuantity] = React.useState(1);

  React.useEffect(
    function fetchProduct() {
      setProduct({ status: 'FETCHING' });
      axiosInstance
        .get('/products/byName', { params: { urlName: name } })
        .then((response) => {
          if (response.status === 200) {
            setProduct({ result: response.data, status: 'FETCHED' });
          }
        })
        .catch((error) => console.log(error));
    },
    [name]
  );

  // function quantityHandler(e) {
  //   e.preventDefault();
  //   if (e.target.innerHTML === '-') {
  //     if (quantity > 1) setQuantity(quantity - 1);
  //   } else if (e.target.innerHTML === '+') setQuantity(quantity + 1);
  // }

  function quantityInputHandler(e) {
    const inputQuantity = parseInt(e.target.value, 10);
    if (inputQuantity <= 0) setQuantity(1);
    else setQuantity(inputQuantity);

    // if (inputQuantity.isNaN()) setQuantity(1);
  }

  return (
    <>
      {product.status === 'FETCHED' && (
        <div className={`${styles.flexbox} ${styles.productDiv}`}>
          <div className={`${styles.pictureDiv}`}>
            <Figure>
              <Figure.Image
                width={600}
                height={500}
                src="../../../product.jpg"
              />
            </Figure>
          </div>

          <div className={`${styles.productDetailsDiv}`}>
            <h2>{product.result.name}</h2>

            <p>{product.result.description}</p>

            <div>
              <h4>{`${product.result.price}€`}</h4>
              <p>{product.result.weight}</p>
            </div>

            <p>{getStock(product.result.stock)}</p>

            <div className={`${styles.flexbox} ${styles.inputsDiv}`}>
              {/* <button type="button" onClick={quantityHandler}>
                -
              </button> */}
              <input
                type="number"
                value={quantity}
                onChange={quantityInputHandler}
                className={`${styles.quantityInput}`}
              />

              <Button
                variant="outline-secondary"
                onClick={() => {
                  console.log(product);
                  dispatch(
                    addItemToCart({
                      id: product.result.id,
                      name: product.result.name,
                      price: product.result.price,
                      quantity,
                      pictureUrl: product.result.pictureUrl,
                      brand: product.result.productBrand,
                      category: product.result.productCategory
                    })
                  );
                }}
              >
                Add to cart
              </Button>

              {/* <button type="button" onClick={quantityHandler}>
                +
              </button> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export { ProductPage };
