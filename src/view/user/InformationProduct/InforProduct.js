import { useLocation } from "react-router-dom";
import { Button, Col, Flex, Image, Typography, notification } from "antd";
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

  // (
  //   <Badge.Ribbon
  //     className="itemCardBadge"
  //     text={`-${state.product.discountPercentage}%`}
  //     color="red"
  //   >
  //     <Card
  //       className="itemCard"
  //       // title={state.product.title}
  //       // key={index}
  //       cover={
  //         <Image
  //           className="itemCardImage"
  //           src={state.product.thumbnail}
  //           style={{ width: "200px" }}
  //         />
  //       }
  //     >
  //       <Card.Meta
  //         title={
  //           <Typography.Paragraph>
  //             <Typography.Text>{state.product.title}</Typography.Text>
  //             <br />
  //             {numberToVND(state.product.price)}{" "}
  //             <Typography.Text delete type="danger">
  //               {numberToVND(
  //                 state.product.price +
  //                   (state.product.price * state.product.discountPercentage) /
  //                     100
  //               )}
  //             </Typography.Text>
  //           </Typography.Paragraph>
  //         }
  //         description={
  //           <Typography.Paragraph
  //             ellipsis={{ rows: 2, expandable: false, symbol: "more" }}
  //           >
  //             {state.product.description}
  //           </Typography.Paragraph>
  //         }
  //       ></Card.Meta>
  //     </Card>
  //     {/* <ProductItem state.product={state.product} /> */}
  //     <form onSubmit={handleSubmit}>
  //       <input type="number" min={1} defaultValue={1} />
  //       <button type="submit">Thêm vào giỏ hàng</button>
  //     </form>
  //   </Badge.Ribbon>
  // );
  return (
    <Flex>
      <Col span={12}>
        <Image
          className="itemCardImage"
          src={state.product.thumbnail}
          style={{ width: "80%" }}
          preview={false}
        />
      </Col>
      <Col span={12}>
        <Typography.Paragraph>
          <Typography.Title level={3}>{state.product.title}</Typography.Title>
          <Typography.Text>Hãng: {state.product.brand}</Typography.Text>
          <br />
          <Typography.Text>
            Giá: {numberToVND(state.product.price)}
          </Typography.Text>
        </Typography.Paragraph>
        <Typography.Paragraph
          ellipsis={{ rows: 3, expandable: false, symbol: "more" }}
          style={{ width: "50%" }}
        >
          Mô Tả: {state.product.description}
        </Typography.Paragraph>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            min={1}
            defaultValue={1}
            style={{ marginRight: "0.1rem", width: "3rem" }}
          />
          <Button type="primary" htmlType="submit" style={{ padding: "5px" }}>
            Thêm vào giỏ hàng
          </Button>
        </form>
      </Col>
    </Flex>
  );
};

export default InforProduct;
