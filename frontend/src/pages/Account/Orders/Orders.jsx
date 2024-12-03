import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button1 from 'components/Common/Button1';
import ButtonIcon from 'components/Common/ButtonIcon';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import ReviewPopup from '../Modal/ReviewPopup';
import ProductPagination from 'components/Products/ProductPagination';
import { Row } from 'react-bootstrap';

function Orders() {
  const defaultUser = JSON.parse(localStorage.getItem('user'));
  const defaultUserData = defaultUser[0]
  const id = defaultUserData._id;
  // const id = "65f3ea44a8f986b1aca6929a"
  const [orders, setOrders] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const ordersPerPage = 3;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/account/orders/${id}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const [showMore, setShowMore] = useState(false);
  const handleSeeMore = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.order._id === orderId) {
          return { ...order, order: { ...order.order, showMore: !order.order.showMore } };
        }
        return order;
      }),
    );
  };

  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [selectedReviewPopup_name, setSelectedReviewPopup_name] = useState('');
  const [selectedReviewPopup_img, setSelectedReviewPopup_img] = useState('');
  const handleShowReviewPopup = (ord) => {
    setSelectedReviewPopup_name(ord.product.prod_name);
    setSelectedReviewPopup_img(ord.product.prod_img[0]);
    setShowReviewPopup(true);
  };


  const totalPages = Math.ceil(orders.length / ordersPerPage);


  const startIndex = (activePage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const paginatedOrders = orders.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const formatPrice = (price) => {
    const priceNumber = parseFloat(price);
    let formattedPrice = priceNumber.toLocaleString('vi-VN', { maximumFractionDigits: 0 });
    return formattedPrice.trim();
  };

  return (
    <div id="orders">
      <article className="section__content visible article">
        <div className="section__info visible">
          <h2 className="headline-large">Đơn hàng</h2>
          <p className="body-medium">Trang cung cấp thông tin về các đơn hàng theo danh mục</p>
        </div>
      </article>

      {paginatedOrders.map((order) => (
        <React.Fragment key={order._id}>
          <article className=" section__content visible order-content section__content--orders">
            {order.orderDetails.map((ord, index) => (
              <ul className={`orders-list ${order.order.showMore ? 'active' : ''}`} key={ord._id}>
                <li>
                  <div className="orders-item__wrapper">
                    <div className="img-status">
                      <img className="orders-item__img" src={ord.product.prod_img[0]} alt="" />
                      <span className="status headline-small">
                        {order.order.order_status === 1 ? 'Đã giao' : 'Chưa giao'}
                      </span>
                    </div>
                    <div className="orders-item__info">
                      <div className="name-status">
                        <p className="name body-large">{ord.product.prod_name}</p>
                        <span className="status label-large">
                          {order.order.order_status === 1 ? 'Đã giao' : 'Chưa giao'}
                        </span>
                      </div>
                      <div className="quantity-price body-large">
                        <p className="quatity">
                          <label>Số lượng:</label> {ord.orderDetail.quantity}
                        </p>
                        <p className="price">
                          <label>Giá tiền:</label>{' '}
                          {formatPrice(parseFloat(ord.orderDetail.price.$numberDecimal)) + ' đ'}
                        </p>
                      </div>
                      <div className="total-cost body-large">
                        <p>
                          <label>Thành tiền:</label>{' '}
                          {formatPrice(parseFloat(ord.orderDetail.price.$numberDecimal) *
                            ord.orderDetail.quantity) +
                            ' đ'}
                          {/* {parseFloat(order.order.order_total_cost.$numberDecimal) + ' đ'} */}
                        </p>
                      </div>
                      <div className="appreciate-repurchase">
                        <Button1
                          label="Đánh giá"
                          className="appreciate"
                          onClick={() => handleShowReviewPopup(ord)}
                        />
                        <ReviewPopup
                          setShow={setShowReviewPopup}
                          show={showReviewPopup}
                          onHide={() => setShowReviewPopup(false)}
                          name={selectedReviewPopup_name}
                          img={selectedReviewPopup_img}
                        />
                        <Button1
                          className="repurchase"
                          label="Mua lại sản phẩm"
                          labelColor="#F1EFE7"
                          backgroundColor="#785B5B"
                          onClick={() => (window.location.href = `/products/${ord.product._id}`)}
                        />
                      </div>
                    </div>
                  </div>
                </li>
                {index > 0 && index < order.orderDetails.length - 1 && <hr />}
                {order.orderDetails.length > 1 && index === 0 && (
                  <React.Fragment>
                    <hr />
                    <div className="see-more">
                      <p className="body-medium see-more__content">
                        {order.order.showMore
                          ? 'Ẩn bớt'
                          : `Xem thêm ${order.orderDetails.length - 1} sản phẩm`}
                      </p>
                      <ButtonIcon
                        border="none"
                        backgroundColor="transparent"
                        width="25px"
                        height="25px"
                        onClick={() => handleSeeMore(order.order._id)}
                        label={
                          order.order.showMore ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />
                        }
                      />
                    </div>
                  </React.Fragment>
                )}
              </ul>
            ))}
          </article>
        </React.Fragment>
      ))}
      {/* Product Pagination */}
      <Row className="product__pagination">
        {totalPages > 1 && (
          <ProductPagination
            totalPages={totalPages}
            activePage={activePage}
            onPageChange={handlePageChange}
          />
        )}
      </Row>
    </div>
  );
}

export default Orders;
