import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button1 from 'components/Common/Button1';
import { MdOutlineRadioButtonChecked, MdOutlineRadioButtonUnchecked } from 'react-icons/md';
import 'style/components/Orders/PaymentMethod.scss';
import ModalDeliveryPayment from './Modal--DeliveryPayment';
import notFound from '../../assets/image/account/no-data.jpg';
import AddBank from 'pages/Account/Modal/modal--add-bank';
import MomoImg from 'assets/image/order/MoMo_Logo.png'
import VNPayImg from 'assets/image/order/vnpay.png'
import ATM from 'assets/image/order/the atm.png'
import Visa from 'assets/image/order/the visa.jpg'
function PaymentMethod(props) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionMethod, setSelectedOptionMethod] = useState(0);
    const handleClickMethod = (index, value) => {
        if (value === selectedOptionMethod) {
            return;
        }
        setSelectedOptionMethod(value);
        props.onPaymentMethodChange(index, value);
    };
  // const [isModalDeliveryPayment, setIsModalDeliveryPayment] = useState(false);
  // const [selectedItems, setSelectedItems] = useState(null);
  // const [isOpenAdd, setIsOpenAdd] = useState(false);
  // console.log('selectitemss', selectedItems)
  // console.log(props.deliveryPaymentDefault)
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8000/api/account/bank-cards/${props.id}`)
  //     .then((response) => {
  //       const bankCardDefault = response.data.find((item) => {
  //         return item.is_default === true;
  //       });
  //       setSelectedItems(bankCardDefault)
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  //   }, []);
  
  // useEffect(() => {
  //   props.selectedPaymentInfo(selectedItems)
  // }, [selectedItems])

  const handleClick = (index, value) => {
    if (index === selectedOption) {
      return;
    }
    setSelectedOption(index);
    props.onPaymentMethodChange(index, value);
  };

  // const maskBankNumber = (bankNumber) => {
  //   if (typeof bankNumber !== 'string' || bankNumber.length < 4) {
  //     return 'Invalid bank number';
  //   }

  //   const masked = bankNumber.substring(0, bankNumber.length - 4).replace(/\d/g, '*');
  //   const lastFourDigits = bankNumber.substring(bankNumber.length - 4);
  //   return masked + lastFourDigits;
  // };
  // const handleCheckedItems = (item) => {
  //   setSelectedItems(item);
  // };

  // const onSuccessAddBank = () => {
  //   axios
  //     .get(`http://localhost:8000/api/account/bank-cards/${props.id}`)
  //     .then((response) => {
  //       const bankCardDefault = response.data.find((item) => {
  //         return item.is_default === true;
  //       });
  //       props.updateDeliveryPayment(bankCardDefault)
  //       setSelectedItems(bankCardDefault)

  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // };
  // const updateDeliveryPayment = (item) => {
  //   props.updateDeliveryPayment(item)
  // }

  // const handleOnHide = () => {
  //     axios
  //       .get(`http://localhost:8000/api/account/bank-cards/${props.id}`)
  //       .then((response) => {
  //         console.log(response.data);
  //           const bankCardAfterDel = response.data.find((item) => {
  //             return item._id === selectedItems._id;
  //           });
  //           const bankCardDefault = response.data.find((item) => {
  //             return item.is_default === true;
  //           });
  //           const bankCardDefaultIndex = response.data.findIndex((item) => {
  //             return item.is_default === true;
  //           });
  //           if (!bankCardAfterDel) {
  //             if (!bankCardDefault) {
  //               console.log('k co defalut')
  //               updateDeliveryPayment(null)
  //               setSelectedItems(null)
  //               setIsModalDeliveryPayment(false)
  //             }
  //             else {
  //               console.log('co dèal')
  //               setIsModalDeliveryPayment(false)
  //               setSelectedItems('Bạn chưa chọn tài khoản thanh toán phù hợp')
  //             }
              
  //         }
  //         setIsModalDeliveryPayment(false)

  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // }
  console.log(props.deliveryPaymentDefault)
  return (
    <div className="payment__method">
      <div className="payment__method__title title-large">3. Phương thức thanh toán</div>
      <div className="payment__method__one body-large" onClick={() => handleClick(0, null)}>
        {selectedOption === 0 ? (
          <MdOutlineRadioButtonChecked className="icon__radio" />
        ) : (
          <MdOutlineRadioButtonUnchecked className="icon__radio" />
        )}
        <span>Thanh toán tiền khi nhận hàng (COD)</span>
      </div>
      <div className="payment__method__two body-large" onClick={() => handleClick(1,0)}>
        {selectedOption === 1 ? (
          <MdOutlineRadioButtonChecked className="icon__radio" />
        ) : (
          <MdOutlineRadioButtonUnchecked className="icon__radio" />
        )}
        <span>Thanh toán trực tuyến</span>
      </div>

      {selectedOption === 1 && (
        <div className='payment-method-btn body-large' >
          <div className='payment-method-select' onClick={() => handleClickMethod(1, 0)} style={selectedOptionMethod === 0 ? { backgroundColor: "rgb(120, 91, 91)" } : {}}>
          <img src={VNPayImg} alt="" style={{width:"40px", height:"40px"}}/>
                <span style={selectedOptionMethod === 0 ? { color: "rgb(241, 239, 231)" } : {}}>VNPay</span>
          </div>
          <div className='payment-method-select' onClick={() => handleClickMethod(1, 1)} style={selectedOptionMethod === 1 ? { backgroundColor: "rgb(120, 91, 91)" } : {}}>
          <img src={MomoImg} alt="" style={{width:"40px", height:"40px"}}/>
                <span style={selectedOptionMethod === 1 ? { color: "rgb(241, 239, 231)" } : {}}>MoMo</span>
          </div>
          <div className='payment-method-select' onClick={() => handleClickMethod(1,2)} style={selectedOptionMethod === 2 ? { backgroundColor: "rgb(120, 91, 91)" } : {}}>
          <img src={ATM} alt="" style={{width:"40px", height:"40px"}}/>
                <span style={selectedOptionMethod === 2 ? { color: "rgb(241, 239, 231)" } : {}}>Thẻ ATM nội địa</span>
          </div>
          <div className='payment-method-select' onClick={() => handleClickMethod(1,3)} style={selectedOptionMethod === 3 ? { backgroundColor: "rgb(120, 91, 91)" } : {}}>
          <img src={Visa} alt="" style={{width:"40px", height:"40px"}}/>
                <span style={selectedOptionMethod === 3 ? { color: "rgb(241, 239, 231)" } : {}}>Thẻ quốc tế</span>

          </div>
        </div>
      )}


{/* 
      {selectedOption === 1 && selectedItems==='Bạn chưa chọn tài khoản thanh toán phù hợp' && (<ul className="accounts-list">
            <div className="account-item__wrapper">
              <div className="account-info" style={{ paddingLeft: '48px', paddingTop:"6px" }}>
                  <p className="body-large">Bạn chưa chọn tài khoản thanh toán phù hợp!</p>
            </div>
            <div className="bank-btn" style={{paddingRight:"1rem"}}>
                <Button1
                  className="set-default-btn label-large"
                  label="Thay đổi"
                  type="button"
                  onClick={() => setIsModalDeliveryPayment(true)}
            />
            {isModalDeliveryPayment && (<ModalDeliveryPayment
              show={isModalDeliveryPayment}
              onHide={handleOnHide}
              onHideSubmit={() => setIsModalDeliveryPayment(false)}
              onCheckedItems={handleCheckedItems}
              idBankCard={props.deliveryPaymentDefault._id}
              updateDeliveryPayment={updateDeliveryPayment}
            />)}
          </div>
        </div>
      </ul>)}



      {selectedOption === 1 && selectedItems !== 'Bạn chưa chọn tài khoản thanh toán phù hợp' &&
        (!props.deliveryPaymentDefault ? (

          <ul className="accounts-list">
            <div className="account-item__wrapper">
              <div className="account-info" style={{paddingRight:"40px"}}>
              <div className="no-data">
              <img src={notFound} alt="Not found" />
                  <p className="body-large">Bạn chưa có tài khoản thanh toán, hãy thêm tài khoản để thanh toán!!!</p>
                </div>
            </div>
            <div className="bank-btn"  style={{paddingRight:"1rem"}}>
                <Button1
                  className="set-default-btn label-large"
                  label="Thêm tài khoản"
                  type="button"
                  onClick={() => setIsOpenAdd(true)}
                />
                {isOpenAdd && (
                  <AddBank
                    show={isOpenAdd}
                    onClose={() => setIsOpenAdd(false)}
                    id={props.id}
                    onSuccess={onSuccessAddBank}
                  />
                )}
              </div>
            </div>
          </ul>
        ) : (

          <ul className="accounts-list">
            <div className="account-item__wrapper">
              <div className="account-info" style={{ paddingLeft: '48px', gap:"6px", paddingTop:"6px" }}>
                <div className="account-number-default">
                  <p className="body-large" style={{ marginBottom: '0' }}>
                    STK:
                  </p>
                  <p className="body-large" style={{ marginBottom: '0' }}>
                    {maskBankNumber(
                      selectedItems && Object.keys(selectedItems).length === 0
                        ? props.deliveryPaymentDefault.bank_number
                        : selectedItems.bank_number,
                    )}{' '}
                    {/* {selectedItems && Object.keys(selectedItems).length === 0
                    ? props.deliveryPaymentDefault.bank_number
                    : selectedItems.bank_number} */}
                  {/* </p>
                  {(selectedItems && Object.keys(selectedItems).length === 0
                    ? props.deliveryPaymentDefault.is_default
                    : selectedItems.is_default) && (
                      <span className="default-label label-large">Mặc định</span>
                    )}
                </div>
                <p className="bank-name body-large">
                  Ngân hàng{' '}
                  {selectedItems && Object.keys(selectedItems).length === 0
                    ? props.deliveryPaymentDefault.bank_name
                    : selectedItems.bank_name}
                </p>
              </div>

              <div className="bank-btn" style={{paddingRight: "1rem"}}>
                <Button1
                  className="set-default-btn label-large"
                  label="Thay đổi"
                  type="button"
                  onClick={() => setIsModalDeliveryPayment(true)}
                />
                {isModalDeliveryPayment && (<ModalDeliveryPayment
                  show={isModalDeliveryPayment}
                  onHide={handleOnHide}
                  onHideSubmit={() => setIsModalDeliveryPayment(false)}
                  onCheckedItems={handleCheckedItems}
                  idBankCard={selectedItems && Object.keys(selectedItems).length === 0 ? props.deliveryPaymentDefault._id : selectedItems._id}
                  updateDeliveryPayment={updateDeliveryPayment}
                />)}
              </div>
            </div>
          </ul>
        ))
      } */} 

    </div>

  );
}

export default PaymentMethod;
