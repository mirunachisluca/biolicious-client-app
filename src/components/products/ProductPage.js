import React from 'react';
import { Button } from 'react-bootstrap';
import ImageFadeIn from 'react-image-fade-in';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { axiosInstance } from '../../api/axios';
import { ShoppingCartContext } from '../../context/ShoppingCartContext';
import { getStock } from '../../helpers/getStock';
import { calculatePriceWithTwoDecimals } from '../../helpers/pricesCalculator';
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

  function quantityInputHandler(e) {
    const inputQuantity = parseInt(e.target.value, 10);
    if (inputQuantity <= 0) setQuantity(1);
    if (inputQuantity > 15) setQuantity(15);
    else setQuantity(inputQuantity);
  }

  return (
    <>
      {product.status === 'FETCHED' && (
        <div className={`${styles.flexbox} ${styles.productDiv}`}>
          <div className={`${styles.pictureDiv}`}>
            <ImageFadeIn
              height="100%"
              src={product.result.pictureUrl}
              opacityTransition={3}
            />
          </div>

          <div className={`${styles.productDetailsDiv}`}>
            <h2 className="uppercase-bembo">{product.result.name}</h2>

            <div className={`text-justify ${styles.descriptionDiv}`}>
              <span>{product.result.description}</span>
            </div>

            <div className="m-auto">
              <h4
                className={
                  product.result.discount !== 0 ? 'crossed' : undefined
                }
              >
                {`${calculatePriceWithTwoDecimals(product.result.price)} € `}
              </h4>

              {product.result.discount !== 0 && (
                <h4>
                  {`${calculatePriceWithTwoDecimals(
                    product.result.price -
                      (product.result.discount * product.result.price) / 100
                  )} €`}
                </h4>
              )}
              <p>{product.result.weight}</p>
            </div>

            <p>{getStock(product.result.stock)}</p>

            <div className={` ${styles.inputsDiv}`}>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={quantityInputHandler}
                className={`${styles.quantityInput}`}
              />

              <Button
                variant="outline-black"
                disabled={product.result.stock === 0}
                onClick={() => {
                  dispatch(
                    addItemToCart({
                      id: product.result.id,
                      name: product.result.name,
                      price: product.result.price,
                      discount: product.result.discount,
                      weight: product.result.weight,
                      quantity,
                      pictureUrl: product.result.pictureUrl,
                      brand: product.result.productBrand,
                      category: product.result.productCategory,
                      subcategory: product.result.productSubcategory
                    })
                  );
                  toast.dark('Item added to cart');
                }}
              >
                {product.result.stock === 0 ? 'Out of stock' : 'Add to cart'}
              </Button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="bottom-left"
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

export { ProductPage };
