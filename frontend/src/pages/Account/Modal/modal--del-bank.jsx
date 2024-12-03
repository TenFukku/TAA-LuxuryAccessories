import React, { useState } from 'react';
import axios from 'axios';
import ButtonIcon from 'components/Common/ButtonIcon';
import Button1 from 'components/Common/Button1';
import { CgClose } from 'react-icons/cg';
function DelBank(props) {
  const handleModalClick = (e) => {
    // Kiểm tra xem phần tử được nhấp có là nền của modal hay không
    if (e.target === e.currentTarget) {
      props.onHide(); // Gọi hàm onHide khi nhấp vào nền modal
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:8000/api/account/delete-bank/${props.id}`, {
        params: { id: props.userId },
      })
      .then((response) => {
        console.log('del bank success', response.data.message);
        props.onHide();
        props.onSuccess();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div id="modal--del-bank" className={`profile-modal ${props.show ? 'active' : ''}`} onClick={handleModalClick}>
      <div className="modal__content--confirm on-primary">
        <ButtonIcon
          className="modal__btn--close"
          label={<CgClose />}
          border="none"
          onClick={props.onHide}
        />
        <div className="profile-modal__title">
          <h1 className="headline-large">Xóa thông tin ngân hàng</h1>
          <h2 class="title-large">Bạn có chắc chắn sẽ xóa thông tin ngân hàng không?</h2>
          <p class="body-medium">Thao tác này không thể hoàn lại</p>
        </div>
        <form method="DELETE" onSubmit={handleSubmit}>
          <div class="btn__wrapper">
            <Button1 type="button" onClick={props.onHide} label="Hủy bỏ" className="col-6" />
            <Button1
              // type="submit"
              type="button"
              onClick={handleSubmit}
              label="Đồng ý"
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
export default DelBank;
