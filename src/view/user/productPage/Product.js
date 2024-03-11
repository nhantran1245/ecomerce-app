import React from "react";
import { Badge, Card, Image, Typography } from "antd";
import { numberToVND } from "../../../services/utils/common";
import { Link } from "react-router-dom";

const Product = ({ product, index, url }) => {
  return (
    <div className="max-w-sm m-2">
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
            className="group block"
            key={index}
            cover={
              <Image
                preview={false}
                className="md: h-3/4 transition-all group-hover:cursor-pointer group-hover:transform duration-300 group-hover:scale-105"
                src={product.thumbnail}
              />
            }
          >
            <Card.Meta
              title={
                <Typography.Paragraph>
                  {/* i want to align size of this text when screen is small */}
                  <p>{product?.title}</p>
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
              // description={
              //   <Typography.Paragraph
              //     ellipsis={{ rows: 2, expandable: false, symbol: "more" }}
              //   >
              //     {product.description}
              //   </Typography.Paragraph>
              // }
              style={{ height: "20%" }}
            ></Card.Meta>
          </Card>
        </Badge.Ribbon>
      </Link>
    </div>
  );
};
export default Product;
