import React, { useState } from "react";
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import "./styles.css";
import { Image } from "antd";
import { Badge } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./sliders.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      role="presentation"
      className={className}
      style={{
        ...style,
        display: "block",
        background: "gray",
        borderRadius: "50%",
        top: "50%",
      }}
      onClick={() => onClick()}
    />
  );
}

const ProductDetailCard = ({ Images, DiscountPercentage }) => {
  // We use the useRef hook to get a reference to the slider container
  // const sliderRef = useRef(null);
  // const scrollAmount = 200; // The amount to scroll when clicking the navigation buttons

  const [currentImage, setCurrentImage] = useState(Images[0]);
  // const testFunc = () => {
  //   console.log("test");
  //   setCurrentImage(Images[1]);
  // };
  const settings = {
    // dots: true,
    infinite: true,
    customPaging: function (i) {
      return (
        <div>
          <Image preview={true} className="h-7" src={Images[i]} />
        </div>
      );
    },
    focusOnSelect: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SampleNextArrow />,
    dotsClass: "slick-dots slick-thumb",
    slidesToShow: Images >= 4 ? 4 : Images.length,
    slidesToScroll: 1,
    arrows: true,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 3,
    //       infinite: true,
    //       dots: true,
    //     },
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2,
    //       initialSlide: 2,
    //     },
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 5,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  };

  const handleClick = (index) => {
    setCurrentImage(Images[index]);
  };

  return (
    <div className="flex flex-col w-full justify-between mx-5 my-5">
      <div className="max-w-sm m-2">
        <Badge.Ribbon
          className="itemCardBadge"
          text={`-${DiscountPercentage}%`}
          color="red"
        >
          <Image
            // preview={false}
            className="md: h-3/4 transition-all group-hover:cursor-pointer group-hover:transform duration-300 group-hover:scale-105"
            src={currentImage}
          />
        </Badge.Ribbon>
      </div>
      <div className="max-w-sm">
        <Slider
          {...settings}
          // i want to change color of arrow button
          // nextArrow={<div>button</div>}
          // prevArrow={<div>button</div>}
          // dotsClass="slick-dots
          // slick-thumb"
          // className="mx-2"
          // i want to get index when click on button of slider
          afterChange={(index) => handleClick(index)}
        >
          {Images.map((image) => {
            return (
              <Image
                preview={false}
                className="h-6 sm:h-7 hover: cursor-pointer hover:boder-2 hover:border-blue-500 hover:border-solid hover:rounded-md hover:shadow-xl hover:transform hover:scale-105 hover:duration-300 hover:ease-in-out hover:transition-all"
                src={image}
                key={image}
                onClick={() => handleClick(Images.indexOf(image))}
              />
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default ProductDetailCard;

// {
//   <div className="max-w-sm m-2">
//     <Badge.Ribbon
//       className="itemCardBadge"
//       text={`-${product.discountPercentage}%`}
//       color="red"
//     >
//       <Card
//         className="group block"
//         key={index}
//         cover={
//           <Image
//             preview={false}
//             className="md: h-3/4 transition-all group-hover:cursor-pointer group-hover:transform duration-300 group-hover:scale-105"
//             src={product.thumbnail}
//           />
//         }
//       ></Card>
//     </Badge.Ribbon>
//   </div>;
// }
