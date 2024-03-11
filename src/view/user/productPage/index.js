import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  Dropdown,
  Slider,
  // Row,
  // List,
  Pagination,
  Button,
  Space,
  Input,
} from "antd";
import { Spin } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Product from "./Product";
import "./styles.css";
import { useLocation } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../services/firebase/firebase";

const ProductPage = () => {
  // I design this component for general product page, becauz it's so bored to design 4 page for 4 product type =))
  const [isLoading, setIsLoading] = useState(true);
  const [productsFromDatabase, setProductsFromDatabase] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [priceFilter, setPriceFilter] = useState([0, 100]);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedType, setSelectedType] = useState({
    label: "Tất cả",
    key: "all",
  });

  const { state } = useLocation();

  useEffect(() => {
    const getAllDocsFromDatabase = async (state) => {
      setIsLoading(true);
      const q = query(collection(db, "products"), where("type", "==", state));
      const querySnapShot = await getDocs(q);
      const data = querySnapShot.docs.map((doc) => doc.data());
      return data;
    };
    // this is the first time the component is mounted
    getAllDocsFromDatabase(state).then((data) => {
      setIsLoading(false);
      setProductsFromDatabase(data);
      setListProduct(data);
      setPageNumber(1);
      setPriceFilter([0, 100]);
      setSelectedType({
        label: "Tất cả",
        key: "all",
      });
    });
  }, [state]);

  // haven't done yet
  const onPagination = (pageNumber) => {
    setPageNumber(pageNumber);
    console.log(pageNumber);
  };

  const handleMenuClickForBrandSearching = useCallback((e) => {
    const selected = items.find((item) => item.key === e.key);

    if (selected) {
      setSelectedType(selected);
    }
    if (selected.key === "all") {
      setPriceFilter([0, 100]);
      setListProduct([...productsFromDatabase]);
    } else {
      const filterProducts = productsFromDatabase.filter(
        (product) => product.brand === selected.key
      );
      setPriceFilter([0, 100]);
      setListProduct([...filterProducts]);
    }
  });

  const onSliderChange = (value) => {
    if (value[0] === 0) {
      setListProduct([...productsFromDatabase]);
    } else {
      const currentListProduct = listProduct.filter(
        (product) =>
          product.price <= value[1] * 1000000 &&
          product.price >= value[0] * 1000000
      );
      setListProduct([...currentListProduct]);
    }
  };

  const onSearch = (value) => {
    const currentListProduct = productsFromDatabase.filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );
    setListProduct([...currentListProduct]);
  };

  const setUpForBrandSearching = productsFromDatabase
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

  const items = setUpForBrandSearching.filter((item, index, self) => {
    return index === self.findIndex((t) => t.key === item.key);
  });

  const menuProps = {
    items,
    onClick: handleMenuClickForBrandSearching,
  };

  const sliderMarks = useMemo(
    () => ({
      [priceFilter[0]]: `${priceFilter[0]}triệu`,
      [priceFilter[1]]: `${priceFilter[1]}triệu`,
    }),
    [priceFilter]
  );

  return isLoading ? (
    <div className="text-center h-full">
      <Spin className="text-center p-7 m-7" />
    </div>
  ) : (
    <div className="product-page-content">
      <div className="filter-criteria">
        <div className="flex flex-wrap justify-between gap-4 ">
          <Dropdown menu={menuProps} className="mx-4">
            <Button>
              <Space>
                {selectedType.label} <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
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
            className="w-full md:w-1/4 mx-4"
          />
          <Input.Search
            className="w-full md:w-1/4 mx-3"
            placeholder="Nhập tên sản phẩm..."
            onSearch={onSearch}
            onChange={(e) => {
              if (e.target.value === "") {
                setListProduct([...productsFromDatabase]);
              }
            }}
          />
        </div>
        <br />
        <div className="flex flex-wrap justify-center">
          {!productsFromDatabase.length ? (
            <div className="text-center">
              <p>Không có sản phẩm nào</p>
            </div>
          ) : (
            listProduct.map((product, index) => {
              return (
                <div key={index} className="duration-200">
                  <Product
                    product={product}
                    index={index}
                    url={state}
                    key={index}
                  />
                </div>
              );
            })
          )}
        </div>

        <Pagination
          current={pageNumber}
          onChange={onPagination}
          total={1}
          style={{ textAlign: "center" }}
        />
      </div>
    </div>
  );
};
export default ProductPage;
