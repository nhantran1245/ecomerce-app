import React, { useState, useCallback, useMemo, useContext } from "react";
import {
  Dropdown,
  Slider,
  Row,
  Col,
  List,
  Pagination,
  Button,
  Space,
} from "antd";

import { DownOutlined } from "@ant-design/icons";
import Product from "./Product";
import "./styles.css";
import { useLocation } from "react-router-dom";
import { ProductsFromDataBaseContext } from "../store/products-from-database-context";

const ProductPage = () => {
  const productsFromDatabase = useContext(ProductsFromDataBaseContext).products;

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
    const { products } = productsFromDatabase.find(
      (item) => item.key === state
    );

    console.log(products);
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

  // const onSearch = (e) => {
  //   console.log(e);
  // };
  return !listProduct ? (
    <div>
      <h1>Không có sản phẩm nào</h1>
    </div>
  ) : (
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
          {/* <Col span={4}>
            <Input.Search
              placeholder="Nhập tên sản phẩm..."
              onSearch={onSearch}
              enterButton
            />
          </Col> */}
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
        total={1}
        style={{ textAlign: "center" }}
      />
    </div>
  );
};
export default ProductPage;
