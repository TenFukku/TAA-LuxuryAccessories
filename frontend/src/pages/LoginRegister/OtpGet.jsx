import React, { useState } from 'react';
import './OtpPopUp.scss'
import { AiOutlineClose, AiOutlineLeft } from "react-icons/ai";


const OtpGet = (props) => {
    
    const [otp, setOtp] = useState(new Array(6).fill(''));

    const handleOtpChange = (e, index) => {
        // Fill the OTP fields from left to right
        if (isNaN(e.target.value)) return false;
        setOtp([...otp.map((data, i) => (i === index ? e.target.value : data))]);
        
        if (e.target.nextSibling && e.target.value) {
            e.target.nextSibling.focus();
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
    };

    return (
    <>
        <h2>Nhập mã OTP</h2>
        <p>Vui lòng nhập mã OTP từ 123456</p>
        <form onSubmit={handleSubmit}>
            {/* <label htmlFor="otp">Vui lòng nhập mã OTP từ {} {}</label> */}
            <div className='input_containter'>
            {otp.map((data, index) => (
                <input
                    type="text"
                    name="otp"
                    maxLength="1"
                    key={index}
                    value={data}
                    onChange={(e) => handleOtpChange(e, index)}
                />
            ))}
            </div>
            <label>Bạn chưa nhận được mã ? <a>Gửi lại </a> </label>
            
            <button type="submit">Xác nhận</button>
        </form>
        </>
    );
};

export default OtpGet;