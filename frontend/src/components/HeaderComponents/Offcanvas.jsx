import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { IoIosMenu } from "react-icons/io";
import { Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './HeaderOffcanvas.scss';

function HeaderOffcanvas() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <IoIosMenu className='headerOffcanvas' onClick={handleShow} />

      <Offcanvas show={show} onHide={handleClose}>
       
        <Offcanvas.Body>
            <div className="offcanvas_nav" >
                <Container fluid='lg'>
                    <Row>
                        <NavLink className='nav-link' to="/">Trang chủ</NavLink>
                    </Row>
                    <Row>
                        <NavLink className='nav-link' to="products">Sản phẩm</NavLink>
                    </Row>
                    <Row>
                        <NavLink className='nav-link' to="news">Tin tức</NavLink>
                    </Row>
                    <Row>
                        <NavLink className='nav-link' to="about_us">Về chúng tôi</NavLink>
                    </Row>
                    <Row>
                        <NavLink className='nav-link' to="guideline">Hướng dẫn mua hàng</NavLink>
                    </Row>
                    <Row>
                        <NavLink className='nav-link' to="policy">Chính sách</NavLink>
                    </Row>
                </Container>
            </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default HeaderOffcanvas;