import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from './useAuthContext';

export function useAddToCart(prod, modal) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { getCartQuantity } = useAuthContext();
  const userID = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))[0]._id
    : null;
  const addToCart = async (prod, quantity) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post('http://localhost:8000/cart/add', {
        product_id: prod._id,
        user_id: userID,
        quantity: quantity,
      });

      if (res.status === 200) {
        setLoading(false);
        // alert('Thêm vào giỏ hàng thành công');
        console.log('Thêm vào giỏ hàng thành công');
        // getCartQuantity();
        // modal();
      }
    } catch (error) {
      console.log('error', error);
      setError(error);
    }
  };
  const addToCartNoLogin = async (prod, quantity) => {
    let cartItems = JSON.parse(localStorage.getItem('cartNouser'))
      ? JSON.parse(localStorage.getItem('cartNouser'))
      : [];
    let found = false;

    cartItems.forEach((item) => {
      if (item._id === prod._id) {
        item.quantity += quantity;
        found = true;
      }
    });

    if (!found) {
      const cartItem = { ...prod, quantity: quantity };
      cartItems.push(cartItem);
    }

    localStorage.setItem('cartNouser', JSON.stringify(cartItems));
    console.log('Updated cart items:', cartItems);
  };
  const removeFromCartNoLogin = (prodId) => {
    let cartItems = JSON.parse(localStorage.getItem('cartNouser'));
    if (cartItems)
      localStorage.setItem(
        'cartNouser',
        JSON.stringify(cartItems.filter((item) => item._id !== prodId)),
      );
    cartItems = JSON.parse(localStorage.getItem('cartNouser'));
    console.log('Updated cart items:', cartItems);
  };
  const updateQuantityNoLogin = (prodId, newQuantity) => {
    let cartItems = JSON.parse(localStorage.getItem('cartNouser'));
    localStorage.setItem(
      'cartNouser',
      JSON.stringify(
        cartItems.map((item) => {
          if (item._id === prodId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        }),
      ),
    );
  };
  return {
    addToCart,
    loading,
    error,
    addToCartNoLogin,
    removeFromCartNoLogin,
    updateQuantityNoLogin,
  };
}
