import {Form, Image, Col, Container } from 'react-bootstrap';
import logo from 'assets/image/logo2.svg';
import './Login.scss';
import { NavLink } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import ModalForgotPass from './ModalForgotPass';
import { useLogIn } from 'hooks/useLogIn';
import Button from '../../components/Common/Button1';
import ButtonIcon from 'components/Common/ButtonIcon';
import { useNavigate } from 'react-router-dom';
import { BiHide, BiShow } from 'react-icons/bi';

function Login() {
  const navigate = useNavigate()
  const handleClickRegister = () => {
    navigate('/register');
  };
  const [disabled, setDisabled] = useState(true);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState({
    password: false
  });
  const { logIn, loading, email, password, setEmail, setPassword } = useLogIn();
  const color = !disabled ? '#F1EFE7' : 'rgba(32, 26, 26, 0.38)';
  const backgroundColor = !disabled ? '#785B5B' : 'rgba(29, 27, 32, 0.12)';
  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  // }
  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  // }
    // Hàm xử lý khi người dùng nhấn nút để hiển thị hoặc ẩn mật khẩu
    const togglePasswordVisibility = (field) => {
      setShowPassword((prevState) => ({
        ...prevState,
        [field]: !prevState[field],
      }));
    };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === 'email')
      setEmail('')
    if (name === 'password')
      setPassword('')
  };

  useEffect(() => {
    const allFieldsNotEmpty = Object.values(userData).every((val) => val !== '');
    setDisabled(!allFieldsNotEmpty);
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (disabled === false) {
      logIn(userData);
    }
    else console.log('b ch dc phep dang nhap hjhj')
  }

  

  return (
    <section className="login">
    <Container className='d-flex' fluid>
      <Col className='side_bar d-flex justify-content-center align-item-center' lg={4}>
          <div className='d-flex justify-content-center align-item-center' >
            <Image src={logo} alt='TAA_logo' fluid />
          </div>
      </Col>

      <Col className='login_form' lg={8}>
        <h1> Đăng nhập </h1>
        <Form action='POST' onSubmit={handleSubmit}  >
          <Form.Group className="mb-3 input" controlId="formBasicEmail">
              <Form.Control onChange={handleChange} placeholder="Email" className={`body-medium ${email ? 'err-border' : ''}`} name='email' />
              
              {email && (
                <Form.Text className="text-muted">
                  {email}
                </Form.Text>)}
          </Form.Group>

          <Form.Group className="mb-3 input" controlId="formBasicPassword">
              <Form.Control onChange={handleChange} type={showPassword.password?'text':'password'} placeholder="Mật khẩu" className={`body-medium ${password ? 'err-border' : ''}`} name='password' />
              <ButtonIcon
                className="show-pass"
                backgroundColor="transparent"
                border="none"
                onClick={() => togglePasswordVisibility('password')}
                label={
                  showPassword.password ? (
                    <BiShow style={{ color: '#524343' }} />
                  ) : (
                    <BiHide style={{ color: '#524343' }} />
                  )
                }
                type="button"
              />
              {password && (
                <Form.Text className="text-muted">
                  {password}
                </Form.Text>)}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <ModalForgotPass></ModalForgotPass>
          </Form.Group>

          
          <div className="d-grid gap-2">
              <Button
                label="Đăng nhập"
                className='login_btn body-large'
                type="submit"
                labelColor={color}
                border="none"
                backgroundColor={backgroundColor}
                fontSize="16px"
                // size='lg'
                // active
              />
            
            <div className='create_acc_rec_containter'>
                <p className='create_acc_rec body-large'>Bạn chưa có tài khoản ?</p>
            </div>
            <Button
                label="Đăng kí"
                className='body-large register_btn'
                type="button"
                fontSize="16px"
                onClick={handleClickRegister}
              />

          </div>

        </Form>
      </Col>

    </Container>
    </section>
  );
}

export default Login;