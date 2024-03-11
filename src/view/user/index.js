// import React from "react";
// import { Layout , theme } from "antd";
// import AppHeader from "./partials/header/Header";
// import "./styles.css";
// import AppFooter from "./partials/footer";

// import { db } from "../../services/firebase/firebase";
// import { onSnapshot, query, collection } from "firebase/firestore";

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

// const { Content } = Layout;
// export default function HomePage() {
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();
// const [listProduct, setListProduct] = useState([]);
// const [selectedProduct, setSelectedProduct] = useState(null);
// const productsCollection = collection(db, "products");
// const [itemsInCart, setItemsInCart] = useState([]);

// const q = query(productsCollection);

// useEffect(() => {
//   onSnapshot(q, (querySnapshot) => {
//     const items = [];
//     querySnapshot.forEach(doc => {
//       items.push({...doc.data(), id: doc.id });
//     });
//     setListProduct(items);
//   });
// }, []);

// const addToCartAction = (item) => {
//   let newCart = [...itemsInCart];
//   let isExistInCart = false;
//   /* check product are already add to cart before to increase quantity */
//   for (let i = 0; i< newCart.length; i++) {
//     if (newCart[i].product.id === item.product.id) {
//       newCart[i].quantity = parseInt(newCart[i].quantity) + parseInt(item.quantity);
//       isExistInCart = true;
//       break;
//     }
//   }
//   /* if not, add to cart */
//   if (!isExistInCart) {
//     newCart.push(item);
//   }
//   setItemsInCart(newCart);
//   setSelectedProduct(null);
// }

//   return (
//     <div className="UserHomePage">
//       <Layout>
//         <AppHeader/>
//         <Content
//           className="site-layout"
//           style={{
//             padding: "0 50px",
//           }}
//         >
//           <div
//             style={{
//               padding: 24,
//               minHeight: 780,
//               background: colorBgContainer,
//             }}
//           >
//           Content
//           </div>
//         </Content>
//         <AppFooter/>
//       </Layout>
//     </div>
//   )
// }

import React, { useContext, useState } from "react";
import { Breadcrumb, Button, Layout, Spin, theme } from "antd";
import { UpCircleOutlined } from "@ant-design/icons";
// import AppHeader from "./partials/header/Header";
import PageContent from "./pageContent";
import AppSider from "./partials/sider";
import { ProductsFromDataBaseContext } from "./store/products-from-database-context";

const { Content, Footer } = Layout;

const UserPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { products } = useContext(ProductsFromDataBaseContext);

  return (
    <Layout className="min-h-screen">
      <AppSider collapsed={collapsed} onCollapse={setCollapsed} />
      {/* <AppHeader /> */}
      <Content
        style={{
          margin: "0 16px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          {/* <Breadcrumb.Item>Sản phẩm</Breadcrumb.Item>
            <Breadcrumb.Item>Xe đạp</Breadcrumb.Item> */}
        </Breadcrumb>
        {products.length === 0 ? (
          <Spin
            style={{
              display: "block",
              margin: "0 auto",
              padding: "70px 100px",
            }}
          />
        ) : (
          <PageContent color={colorBgContainer} />
        )}
      </Content>
      {/* this below button just for scrolling to top */}
      <Button
        // scroll to the top
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
            // i want to slow that//
          });
        }}
        className="fixed bottom-5 right-5 bg-white border-2 border-gray-300 rounded-xl h-auto"
      >
        <UpCircleOutlined className="text-3xl" />
      </Button>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default UserPage;
