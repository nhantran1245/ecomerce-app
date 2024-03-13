import { useLocation } from "react-router-dom";
import { Button, notification } from "antd";
import { numberToVND } from "../../../services/utils/common";
import { ProductsCartContext } from "../store/products-cart-context";
import React, { useContext, useEffect } from "react";
import ProductDetailCard from "./ProductDetailCard";
// import SpecialOffers from "./SpecialOffers";
// import Specifications from "./Specifications";

const InforProduct = () => {
  let { state } = useLocation();
  const { addToCart, items } = useContext(ProductsCartContext);
  useEffect(() => {
    console.log(state);
  }, []);

  const openNotification = (title, message) => {
    notification.open({
      message: title,
      description: message,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addToCart(state.product, e.target[0].value, state.url);
    openNotification("Thông Báo", "Thêm vào giỏ hàng thành công");
    console.log(items);
  };

  return (
    <div className="">
      <div className="flex flex-col md:flex sm:flex-row">
        <div className="w-auto flex justify-center ">
          <ProductDetailCard
            Images={state.product.thumbnail}
            DiscountPercentage={state.product.discountPercentage}
          />
        </div>
        <div className="w-full sm:w-1/3 flex flex-col bg-[#cfcfcf2b] p-4">
          {/* <Typography.Paragraph>
            <Typography.Title level={3}>{state.product.title}</Typography.Title>
            <Typography.Text>Hãng: {state.product.brand}</Typography.Text>
            <br />
            <Typography.Text>
              Giá: {numberToVND(state.product.price)}
            </Typography.Text>
          </Typography.Paragraph>
          <Typography.Paragraph
            ellipsis={{ rows: 3, expandable: false, symbol: "more" }}
            style={{ width: "50%", display: "block" }}
          >
            Mô Tả: {state.product.description}
          </Typography.Paragraph> */}
          <div className="">
            <div className="min-h-5 font-bold text-2xl text-[#262626] ">
              <p className="font-mono">{state.product.title}</p>
            </div>

            <p className="w-1/3 block text-2xl font-semibold overflow-visible ">
              Hãng: {state.product.brand}
            </p>
            {state.product.discountPercentage > 0 && (
              <p className="w-1/3 block font-semibold line-through text-gray-500 text-3xl md:text-2xl ">
                {numberToVND(
                  state.product.price +
                    (state.product.price * state.product.discountPercentage) /
                      100
                )}
              </p>
            )}
            <p className="w-1/3 block font-bold text-red-500 text-3xl md:text-2xl">
              {numberToVND(state.product.price)}
            </p>
            {/* <p className="w-1/3 block text-center">
              {state.product.description}
            </p> */}
            {/* <SpecialOffers /> */}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-1 items-center">
              <input
                type="number"
                min={1}
                step={1}
                name="quantity"
                defaultValue={1}
                className="w-1/3 block border border-gray-300 p-2 rounded-md"
              />
              <Button
                type="primary"
                htmlType="submit"
                className="bg-primary text-white hover:bg-blue-700 hover:text-dark-7"
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
          </form>
        </div>
      </div>
      {/* <div className="flex flex-col justify-start">
        <div className="">
          <h2>Mô Tả Cơ Bản</h2>
          <li>TWR</li>
          <li>Twitter</li>
          <li>Dep trai</li>
          <li>Xe dap dua</li>
        </div>
        <div className="">
          <h2>Thông Số Kĩ Thuật</h2>
          <Specifications />
        </div>
      </div> */}
    </div>
  );
};

export default InforProduct;
