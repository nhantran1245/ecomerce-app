import React, { useState, useCallback, useMemo } from "react";
import {
  Dropdown,
  Slider,
  Row,
  Col,
  Input,
  List,
  Pagination,
  Button,
  Space,
} from "antd";

import { DownOutlined } from "@ant-design/icons";
import Product from "./Product";
import "./styles.css";
import { useLocation } from "react-router-dom";

const mockProducts = [
  {
    key: "bicycle",
    products: [
      {
        id: 1,
        brand: "Giant",
        discountPercentage: 30,
        title: "XE ĐẠP ĐỊA HÌNH GIANT ROAM 3 DISC",
        thumbnail:
          "https://xedaphn.net/wp-content/uploads/2022/04/Roam-3-Disc-2023.jpg",
        price: 12900000,
        description:
          "Giant Roam 3 Disc Nhôm 29 inch Gamet có ngôn ngữ thiết kế mạnh mẽ, hiện đại với nhiều  màu sắc cho bạn lựa chọn. Đây sẽ là sự lựa chọn tuyệt vời dành cho những người yêu thích đạp xe để rèn luyện thể chất hay cùng bạn bè trải nghiệm ở những cung đường khó.",
      },
      {
        id: 2,
        brand: "Trietdeptrai",
        discountPercentage: 30,
        title:
          "Xe Đạp Địa Hình MTB MAX BIKE Rally – Phanh đĩa, Bánh 26 Inches – 2022",
        thumbnail:
          "https://xedaphn.net/wp-content/uploads/2022/04/Roam-3-Disc-2023.jpg",
        price: 4590000,
        description:
          "Xe đạp địa hình MTB MAX BIKE Rally mang diện mạo thu hút với kiểu dáng thể thao mạnh mẽ cùng tông màu hiện đại. Mẫu xe đạp này sẽ đồng hành cùng bạn rong ruổi trên những chuyến đi khám phá cung đường mới..",
      },
      {
        id: 3,
        brand: "China",
        discountPercentage: 30,
        title: "XE ĐẠP ĐỊA HÌNH GIANT ROAM 3 DISC",
        thumbnail:
          "https://xedaphn.net/wp-content/uploads/2022/04/Roam-3-Disc-2023.jpg",
        price: 12900000,
        description:
          "Giant Roam 3 Disc Nhôm 29 inch Gamet có ngôn ngữ thiết kế mạnh mẽ, hiện đại với nhiều  màu sắc cho bạn lựa chọn. Đây sẽ là sự lựa chọn tuyệt vời dành cho những người yêu thích đạp xe để rèn luyện thể chất hay cùng bạn bè trải nghiệm ở những cung đường khó.",
      },
    ],
  },

  {
    key: "eBike",
    products: [
      {
        id: 1,
        brand: "Xe lậu",
        discountPercentage: 20,
        title: "XE ĐẠP ĐIỆN XỊN NHẤT QUẢ ĐẤT",
        thumbnail:
          "https://salt.tikicdn.com/cache/750x750/ts/product/b1/13/65/dfda5379b6216e668bcd8b61171420b4.jpeg.webp",
        price: 5000000,
        description: "Xe vip",
      },
    ],
  },

  {
    key: "eMotobike",
    products: [
      {
        id: 1,
        brand: "Đạt Bike",
        discountPercentage: 30,
        title: "XE MÁY ĐIỆN CHẤT NHƯ NƯỚC CẤT",
        thumbnail:
          "https://xedientot.vn/images/product/xe-may-dien-dat-bike-weaver-200_7cb649bd.jpg",
        price: 12900000,
        description: "xe vip vai ",
      },
    ],
  },

  {
    key: "fitting",
    products: [
      {
        id: 1,
        brand: "Ta`u Khua",
        discountPercentage: 0,
        title: "Găng Tay Xe Đạp",
        thumbnail:
          "https://xedienthanhtung.com/wp-content/uploads/2022/09/GANG-TAY-XE-DAP-GIANT-%E2%80%93-HOHAC-new-fn.jpeg",
        price: 90000,
        description: "Găng tay xịn vãi ",
      },
    ],
  },
];

const ProductPage = () => {
  // I design this component for general product page, becauz it's so bored to design 4 page for 4 product type =))

  const [listProduct, setListProduct] = useState([]);
  const [priceFilter, setPriceFilter] = useState([0, 100]);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedType, setSelectedType] = useState({
    label: "Tất cả",
    key: "all",
  });

  const { state } = useLocation(); // state which i get from state ={key} in slideMenu.js help me to get the key of product.

  const currentProducts = useMemo(() => {
    const { products } = mockProducts.find((item) =>
      item?.key ? item.key === state : false
    );
    setListProduct(products);
    setPageNumber(1);
    setPriceFilter([0, 100]);
    setSelectedType({
      label: "Tất cả",
      key: "all",
    });
    return products || [];
  }, [state]);

  const onPagination = (pageNumber) => {
    setPageNumber(pageNumber);
    console.log(pageNumber);
  };

  const handleMenuClick = useCallback((e) => {
    const selected = items.find((item) => item.key === e.key);

    if (selected) {
      setSelectedType(selected);
    }

    if (selected.key === "all") {
      setPriceFilter([0, 100]);
      setListProduct([...currentProducts]);
    } else {
      const filterProducts = currentProducts.filter(
        (product) => product.brand === selected.key
      );
      setPriceFilter([0, 100]);
      setListProduct([...filterProducts]);
    }
  });

  const onSliderChange = (value) => {
    const currentListProduct = currentProducts.filter(
      (product) =>
        product.price <= value[1] * 1000000 &&
        product.price >= value[0] * 1000000
    );
    setListProduct([...currentListProduct]);
  };

  const temp = currentProducts
    .map((item) => {
      return {
        label: item.brand,
        key: item.brand,
      };
    })
    .concat({
      label: "Tất cả",
      key: "all",
    });

  const items = temp.filter((item, index, self) => {
    return index === self.findIndex((t) => t.key === item.key);
  });

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const sliderMarks = useMemo(
    () => ({
      [priceFilter[0]]: `${priceFilter[0]}tr`,
      [priceFilter[1]]: `${priceFilter[1]}tr`,
    }),
    [priceFilter]
  );

  const onSearch = (e) => {
    console.log(e);
  };
  return (
    <div className="product-page-content">
      <div className="filter-criteria">
        <Row>
          <Col span={4}>
            <Dropdown menu={menuProps}>
              <Button>
                <Space>
                  {selectedType.label} <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </Col>
          <Col span={8}>
            <Slider
              min={0}
              max={100}
              onChange={(value) => {
                onSliderChange(value);
              }}
              marks={sliderMarks}
              step={2}
              range
              defaultValue={[0, 100]}
            />
          </Col>
          <Col span={8}></Col>
          <Col span={4}>
            <Input.Search
              placeholder="Nhập tên sản phẩm..."
              onSearch={onSearch}
              enterButton
            />
          </Col>
        </Row>
      </div>

      <List
        grid={{ column: 3, gutter: 16 }}
        dataSource={[...listProduct]}
        renderItem={(product, index) => {
          return (
            <List.Item>
              <Product product={product} index={index} url={state} />
            </List.Item>
          );
        }}
      />

      <Pagination
        current={pageNumber}
        onChange={onPagination}
        total={50}
        style={{ textAlign: "center" }}
      />
    </div>
  );
};
export default ProductPage;
