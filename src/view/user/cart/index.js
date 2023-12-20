<<<<<<< HEAD
import React, { useContext, useRef, useState } from "react";
import { ProductsCartContext } from "../store/products-cart-context";
import {
  Image,
  Button,
  Flex,
  Table,
  Card,
  Typography,
  Modal,
  Input,
  Form,
} from "antd";
import { numberToVND } from "../../../services/utils/common";

const Cart = () => {
  const { items, updateCart, pay } = useContext(ProductsCartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const customerNameRef = useRef("");
  const customerNumberPhoneRef = useRef("");

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const checkNumberPhoneIsValid = (numberPhone) => {
    const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    return regex.test(numberPhone);
  };
=======
import React, { useContext } from "react";
import { ProductsContext } from "../store/products-context";
import { Badge, Card, Image, Typography, Button, Flex } from "antd";
import { numberToVND } from "../../../services/utils/common";

const Cart = () => {
  const { items, updateCart } = useContext(ProductsContext);
>>>>>>> e5558c56423fa5f90911be1fe978e283f2ac7a7b

  const total = items.reduce((total, item) => {
    const { product, quantity } = item;
    return total + product.price * quantity;
  }, 0);

<<<<<<< HEAD
  const columns = [
    {
      title: "Sản Phẩm",
      dataIndex: "product",
      key: "product",
    },

    {
      title: "ĐƠN GIÁ",
      key: "price",
      dataIndex: "price",
    },

    {
      title: "SỐ LƯỢNG",
      key: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "THÀNH TIỀN",
      key: "total",
      dataIndex: "total",
    },
    {
      title: "XÓA",
      key: "delete",
      dataIndex: "delete",
    },
  ];

  const data = items.map((item) => {
    const { product, quantity } = item;
    return {
      key: product.id,
      product: (
        <div>
          <Image
            src={product.thumbnail}
            style={{ width: "100px", height: "100px" }}
          />
          <p>{product.title}</p>
        </div>
      ),
      price: (
        <Typography.Paragraph>
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
      ),
      quantity: (
        <Flex style={{ alignItems: "center", gap: "0.5rem" }}>
          <Button
            onClick={() => {
              updateCart(product.id, quantity - 1);
            }}
          >
            -
          </Button>
          <Typography.Text>{quantity}</Typography.Text>
          <Button
            onClick={() => {
              updateCart(product.id, quantity + 1);
            }}
          >
            +
          </Button>
        </Flex>
      ),
      total: <p>{numberToVND(product.price * quantity)}</p>,
      delete: (
        <Button
          onClick={() => {
            updateCart(product.id, 0);
          }}
        >
          Xóa
        </Button>
      ),
    };
  });

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: 1300 }}
      />

      <Card style={{ width: "100%" }}>
        <p>Tổng tiền: {numberToVND(total)}</p>
        {total > 0 && <Button onClick={showModal}>Xác Nhận Đơn Hàng</Button>}
        <Modal
          title="Xác nhận đơn hàng"
          open={isModalOpen}
          onOk={() => {
            if (
              !customerNameRef.current.input?.value.trim() ||
              !checkNumberPhoneIsValid(
                customerNumberPhoneRef.current.input?.value.trim()
              )
            ) {
              alert("Xin mời nhập đầy đủ thông tin!");
            } else {
              pay(
                customerNameRef.current.input.value.trim(),
                customerNumberPhoneRef.current.input?.value.trim()
              );
              handleOk();
            }
          }}
          onCancel={handleCancel}
          okText="Xác Nhận"
          cancelText="Hủy"
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item
              label="Tên khách hàng"
              name="customerName"
              rules={[
                {
                  required: true,
                  message: "Xin mời nhập tên!",
                },
              ]}
            >
              <Input ref={customerNameRef} />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="customerNumberPhone"
              rules={[
                {
                  required: true,
                  message: "Xin mời nhập số điện thoại!",
                },
                {
                  validator: (_, value) => {
                    if (checkNumberPhoneIsValid(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Số điện thoại không hợp lệ!")
                    );
                  },
                },
              ]}
            >
              <Input type="number" ref={customerNumberPhoneRef} />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
=======
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
>>>>>>> e5558c56423fa5f90911be1fe978e283f2ac7a7b
    </>
  );
};

export default Cart;
