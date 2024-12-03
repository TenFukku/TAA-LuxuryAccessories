import React, { useEffect } from 'react';
import MainNav from '../MainNav/MainNav';
import Logo from 'components/Common/Logo.jsx'; // error
import SearchBar from 'components/HeaderComponents/SearchBar';
import './Header.scss';
import AuthPart from 'components/HeaderComponents/AuthPart';
import UnAuthPart from 'components/HeaderComponents/UnAuthPart';
import { Container } from 'react-bootstrap';
import HeaderOffcanvas from 'components/HeaderComponents/Offcanvas';
// import { useAddToCart } from 'hooks/useAddToCart';

function Header() {
// const {cartQuantity, setCartQuantity} = useAddToCart()
  function checkAuth() {
    if (localStorage.getItem('user')) {
      return <AuthPart />;
    }
    return <UnAuthPart />;
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <header className="visible un-radius">
      <div className="header__top">
        <Container fluid="lg">
          <HeaderOffcanvas />
          <a className="header__link" href="/">
            <Logo />
          </a>
          <SearchBar></SearchBar>

          <div className="header__wrapper">{checkAuth()}</div>
        </Container>
      </div>

      <MainNav />
    </header>
  );
}

export default Header;
