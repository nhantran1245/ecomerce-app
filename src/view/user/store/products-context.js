import React, { createContext, useReducer } from "react";

const ProductsContext = createContext({
  items: [{ product: {}, quantity: 0, key: "" }],
  addToCart: (product, quantity) => {},
  removeFromCart: (productId) => {},
  updateCart: (productId, quantity) => {},
  clearCart: () => {},
});

const actions = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  UPDATE_CART: "UPDATE_CART",
  CLEAR_CART: "CLEAR_CART",
};

let idForItemsOfCart = 0;

const reducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_TO_CART: {
      const { product, quantity, key } = action.payload;

      const itemIndex = state.items.findIndex(
        (item) => item.product.title === product.title && item.key === key
      );
      console.log(itemIndex);
      if (itemIndex === -1) {
        idForItemsOfCart += 1;
        return {
          ...state,
          items: [
            ...state.items,
            {
              product: { ...product, id: idForItemsOfCart },
              quantity: Number(quantity),
              key,
            },
          ],
        };
      } else {
        const newItems = [...state.items];
        newItems[itemIndex].quantity += Number(quantity);
        return {
          ...state,
          items: newItems,
        };
      }
    }

    case actions.UPDATE_CART: {
      const { productId, quantity } = action.payload;
      if (quantity === 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.product.id !== productId),
        };
      } else {
        const itemIndex = state.items.findIndex(
          (item) => item.product.id === productId
        );

        const newItems = [...state.items];
        newItems[itemIndex].quantity = quantity;

        return {
          ...state,
          items: newItems,
        };
      }
    }

    default:
      return state;
  }
};

const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    items: [],
  });

  const addToCart = (product, quantity, key) => {
    dispatch({
      type: actions.ADD_TO_CART,
      payload: { product, quantity, key },
    });
  };

  const removeFromCart = (productId) => {};

  const updateCart = (productId, quantity) => {
    dispatch({
      type: actions.UPDATE_CART,
      payload: { productId, quantity },
    });
  };
  const clearCart = () => {};

  return (
    <ProductsContext.Provider
      value={{
        items: state.items,
        addToCart,
        removeFromCart,
        updateCart,
        clearCart,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
export { ProductsContext };
