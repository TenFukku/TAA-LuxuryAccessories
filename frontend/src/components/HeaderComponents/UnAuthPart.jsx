import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from "react-router-dom"
import "./UnAuthPart.scss"
import { IoMdCart } from 'react-icons/io';
import { useAddToCart } from 'hooks/useAddToCart';
import { Badge } from 'react-bootstrap'
import { useAuthContext } from 'hooks/useAuthContext';

function UnAuthPart() {
    const { cartQuantity, setCartQuantity } = useAuthContext();

    const getCartQuantity = async () => {
        setCartQuantity(JSON.parse(localStorage.getItem('cartNouser')) ? JSON.parse(localStorage.getItem('cartNouser')).length : 0)
      };
    
      useEffect(() => {
        getCartQuantity(); 
      }, []);
    

    return(
        <>
            <Badge className="number_cart">{cartQuantity}</Badge>
          <NavLink to="/cart" className="cart_link">
            <IoMdCart className="cart-icon"> </IoMdCart>
          </NavLink>

            <NavLink to="/log_in" className="login_btn btn_reg_log_round_8px btn_clickable_boldcolor">
                Đăng nhập
            </NavLink>
            <NavLink to="/register" className="register_btn btn_reg_log_round_8px">
                Đăng ký
            </NavLink>
        </>
    )
}

export default UnAuthPart;

