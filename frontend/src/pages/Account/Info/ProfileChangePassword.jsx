import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Button1 from 'components/Common/Button1';
import ButtonIcon from 'components/Common/ButtonIcon';
import { BiHide, BiShow } from 'react-icons/bi';
import AddSuccess from '../Modal/modal--add-success';
function ProfileChangePassword() {
  const [userData, setUserData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const defaultUser = JSON.parse(localStorage.getItem('user'));
  const defaultUserData = defaultUser[0];

  const [errorOldPassword, setErrorOldPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Cập nhật userData
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === 'oldPassword') {
      setErrorOldPassword('');
    }
    if (name === 'newPassword') {
      setErrorPassword('');
    }
    if (name === 'confirmPassword') {
      setErrorConfirmPassword('');
    }
  };

  useEffect(() => {
    // Kiểm tra xem tất cả các trường input có giá trị không
    const allFieldsNotEmpty = Object.values(userData).every((val) => val !== '');
    setDisabled(!allFieldsNotEmpty);
  }, [userData]);

  // Hàm xử lý khi người dùng nhấn nút để hiển thị hoặc ẩn mật khẩu
  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  // Hàm xử lý khi người dùng gửi form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý dữ liệu form ở đây, ví dụ: gửi dữ liệu đến máy chủ
    console.log(userData);
    function validatePassword(password) {
      return (
        password.length >= 8 &&
        !/\s/.test(password) &&
        /[a-zA-Z]/.test(password) &&
        /\d/.test(password) &&
        /[\W_]/.test(password)
      );
    }
    if (
      !validatePassword(userData.newPassword) &&
      userData.newPassword !== userData.confirmPassword
    ) {
      setErrorPassword('Mật khẩu phải có ít nhất 8 ký tự, bao gồm cả chữ, số, và ký tự đặc biệt!');
      setErrorConfirmPassword('Mật khẩu xác nhận không trùng khớp!');
      return;
    }
    if (!validatePassword(userData.newPassword)) {
      setErrorPassword('Mật khẩu phải có ít nhất 8 ký tự, bao gồm cả chữ, số, và ký tự đặc biệt!');
      return; // Không gửi form nếu số điện thoại không hợp lệ
    }
    if (userData.newPassword !== userData.confirmPassword) {
      setErrorConfirmPassword('Mật khẩu xác nhận không trùng khớp!');
      return;
    }
    // Gửi yêu cầu đến server nếu không có lỗi
    const id = defaultUserData._id;
    console.log(id);
    axios
      .put(`http://localhost:8000/api/account/change-pass/${id}`, userData)
      .then((response) => {
        // Xử lý phản hồi từ server
        console.log(response.data);
        setShowSuccess(true);
        setDisabled(true);
        setUserData({
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message === 'Mật khẩu không khớp!') {
          setErrorOldPassword('Mật khẩu không khớp!');
        }
        console.error('Error:', error);
      });
  };

  return (
    <article id="profile-change-password" className="section__content visible">
      <h2 className="headline-small" style={{ marginTop: '12px' }}>
        Đổi mật khẩu
      </h2>
      <hr className="hr-title" />

      <form onSubmit={handleSubmit} className="form__content">
        <div className="form__row">
          <Row>
            <label className="col-3 body-large" htmlFor="old_password">
              Mật khẩu hiện tại:
            </label>
            <div className="col-9 input__wrapper input-password__wrapper">
              <input
                required
                className="input__wrapper-child body-medium"
                type={showPassword.oldPassword ? 'text' : 'password'}
                id="old_password"
                name="oldPassword"
                placeholder="Nhập mật khẩu hiện tại"
                value={userData.oldPassword}
                onChange={handleChange}
              />
              <ButtonIcon
                backgroundColor="transparent"
                border="none"
                onClick={() => togglePasswordVisibility('oldPassword')}
                label={
                  showPassword.oldPassword ? (
                    <BiShow style={{ color: '#524343' }} />
                  ) : (
                    <BiHide style={{ color: '#524343' }} />
                  )
                }
                type="button"
              />
              {errorOldPassword && <div className="err">{errorOldPassword}</div>}
            </div>
          </Row>
        </div>
        <div className="form__row">
          <Row>
            <label className="col-3 body-large" htmlFor="new_password">
              Mật khẩu mới:
            </label>
            <div className="col-9 input__wrapper input-password__wrapper">
              <input
                required
                className={`input__wrapper-child body-medium ${errorPassword ? 'err-border' : ''}`}
                type={showPassword.newPassword ? 'text' : 'password'}
                id="new_password"
                name="newPassword"
                placeholder="Nhập mật khẩu mới"
                value={userData.newPassword}
                onChange={handleChange}
              />
              <ButtonIcon
                backgroundColor="transparent"
                border="none"
                onClick={() => togglePasswordVisibility('newPassword')}
                label={
                  showPassword.newPassword ? (
                    <BiShow style={{ color: '#524343' }} />
                  ) : (
                    <BiHide style={{ color: '#524343' }} />
                  )
                }
                type="button"
              />
              {errorPassword && <div className="err">{errorPassword}</div>}
            </div>
          </Row>
        </div>
        <div className="form__row">
          <Row>
            <label className="col-3 body-large" htmlFor="confirm_password">
              Xác nhận mật khẩu mới:
            </label>
            <div className="col-9 input__wrapper input-password__wrapper">
              <input
                required
                className={`input__wrapper-child body-medium ${errorConfirmPassword ? 'err-border' : ''}`}
                type={showPassword.confirmPassword ? 'text' : 'password'}
                id="confirm_password"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu mới"
                value={userData.confirmPassword}
                onChange={handleChange}
              />
              <ButtonIcon
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
              {errorConfirmPassword && <div className="err">{errorConfirmPassword}</div>}
            </div>
          </Row>
        </div>
        <Button1
          backgroundColor={disabled ? '#1D1B201F' : '#785B5B'}
          labelColor={disabled ? 'rgba(32, 26, 26, 0.38)' : '#F1EFE7'}
          border="none"
          className="save-btn body-large"
          label="Xác nhận"
          type="submit"
        />
        {showSuccess && <AddSuccess onClose={() => setShowSuccess(false)} title={'Cập nhật mật khẩu thành công!'}/>}
      </form>
    </article>
  );
}

export default ProfileChangePassword;
