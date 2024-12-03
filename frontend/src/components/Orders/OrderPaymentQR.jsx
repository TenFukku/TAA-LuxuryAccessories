import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bs1CircleFill, Bs2CircleFill, Bs3CircleFill } from 'react-icons/bs';
import { LuScanLine } from 'react-icons/lu';
import 'style/components/Orders/OrderPaymentQR.scss';
import QR from 'assets/image/order/QR.svg'

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function OrderPaymentQR(props) {
  const navigate = useNavigate();

  // State để lưu trữ thời gian còn lại
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 phút

  // Effect để giảm thời gian còn lại và chuyển hướng khi hết thời gian
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTimeLeft => {
        if (prevTimeLeft === 0) {
          clearInterval(timer);
          navigate('/order', {
            state: {
              data: props.orderItems,
              total: props.temporary - props.discount,
              temporary: props.temporary,
              discount: props.discount,
            },
          });
          return prevTimeLeft;
        } else {
          return prevTimeLeft - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, props]);

    const [select, setSelect] = useState('MoMo');
    const [qr, setQr]=useState(null)

  useEffect(() => {
    switch (props.paymentSelected) {
      case 0:
            setSelect('VNPay');
            setQr(null)
        break;
      case 1:
            setSelect('MoMo');
            setQr(null)
        break;
      case 2:
        // setSelect('Option 2');
        break;
      case 3:
        // setSelect('Option 3');
        break;
      default:
        // setSelect('Default Option');
        break;
    }
  }, [props.paymentSelected]);
  return (
    <div className="order-payment-qr">
      <div className="total-payment-text title-large">Tổng thanh toán</div>
      <div className="total-payment-value">{numberWithCommas(props.last)} đ</div>
      <div className="order-payment-body">
        <span className="title-medium">
          Thời gian thanh toán còn lại: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </span>
        <div className='qr-img'>
          <img src={QR} alt="QR thanh toán"/>
        </div>
        <div className="payment-guide">
          <div className="payment-guide-title title-large">Hướng dẫn thanh toán bằng {select}</div>
          <div className="payment-guide-content body-large">
            <Bs1CircleFill className="payment-guide-index" />
            <span>Mở ứng dụng {select} trên điện thoại</span>
          </div>
          <div className="payment-guide-content">
            <Bs2CircleFill className="payment-guide-index" />
            <span className="body-large">Dùng biểu tượng</span>
            <LuScanLine />
            <span className="body-large">để quét mã QR</span>
          </div>
          <div className="payment-guide-content">
            <Bs3CircleFill className="payment-guide-index" />
            <span className="body-large">Quét mã ở trang này và thanh toán</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPaymentQR;
