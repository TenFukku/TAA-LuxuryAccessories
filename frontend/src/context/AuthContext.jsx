import { createContext, useReducer, useState } from "react";
import axios from "axios";
export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case('LOGIN'):
            return {user: action.payload};
    
        case('REGISTER'):
            return {user: action.payload};
    
        case('LOGOUT'):
            return {user: null};
    
        default:
            return state;
    }
}
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {user: null});
    const [cartQuantity, setCartQuantity] = useState(0);
    // console.log('AuthContext: ', state);
    const getCartQuantity = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            setCartQuantity(JSON.parse(localStorage.getItem('cartNouser')) ? JSON.parse(localStorage.getItem('cartNouser')).length : 0)
            return;
        }
        const id = user[0]._id;
        console.log('user_id', id);
        const res = await axios.post('http://localhost:8000/cart/getQuantity', {
          user_id: id,
        });
        if (res.status === 200) {
          console.log(res.data);
          setCartQuantity(res.data.length);
          return res.data;
        } else {
          console.log('No cart found');
          setCartQuantity(0);
          return 0;
        }
      };

    return (
        <AuthContext.Provider value={{ ...state, dispatch, cartQuantity, setCartQuantity, getCartQuantity }}>
            {children}
        </AuthContext.Provider>
    );
};