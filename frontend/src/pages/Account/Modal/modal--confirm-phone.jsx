import React from 'react';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import ButtonIcon from 'components/Common/ButtonIcon';
import Button1 from 'components/Common/Button1';
import { CgClose } from 'react-icons/cg';
function ConfirmPhone({ onClose, dataFromModal2, id }) {
  const formRef = useRef(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formRef.current) {
        formRef.current.submit();
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
    
    const handleSubmit = (e) => {
        console.log('haha')
    e.preventDefault();
  axios
    .post(`http://localhost:8000/api/account/add-bank/${id}`, dataFromModal2)
    .then((response) => {
      console.log('add bank card success', response.data.message);
    })
    .catch((error) => {
      console.error(error);
    });
    };
  return (
    <div id="modal--confirm-phone" className="profile-modal active">
      <div className="modal__content--form">
        <ButtonIcon
          className="modal__btn--close"
          label={<CgClose />}
          border="none"
          onClick={onClose}
        />
        <h1 className="profile-modal__title headline-small">
          Vui lòng phản hồi thông báo xác thực đã được gửi qua số điện thoại{' '}
          {dataFromModal2.bank_pers_phone}
        </h1>
        <form method="POST" ref={formRef} onSubmit={handleSubmit}>
          <div className="btn__wrapper">
            <Button1 label="Hủy bỏ" type="button" className="col-6" />
            <Button1
              label="Gửi lại"
              type="button"
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
export default ConfirmPhone;
