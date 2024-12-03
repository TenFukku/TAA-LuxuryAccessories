import { useState } from "react";
import { useAuthContext } from "./useAuthContext.js";
import axios from "axios";

export function useLogIn() {
    const { dispatch } = useAuthContext();
    // const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 

    const logIn = async ( user ) => {
        try {
            setLoading(true);
            setEmail(null);
            setPassword(null)
            const res = await axios.post('http://localhost:8000/api/auth/login',user)
            //     {
            //     email : email,
            //     password: password
            // })
            
            if (res.status === 200) {
                localStorage.setItem('user', JSON.stringify(res.data));
                dispatch({ type: "LOGIN", payload: res.data });
                setLoading(false);
                window.location.href='/'
            }

        } catch (error) {
            if(error.response.status===404 && error.response.data.message ==='User not found')
                setEmail('Email không tồn tại!');
            if (error.response.status === 400  && error.response.data.message === 'Invalid password')
                setPassword('Mật khẩu không khớp!')
            console.log('err', error)
        }
        
            
    };

    return { logIn, loading ,email, password, setEmail, setPassword };
}


// const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
    //   const res = await axios.post('http://localhost:8000/api/auth/login', {
    //     email,
    //     password
    //   })
//         .then((res) => {
//           const user = res.data;
//           if (user) {
//             localStorage.setItem('user', JSON.stringify(user));
//           }
//           else {
//             alert('Sai tài khoản hoặc mật khẩu');
//           }
      
//         }).catch((error) => {
//           console.log(error);
//         });
//     }catch(error) {
//       console.log(error);
//     }
//   }