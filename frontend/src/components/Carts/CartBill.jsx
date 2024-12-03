import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Common/Button1';
import 'style/components/Carts/CartBill.scss';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
function CartBill(props) {
  const { temporaryAmount, discountAmount, totalAmount } = props;
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    console.log(props.checkedItemsInfo)
    if (props.checkedItemsInfo.length !== 0) setDisabled(false);
    else setDisabled(true);
  }, [props.checkedItemsInfo]);
  const color = !disabled ? '#F1EFE7' : 'rgba(32, 26, 26, 0.38)';
  const backgroundColor = !disabled ? '#785B5B' : 'rgba(29, 27, 32, 0.12)';
  const border = !disabled ? '1px solid #857373' : 'none';
  const navigate = useNavigate();
  const handleOrder = () => {
    // console.log(props.checkedItemsInfo)
    if (disabled === false)
      navigate('/order', {
        state: {
          data: props.checkedItemsInfo,
          total: totalAmount,
          temporary: temporaryAmount,
          discount: discountAmount,
        },
      });
    else console.log('b ch chon san pham nao het');
  };

  return (
    <div className="cart__bill">
      <div className="cart__bill__header title-large">Hóa đơn của bạn</div>
      <div className="cart__bill__line"></div>
      <div className="cart__bill__body title-medium">
        <div className="cart__bill__money__temporary">
          <div className="money__temporary__title">Tạm tính:</div>
          <div className="money__temporary__value">{numberWithCommas(temporaryAmount)} đ</div>
        </div>
        <div className="cart__bill__discount">
          <div className="money__discount__title">Giảm giá:</div>
          <div className="money__discount__value">{numberWithCommas(discountAmount)} đ</div>
        </div>
      </div>
      <div className="cart__bill__line"></div>
      <div className="cart__bill__footer">
        <div className="cart__bill__total__money title-medium">
          <div className="money__total__title">Tổng:</div>
          <div className="money__total__value">{numberWithCommas(totalAmount)} đ</div>
        </div>
        <div className="cart__bill__note title-medium">(Đã bao gồm VAT)</div>
        <div className="cart__bill__order">
          <Button
            className="body-large"
            label="Tiến hành đặt hàng"
            onClick={handleOrder}
            labelColor={color}
            border={border}
            backgroundColor={backgroundColor}
          />
        </div>
      </div>
    </div>
  );
}

CartBill.propTypes = {
  temporaryAmount: PropTypes.number.isRequired,
  discountAmount: PropTypes.number.isRequired,
  totalAmount: PropTypes.number.isRequired,
};

export default CartBill;
