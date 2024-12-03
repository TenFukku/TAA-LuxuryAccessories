import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './index.scss';
import { IoMenuSharp } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../style/components/Products/ProductMenu.scss';
import { BsPersonFill } from 'react-icons/bs';
import { ImBoxAdd } from 'react-icons/im';
import { FaHeartCircleCheck } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
import ProfileUser from './Info/ProfileUser';
import ProfileBankCard from './Info/ProfileBankCard';
import ProfileChangePassword from './Info/ProfileChangePassword';
import ProfileShippingAddress from './Info/ProfileShippingAddress';
import Orders from './Orders/Orders';
import Favor from './Favor/Favor';

// const InfoModals = () => {
//   const [selectedSection, setSelectedSection] = useState('profile-user');
//   const handleSectionChange = (section) => {
//     setSelectedSection(section);
//   };
//   let contentToDisplay;

//   switch (selectedSection) {
//     case 'profile-user':
//       contentToDisplay = <ProfileUser />
//       break;
//     case 'profile-bank-card':
//       contentToDisplay = <ProfileBankCard />
//       break;
//     case 'profile-change-password':
//       contentToDisplay = <ProfileChangePassword />
//       break;
//     case 'profile-shipping-address':
//       contentToDisplay = <ProfileShippingAddress />
//       break;
//     case 'orders':
//       contentToDisplay = <Orders />
//       break;
//     case 'favor':
//       contentToDisplay = <Favor />
//       break;
//     default:
//       contentToDisplay = "Lỗi!!!"
//   }

//   return (
//     <>
//       <Container fluid>
//         <Row>
//           <Col xs={12} lg={3}>
//             <ul className="nav-tab visible body-large">
//               <li className={`nav-tab__item ${selectedSection === 'profile-user' || selectedSection === 'profile-bank-card' || selectedSection === 'profile-shipping-address' || selectedSection === 'profile-change-password' ?  'active-nav' : ''}`} onClick={() => handleSectionChange("profile-user")}>
//               <NavLink to="/account/favor" className="nav-link"><BsPersonFill />Thông tin tài khoản</NavLink>
//               </li>
//                 <div className={`subnav-tab ${selectedSection === 'profile-user' || selectedSection === 'profile-bank-card' || selectedSection === 'profile-shipping-address' || selectedSection === 'profile-change-password' ? 'show-subnav' : ''}`}>
//                   <li className={`subnav-tab__item body-medium ${selectedSection === 'profile-user' ? 'active-subnav' : ''}`} onClick={() => handleSectionChange("profile-user")}>
//                   <NavLink to="/account/profile-user" className="subnav-link">Hồ sơ cá nhân</NavLink>
//                   </li>
//                   <li className={`subnav-tab__item body-medium ${selectedSection === 'profile-bank-card' ? 'active-subnav' : ''}`} onClick={() => handleSectionChange("profile-bank-card")}>
//                   <NavLink to="/account/profile-bank-card" className="subnav-link">Tài khoản ngân hàng</NavLink>
//                   </li>
//                   <li className={`subnav-tab__item body-medium ${selectedSection === 'profile-shipping-address' ? 'active-subnav' : ''}`} onClick={() => handleSectionChange("profile-shipping-address")}>
//                   <NavLink to="/account/profile-shipping-address" className="subnav-link">Địa chỉ nhận hàng</NavLink>
//                   </li>
//                   <li className={`subnav-tab__item body-medium ${selectedSection === 'profile-change-password' ? 'active-subnav' : ''}`} onClick={() => handleSectionChange("profile-change-password")}>
//                   <NavLink to="/account/profile-change-password" className="subnav-link">Đổi mật khẩu</NavLink>
//                     </li>
//                   </div>

