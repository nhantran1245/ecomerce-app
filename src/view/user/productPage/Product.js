import React from "react";
import { Badge, Card, Image, Typography } from "antd";
import { numberToVND } from "../../../services/utils/common";

const Product = ({ product, index }) => {
  return (
    
    <Badge.Ribbon
      className="itemCardBadge"
      text={`-${product.discountPercentage}%`}
      color="red"
    >
      <Card
        className="itemCard"
        // title={product.title}
        key={index}
        cover={
          <Image className="itemCardImage" src={product.thumbnail} />
        }
        // actions={[
        //   <Rate allowHalf disabled value={product.rating} />,
        //   <AddToCartButton item={product} />,
        // ]}
      >
        <Card.Meta
          title={
            <Typography.Paragraph>
              <Typography.Text>
                {product.title}
              </Typography.Text>
              <br/>
              {numberToVND(product.price)}{" "}
              <Typography.Text delete type="danger">
                {numberToVND(
                  product.price +
                            (product.price * product.discountPercentage) / 100
                )}
              </Typography.Text>
            </Typography.Paragraph>
          }
          description={
            <Typography.Paragraph
              ellipsis={{ rows: 2, expandable: false, symbol: "more" }}
            >
              {product.description}
            </Typography.Paragraph>
          }
        ></Card.Meta>
      </Card>
    </Badge.Ribbon>
  );
}
export default Product;