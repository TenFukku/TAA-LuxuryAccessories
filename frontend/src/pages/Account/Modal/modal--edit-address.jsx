import React from 'react';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import ButtonIcon from 'components/Common/ButtonIcon';
import Button1 from 'components/Common/Button1';
import { CgClose } from 'react-icons/cg';
function EditAddress(props) {
  const [editAddress, setEditAddress] = useState(props.data);
  const [errorPhone, setErrorPhone] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorAddress, setErrorAddress] = useState('');
  const prevData = useRef(props.data);
  useEffect(() => {
    setEditAddress(props.data);
  }, [props.data]);
  useEffect(() => {
    if (JSON.stringify(props.data) !== JSON.stringify(prevData.current)) {
      setEditAddress(props.data);
      prevData.current = props.data; // Update previous data
    }
  }, [props.data]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === 'loca_pers_name') {
      setErrorName('');
    }
    if (name === 'loca_pers_phone') {
      setErrorPhone('');
    }
    if (name === 'loca_address') {
      setErrorAddress('')
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editAddress.loca_pers_name.trim() || !editAddress.loca_pers_phone.trim() || !editAddress.loca_address.trim()) {
      if (!editAddress.loca_pers_name.trim()) {
        setErrorName('Tên người nhận không được để trống!');
      }
      if (!editAddress.loca_pers_phone.trim()) {
        setErrorPhone('Số điện thoại không được để trống!');
      }
      if (!editAddress.loca_address.trim()) {
        setErrorAddress('Địa chỉ tổng quan không được để trống!');
      }
      return;
    }
    const isDifferent = Object.keys(editAddress).some(
      (key) => editAddress[key] !== prevData.current[key],
    );
    if (!isDifferent) return;
    const phoneRegex = /^(0[1-9])+([0-9]{8,9})\b$/;
    if (!phoneRegex.test(editAddress.loca_pers_phone)) {
      setErrorPhone('Số điện thoại không hợp lệ!');
      return; // Không gửi form nếu số điện thoại không hợp lệ
    }
    if (!props.data._id) {
      localStorage.setItem('addressNouser', JSON.stringify(editAddress))
      props.onHide();
      props.onSuccess()
      return
}
    axios
      .put(`http://localhost:8000/api/account/edit-address/${props.data._id}`, editAddress)
      .then((response) => {
        console.log('edit address success', response.data.message);
        props.onHide();
        props.onSuccess();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleModalClick = (e) => {
    // Kiểm tra xem phần tử được nhấp có là nền của modal hay không
    if (e.target === e.currentTarget) {
      props.onHide(); // Gọi hàm onHide khi nhấp vào nền modal
    }
  };
  return (
    <div id="modal--edit-address" className={`profile-modal ${props.show ? 'active' : ''}`} onClick={handleModalClick}>
      <div className="modal__content--form">
        <ButtonIcon
          className="modal__btn--close"
          label={<CgClose />}
          border="none"
          onClick={props.onHide}
        />
        <h1 className="profile-modal__title headline-small">Sửa địa chỉ nhận hàng</h1>
        <form method="PUT" onSubmit={handleSubmit}>
          <div className="form__row">
            <Row>
              <label className="col-3 label-large" htmlFor="loca_pers_name">
                Tên người nhận:
              </label>
              <div className="col-9 input__wrapper">
                <input
                  className={`input__wrapper-child ${errorName ? "err-border" : ""}`}
                  type="text"
                  id="loca_pers_name"
                  name="loca_pers_name"
                  value={editAddress?.loca_pers_name}
                  onChange={handleChange}
                />
              </div>
            </Row>
          </div>
          <div className="form__row">
            <Row>
              <label className="col-3 label-large" htmlFor="loca_pers_phone">
                Số điện thoại:
              </label>
              <div className="col-9 input__wrapper">
                <input
                  className={`input__wrapper-child ${errorPhone ? 'err-border' : ''}`}
                  type="text"
                  id="loca_pers_phone"
                  name="loca_pers_phone"
                  value={editAddress?.loca_pers_phone}
                  onChange={handleChange}
                />
                {errorPhone && <div className="err">{errorPhone}</div>}
              </div>
            </Row>
          </div>
          <div className="form__row">
            <Row>
              <label className="col-3 label-large" htmlFor="loca_address">
                Địa chỉ tổng quan:
              </label>

              <div className="col-9 input__wrapper">
                <input
                  className={`input__wrapper-child ${errorAddress ? "err-border" : ""}`}
                  type="text"
                  id="loca_address"
                  name="loca_address"
                  value={editAddress?.loca_address}
                  onChange={handleChange}
                />
              </div>
            </Row>
          </div>
          <div className="form__row">
            <Row>
              <label className="col-3 label-large" htmlFor="loca_detail">
                Địa chỉ chi tiết:
              </label>

              <div className="col-9 input__wrapper">
                <input
                  className="input__wrapper-child"
                  type="text"
                  id="loca_detail"
                  name="loca_detail"
                  value={editAddress?.loca_detail}
                  onChange={handleChange}
                />
              </div>
            </Row>
          </div>
          <div className="btn__wrapper">
            <Button1 label="Hủy bỏ" type="button" className="col-6" onClick={props.onHide} />
            <Button1
              label="Hoàn thành"
              type="submit"
              className="col-6"
              labelColor="#F1EFE7"
              backgroundColor="#785B5B"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
export default EditAddress;