//               <li className={`nav-tab__item ${selectedSection === 'orders' ? 'active-nav' : ''}`} onClick={() => handleSectionChange("orders")}>
//               <NavLink to="/account/orders" className="nav-link"> <ImBoxAdd />Đơn hàng</NavLink>
//               </li>
//               <li className={`nav-tab__item ${selectedSection === 'favor' ? 'active-nav' : ''}`} onClick={() => handleSectionChange("favor")}>
//                 <NavLink to="/account/favor" className="nav-link"><FaHeartCircleCheck />Sản phẩm yêu thích</NavLink>
//                 </li>
//             </ul>
//           </Col>
//           <Col xs={12} lg={9}>
//             {contentToDisplay}
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default InfoModals;
function InfoModals() {
  const navigate = useNavigate();
  const { nav, subnav } = useParams();

  const handleCategoryClick = (category, subCategory) => {
    // Thực hiện xử lý với thông tin sản phẩm đã click
    console.log(`Sản phẩm đã click: ${category} - ${subCategory}`);
    // Chuyển hướng đến route tương ứng với category và subcategory (nếu có)
    if (subCategory) {
      navigate(`/account/${category}/${subCategory}`);
    } else {
      navigate(`/account/${category}`);
    }
  };

  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);

  const handleClick = (category, subCategory = '') => {
    console.log(`${category} - ${subCategory}`);
    if (subCategory !== '') {
      setActiveCategory(category);
      setActiveSubCategory(subCategory);
      handleCategoryClick(category, subCategory);
    } else {
      if (category === activeCategory && subCategory === activeSubCategory) {
        setActiveCategory(null);
        setActiveSubCategory(null);
      } else {
        setActiveCategory(category);
      }
      handleCategoryClick(category, '');
    }
  };

  const renderSubnav = () => {
    switch (subnav) {
      case 'profile-user':
        return <ProfileUser />;
      case 'profile-bank-card':
        return <ProfileBankCard />;
      case 'profile-change-password':
        return <ProfileChangePassword />;
      case 'profile-shipping-address':
        return <ProfileShippingAddress />;
      default:
        return null;
    }
  };

  const renderNav = () => {
    switch (nav) {
      case 'infomation':
          return renderSubnav();
      case 'orders':
        return <Orders />;
      case 'favor':
        return <Favor />;
      default:
        return null;
    }
  };
  useEffect(() => {
    handleClick(nav, subnav);
  }, [nav, subnav]);

  useEffect(() => {
    // Xác định trạng thái mặc định của menu khi `nav` là "information"
    if (nav === 'infomation') {
      setActiveCategory('infomation');
      setActiveSubCategory(subnav);
    }
  }, [nav, subnav]);
  return (
    <>
      <Container fluid>
        <Row className='account__responsive'>
          <Col xs={12} lg={3} className="product__menu">
            <ul className="aside__list body-large visible">
              <li className="aside__item js-item">
                <div className="aside__item__line"></div>
                <span
                  className={`aside__header nav-link  ${
                    activeCategory === 'infomation' ? 'active' : ''
                  }`}
                  onClick={() => handleClick('infomation', 'profile-user')}
                >
                  <BsPersonFill className='icon-nav'/>
                  Thông tin tài khoản
                </span>
                <ul
                  className={`aside__item__sub-menu subnav-link ${
                    activeCategory === 'infomation' ? 'active' : ''
                  }`}
                >
                  <li
                    className={`category ${
                      activeSubCategory === 'profile-user' ? 'active_sub' : ''
                    }`}
                    onClick={() => handleClick('infomation', 'profile-user')}
                  >
                    <span>Hồ sơ cá nhân</span>
                  </li>
                  <li
                    className={`category ${
                      activeSubCategory === 'profile-bank-card' ? 'active_sub' : ''
                    }`}
                    onClick={() => handleClick('infomation', 'profile-bank-card')}
                  >
                    <span>Tài khoản ngân hàng</span>
                  </li>
                  <li
                    className={`category ${
                      activeSubCategory === 'profile-shipping-address' ? 'active_sub' : ''
                    }`}
                    onClick={() => handleClick('infomation', 'profile-shipping-address')}
                  >
                    <span>Địa chỉ nhận hàng</span>
                  </li>
                  <li
                    className={`category ${
                      activeSubCategory === 'profile-change-password' ? 'active_sub' : ''
                    }`}
                    onClick={() => handleClick('infomation', 'profile-change-password')}
                  >
                    <span>Đổi mật khẩu</span>
                  </li>
                </ul>
              </li>
              <li className="aside__item js-item">
                <span
                  className={`aside__header nav-link ${
                    activeCategory === 'orders' ? 'active' : ''
                  }`}
                  onClick={() => handleClick('orders')}
                >
                  <ImBoxAdd className='icon-nav'/>
                  Đơn hàng
                </span>
              </li>
              <li className="aside__item js-item">
                <span
                  className={`aside__header nav-link  ${
                    activeCategory === 'favor' ? 'active' : ''
                  }`}
                  onClick={() => handleClick('favor')}
                >
                  <FaHeartCircleCheck className='icon-nav'/>
                  Sản phẩm yêu thích
                </span>
              </li>
            </ul>
          </Col>
          <Col xs={12} lg={9}>
            {renderNav()}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default InfoModals;
