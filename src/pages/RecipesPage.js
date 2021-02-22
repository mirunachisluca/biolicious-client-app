import React from "react";
import { MenuBar } from "../navbar/MenuBar";
import { axiosInstance } from "../api/axios";

function RecipesPage() {
  const [diets, setDiets] = React.useState({
    isLoaded: false,
    data: null,
  });

  const [categories, setCategories] = React.useState({
    isLoaded: false,
    data: null,
  });

  React.useEffect(() => {
    setDiets({ isLoaded: false });
    axiosInstance
      .get("/diets")
      .then((response) => {
        if (response.status === 200) {
          setDiets({ isLoaded: true, data: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    setCategories({ isLoaded: false });
    axiosInstance
      .get("/recipeCategories")
      .then((response) => {
        if (response.status === 200) {
          setCategories({ isLoaded: true, data: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const dietsObject = {
    id: "diets-menu-Id",
    name: "Diets",
    subcategories: diets.data,
  };

  const categoriesObject = {
    id: "categories-menu-Id",
    name: "Categories",
    subcategories: categories.data,
  };

  const data = [dietsObject, categoriesObject];

  return (
    <>
      {diets.isLoaded &&
        !!diets.data &&
        categories.isLoaded &&
        !!categories.data && (
          <>
            <MenuBar navbarData={data} />
            <h1> RECIPES</h1>
          </>
        )}
    </>
  );
}

export { RecipesPage };
