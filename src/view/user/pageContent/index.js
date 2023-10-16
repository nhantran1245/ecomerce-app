import React from "react";
import ProductPage from "../productPage";
import { Route, Routes } from "react-router-dom";
import HomePage from "../homePage";

const PageContent = ({ color }) => {
  return (
    <div
      style={{
        padding: 24,
        minHeight: 360,
        background: color,
      }}
    >
      <Routes>
        <Route path="/san-pham" element={<ProductPage />}/>
        <Route path="/" element={<HomePage />}/>
      </Routes>
    </div>
  );
};
export default PageContent;