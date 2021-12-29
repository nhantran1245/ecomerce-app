import React, { useState, useEffect } from "react";
import Navigation from "./partials/navigation/Navigation";
import Header from "./partials/header/Header";
import "./styles.css";
import ProductItem from "./partials/product-item/ProductItem";
import AddToCardModal from "./partials/modals/AddToCardModal";
import { db } from "../../services/firebase/firebase";
import { onSnapshot, query, collection } from "firebase/firestore";

// const listProduct = [
//   {
//     isSale: true,
//     productName: "Bó hoa sáp",
//     image: "https://thegioihoasap.com/wp-content/uploads/2021/01/bo-hoa-sap-dep-1-247x296.jpg?v=1620470552",
//     originalCost: 1000000,
//     promoteCost: 500000  
//   },
//   {
//     isSale: false,
//     productName: "Bó hoa sáp",
//     image: "https://thegioihoasap.com/wp-content/uploads/2021/01/bo-hoa-sap-dep-1-247x296.jpg?v=1620470552",
//     originalCost: 1000000
//   },
//   {
//     isSale: true,
//     productName: "Bó hoa sáp",
//     image: "https://thegioihoasap.com/wp-content/uploads/2021/01/bo-hoa-sap-dep-1-247x296.jpg?v=1620470552",
//     originalCost: 300000,
//     promoteCost: 200000  
//   }
// ];

export default function HomePage() {
  const [listProduct, setListProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const productsCollection = collection(db, "products");
  const [itemsInCart, setItemsInCart] = useState([]);

  const q = query(productsCollection);

  useEffect(() => {
    onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach(doc => {
        items.push({...doc.data(), id: doc.id });
      });
      setListProduct(items);
    }); 
  }, []);

  const addToCartAction = (item) => {
    let newCart = [...itemsInCart];
    let isExistInCart = false;
    /* check product are already add to cart before to increase quantity */
    for (let i = 0; i< newCart.length; i++) {
      if (newCart[i].product.id === item.product.id) {
        newCart[i].quantity = parseInt(newCart[i].quantity) + parseInt(item.quantity);
        isExistInCart = true;
        break;
      }
    }
    /* if not, add to cart */
    if (!isExistInCart) {
      newCart.push(item);
    }
    setItemsInCart(newCart);
    setSelectedProduct(null);
  }

  return (
    <div className="UserHomePage">
      <Navigation itemsInCart={itemsInCart} setItemsInCart={setItemsInCart}/>
      <Header/>
      <section className="py-5 section">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {listProduct.map((item, index) => (
              <ProductItem
                key={index}
                product={item}
                onSelected={setSelectedProduct}
              />
            ))}
          </div>
        </div>
      </section>
      <footer className="py-5 bg-dark">
        <div className="container"><p className="m-0 text-center text-white">Copyright &copy; Your Website 2021</p></div>
      </footer>
      {selectedProduct ? 
        <AddToCardModal 
          onClose={() => setSelectedProduct(null)}
          selectedProduct={selectedProduct}
          onSave={addToCartAction}
        /> 
        : null
      }
    </div>
  )
}
