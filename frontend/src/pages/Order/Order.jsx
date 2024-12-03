import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DeliveryInformation from 'components/Orders/DeliveryInformation';
import DeliveryMethod from 'components/Orders/DeliveryMethod';
import PaymentMethod from 'components/Orders/PaymentMethod';
import 'style/pages/Order/Order.scss';
import OrderBill from 'components/Orders/OrderBill';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
Order.propTypes = {};

function Order(props) {
  const location = useLocation();
  const orderItems = location.state?.data;
  const totalOrderAmount = location.state?.total;
  const temporaryAmount = location.state?.temporary;
  const discountAmount = location.state?.discount;
  console.log(location.state.data);
  const [deliveryInformation, setDeliveryInformation] = useState(null);
  const [deliveryPayment, setDeliveryPayment] = useState(null);
  const defaultUser = JSON.parse(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')):null;
  const defaultUserData = defaultUser?defaultUser[0]:null;
  const id = defaultUserData?defaultUserData._id:null;
  useEffect(() => {
    if (!defaultUser)
    {
      JSON.parse(localStorage.getItem('addressNouser'))?setDeliveryInformation(JSON.parse(localStorage.getItem('addressNouser'))):setDeliveryInformation(null)
      return
      }

    axios
      .get(`http://localhost:8000/api/account/shipping-addresses/${id}`)
      .then((response) => {
        const addressDefault = response.data.find((item) => {
          return item.is_default === true;
        });
        setDeliveryInformation(addressDefault);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    axios
      .get(`http://localhost:8000/api/account/bank-cards/${id}`)
      .then((response) => {
        const bankCardDefault = response.data.find((item) => {
          return item.is_default === true;
        });
        setDeliveryPayment(bankCardDefault);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  const onSuccess = () => {
    axios
      .get(`http://localhost:8000/api/account/shipping-addresses/${id}`)
      .then((response) => {
        const addressDefault = response.data.find((item) => {
          return item.is_default === true;
        });
        setDeliveryInformation(addressDefault);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  const [deliveryMethodSelected, setDeliveryMethodSelected] = useState(null);
    const [paymentMethodSelected, setPaymentMethodSelected] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(0)
  const [selectedPaymentInfo, setSelectedPaymentInfo] = useState(null)
  const [selectedAddressInfo, setSelectedAddressInfo] = useState(null)

  console.log(deliveryMethodSelected)
  console.log(paymentMethodSelected)
  const handleDeliveryMethodChange = (selected) => {
    setDeliveryMethodSelected(selected);
  };

  const handlePaymentMethodChange = (selected, selectedMethod) => {
    setPaymentMethodSelected(selected);
    setSelectedPaymentInfo(selectedMethod)

  };
  const handleDeliveryFee = (val) => {
    setDeliveryFee(val)
  }
  const updateDeliveryPayment = (item) => {
    setDeliveryPayment(item)
  }
  const handleSelectedPaymentInfo = (item) => {
    setSelectedPaymentInfo(item)
  }
  const handleSelectedAddressInfo = (item) => {
    setSelectedAddressInfo(item)
  }

  const updateDeliveryInformation = (item) => {
    setDeliveryInformation(item)
  }
  console.log(deliveryPayment)
  return (
    <Container className="order" fluid>
      <Row className="order__content">
        <Col lg={8} md={12} className="order__content__list">
          <DeliveryInformation
            deliveryInformation={deliveryInformation}
            // onSuccess={onSuccess}
            id={id}
            updateDeliveryInformation={updateDeliveryInformation}
            selectedAddressInfo={handleSelectedAddressInfo}
          />
          <DeliveryMethod onDeliveryMethodChange={handleDeliveryMethodChange} handleDeliveryFee={handleDeliveryFee} />
          <PaymentMethod
            onPaymentMethodChange={handlePaymentMethodChange}
            deliveryPaymentDefault={deliveryPayment}
            id={id}
            updateDeliveryPayment={updateDeliveryPayment}
            selectedPaymentInfo={handleSelectedPaymentInfo}
          />
        </Col>
        <Col lg={4} md={12} className="order__content__bill">
          <OrderBill
            id={id}
            orderItems={orderItems}
            totalOrderAmount={totalOrderAmount}
            deliveryMethodSelected={deliveryMethodSelected}
            paymentMethodSelected={paymentMethodSelected}
            temporaryAmount={temporaryAmount}
            discountAmount={discountAmount}
            deliveryFee={deliveryFee}
            selectedPaymentInfo={selectedPaymentInfo}
            selectedAddressInfo={selectedAddressInfo}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Order;
