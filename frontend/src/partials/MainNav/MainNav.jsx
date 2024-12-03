import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './mainNav.scss';
import { useLocation } from 'react-router-dom';

const navLiStyle = {
  display: 'flex-inline',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '8rem',
  maxWidth: '10rem',
  width: '100%',
  minHeight: '48px',
  padding: '0 2rem',
};

function MainNav(props) {
  const [guildline, setguildline] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/guideline' || location.pathname === '/policy') {
      setguildline(true);
    } else {
      setguildline(false);
    }
  }, [location.pathname]);

  // console.log(location.pathname);
  return (
    <Navbar className="main_nav">
      <Container fluid="lg" className="nav_container">
        <Nav className="my-nav">
          <NavLink className="nav-link" style={navLiStyle} to="/">
            Trang chủ
          </NavLink>
          <NavLink className="nav-link" style={navLiStyle} to="products">
            Sản phẩm
          </NavLink>
          <NavLink className="nav-link" style={navLiStyle} to="news">
            Tin tức
          </NavLink>
          <NavLink className="nav-link" style={navLiStyle} to="about_us">
            Về chúng tôi
          </NavLink>
          <NavDropdown
            title="Hướng dẫn"
            className={guildline ? 'nav-link active' : 'nav-link'}
            fluid
          >
          {/* href="guideline" */}
            <NavDropdown.Item >
              <NavLink to="guideline">
                Hướng dẫn mua hàng
              </NavLink>
           </NavDropdown.Item>

            <NavDropdown.Item >
            
            <NavLink to="policy">
                  Chính sách
              </NavLink>
            
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
export default MainNav;
