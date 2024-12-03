import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function useRegister() {
  const { dispatch } = useAuthContext();
  const [errorExist, setErrorExist] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate()

  const register = async (user) => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/register', user);
      dispatch({ type: 'REGISTER', payload: response.data });
      if (response.status === 201) {
        dispatch({ type: 'REGISTER', payload: response.data });
        window.location.href = '/log_in';
        return response.data;
      } 
        else {
        setLoading(false);
        // setErrorExist(response.data);
      }
    } catch (error) {
      if (error.response.status === 400)
      setErrorExist('Tài khoản đã tồn tại');
      console.log('err', error);
    }
  };
  return { register, loading, errorExist, setErrorExist };
}
