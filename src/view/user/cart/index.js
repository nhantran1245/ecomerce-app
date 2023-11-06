import React, { useContext } from "react";
import { ProductsContext } from "../store/products-context";
import { Badge, Card, Image, Typography, Button, Flex } from "antd";
import { numberToVND } from "../../../services/utils/common";

const Cart = () => {
  const { items, updateCart } = useContext(ProductsContext);

  const total = items.reduce((total, item) => {
    const { product, quantity } = item;
    return total + product.price * quantity;
  }, 0);

  return (
    <>
      {items.length === 0 ? (
        <p>No Have Any Products</p>
      ) : (
        <>
          {items.map((item) => {
            const { product, quantity } = item;

            return (
              <Badge.Ribbon
                className="itemCardBadge"
                text={`-${product.discountPercentage}%`}
                color="red"
                key={product.id}
              >
                <Card
                  className="itemCard"
                  cover={
                    <Image
                      className="itemCardImage"
                      src={product.thumbnail}
                      style={{ width: "200px" }}
                    />
                  }
                >
                  <Card.Meta
                    title={
                      <Typography.Paragraph>
                        <Typography.Text>{product.title}</Typography.Text>
                        <br />
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
                        ellipsis={{
                          rows: 2,
                          expandable: false,
                          symbol: "more",
                        }}
                      >
                        Số lượng: {quantity}{" "}
                        <Flex>
                          <Button
                            onClick={() => {
                              updateCart(product.id, quantity + 1);
                            }}
                          >
                            +
                          </Button>
                          <Button
                            onClick={() => {
                              updateCart(product.id, quantity - 1);
                            }}
                          >
                            -
                          </Button>
                        </Flex>
                      </Typography.Paragraph>
                    }
                  ></Card.Meta>
                </Card>
              </Badge.Ribbon>
            );
          })}

          <p>Tổng tiền: {numberToVND(total)}</p>
          <Button>Thanh Toán</Button>
        </>
      )}
    </>
  );
};

export default Cart;
