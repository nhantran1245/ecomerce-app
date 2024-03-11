import React, { useEffect } from "react";
import { Carousel, Image } from "antd";
import pic1 from "../../../assets/images/17 lê văn ninh.png";
import pic2 from "../../../assets/images/238 gs1 dĩ an.png";
import pic3 from "../../../assets/images/40 ĐỖ XUÂN HỢP.png";
import pic4 from "../../../assets/images/76 ql 1k, linh xuân.png";
import "./style.css";
import { db } from "../../../services/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const HomePage = () => {
  // const [isLoading, setIsLoading] = useState(useState);
  // const { products } = useContext(ProductsFromDataBaseContext);
  useEffect(() => {
    const getData = async (state) => {
      const q = query(collection(db, "products"), where("type", "==", state));
      const querySnapShot = await getDocs(q);
      const data = querySnapShot.docs.map((doc) => doc.data());
      return data;
    };
    getData("bicycle").then((data) => console.log(data));
  }, []);

  return (
    <Carousel
      dotPosition="bottom"
      autoplaySpeed={1200}
      autoplay
      className="carousel"
    >
      <div className="div-img">
        <Image src={pic1} className="img" />
      </div>
      <div className="div-img">
        <Image src={pic2} className="img" />
      </div>
      <div className="div_img">
        <Image src={pic3} className="img" />
      </div>
      <div className="div-img">
        <Image src={pic4} className="img" />
      </div>
    </Carousel>
  );
};

export default HomePage;
