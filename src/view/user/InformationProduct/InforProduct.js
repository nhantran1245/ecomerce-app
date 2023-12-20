import { useLocation } from "react-router-dom";
import { Badge, Card, Image, Typography, notification } from "antd";
import { numberToVND } from "../../../services/utils/common";
import { ProductsCartContext } from "../store/products-cart-context";

import React, { useContext } from "react";

const InforProduct = () => {
  let { state } = useLocation();
  const { addToCart, items } = useContext(ProductsCartContext);

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
    <Badge.Ribbon
      className="itemCardBadge"
      text={`-${state.product.discountPercentage}%`}
      color="red"
    >
      <Card
        className="itemCard"
        // title={state.product.title}
        // key={index}
        cover={
          <Image
            className="itemCardImage"
            src={state.product.thumbnail}
            style={{ width: "200px" }}
          />
        }
      >
        <Card.Meta
          title={
            <Typography.Paragraph>
              <Typography.Text>{state.product.title}</Typography.Text>
              <br />
              {numberToVND(state.product.price)}{" "}
              <Typography.Text delete type="danger">
                {numberToVND(
                  state.product.price +
                    (state.product.price * state.product.discountPercentage) /
                      100
                )}
              </Typography.Text>
            </Typography.Paragraph>
          }
          description={
            <Typography.Paragraph
              ellipsis={{ rows: 2, expandable: false, symbol: "more" }}
            >
              {state.product.description}
            </Typography.Paragraph>
          }
        ></Card.Meta>
      </Card>
      {/* <ProductItem state.product={state.product} /> */}
      <form onSubmit={handleSubmit}>
        <input type="number" min={1} defaultValue={1} />
        <button type="submit">Thêm vào giỏ hàng</button>
      </form>
    </Badge.Ribbon>
  );
};

export default InforProduct;
