import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import 'style/components/Orders/OrderPayment.scss';
import axios from 'axios';
import PopupNotiLogin from 'components/Products/PopupNotiLogin';
import { useNavigate } from 'react-router-dom';
import Button1 from 'components/Common/Button1';
import { useAuthContext } from 'hooks/useAuthContext';
import { useAddToCart } from 'hooks/useAddToCart';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
function fomatDate(x) {
  const year = x.substring(0, 4);
const month = x.substring(4, 6);
const day = x.substring(6, 8);
const hour = x.substring(8, 10);
const minute = x.substring(10, 12);
  const second = x.substring(12, 14);
  // const date = new Date(`${year}/${month}/${day} ${hour}:${minute}:${second}`);
  const formattedDate = `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  return formattedDate
}
function OrderPayment() {
  const defaultUser = JSON.parse(localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user'))
    : null;
  const navigate = useNavigate();
  const location = useLocation();
  const { removeFromCartNoLogin } = useAddToCart();
  const [showPopupNotiLogin, setShowPopupNotiLogin] = useState(false);
  const [data, setData] = useState({});
  const [status, setStatus] = useState(location.state ? location.state.status : 1);
  const { getCartQuantity } = useAuthContext();
  let content = 'Bạn phải là thành viên mới có thể xem các đơn hàng';

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const urlParams = {};
  
    // Lặp qua tất cả các tham số trên URL và thêm chúng vào object
    for (const [key, value] of queryParams) {
      urlParams[key] = value;
    }
    
  
    // Tạo một mảng chứa các tham số từ vnp_Amount trở đi
    const filteredParams = {};
    let shouldIncludeParams = false;
    
    queryParams.forEach((value, key) => {
      if (key === "vnp_Amount") {
        shouldIncludeParams = true;
      }
      if (shouldIncludeParams) {
        filteredParams[key] = value;
      }
    });
    
    // Chuyển đổi mảng filteredParams thành chuỗi query parameters
    const filteredParamsString = new URLSearchParams(filteredParams).toString();
    if (queryParams.size===0)
      return
    console.log(JSON.parse(localStorage.getItem('tmpPayment')))
    const storedPaymentInfoString = localStorage.getItem('tmpPayment');
      const storedPaymentInfo = JSON.parse(storedPaymentInfoString);
    axios
    .get(`http://localhost:8000/order/vnpay_return?${filteredParamsString}`)
    .then((response) => {
      if (response.data.code !== '97') {
        axios
          .post(`http://localhost:8000/api/account/order`, {
            user_id: storedPaymentInfo.user_id, orderDetails: storedPaymentInfo.orderDetails, order_total_cost: storedPaymentInfo.order_total_cost,
            bank_id: storedPaymentInfo.bank_id?storedPaymentInfo.bank_id:null, pay_id_option: storedPaymentInfo.pay_id_option, tran_id_option: storedPaymentInfo.tran_id_option, loca_id: storedPaymentInfo.loca_id?storedPaymentInfo.loca_id:null, status: 1
          })
          .then((response) => {
            localStorage.removeItem('tmpPayment')
            console.log(response.data);
            if (!storedPaymentInfo.user_id)
              storedPaymentInfo.orderDetails.map((item) => removeFromCartNoLogin(item._id))
            getCartQuantity();
          })
          .catch((error) => {
            localStorage.removeItem('tmpPayment')
            console.error('Error:', error);
          });
        setStatus(1)
        console.log(response.data.info)
        setData(response.data.info);
        
      } else {
        localStorage.removeItem('tmpPayment')
        console.log(response.data.info)
        setStatus(0)
        setData({ content: 'Thanh toán thất bại!' });
      }

    })
    .catch((error) => {
      console.error('Error:', error);
    })
  },[])
  

  const handleClickHome = () => {
    navigate('/');
  };
  const handleClickOrders = () => {
    if (!defaultUser) {
      setShowPopupNotiLogin(true);
      return;
    }
    navigate('/account/orders');
  };
  return (
    <Container className="order-payment body-large" fluid>
      <div
        className="order-payment-status"
        style={status === 1 ? { color: 'green' } : { color: 'red' }}
      >
        {status === 1 ? 'Đặt hàng thành công!' : 'Đặt hàng không thành công!'}
      </div>
      {Object.keys(data).length !== 0 && status === 0 && data.content &&
        <div>
          {data.content}
        </div>}
      {Object.keys(data).length !== 0 && status===1 &&
        <Table responsive="sm md lg" className="order-payment-content">
          <tbody>
            <tr>
              <td>Tổng thanh toán:</td>
              <td>{numberWithCommas(data.vnp_Amount / 100)}</td>
            </tr>
            <tr>
              <td>Ngân hàng thanh toán:</td>
              <td>{data.vnp_BankCode}</td>
            </tr>
            <tr>
              <td>Nội dung thanh toán:</td>
              <td>Thanh toán đơn hàng</td>
            </tr>
            <tr>
              <td>Thời gian thanh toán:</td>
              <td>{fomatDate(data.vnp_PayDate)}</td>
            </tr>
            <tr>
              <td>Mã số giao dịch:</td>
              <td>{data.vnp_TransactionNo}</td>
            </tr>
          </tbody>
        </Table>}
        {/* <Row>
          <Col className='order-payment-content-info col-4'>Tổng thanh toán:</Col>
          <Col className='order-payment-content-value col-8'>{numberWithCommas(data.vnp_Amount / 100)}</Col>
        </Row>
        <Row>
          <Col className='order-payment-content-info col-4'>Ngân hàng thanh toán:</Col>
          <Col className='order-payment-content-value col-8'>{data.vnp_BankCode}</Col> 
        </Row>
        <Row>
          <Col className='order-payment-content-info col-4'>Nội dung thanh toán:</Col>
          <Col className='order-payment-content-value col-8'>{data.vnp_OrderInfo}</Col>
        </Row>
        <Row>
          <Col className='order-payment-content-info col-4'>Thời gian thanh toán:</Col>
          <Col className='order-payment-content-value col-8'>{data.vnp_PayDate}</Col> </Row>
        <Row>
          <Col className='order-payment-content-info col-4'>Số giao dịch:</Col>
          <Col className='order-payment-content-value col-8'>{data.vnp_TransactionNo}</Col> </Row> */}
      <div className="order-payment-btn">
        <Button1 type="button" onClick={handleClickHome} label="Về trang chủ" className="col-6" />
        <Button1
          type="button"
          label="Xem các đơn hàng"
          className="col-6"
          labelColor="#F1EFE7"
          backgroundColor="#785B5B"
          onClick={handleClickOrders}
        />
      </div>
      <PopupNotiLogin
        content={content}
        show={showPopupNotiLogin}
        onHide={() => setShowPopupNotiLogin(false)}
      />
    </Container>
  );
}
export default OrderPayment;
