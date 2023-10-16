import React, { useState, useCallback, useMemo } from "react";
import { Dropdown,Slider, Row, Col, Input, List, Pagination } from "antd";
import Product from "./Product";
import "./styles.css";

const mockProducts = [
  {
    discountPercentage: 30,
    title: "XE ĐẠP ĐỊA HÌNH GIANT ROAM 3 DISC",
    thumbnail: "https://xedaphn.net/wp-content/uploads/2022/04/Roam-3-Disc-2023.jpg",
    price: 12900000,
    description: "Giant Roam 3 Disc Nhôm 29 inch Gamet có ngôn ngữ thiết kế mạnh mẽ, hiện đại với nhiều  màu sắc cho bạn lựa chọn. Đây sẽ là sự lựa chọn tuyệt vời dành cho những người yêu thích đạp xe để rèn luyện thể chất hay cùng bạn bè trải nghiệm ở những cung đường khó."
  },
  {
    discountPercentage: 30,
    title: "XE ĐẠP ĐỊA HÌNH GIANT ROAM 3 DISC",
    thumbnail: "https://xedaphn.net/wp-content/uploads/2022/04/Roam-3-Disc-2023.jpg",
    price: 12900000,
    description: "Giant Roam 3 Disc Nhôm 29 inch Gamet có ngôn ngữ thiết kế mạnh mẽ, hiện đại với nhiều  màu sắc cho bạn lựa chọn. Đây sẽ là sự lựa chọn tuyệt vời dành cho những người yêu thích đạp xe để rèn luyện thể chất hay cùng bạn bè trải nghiệm ở những cung đường khó."
  },
  {
    discountPercentage: 30,
    title: "XE ĐẠP ĐỊA HÌNH GIANT ROAM 3 DISC",
    thumbnail: "https://xedaphn.net/wp-content/uploads/2022/04/Roam-3-Disc-2023.jpg",
    price: 12900000,
    description: "Giant Roam 3 Disc Nhôm 29 inch Gamet có ngôn ngữ thiết kế mạnh mẽ, hiện đại với nhiều  màu sắc cho bạn lựa chọn. Đây sẽ là sự lựa chọn tuyệt vời dành cho những người yêu thích đạp xe để rèn luyện thể chất hay cùng bạn bè trải nghiệm ở những cung đường khó."
  },
]
const ProductPage = () => {
  const [selectedType, setSelectedType] = useState({
    label: "Tất cả",
    key: "all",
  });
  const [priceFilter, setPriceFilter] = useState([0, 100]);
  const [listProduct,] = useState(mockProducts);
  const [pageNumber, setPageNumber] = useState(1);

  const onPagination = (pageNumber) => setPageNumber(pageNumber);
  const handleMenuClick = useCallback((e) => {
    const selected = items.find(item => item.key === e.key);
    if (selected) {
      setSelectedType(selected);
    }
  });
  const onSliderChange = (value) => {
    setPriceFilter(value);
  };
  const items = [
    {
      label: "Tất cả",
      key: "all",
    },
    {
      label: "Xe đạp Asama",
      key: "asama",
    },
    {
      label: "Xe đạp Martin",
      key: "martin",
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick
  };
  const sliderMarks = useMemo(() => ({
    0: "0",
    100: "100tr",
    [priceFilter[0]]: `${priceFilter[0]}tr`,
    [priceFilter[1]]: `${priceFilter[1]}tr`,
  }), [priceFilter]);

  const onSearch = (e) => {
    console.log(e);
  }
  return (
    <div className="product-page-content">
      <div className="filter-criteria">
        <Row>
          <Col span={4}>
            <Dropdown.Button menu={menuProps} placement="bottom">
              {selectedType.label}
            </Dropdown.Button>
          </Col>
          <Col span={8}>
            <Slider
              min={0}
              max={100}
              onChange={onSliderChange}
              marks={sliderMarks}
              step={0.5}
              range
              defaultValue={[0, 100]}
            />
          </Col>
          <Col span={8}></Col>
          <Col span={4}>
            <Input.Search placeholder="Nhập tên sản phẩm..." onSearch={onSearch} enterButton />
          </Col>
        </Row>
      </div>
      <List
        grid={{ column: 3, gutter: 16 }}
        dataSource={[...listProduct, ...listProduct, ...listProduct]}
        renderItem={(product, index) => {
          return (
            <List.Item>
              <Product product={product} index={index}/>
            </List.Item>
          )
        }}
      />
      <Pagination current={pageNumber} onChange={onPagination} total={50} style={{ textAlign: "center" }}/>
    </div>
  );
};
export default ProductPage;