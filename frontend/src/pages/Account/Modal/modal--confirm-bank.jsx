import React from 'react';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import ButtonIcon from 'components/Common/ButtonIcon';
import Button1 from 'components/Common/Button1';
import { CgClose } from 'react-icons/cg';
function ConfirmBank({ onClose, onDataToModal3, dataFromModal1 }) {
  const [newCardDataConfirm, setNewCardDataConfirm] = useState(dataFromModal1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCardDataConfirm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(newCardDataConfirm)
  };
  // Hàm xử lý khi mở Modal 3
  const handleOpenModal3 = () => {
    onClose(); // Đóng Modal 2
    onDataToModal3(newCardDataConfirm); // Truyền dữ liệu cho Modal 3
  };
  return (
    <div id="modal--confirm-bank" className="profile-modal active">
      <div className="modal__content--form">
        <ButtonIcon
          className="modal__btn--close"
          label={<CgClose />}
          border="none"
          onClick={onClose}
        />
        <h1 className="profile-modal__title headline-small">Xác nhận thông tin ngân hàng</h1>
        <form >
          <div className="form__row">
            <Row>
              <label className="col-3 label-large" htmlFor="bank_pers_name">
                Họ và tên:
              </label>
              <div className="col-9 input__wrapper">
                <input
                  required
                  className="input__wrapper-child"
                  type="text"
                  id="bank_pers_name"
                  name="bank_pers_name"
                  value={dataFromModal1.bank_pers_name}
                  onChange={handleChange}
                />
              </div>
            </Row>
          </div>
          <div className="form__row">
            <Row>
              <label className="col-3 label-large" htmlFor="user_cccd">
                CCCD:
              </label>
              <div className="col-9 input__wrapper">
                <input
                  required
                  className="input__wrapper-child"
                  type="text"
                  id="user_cccd"
                  name="user_cccd"
                  value={dataFromModal1.user_cccd}
                  onChange={handleChange}
                />
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
                  required
                  className="input__wrapper-child"
                  type="text"
                  id="bank_name"
                  name="bank_name"
                  value={dataFromModal1.bank_name}
                  onChange={handleChange}
                />
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
                  required
                  className="input__wrapper-child"
                  type="text"
                  id="bank_number"
                  name="bank_number"
                  value={dataFromModal1.bank_number}
                  onChange={handleChange}
                />
              </div>
            </Row>
          </div>
          <div className="btn__wrapper">
            <Button1 label="Sửa thông tin" type="button" className="col-6" />
            <Button1
              label="Đồng ý"
              type="button"
              className="col-6"
              labelColor="#F1EFE7"
              backgroundColor="#785B5B"
              onClick={handleOpenModal3}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
export default ConfirmBank;
