import { useState } from 'react';
import axios from 'axios';

export function useDeleteCartItem(prod) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const deleteFromCart = async (cartItemId) => {
    console.log('id', cartItemId);
    const user_id = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))[0]._id
      : null;

    try {
      setLoading(true);
      setError(null);

      const res = await axios.delete(`http://localhost:8000/cart/delete-item/${cartItemId}`);

      if (res.status === 200) {
        setLoading(false);
        // alert('Xóa khỏi giỏ hàng thành công');
      }
    } catch (error) {
      console.error('Error deleting item from cart:', error);
      setError(error);
    }
  };

  return { deleteFromCart, loading, error };
}
