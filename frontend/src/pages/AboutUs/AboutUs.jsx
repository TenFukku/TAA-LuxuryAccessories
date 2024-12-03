import React from 'react';
import 'style/pages/AboutUs/AboutUs.scss';
import { Col, Row, Container, Image } from 'react-bootstrap';
import about__banner from 'assets/image/banners/about__banner.png';
import ads from 'assets/image/banners/ads.png';
import bannersmall from 'assets/image/banners/banner-small.png';
import logo from 'assets/image/logo.svg';
import { Link } from 'react-router-dom';

function AboutUs() {
  return (
    <Container className="about fluid">
      <h1 className="about__title display-large">VỀ CHÚNG TÔI</h1>

      <Row className="about__intro">
        <Col className="about__logo">
          <Image src={logo} fluid />
        </Col>
        <Col className="about__information body-large">
          <p>
            TAA là thương hiệu phụ kiện dẫn dầu xu hướng với phong cách thiết kế đơn giản, sành
            điệu, sản phẩm tiêu chuẩn cao dành cho giới trẻ toàn cầu tự tin thể hiện cá tính và
            phong cách riêng. Được thành lập vào năm 2023, chúng tôi đã trở thành nhà phân phối đầu
            tiên đi tiên phong với phân khúc sản phẩm siêu hời dưới "99.000vnđ" nhằm mang lại góc
            nhìn khác hơn về giá thành của thương hiệu Việt.
          </p>
        </Col>
      </Row>

      <div className="about__banner">
        <Image src={about__banner} />
      </div>

      <Row className="about__subtitle">
        <Col className="about__content-left">
          <p className="display-small">WHAT WE DO</p>
          <p className="display-small">Young generatio ally</p>
          {/* <ul>
                <li class="display-small">WHAT WE DO</li>
                <li class="display-small">Young generatio ally</li>
              </ul> */}
        </Col>
        <Col className="about__content-right body-large">
          <p>
            Sứ mệnh của TAA là Cổ vũ cho thế hệ trẻ toàn thế giới tự do thể hiện phong cách thông
            qua thời trang, thương hiệu vượt qua ranh giới của thời trang đường phố bằng cách không
            ngừng sáng tạo các trang phục trong các bộ sưu tập độc đáo. TAA mong muốn đồng hành và
            tôn vinh thế hệ trẻ tài năng qua những xu hướng thời trang và hoạt động cộng đồng sáng
            tạo. Từ đó tạo dấu ấn cho giá trị bền vững để cùng các tài năng trẻ phát triển.
          </p>
        </Col>
      </Row>

      <div className="about__banner">
        <Image src={ads} fluid />
      </div>

      <Row className="about__contact">
        <Col>
          <p className="about__contact-title display-large">LIÊN HỆ</p>
        </Col>
        <Col className="about__contact-list">
          <ul>
            <li className="body-large">
              Instagram: <Link to="https://daa.uit.edu.vn/"> TAA_Shop</Link>
            </li>
            <li className="body-large">
              Shopee:{' '}
              <Link to="https://daa.uit.edu.vn/"> TAA_Shop - Three Accessories Appreciate</Link>
            </li>
            <li className="body-large">
              Facebook: <Link to="https://daa.uit.edu.vn/"> TAA</Link>
            </li>
          </ul>
        </Col>
      </Row>

      <div className="about__banner-small">
        <Image src={bannersmall} fluid />
      </div>
    </Container>
  );
}

export default AboutUs;
