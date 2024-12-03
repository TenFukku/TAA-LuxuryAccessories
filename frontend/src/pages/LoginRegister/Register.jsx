import { Form, Image, Col, Container } from 'react-bootstrap';
import logo from 'assets/image/logo2.svg';
import './Login.scss';
import React, { useState, useEffect } from 'react';
import { useRegister } from 'hooks/useRegister';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Common/Button1';
import { BiHide, BiShow } from 'react-icons/bi';
import ButtonIcon from 'components/Common/ButtonIcon';
function Register() {
  const navigate = useNavigate()
  const handleClickLogin = () => {
    navigate('/log_in');
  };
  const { register, errorExist, setErrorExist } = useRegister();
  // const [submit, setSubmit] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const color = !disabled ? '#F1EFE7' : 'rgba(32, 26, 26, 0.38)';
  const backgroundColor = !disabled ? '#785B5B' : 'rgba(29, 27, 32, 0.12)';


  // const [valid, setValid] = useState({
  //   username: false,
  //   phone: false,
  //   email: false,
  //   password: false,
  //   confirm: false,
  //   check: false,
  // });

  // const [errorUsername, setErrorUsername] = useState('')
  const [errorPhone, setErrorPhone] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('')
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });

  const handleCheck = (e) => {
    setIsChecked(e.target.checked);
  };
  // Hàm xử lý khi người dùng nhấn nút để hiển thị hoặc ẩn mật khẩu
  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };
  const inform = {
    username: 'Tên đăng nhập phải có ít nhất 1 ký tự',
    phone: 'Số điện thoại phải có từ 10 đến 11 số',
    email: 'Định dạng email không hợp lệ',
    password: 'Mật khẩu phải có ít nhất 8 kí tự, gồm chữ, số và ký tự đặc biệt',
    confirm: 'Mật khẩu xác nhận không khớp',
    check: 'Bạn phải đồng ý với điều khoản của TAA',
  };

  const [input, setInput] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
    confirm: '',
  });

  // const handleCheck = (e) => {
  //   setValid({ ...valid, check: !valid.check });
  // };

  // const handleInputPasswordChange = (e) => {
  //   var regex = /^(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=])[a-zA-Z\d@#$%^&+=]{8,}$/;
  //   setInput({ ...input, password: e.target.value });
  //   console.log(e.target.value);
  //   console.log('regex', regex.test(e.target.value));
  //   if (regex.test(e.target.value)) {
  //     setValid({ ...valid, password: true });
  //   } else {
  //     setValid({ ...valid, password: false });
  //   }
  // };

  // const handleConfirmPasswordChange = (e) => {
  //   setInput({ ...input, confirm: e.target.value });
  //   if (input.password === e.target.value) {
  //     setValid({ ...valid, confirm: true });
  //   } else {
  //     setValid({ ...valid, confirm: false });
  //   }
  // };

  // const handleNameChange = (e) => {
  //   setInput({ ...input, username: e.target.value });
  //   if (e.target.value.length > 0) {
  //     setValid({ ...valid, username: true });
  //   } else {
  //     setValid({ ...valid, username: false });
  //   }
  // };

  // const handleEmailChange = (e) => {
  //   setInput({ ...input, email: e.target.value });
  //   if (e.target.value.includes('@') && e.target.value.includes('.com')) {
  //     setValid({ ...valid, email: true });
  //   } else {
  //     setValid({ ...valid, email: false });
  //   }
  // };

  // const handlePhoneChange = (e) => {
  //   setInput({ ...input, phone: e.target.value });
  //   if (e.target.value.length >= 10 && e.target.value.length <= 11) {
  //     setValid({ ...valid, phone: true });
  //   } else {
  //     setValid({ ...valid, phone: false });
  //   }
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // if (name === 'username') {
    //   setErrorUsername('');
    // }
    if (name === 'phone') {
      setErrorPhone('');
    }
    if (name === 'email') {
      setErrorEmail('')
      setErrorExist('')
    }
    if (name === 'password') {
      setErrorPassword('')
    }
    if (name === 'confirm') {
      setErrorConfirmPassword('')
    }
  };


  useEffect(() => {
    const allFieldsNotEmpty = Object.values(input).every(val => val !== '') && isChecked
    console.log(allFieldsNotEmpty)
    setDisabled(!allFieldsNotEmpty);
    console.log(isChecked)
  }, [input, isChecked]);

  const handleSubmition = async (e) => {
    e.preventDefault();
    // const all = Object.values(valid);

    // if (all.every((item) => item === true)) {
    //   setSubmit(true);
    //   setDisabled(false)
    // } else {
    //   alert('Vui lòng điền đầy đủ thông tin');
    //   console.log(valid);
    //   setSubmit(false);
    //   return;
    // }
    if (disabled === false) {
      const phoneRegex = /^(0[1-9])+([0-9]{8,9})\b$/;
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      function validatePassword(password) {
        return (
          password.length >= 8 &&
          !/\s/.test(password) &&
          /[a-zA-Z]/.test(password) &&
          /\d/.test(password) &&
          /[\W_]/.test(password)
        );
      }
      if (!phoneRegex.test(input.phone)) {
        setErrorPhone(inform.phone);
        return;
      }
      if (!emailRegex.test(input.email)) {
        setErrorEmail(inform.email);
        return;
      }
      if (!validatePassword(input.password)) {
        setErrorPassword(inform.password);
        return;
      }
      if (input.password !== input.confirm) {
        setErrorConfirmPassword(inform.confirm);
        return;
      }
      register(input)
    }
    else console.log('b ch dc phep dang ki hjhj')
  };



  return (
    <section className="register">
      <Container className="d-flex" fluid>
        <Col className="side_bar d-flex justify-content-center align-item-center col-4">
          <Image src={logo} alt="TAA_logo" fluid/>
        </Col>

        <Col className="register_form col-8">
          <h1> Đăng ký </h1>
          <Form onSubmit={handleSubmition}>
            <Form.Group className="mb-3 input" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Tên đăng nhập" onChange={handleChange} className='body-medium' name='username' />
            </Form.Group>

            <Form.Group className="mb-3 input" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Số điện thoại" onChange={handleChange} className={`body-medium ${errorPhone ? 'err-border' : ''}`} name='phone' />
              {errorPhone &&
                <Form.Text className="text-muted">
                  {/* {!valid.phone && submit ? inform.phone : null} */}
                  {errorPhone}
                </Form.Text>
              }
            </Form.Group>

            <Form.Group className="mb-3 input" controlId="formBasicEmail">
              <Form.Control
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className={`body-medium ${errorEmail ? 'err-border' : ''}`}
              />
              {errorEmail &&
                <Form.Text className="text-muted">
                  {/* {!valid.email && submit ? inform.email : null} */}
                  {errorEmail}
                </Form.Text>}
              {errorExist &&
                <Form.Text className="text-muted">
                  {/* {!valid.email && submit ? inform.email : null} */}
                  {errorExist}
                </Form.Text>}
            </Form.Group>

            <Form.Group className="mb-3 input" controlId="formBasicPassword">
              <Form.Control
                new-password
                type={showPassword.password ? 'text' : 'password'}
                name="password"
                placeholder="Mật khẩu"
                onChange={handleChange}
                className={`body-medium ${errorPassword ? 'err-border' : ''}`}
              />
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
              {errorPassword &&
                <Form.Text className="text-muted">
                  {/* {!valid.password && submit ? inform.password : null} */}
                  {errorPassword}
                </Form.Text>}
            </Form.Group>

            <Form.Group className="mb-3 input" controlId="formConfirmPassword">
              <Form.Control
                type={showPassword.confirmPassword ? 'text' : 'password'}
                new-password
                onChange={handleChange}
                placeholder="Xác nhận mật khẩu"
                className={`body-medium ${errorConfirmPassword ? 'err-border' : ''}`}
                name='confirm'
              />
              <ButtonIcon
                className="show-pass"
                backgroundColor="transparent"
                border="none"
                onClick={() => togglePasswordVisibility('confirmPassword')}
                label={
                  showPassword.confirmPassword ? (
                    <BiShow style={{ color: '#524343' }} />
                  ) : (
                    <BiHide style={{ color: '#524343' }} />
                  )
                }
                type="button"
              />
              {errorConfirmPassword &&
                <Form.Text className="text-muted">
                  {/* {!valid.confirm && submit ? inform.confirm : null} */}
                  {errorConfirmPassword}
                </Form.Text>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="radio"
                // onClick={handleCheck}
                checked={isChecked}
                onClick={handleCheck}
                className='body-large'
                label="Tôi đã đọc và đồng ý với Điều kiện giao dịch chung và Chính sách bảo mật thông tin của TAA"
              />
              {/* <Form.Text className="text-muted">
                {!valid.check && submit ? inform.check : null}
              </Form.Text> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="submit_reg">
              <div className="d-grid gap-2">
                {/* <Button
                  className="register_btn"
                  variant="none"
                  size="lg"
                  onClick={() => {
                    setSubmit(true);
                    console.log(submit);
                  }}
                  type="submit"
                >
                  Đăng ký
                </Button> */}
                <Button
                  label="Đăng kí"
                  className='login_btn body-large'
                  type="submit"
                  labelColor={color}
                  border="none"
                  backgroundColor={backgroundColor}
                  fontSize="16px"
                // size='lg'
                // active
                />

                <div className="login_rec_containter">
                  <h5 className="login_rec body-large">Bạn đã có tài khoản ?</h5>
                </div>

                <Button
                  label="Đăng nhập"
                  className='body-large register_btn'
                  type="button"
                  fontSize="16px"
                  onClick={handleClickLogin}
                />
              </div>
            </Form.Group>
          </Form>
        </Col>
      </Container>
    </section>
  );
}

export default Register;
