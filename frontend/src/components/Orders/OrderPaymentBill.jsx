import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import 'style/components/Orders/OrderPaymentBill.scss';
import OrderSuccess from './Modal--OrderSuccess';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import axios from 'axios';
import { useAuthContext } from 'hooks/useAuthContext';
import { useAddToCart } from 'hooks/useAddToCart';
import { useNavigate } from 'react-router-dom';
import ButtonIcon from 'components/Common/ButtonIcon';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function OrderPaymentBill(props) {
  const { getCartQuantity } = useAuthContext();
  const { removeFromCartNoLogin } = useAddToCart();
  const navigate = useNavigate();
  const [showAllItems, setShowAllItems] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleModifyNavigateCart = () => {
    navigate('/cart');
  };
  const handleModifyNavigateOrder = () => {
    navigate('/order', {
      state: {
        data: props.orderItems,
        total: props.temporary - props.discount,
        temporary: props.temporary,
        discount: props.discount,
      },
    });
  };
  const handleShowAllItems = () => {
    setShowAllItems(!showAllItems);
  };
  return (
    <>
      <Row>
        <div className="order__bill">
          <div className="order__bill__header title-large">
            <div>Đơn hàng</div>
            <div>
              <p
                className="body-large"
                style={{
                  color: '#9C4048',
                  marginBottom: '0',
                  paddingRight: '8px',
                  fontSize: '18px',
                  cursor: 'pointer',
                }}
                onClick={handleModifyNavigateCart}
              >
                Sửa
              </p>
            </div>
          </div>
          <div className="order__bill__line"></div>
          {props.orderItems?.map((item, index) => (
            <div
              key={index}
              className={`order__item__product ${!showAllItems && index >= 4 ? 'hidden' : ''}`}
            >
              <div className="order__product__image">
                <img src={item.imageUrl} alt={item.productName} />
              </div>
              <div className="order__item__info body-large">
                <div className="order__product__name">{item.productName}</div>
                <div className="order__product__number__price">
                  <div className="order__product__number">SL: {item.number}</div>
                  <div className="order__product__price">
                    x{numberWithCommas(item.moneyCurrent)} đ
                  </div>
                </div>
              </div>
            </div>
          ))}

          {props.orderItems?.length > 4 && (
            <div className="order__bill__see body-medium">
              <div className="toggle-text-icon" onClick={handleShowAllItems}>
                <p className="primary-text">{showAllItems ? 'Thu gọn' : 'Xem tất cả'}</p>
                <ButtonIcon
                  border="none"
                  backgroundColor="transparent"
                  labelColor="#785b5b"
                  width="25px"
                  height="25px"
                  label={showAllItems ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
                />
              </div>
            </div>
          )}
          <div className="order__bill__line"></div>
          <div className="order__bill__money__temporary title-medium">
            <div className="money__temporary__title">Tạm tính ({props.orderItems?.length}):</div>
            <div className="money__temporary__value">{numberWithCommas(props.temporary)} đ</div>
          </div>
          <div className="order__bill__money__temporary title-medium">
            <div className="money__temporary__title">Giảm giá:</div>
            <div className="money__temporary__value">{numberWithCommas(props.discount)} đ</div>
          </div>
          <div className="order__bill__money__ship title-medium">
            <div className="money__ship__title">Phí vận chuyển:</div>
            <div className="money__ship__value"> {numberWithCommas(props.deliveryFee)}đ</div>
          </div>
          <div className="order__bill__line"></div>
          <div className="order__bill__total__money title-medium">
            <div className="money__total__title">Thành tiền:</div>
            <div className="money__total__value">{numberWithCommas(props.last)} đ</div>
          </div>
          <div className="order__bill__note title-medium">
            Đã bao gồm VAT, phí đóng gói, phí vận chuyển và cả chi phí khác.
          </div>
          {showSuccess && <OrderSuccess />}
        </div>
      </Row>
      <Row>
        <div className="order__bill">
          <div className="order__bill__header title-large">
            <div>Thông tin khách hàng</div>
            <div>
              <p
                className="body-large"
                style={{
                  color: '#9C4048',
                  marginBottom: '0',
                  paddingRight: '8px',
                  fontSize: '18px',
                  cursor: 'pointer',
                }}
                onClick={handleModifyNavigateOrder}
              >
                Sửa
              </p>
            </div>
          </div>
          <div className="order__bill__line"></div>
          <div className="order__bill__money__temporary title-medium">
            <div className="money__temporary__value">{props.dataAddress.loca_pers_name}</div>
          </div>
          <div className="order__bill__money__temporary title-medium">
            <div className="money__temporary__value">{props.dataAddress.loca_pers_phone}</div>
          </div>
          <div className="order__bill__money__ship title-medium">
            <div className="money__ship__value">
              {props.dataAddress.loca_detail + ', ' + props.dataAddress.loca_address}
            </div>
          </div>
        </div>
      </Row>
      <Row>
        <div className="order__bill">
          <div className="order__bill__header title-large">
            <div>Thông tin vận chuyển</div>
            <div>
              <p
                className="body-large"
                style={{
                  color: '#9C4048',
                  marginBottom: '0',
                  paddingRight: '8px',
                  fontSize: '18px',
                  cursor: 'pointer',
                }}
                onClick={handleModifyNavigateOrder}
              >
                Sửa
              </p>
            </div>
          </div>
          <div className="order__bill__line"></div>
          <div className="order__bill__money__ship title-medium">
            <div className="money__ship__value">
              {' '}
              {props.dataDeliveryMethod === 0
                ? 'Giao hàng nhanh trong 2h (Trễ tặng 100k)'
                : 'Giao hàng trong 72h'}
            </div>
          </div>
        </div>
      </Row>
    </>
  );
}
export default OrderPaymentBill;
