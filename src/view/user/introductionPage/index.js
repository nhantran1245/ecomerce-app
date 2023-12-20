import React from "react";
import "./style.css";
import Li from "./Li-tag";

import { Card, Col, Row } from "antd";

const IntroductionPage = () => {
  return (
    <div className="introduction-page-content">
      <div className="introduction-header" style={{ textAlign: "center" }}>
        <h1 style={{ paddingTop: "20px" }}>
          Giới thiệu về cửa hàng xe đạp xe điện Thanh Tùng
        </h1>

        <p style={{ verticalAlign: "middle" }}>
          Kính thưa quý khách hàng! Lời đầu tiên cho phép chúng tôi gửi tới Quý
          khách hàng lời chúc tốt đẹp nhất. Xin chân thành cảm ơn đã ghé thăm
          website của cửa hàng xe đạp – xe điện Thanh Tùng. Với đội ngũ nhân
          viên trẻ và đầy Nhiệt Huyết, chúng tôi sẽ không ngừng cố gắng sẽ mang
          lại những giá trị về công nghệ tiên tiến, an toàn qua các phương tiện
          như: xe đạp, xe đạp điện, xe máy điện được nghiên cứu và sản xuất bởi
          các thương hiệu hàng đầu như: ASAMA, JVC,… Thông qua chuỗi hệ thống
          cửa hàng bán lẻ chuyên nghiệp, dịch vụ sau bán hàng tận nơi, lắp ráp
          và sản xuất tận gốc cam kết sẽ mang đến Quý Khách hàng những sản phẩm
          tuyệt vời và phù hợp nhất. Cảm ơn quý khách hàng đã ủng hộ và đồng
          hành cùng chúng tôi ! Chúc các bạn luôn Khỏe và Thành Công !
        </p>

        <hr style={{ backgroundColor: "#f5f5f5" }} />

        <p style={{ padding: "0.5rem", textAlign: "left" }}>
          Quá trình hình thành và phát triển Cửa hàng xe đạp – xe điện Thanh
          Tùng tiền thân là cửa hàng xe đạp Asama Thanh Tùng được thành lập vào
          năm 2007 tại quận Thủ Đức ( nay là Thành phố Thủ Đức). Năm 2019, Thanh
          Tùng mở thêm cơ sở số 2 tại đường Đỗ Xuân Hợp, Quận 9 (nay là Thành
          phố Thủ Đức). Cùng năm 2019, nhận thức được tầm nhìn phát triển của
          ngành xe điện, Thanh Tùng mở thêm cơ sở số 3 tại đường Lê Văn Việt,
          Quận 9 (nay là Thành phố Thủ Đức). Năm 2022, Thanh Tùng đẩy mạnh phát
          triển bán lẻ, mở thêm cơ sở số 4 tại thành phố Dĩ An, Bình Dương. Năm
          2023, Thanh Tùng mở thêm cơ sở số 5 tại phường Linh Xuân, Thành phố
          Thủ Đức.
        </p>
      </div>
      <Row>
        <Col>
          <Card title="Quá trình hình thành và phát triển" bordered={false}>
            <ul>
              <li>
                Cửa hàng xe đạp – xe điện Thanh Tùng tiền thân là cửa hàng xe
                đạp Asama Thanh Tùng được thành lập vào năm 2007 tại quận Thủ
                Đức ( nay là Thành phố Thủ Đức).
              </li>
              <li>
                Năm 2019, Thanh Tùng mở thêm cơ sở số 2 tại đường Đỗ Xuân Hợp,
                Quận 9 (nay là Thành phố Thủ Đức).
              </li>
              <li>
                Cùng năm 2019, nhận thức được tầm nhìn phát triển của ngành xe
                điện, Thanh Tùng mở thêm cơ sở số 3 tại đường Lê Văn Việt, Quận
                9 (nay là Thành phố Thủ Đức).
              </li>
              <li>
                Năm 2022, Thanh Tùng đẩy mạnh phát triển bán lẻ, mở thêm cơ sở
                số 4 tại thành phố Dĩ An, Bình Dương.
              </li>
              <li>
                Năm 2023, Thanh Tùng mở thêm cơ sở số 5 tại phường Linh Xuân,
                Thành phố Thủ Đức.
              </li>
            </ul>
          </Card>
        </Col>

        <Col>
          <Card title="HỆ THỐNG XE ĐẠP – XE ĐIỆN THANH TÙNG – UY TÍN LÀ VÀNG!">
            <ul>
              <Li title={"CS1"}>
                :17 Lê Văn Ninh, KP3, p.Linh Tây, TP.Thủ Đức, TPHCM
              </Li>
              <Li title={"CS2"}>
                :107-109 Đỗ Xuân Hợp, p.Phước Long B, TP.Thủ Đức, TPHCM
              </Li>
              <Li title={"CS3"}>
                :257 Lê Văn Việt, p.Hiệp Phú, TP.Thủ Đức, TPHCM
              </Li>
              <Li title={"CS4"}>
                :76 Quốc lộ 1K, p.Linh Xuân, TP.Thủ Đức, TPHCM
              </Li>
              <Li title={"CS5"}>
                :238 đường GS1, KP Nhị Đồng 2, p.Dĩ An, TP.Dĩ An, Bình Dương
              </Li>
              <Li title={"Email"}>:Deptrai</Li>
              <Li title={"Hotline"}>:0906.151.057</Li>
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default IntroductionPage;
