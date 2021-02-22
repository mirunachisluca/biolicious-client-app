import React from "react";
import { MenuBar } from "../navbar/MenuBar";

import { axiosInstance } from "../api/axios";

function ShopPage() {
  const [categories, setCategories] = React.useState({
    isLoaded: false,
    data: null,
  });

  React.useEffect(() => {
    setCategories({ isLoaded: false });
    axiosInstance
      .get("/productCategories")
      .then((response) => {
        if (response.status === 200) {
          setCategories({ isLoaded: true, data: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {categories.isLoaded && !!categories.data && (
        <>
          <MenuBar navbarData={categories.data} />
          <h1> SHOP</h1>
        </>
      )}
    </>
  );
}

export { ShopPage };
