import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import ButtonIcon from 'components/Common/ButtonIcon';
import Button1 from 'components/Common/Button1';
import { CgClose } from 'react-icons/cg';
function AddBank({ onClose, onDataToModal2, id, onSuccess, show }) {
  const [newCardData, setNewCardData] = useState({
    bank_pers_name: '',
    user_cccd: '',
    bank_name: '',
    bank_number: '',
    bank_pers_cccd: '',
  });
  const [errorCCCD, setErrorCCCD] = useState('');
  const [errorBankNumber, setErrorBankNumber] = useState('');
  const [errorBankName, setErrorBankName] = useState('');
  const [errorBankPersName, setErrorBankPersName] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCardData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === 'bank_pers_name') {
      setErrorBankPersName('');
    }
    if (name === 'bank_pers_cccd') {
      setErrorCCCD('');
    }
    if (name === 'bank_name') {
      setErrorBankName('')
    }
    if (name === 'bank_number') {
      setErrorBankNumber('')
    }
  };

  // // Hàm xử lý khi mở Modal 2
  // const handleOpenModal2 = () => {
  //   onClose(); // Đóng Modal 1
  //   onDataToModal2(newCardData); // Truyền dữ liệu cho Modal 2
  // };
  const handleModalClick = (e) => {
    // Kiểm tra xem phần tử được nhấp có là nền của modal hay không
    if (e.target === e.currentTarget) {
      onClose(); // Gọi hàm onHide khi nhấp vào nền modal
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !newCardData.bank_pers_name.trim() ||
      !newCardData.bank_pers_cccd.trim() ||
      !newCardData.bank_name.trim() ||
      !newCardData.bank_number.trim()
    ) {
      if (!newCardData.bank_pers_name.trim()) {
        setErrorBankPersName('Tên người nhận không được để trống!');
      }
      if (!newCardData.bank_pers_cccd.trim()) {
        setErrorCCCD('CCCD không được để trống!');
      }
      if (!newCardData.bank_name.trim()) {
        setErrorBankName('Tên ngân hàng không được để trống!');
      }
      if (!newCardData.bank_number.trim()) {
        setErrorBankNumber('Số tài khoản không được để trống!');
      }
      return;
    }

    const cccdRegex = /^\d{12}$/;
    const bankNumberRegex = /^[0-9]{9,15}$/;
    if (
      !cccdRegex.test(newCardData.bank_pers_cccd) &&
      !bankNumberRegex.test(newCardData.bank_number)
    ) {
      setErrorCCCD('CCCD phải chứa 12 chữ số!');
      setErrorBankNumber('Số tài khoản phải chứa từ 9 đến 15 chữ số!');
      return;
    }
    if (!cccdRegex.test(newCardData.bank_pers_cccd)) {
      setErrorCCCD('CCCD phải chứa 12 chữ số!');
      return; // Không gửi form nếu cccd không hợp lệ
    }
    if (!bankNumberRegex.test(newCardData.bank_number)) {
      setErrorBankNumber('Số tài khoản phải chứa từ 9 đến 15 chữ số!');
      return; // Không gửi form nếu STK không hợp lệ
    }
    axios
      .post(`http://localhost:8000/api/account/add-bank/${id}`, newCardData)
      .then((response) => {
        console.log('add bank card success', response.data.message);
        onClose();
        onSuccess();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div id="modal--add-bank" className="profile-modal active" onClick={handleModalClick}>
      <div className="modal__content--form">
        <ButtonIcon
          className="modal__btn--close"
          label={<CgClose />}
          border="none"
          type="button"
          onClick={onClose}
        />
        <h1 className="profile-modal__title headline-small">Thêm thông tin ngân hàng</h1>
        <form method="POST" onSubmit={handleSubmit}>
          <div className="form__row">
            <Row>
              <label className="col-3 label-large" htmlFor="bank_pers_name">
                Họ và tên:
              </label>
              <div className="col-9 input__wrapper">
                <input
                  className={`input__wrapper-child ${errorBankPersName ? "err-border" : ""}`}
                  type="text"
                  id="bank_pers_name"
                  name="bank_pers_name"
                  value={newCardData.bank_pers_name}
                  onChange={handleChange}
                />
                                {errorBankPersName && <div className="err">{errorBankPersName}</div>}
              </div>
            </Row>
          </div>
          <div className="form__row">
            <Row>
              <label className="col-3 label-large" htmlFor="bank_pers_cccd">
                CCCD:
              </label>
              <div className="col-9 input__wrapper">
                <input
                  className={`input__wrapper-child ${errorCCCD ? "err-border" : ""}`}
                  type="text"
                  id="bank_pers_cccd"
                  name="bank_pers_cccd"
                  value={newCardData.bank_pers_cccd}
                  onChange={handleChange}
                />
                {errorCCCD && <div className="err">{errorCCCD}</div>}
              </div>
            </Row>
          </div>
          <div className="form__row">
            <Row>
              <label className="col-3 label-large" htmlFor="bank_name">
                Ngân hàng:
              </label>

              <div className="col-9 input__wrapper">
                <input
                  className={`input__wrapper-child ${errorBankName ? "err-border" : ""}`}
                  type="text"
                  id="bank_name"
                  name="bank_name"
                  value={newCardData.bank_name}
                  onChange={handleChange}
                />
                                {errorBankName && <div className="err">{errorBankName}</div>}
              </div>
            </Row>
          </div>
          <div className="form__row">
            <Row>
              <label className="col-3 label-large" htmlFor="bank_number">
                Số tài khoản:
              </label>
              <div className="col-9 input__wrapper">
                <input
                  className={`input__wrapper-child ${errorBankNumber ? "err-border" : ""}`}
                  type="text"
                  id="bank_number"
                  name="bank_number"
                  value={newCardData.bank_number}
                  onChange={handleChange}
                />
                {errorBankNumber && <div className="err">{errorBankNumber}</div>}
              </div>
            </Row>
          </div>
          <div className="btn__wrapper">
            <Button1 label="Hủy bỏ" type="button" className="col-6" onClick={onClose} />
            <Button1
              label="Đồng ý"
              type="submit"
              className="col-6"
              labelColor="#F1EFE7"
              backgroundColor="#785B5B"
              // onClick={handleOpenModal2}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddBank;
