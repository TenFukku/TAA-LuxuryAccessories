import axios from 'axios';
import { useState } from "react";

export function useGetUserCart(prod, modal) {
  const [data, setData] = useState([]); 
  const userID = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))._id : null;
  
  const getUserCart = async () => {
    try {
      const res = await axios.post('http://localhost:8000/cart/get', {
        user_id: userID,
      });

      if (res.status === 200) {
        setData(res.data);
        return res.data;
        // modal();
      }
    } catch (error) {
      console.log(error);
      // setError(error);
    }
  };

  return { getUserCart, data };
}
