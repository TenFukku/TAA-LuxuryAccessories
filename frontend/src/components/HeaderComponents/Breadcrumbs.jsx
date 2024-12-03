import React, { useState, useEffect } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import './breadcrumbs.scss';
import { useLocation, useParams } from 'react-router-dom';

import axios from 'axios';
function BreadcrumbSection() {
  const location = useLocation()
  const params = useParams();
  const currentPath = location.pathname;
  let currentLink = ''
  const [productName, setProductName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log('Fetching product data...');
        const response = await axios.get(`http://localhost:8000/products/${params.productId}`);
        // console.log('Product data:', response.data);
        setProductName(response.data.prod_name);
        // console.log("name", productName)
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchData()
  }, [params.productId, currentPath]);

  const changePath = (path, currentPath) => {
    let coverted = '';
    if (params.productId && parseInt(params.productId) === parseInt(path) && currentPath.includes('products')) {
      coverted = productName;
    }
    else if (params.newsId && parseInt(params.newsId) === parseInt(path) && currentPath.includes('news')) {
      coverted = 'Bài viết';
    } else {
      switch (path) {
        case 'log_in':
          coverted = 'Đăng nhập'
          break;
        case 'register':
          coverted = 'Đăng ký'
          break;
        case 'products':
          coverted = 'Sản phẩm'
          break;
        case 'news':
          coverted = 'Tin tức'
          break;
        case 'cart':
          coverted = 'Giỏ hàng'
          break;
        case 'about_us':
          coverted = 'Về chúng tôi'
          break;
        case 'guideline':
          coverted = 'Hướng dẫn'
          break;
        case 'policy':
          coverted = 'Chính sách'
          break;
        case 'category':
          coverted = 'Thể loại'
          break;
        case 'Phu_kien_toc':
          coverted = 'Phụ kiện tóc'
          break;

        case 'Tram_cai':
          coverted = 'Trâm cài'
          break;

        case 'Kep':
          coverted = 'Kẹp'
          break;

        case 'Day_cot_toc':
          coverted = 'Dây cột tóc'
          break;

        case 'Cai_toc':
          coverted = 'Cài tóc'
          break;

        case 'Tui_vi':
          coverted = 'Túi ví'
          break;

        case 'Tui_xach':
          coverted = 'Túi xách'
          break;
        case 'Vi':
          coverted = 'Ví'
          break;

        case 'Thiep':
          coverted = 'Thiệp'
          break;

        case 'Op_lung':
          coverted = 'Ốp lưng'
          break;
        case 'Mat_kinh':
          coverted = 'Mắt kính'
          break;

        case 'Day_deo':
          coverted = 'Dây đeo'
          break;

        case 'Mu_non':
          coverted = 'Mũ nón'
          break;

        case 'Khau_trang':
          coverted = 'Khẩu trang'
          break;

        case 'Trang_suc':
          coverted = 'Trang sức'
          break;
        case 'Vong_co':
          coverted = 'Vòng cổ'
          break;

        case 'Vong_tay':
          coverted = 'Vòng tay'
          break;
        case 'Hoa_tai':
          coverted = 'Hoa tai'
          break;

        case 'Nhan':
          coverted = 'Nhẫn'
          break;

        case 'Khac':
          coverted = 'Khác'
          break;

        case 'account':
          coverted = 'Tài khoản'
          break;

        case 'infomation':
          coverted = 'Thông tin'
          break;
        case 'order':
          coverted = 'Đặt hàng'
          break;
        case 'profile-user':
          coverted = 'Hồ sơ cá nhân'
          break;
        case 'profile-bank-card':
          coverted = 'Tài khoản ngân hàng'
          break;
        case 'profile-shipping-address':
          coverted = 'Địa chỉ giao hàng'
          break;

        case 'profile-change-password':
          coverted = 'Đổi mật khẩu'
          break;

        case 'orders':
          coverted = 'Đơn hàng'
          break;
        case 'favor':
          coverted = 'Sản phẩm yêu thích'
          break;
        case 'search':
          coverted = 'Tìm kiếm'
          break;
        default:
          coverted = path
          break;
      }

    }
    return coverted;
  }

  const crumbs = location.pathname.split('/')
    .filter(crumb => crumb !== '')
    .map(crumb => {
      currentLink += `/${crumb}`
      console.log(crumb)
      return (

        <Breadcrumb.Item href={currentLink}>{changePath(crumb, currentPath)}</Breadcrumb.Item>
      )
    })


  return (

    // </div>
    <section className='breadcrumbs_section'
      style={{ display: currentPath === '/' || currentPath === '/log_in' || currentPath === '/register' ? 'none' : null }} >
      <Breadcrumb>
        <Breadcrumb.Item href='/'>Trang chủ</Breadcrumb.Item>
        {crumbs}
      </Breadcrumb>
    </section>
  );
}

export default BreadcrumbSection;