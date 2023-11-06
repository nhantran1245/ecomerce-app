import React from "react";
import { Badge, Card, Image, Typography } from "antd";
import { numberToVND } from "../../../services/utils/common";
import { Link } from "react-router-dom";

const Product = ({ product, index, url }) => {
  return (
    <Link
      to={`/san-pham/${url}/${product.id}`}
      state={{ product: product, url: url }}
      style={{ textDecoration: "none" }}
    >
      <Badge.Ribbon
        className="itemCardBadge"
        text={`-${product.discountPercentage}%`}
        color="red"
      >
        <Card
          className="itemCard"
          key={index}
          cover={<Image className="itemCardImage" src={product.thumbnail} />}
        >
          <Card.Meta
            title={
              <Typography.Paragraph>
                <Typography.Text>{product.title}</Typography.Text>
                <br />
                {numberToVND(product.price)}{" "}
                {product.discountPercentage > 0 && (
                  <Typography.Text delete type="danger">
                    {numberToVND(
                      product.price +
                        (product.price * product.discountPercentage) / 100
                    )}
                  </Typography.Text>
                )}
              </Typography.Paragraph>
            }
            description={
              <Typography.Paragraph
                ellipsis={{ rows: 2, expandable: false, symbol: "more" }}
              >
                {product.description}
              </Typography.Paragraph>
            }
            style={{ height: "20%" }}
          ></Card.Meta>
        </Card>
        {/* <ProductItem product={product} /> */}
      </Badge.Ribbon>
    </Link>
  );
};
export default Product;
