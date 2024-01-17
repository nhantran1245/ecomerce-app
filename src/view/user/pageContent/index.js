import React from "react";
import ProductPage from "../productPage";
import { Route, Routes } from "react-router-dom";
import HomePage from "../homePage";
import IntroductionPage from "../introductionPage";
import InforProduct from "../InformationProduct/InforProduct";
import Cart from "../cart";

const PageContent = ({ color }) => {
  return (
    <div
      style={{
        padding: 24,
        minHeight: 360,
        background: color,
        height: "100%",
      }}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route exact path="/:key" element={<ProductPage />} />
        <Route path="/gioi-thieu" element={<IntroductionPage />} />
        <Route path="/gio-hang" element={<Cart />} />
        <Route path="/san-pham/:key/:id" element={<InforProduct />} />
      </Routes>
    </div>
  );
};
export default PageContent;
