import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
// import Home from 'pages/Home/Home';
import App from './App.js';
// import App from './App';
// import GetOtp from 'pages/LoginRegister/Get_otp';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from 'partials/Footer/Footer';
import { AuthContextProvider } from 'context/AuthContext';
// import ModalForgotPass from 'pages/LoginRegister/ModalForgotPass';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
        <App></App>
    </AuthContextProvider>
    {/* <Home></Home> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
