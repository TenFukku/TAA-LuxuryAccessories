import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'style/components/Orders/OrderBill.scss';
import Button from 'components/Common/Button1';
import { MdEdit } from 'react-icons/md';
import { Route, useNavigate } from 'react-router-dom';
import ButtonIcon from 'components/Common/ButtonIcon';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import axios from 'axios';
import OrderSuccess from './Modal--OrderSuccess';
import { useAuthContext } from 'hooks/useAuthContext';
import { useAddToCart } from 'hooks/useAddToCart';
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
OrderBill.propTypes = {
  orderItems: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      productName: PropTypes.string.isRequired,
      moneyCurrent: PropTypes.number.isRequired,
      number: PropTypes.number.isRequired,
    }),
  ).isRequired,
  totalOrderAmount: PropTypes.number.isRequired,
  deliveryFee: PropTypes.number.isRequired,
  deliveryMethodSelected: PropTypes.number,
  paymentMethodSelected: PropTypes.number,
  temporaryAmount: PropTypes.number.isRequired,
  discountAmount: PropTypes.number.isRequired,
};

function OrderBill(props) {
  const { getCartQuantity } = useAuthContext();
  const { removeFromCartNoLogin } = useAddToCart();
  console.log('phuong thuc giao hang', props.deliveryMethodSelected);
  console.log('phuong thuc thanh toan', props.paymentMethodSelected);
  console.log('thong tin thanh toan ngan hang', props.selectedPaymentInfo);
  console.log('thong tin dia chi giao hang', props.selectedAddressInfo);
  console.log('orderDetails', props.orderItems);
  const [disabled, setDisabled] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    if (
      props.deliveryMethodSelected !== null &&
      props.selectedAddressInfo !== null &&
      props.selectedAddressInfo !== undefined &&
      props.selectedAddressInfo !== 'Bạn chưa chọn địa chỉ giao hàng phù hợp' &&
      (props.paymentMethodSelected === 0 ||
        (props.paymentMethodSelected === 1 && props.selectedPaymentInfo !== null))
    ) {
      setDisabled(false);
    } else setDisabled(true);
  }, [
    props.deliveryMethodSelected,
    props.paymentMethodSelected,
    props.selectedPaymentInfo,
    props.selectedAddressInfo,
  ]);

  const color = !disabled ? '#F1EFE7' : 'rgba(32, 26, 26, 0.38)';
  const backgroundColor = !disabled ? '#785B5B' : 'rgba(29, 27, 32, 0.12)';
  const border = !disabled ? '1px solid #857373' : 'none';
  const [showAllItems, setShowAllItems] = useState(false);
  const navigate = useNavigate();

  const handleModifyButtonClick = () => {
    navigate('/cart');
  };

  const handleShowAllItems = () => {
    setShowAllItems(!showAllItems);
  };

  const handelSubmit = async () => {
    if (disabled === false) {
      if (props.paymentMethodSelected === 1) {
        // navigate('/order/payment', {
        //   state: {
        //     data: props.orderItems,
        //     dataAddress: props.selectedAddressInfo,
        //     dataDeliveryMethod: props.deliveryMethodSelected,
        //     temporary: props.temporaryAmount,
        //     discount: props.discountAmount,
        //     deliveryFee: props.deliveryFee,
        //     last: props.totalOrderAmount + props.deliveryFee
        //   },
        // });

        // const result = await handleTransaction(totalPrice, orderId)
        // router.push(result)
        // return
// Tạo một đối tượng chứa thông tin thanh toán
const paymentInfo = {
  user_id: props.id,
  orderDetails: props.orderItems,
  order_total_cost: props.totalOrderAmount + props.deliveryFee,
  bank_id: props.selectedPaymentInfo?._id,
  pay_id_option: props.paymentMethodSelected,
  tran_id_option: props.deliveryMethodSelected,
  loca_id: props.selectedAddressInfo?._id
};

// Chuyển đổi đối tượng thành chuỗi JSON
const paymentInfoString = JSON.stringify(paymentInfo);

// Lưu chuỗi JSON vào localStorage
localStorage.setItem('tmpPayment', paymentInfoString);
        await axios
          .post(`http://localhost:8000/order/create_payment_url`, {
            amount: props.totalOrderAmount + props.deliveryFee,
            bankCode: 'VNPAY',
            language: 'vn',
            orderType: 'other',
            orderDescription: 'Thanh toán đơn hàng',
            // id: props.id,
            // orderItems: props.orderItems,
            // totalOrderAmount: props.totalOrderAmount,
            // deliveryMethodSelected: props.deliveryMethodSelected,
            // paymentMethodSelected: props.paymentMethodSelected,
            // temporaryAmount: props.temporaryAmount,
            // discountAmount: props.discountAmount,
            // deliveryFee: props.deliveryFee,
            // selectedPaymentInfo: props.selectedPaymentInfo,
            // selectedAddressInfo: props.selectedAddressInfo,
          })
          .then((response) => {
            console.log(response.data);
            window.location.href = response.data;
          })
          .catch((error) => {
            localStorage.removeItem('tmpPayment')
            console.error('Error:', error);
          });
        return;
      }
      axios
        .post(`http://localhost:8000/api/account/order`, {
          user_id: props.id,
          orderDetails: props.orderItems,
          order_total_cost: props.totalOrderAmount + props.deliveryFee,
          bank_id: props.selectedPaymentInfo?._id,
          pay_id_option: props.paymentMethodSelected,
          tran_id_option: props.deliveryMethodSelected,
          loca_id: props.selectedAddressInfo?._id,
          status: 0
        })
        .then((response) => {
          console.log(response.data);
          navigate('/order/payment', {state:{ status: 1} });
          if (!props.id) props.orderItems.map((item) => removeFromCartNoLogin(item._id));
          getCartQuantity();
        })
        .catch((error) => {
          console.error('Error:', error);
          navigate('/order/payment', {state:{ status: 0} });
        });
    } else console.log('b ch dat dc dau!');
  };
  return (
    <div className="order__bill">
      <div className="order__bill__header title-large">
        <div>Đơn hàng</div>
        <div>
          {/* <Button
            // icon={MdEdit}
            // iconWidth={18}
            // iconHeight={18}
            label="Sửa"
            type="button"
            labelColor="#9C4048"
            // backgroundColor="#785B5B"
                      onClick={handleModifyButtonClick}
            border="none"
          /> */}
          <p
            className="body-large"
            style={{
              color: '#9C4048',
              marginBottom: '0',
              paddingRight: '8px',
              fontSize: '18px',
              cursor: 'pointer',
            }}
            onClick={handleModifyButtonClick}
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
              <div className="order__product__price">x{numberWithCommas(item.moneyCurrent)} đ</div>
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
        <div className="money__temporary__value">{numberWithCommas(props.temporaryAmount)} đ</div>
      </div>
      <div className="order__bill__money__temporary title-medium">
        <div className="money__temporary__title">Giảm giá:</div>
        <div className="money__temporary__value">{numberWithCommas(props.discountAmount)} đ</div>
      </div>
      <div className="order__bill__money__ship title-medium">
        <div className="money__ship__title">Phí vận chuyển:</div>
        <div className="money__ship__value"> {numberWithCommas(props.deliveryFee)}đ</div>
      </div>
      <div className="order__bill__line"></div>
      <div className="order__bill__total__money title-medium">
        <div className="money__total__title">Thành tiền:</div>
        <div className="money__total__value">
          {numberWithCommas(props.totalOrderAmount + props.deliveryFee)} đ
        </div>
      </div>
      <div className="order__bill__note title-medium">
        Đã bao gồm VAT, phí đóng gói, phí vận chuyển và cả chi phí khác.
      </div>
      <div className="order__bill__button">
        <Button
          label="Đặt hàng"
          type="submit"
          border={border}
          labelColor={color}
          backgroundColor={backgroundColor}
          onClick={handelSubmit}
        />
        {showSuccess && <OrderSuccess id={props.id} />}
      </div>
    </div>
  );
}

export default OrderBill;
