import React, { createContext, useEffect, useReducer } from "react";
import { db } from "../../../services/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { notification } from "antd";

const ProductsCartContext = createContext({
  items: [{ product: {}, quantity: 0, key: "" }],
  addToCart: (product, quantity) => {},
  removeFromCart: (productId) => {},
  updateCart: (productId, quantity) => {},
  clearCart: () => {},
  pay: () => {},
});

const actions = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  UPDATE_CART: "UPDATE_CART",
  CLEAR_CART: "CLEAR_CART",
  GET_DATA_FROM_LOCAL_STORAGE: "GET_DATA_FROM_LOCAL_STORAGE",
  PAY: "PAY",
};
let idForItemsOfCart = 0;
const { v4: uuidv4 } = require("uuid");

const openNotification = (title, message) => {
  notification.open({
    message: title,
    description: message,
  });
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_TO_CART: {
      const { product, quantity, key } = action.payload;

      const itemIndex = state.items.findIndex(
        (item) => item.product.title === product.title && item.key === key
      );
      if (itemIndex === -1) {
        idForItemsOfCart += 1;
        localStorage.setItem(
          "cart",
          JSON.stringify([
            ...state.items,
            {
              product: { ...product, id: idForItemsOfCart },
              quantity: Number(quantity),
              key,
            },
          ])
        );
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
        localStorage.setItem("cart", JSON.stringify(state.items));
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
        localStorage.setItem("cart", JSON.stringify(state.items));
        return {
          ...state,
          items: newItems,
        };
      }
    }

    case actions.GET_DATA_FROM_LOCAL_STORAGE: {
      const orders = action.payload;
      return {
        ...state,
        items: orders,
      };
    }

    case actions.PAY: {
      const { customerName, customerNumberPhone } = action.payload;
      const docRef = doc(db, "orders", uuidv4());
      setDoc(docRef, {
        customerName,
        customerNumberPhone,
        products: [
          ...state.items.map((item) => {
            return {
              name: item.product.title,
              quantity: item.quantity,
              price: item.product.price,
              image: item.product.thumbnail,
            };
          }),
        ],
        total: state.items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        ),
      })
        .then(() => {
          openNotification(
            "Thông Báo",
            "Đặt Hàng Thành Công, Shop Sẽ Liên Hệ Với Bạn Trong Thời Gian Sớm Nhất"
          );
          localStorage.setItem("cart", JSON.stringify([]));
        })
        .catch((error) => {
          openNotification("Thông Báo", "Đặt Hàng Thất Bại, Vui Lòng Thử  Lại");
        });
      return {
        ...state,
        items: [],
      };
    }

    default:
      return state;
  }
};

const ProductsCartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    items: [],
  });

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("cart")));
    if (JSON.parse(localStorage.getItem("cart")) !== null) {
      dispatch({
        type: actions.GET_DATA_FROM_LOCAL_STORAGE,
        payload: JSON.parse(localStorage.getItem("cart")),
      });
    }
  }, []);

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

  const pay = (customerName, customerNumberPhone) => {
    dispatch({
      type: actions.PAY,
      payload: { customerName, customerNumberPhone },
    });
  };

  return (
    <ProductsCartContext.Provider
      value={{
        items: state.items,
        addToCart,
        removeFromCart,
        updateCart,
        clearCart,
        pay,
      }}
    >
      {children}
    </ProductsCartContext.Provider>
  );
};

export default ProductsCartProvider;
export { ProductsCartContext };
