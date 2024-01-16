import React, { useRef, useState } from "react";
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import "./styles.css";
import { Image } from "antd";

const ProductDetailCard = ({ Images }) => {
  // We use the useRef hook to get a reference to the slider container
  const sliderRef = useRef(null);
  const scrollAmount = 200; // The amount to scroll when clicking the navigation buttons

  const [currentImage, setCurrentImage] = useState(Images[0]);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ display: "inline" }}>
        <Image
          style={{ maxWidth: "450px", aspectRatio: "1/1" }}
          src={currentImage}
        />
      </div>
      <div className="Card">
        {/* Left navigation button */}
        <button
          className="nav-btn left"
          onClick={() => {
            const container = sliderRef.current;
            container.scrollLeft -= scrollAmount; // Scroll left by the specified amount
          }}
        >
          <LeftOutlined />
        </button>
        {/* Image container */}
        <div className="images-container" ref={sliderRef}>
          {Images.map((image) => {
            return (
              <img
                role="presentation"
                className="image"
                alt="sliderImage"
                key={image}
                src={image}
                onClick={() => {
                  setCurrentImage(image);
                }}
                onMouseMove={() => {
                  setCurrentImage(image);
                }}
                onKeyDown={() => {
                  setCurrentImage(image);
                }}
              />
            );
          })}
        </div>
        {/* Right navigation button */}
        <button
          className="nav-btn right"
          onClick={() => {
            const container = sliderRef.current;
            container.scrollLeft += scrollAmount;
          }}
        >
          <RightOutlined />
        </button>
      </div>
    </div>
  );
};

export default ProductDetailCard;
