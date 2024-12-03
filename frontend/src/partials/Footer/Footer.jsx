import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from 'assets/image/logo.svg';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import Input from 'components/Common/Input';
import Button from 'components/Common/Button';
import './footer.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdMailOutline } from 'react-icons/md';

const logoStyle = {
  maxHeight: '200px',
  minHeight: '70px',
};

const descripStyle = {
  display: 'flex',
  flexDirection: 'column',
  // gap: '16px'
};

const Footer = () => {
  const [email, setEmail] = React.useState('');
  const [validEmail, setValidEmail] = React.useState();
  const handleClick = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const check = emailRegex.test(email);
    if (check) {
      setValidEmail(true);
      setEmail('')
      window.scrollTo({
        top: 0,
        behavior: 'smooth', 
      });
    } else {
      setValidEmail(false);
    }
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setValidEmail(true);
  };

  return (
    <footer className="dark-light mt-12">
      <Container className="footer_container">
        <Row className="footer_wrapper">
          <Col lg={4} sm={5}>
            <img className="img-fluid" src={logo} alt="logo" style={logoStyle}></img>
            <p className="describe">
              Việc mua hàng của bạn là động lực cho chúng tôi tiếp tục duy trì được công ty.
            </p>

            <p className="describe">Bạn liên hệ với chúng tôi bằng các mạng xã hội dưới đây.</p>

            <Row>
              <Col className="col-1">
                <a href="/">
                  <i className="fab fa-facebook-f">
                    <FaFacebook color="blue" size={25} />
                  </i>
                </a>
              </Col>
              <Col className="col-1">
                <a href="/">
                  <i className="fab fa-instagram">
                    {' '}
                    <FaInstagram color="pink" size={25} />
                  </i>
                </a>
              </Col>
              <Col className="col-1">
                <a href="/">
                  <i className="fab fa-twitter">
                    {' '}
                    <FaYoutube color="red" size={25} />{' '}
                  </i>
                </a>
              </Col>
            </Row>
          </Col>

          {/* <Col className='col-2'> */}
          <Col lg={3} sm={4}>
            <h3 className="footer__title">Công ty</h3>
            <ul>
              <li>
                <a href="/news">Tin tức </a>
              </li>
              <li>
                <a href="/about_us">Về chúng tôi</a>
              </li>
              <li>
                <a href="/guideline">Hướng dẫn mua hàng</a>
              </li>
              <li>
                <a href="/policy">Chính sách</a>
              </li>
            </ul>
          </Col>

          {/* <Col className='col-5'> */}
          <Col lg={5} sm={0}>
            <h3 className="footer__title">Cập nhật về chúng tôi</h3>
            <p>
              Xác nhận thư điện tử của bạn để nhận được ngay những cập nhật mới nhất từ chúng tôi
              hàng tuần
            </p>
            <form onSubmit={(e) => e.preventDefault}>
              <Row className="input_warrper">
                <Col lg={8} sm={7}>
                  <div className="input_section">
                    <MdMailOutline style={{ height: '28px', width: '28px', marginLeft: '15px' }} />
                    <Input
                      className="email_input"
                      type="email"
                      value={email}
                      placeholder="Điền thư điện tử của bạn"
                      onChange={handleInputChange}
                    />
                    {validEmail === false ? (<p className="errorEmail">Email không hợp lệ!</p>) : null}

                  </div>
                </Col>

                <Col className="col-3" style={{ paddingLeft: '0px' }}>
                  <Button
                    className="btn_reg_log_round_32px btn_clickable_boldcolor"
                    label="Xác nhận"
                    type="submit"
                    onClick={handleClick}
                  >
                  </Button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
