import "./styles.css";
import React, { useContext, useRef, useState } from "react";
import { ProductsCartContext } from "../store/products-cart-context";
import { Image, Button, Table, Card, Modal, Input, Form } from "antd";
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

  const total = items.reduce((total, item) => {
    const { product, quantity } = item;
    return total + product.price * quantity;
  }, 0);

  const columns = [
    {
      title: "Sản Phẩm",
      dataIndex: "product",
      key: "product",
    },

    // {
    //   title: "ĐƠN GIÁ",
    //   key: "price",
    //   dataIndex: "price",
    // },

    // {
    //   title: "SỐ LƯỢNG",
    //   key: "quantity",
    //   dataIndex: "quantity",
    // },
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
        <div className="flex flex-col justify-start leading-3">
          <div className="w-[100px] my-2">
            <Image src={product.thumbnail} className="w-full" />
          </div>
          <p className="leading-5">Tên: {product.title}</p>
          <div className="flex flex-col">
            <p className="text-red-500 font-semibold">
              {numberToVND(product.price)}
            </p>
            {product.discountPercentage > 0 && (
              <p className=" line-through text-gray-700 -mt-1">
                {numberToVND(
                  product.price +
                    (product.price * product.discountPercentage) / 100
                )}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <p className="">Số lượng: {quantity}</p>
            <div>
              <Button
                className="w-1 mr-[0.1rem] text-center"
                onClick={() => {
                  updateCart(product.id, quantity - 1);
                }}
              >
                -
              </Button>
              <Button
                className="w-1"
                onClick={() => {
                  updateCart(product.id, quantity + 1);
                }}
              >
                +
              </Button>
            </div>
          </div>
        </div>
      ),
      // price: (
      //   <Typography.Paragraph>
      //     {numberToVND(product.price)}{" "}
      //     {product.discountPercentage > 0 && (
      //       <Typography.Text delete type="danger">
      //         {numberToVND(
      //           product.price +
      //             (product.price * product.discountPercentage) / 100
      //         )}
      //       </Typography.Text>
      //     )}
      //   </Typography.Paragraph>
      // ),
      // quantity: (
      //   <div className="flex flex-col">
      //     <Button
      //       onClick={() => {
      //         updateCart(product.id, quantity - 1);
      //       }}
      //     >
      //       -
      //     </Button>
      //     <Typography.Text>{quantity}</Typography.Text>
      //     <Button
      //       onClick={() => {
      //         updateCart(product.id, quantity + 1);
      //       }}
      //     >
      //       +
      //     </Button>
      //   </div>
      // ),
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
      <Table columns={columns} dataSource={data} pagination={false} />

      <Card style={{ width: "100%" }}>
        <p className="font-semibold">
          Tổng tiền: <span className="text-red-400">{numberToVND(total)}</span>
        </p>
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
    </>
  );
};

export default Cart;
