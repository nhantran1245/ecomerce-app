import React, { createContext, useEffect } from "react";
import { db } from "../../../services/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export const ProductsFromDataBaseContext = createContext({
  products: [],
  getProductsFromDatabase: () => {},
});

const actions = {
  GET_PRODUCTS_FROM_DATABASE: "GET_PRODUCTS_FROM_DATABASE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.GET_PRODUCTS_FROM_DATABASE: {
      // console.log("payload" + action.payload);
      return {
        ...state,
        products: action.payload,
      };
    }
  }
};

const ProductsFromDataBaseProvider = (prop) => {
  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      // console.log(data);
      getProductsFromDatabase(data);
      return data;
    };
    getData();
  }, []);

  const [state, dispatch] = React.useReducer(reducer, {
    products: [],
  });

  const getProductsFromDatabase = (products) => {
    dispatch({
      type: actions.GET_PRODUCTS_FROM_DATABASE,
      payload: products,
    });
  };

  return (
    <ProductsFromDataBaseContext.Provider
      value={{
        products: state.products,
        getProductsFromDatabase,
      }}
    >
      {prop.children}
    </ProductsFromDataBaseContext.Provider>
  );
};

export default ProductsFromDataBaseProvider;
