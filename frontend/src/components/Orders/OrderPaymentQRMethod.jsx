import React, { useState, useEffect } from 'react';
import 'style/components/Orders/OrderPaymentQRMethod.scss'
import { MdOutlineRadioButtonChecked, MdOutlineRadioButtonUnchecked } from "react-icons/md";
import MomoImg from 'assets/image/order/MoMo_Logo.png'
import VNPayImg from 'assets/image/order/vnpay.png'
import ATM from 'assets/image/order/the atm.png'
import Visa from 'assets/image/order/the visa.jpg'

function OrderPaymentQRMethod(props) {
    const [selectedOption, setSelectedOption] = useState(1);
    const handleClick = (index) => {
        if (index === selectedOption) {
            return;
        }
        setSelectedOption(index);
        props.onPaymentChange(index);
    };

    return (
        <div className="delivery__method">
            <div className="delivery__method__title title-large">Dịch vụ thanh toán</div>
            <div className="delivery__method__one body-large" onClick={() => handleClick(0)}>
                <div className="radio__check">
                    {selectedOption === 0 ? <MdOutlineRadioButtonChecked className="icon__radio" /> : <MdOutlineRadioButtonUnchecked className="icon__radio" />}
                </div>
                <img src={VNPayImg} alt="" style={{width:"40px", height:"auto"}}/>
                <span>VNPay</span>

            </div>
            <div className="delivery__method__two body-large" onClick={() => handleClick(1)}>
                <div className="radio__check">
                    {selectedOption === 1 ? <MdOutlineRadioButtonChecked className="icon__radio" /> : <MdOutlineRadioButtonUnchecked className="icon__radio" />}
                </div>
                <img src={MomoImg} alt="" style={{width:"40px", height:"auto"}}/>
                <span>MoMo</span>

            </div>
            <div className="order__bill__line"></div>
            <div className="delivery__method__two body-large" onClick={() => handleClick(2)}>
                <div className="radio__check">
                    {selectedOption === 2 ? <MdOutlineRadioButtonChecked className="icon__radio" /> : <MdOutlineRadioButtonUnchecked className="icon__radio" />}
                </div>
                <img src={ATM} alt="" style={{width:"40px", height:"auto"}}/>
                <span>Thẻ nội địa</span>

            </div>
            <div className="delivery__method__two body-large" onClick={() => handleClick(3)}>
                <div className="radio__check">
                    {selectedOption === 3 ? <MdOutlineRadioButtonChecked className="icon__radio" /> : <MdOutlineRadioButtonUnchecked className="icon__radio" />}
                </div>
                <img src={Visa} alt="" style={{width:"40px", height:"auto"}}/>
                <span>Thẻ quốc tế</span>

            </div>
        </div>
    )
}

export default OrderPaymentQRMethod;
